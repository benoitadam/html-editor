import { createWriteStream } from 'fs';
import { rm } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import getEnv from '../helpers/getEnv';
import { s3Upload } from '../helpers/s3';
import { AssetModel } from 'common/models/interfaces';
import { cmdExec } from '../helpers/cmd';
import { toNbr } from 'common/helpers/to';
import req from 'common/helpers/req';
import { pipeline } from 'stream/promises';
import { tmpdir } from 'os';

const dolbyAppKey = getEnv('DOLBY_APP_KEY');
const dolbyAppSecret = getEnv('DOLBY_APP_SECRET');
console.debug('dolby', dolbyAppKey, dolbyAppSecret);
const dolbyAuth = Buffer.from(`${dolbyAppKey}:${dolbyAppSecret}`).toString('base64');

async function getDolbyAccessToken() {
  const tokenRes = await req.post(
    'https://api.dolby.io/v1/auth/token',
    {},
    {
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${dolbyAuth}`,
      },
      params: {
        grant_type: 'client_credentials',
        expires_in: '1800',
      },
    },
  );
  const dolbyAccessToken = tokenRes.data?.access_token;
  if (!dolbyAccessToken) throw new Error('no dolbyAccessToken');
  return dolbyAccessToken;
}

async function createDolbyTranscodeJob(
  dolbyAccessToken: string,
  fileUrl: string,
  width: number,
  height: number,
  duration: number,
  mp4Destination: string,
  webmDestination: string,
  coverDestination: string,
) {
  const coverOffsetSec = Math.round(duration / 2);
  const outputs = [
    {
      id: crypto.randomUUID(),
      destination: mp4Destination,
      kind: 'mp4',
      video: {
        width,
        height,
        codec: 'h264',
      },
    },
    {
      id: crypto.randomUUID(),
      destination: webmDestination,
      kind: 'webm',
      video: {
        width,
        height,
        codec: 'vp8',
      },
    },
    {
      id: crypto.randomUUID(),
      destination: coverDestination,
      kind: 'jpg',
      image: {
        width,
        height,
        offset_sec: coverOffsetSec
      },
    }
  ];
  console.debug('createDolbyTranscodeJob outputs', outputs)
  const transcodeRes = await req.post(
    'https://api.dolby.com/media/transcode',
    {
      inputs: [{ source: fileUrl }],
      outputs,
    },
    { headers: { Authorization: `Bearer ${dolbyAccessToken}` } },
  );
  console.debug('createDolbyTranscodeJob data', transcodeRes.data);
  const jobId = transcodeRes.data?.job_id;
  if (!jobId) throw new Error('no dolby jobId');
  return jobId;
}

async function getDolbyJobData(dolbyAccessToken: string, jobId: string) {
  const jobRes = await req.get('https://api.dolby.com/media/transcode', {
    headers: { Authorization: `Bearer ${dolbyAccessToken}` },
    params: { job_id: jobId },
  });
  const jobData = jobRes.data;
  if (!jobData) throw new Error('no jobData');
  return jobData;
}

async function downloadDolby(dolbyAccessToken: string, destination: string, file: string) {
  const res = await req.get('https://api.dolby.com/media/output', {
    headers: { Authorization: `Bearer ${dolbyAccessToken}` },
    params: { url: destination },
    responseType: 'stream'
  });
  if (!res.body) throw new Error('downloadDolby no body');
  await pipeline(res.body as any, createWriteStream(file));
}

async function dolbyTranscode(
  sourceUrl: string,
  sourceKey: string,
  width: number,
  height: number,
  duration: number,
  onProgress: (progress: number) => Promise<void>,
) {
  console.debug('dolbyTranscode');
  await onProgress(2);

  const mp4Key = sourceKey + '.mp4';
  const mp4File = path.join(tmpdir(), mp4Key);
  const mp4Destination = `dlb://out/${mp4Key}`;

  const webmKey = sourceKey + '.webm';
  const webmFile = path.join(tmpdir(), webmKey);
  const webmDestination = `dlb://out/${webmKey}`;
  
  const coverKey = sourceKey + '.jpg';
  const coverFile = path.join(tmpdir(), coverKey);
  const coverDestination = `dlb://out/${coverKey}`;

  console.debug('dolbyTranscode mp4Destination', mp4Destination);
  console.debug('dolbyTranscode webmDestination', webmDestination);
  console.debug('dolbyTranscode coverDestination', coverDestination);

  const dolbyAccessToken = await getDolbyAccessToken();
  console.debug('dolbyTranscode dolbyAccessToken', dolbyAccessToken);

  await onProgress(3);

  const jobId = await createDolbyTranscodeJob(
    dolbyAccessToken,
    sourceUrl,
    width,
    height,
    duration,
    mp4Destination,
    webmDestination,
    coverDestination,
  );
  console.debug('dolbyTranscode jobId', jobId);

  await onProgress(4);

  for (let i = 0; i < 1000; i++) { // 1000 * 3000 = 50 minutes
    await new Promise((r) => setTimeout(r, 3000));
    const jobData = await getDolbyJobData(dolbyAccessToken, jobId);
    console.debug('dolbyTranscode jobData', jobData);
    await onProgress(Math.round(jobData.progress * 0.88 + 4));
    switch (jobData.status) {
      case 'Pending':
      case 'Running':
        continue;
      case 'Failed':
        console.error('transcode failed', jobData);
        throw new Error('transcode failed: ' + String(jobData.error.detail));
      default:
        console.info('jobData.status', jobData.status);
        break;
    }
    break;
  }

  await onProgress(93);

  const metadata = { sourceKey, width: String(width), height: String(height), duration: String(duration) };

  await downloadDolby(dolbyAccessToken, coverDestination, coverFile);
  await onProgress(94);
  await s3Upload({ key: coverKey, file: coverFile, metadata, contentType: 'video/webm' });
  await rm(coverFile);
  await onProgress(95);

  await downloadDolby(dolbyAccessToken, mp4Destination, mp4File);
  await onProgress(96);
  await s3Upload({ key: mp4Key, file: mp4File, metadata, contentType: 'video/mp4' });
  await rm(mp4File);
  await onProgress(97);

  await downloadDolby(dolbyAccessToken, webmDestination, webmFile);
  await onProgress(98);
  await s3Upload({ key: webmKey, file: webmFile, metadata, contentType: 'image/jpeg' });
  await rm(webmFile);
  await onProgress(99);

  return {
    mp4Key,
    webmKey,
    coverKey,
  };
}

async function getSourceInfo(sourceUrl: string) {
  const result = await cmdExec({
    cmd: 'ffprobe -show_entries "stream=width,height,duration" -print_format json sourceUrl',
    replace: { sourceUrl },
  });
  const data = JSON.parse(String(result.stdout));
  const stream = Array.from<any>(data.streams).find((s) => s.width && s.height);
  return {
    w: toNbr(stream.width, 0),
    h: toNbr(stream.height, 0),
    d: toNbr(stream.duration, 0),
  };
}

export default async function videoConverter(
  sourceKey: string,
  sourceUrl: string,
  onProgress: (progress: number) => Promise<void>,
): Promise<Partial<AssetModel>> {
  console.info('videoConverter', sourceKey);

  if (!sourceUrl) throw new Error('no sourceUrl');
  if (!sourceKey) throw new Error('no sourceKey');

  const sourceInfo = await getSourceInfo(sourceUrl);
  const w = sourceInfo.w;
  const h = sourceInfo.h;
  const d = sourceInfo.d;
  const itemWidth = w > h ? Math.min(w, 1920) : Math.min(w, 1080);
  const itemHeight = Math.round((itemWidth * h) / w);
  console.debug('videoConverter info', { w, h, d, itemWidth, itemHeight });

  const result = await dolbyTranscode(sourceUrl, sourceKey, itemWidth, itemHeight, d, onProgress);
  return {
    sourceInfo,
    items: [
      { k: result.mp4Key, t: 'video/mp4', w: itemWidth, h: itemHeight },
      { k: result.webmKey, t: 'video/webm', w: itemWidth, h: itemHeight },
      { k: result.coverKey, t: 'image/jpeg', w: itemWidth, h: itemHeight },
    ],
  };
}
