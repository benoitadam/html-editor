import { S3Client, GetObjectCommand, S3ClientConfig, PutObjectCommand } from '@aws-sdk/client-s3';
import { createWriteStream, WriteStream, ReadStream, createReadStream } from 'fs';
import { lstat } from 'fs/promises';
import { Readable } from 'stream';
import getEnv from './getEnv';

export const s3BaseUrl = getEnv('S3_BASE_URL');
export const s3Bucket = getEnv('S3_BUCKET');
export const s3BucketUrl = s3BaseUrl + '/' + s3Bucket;

const s3ClientConfig: S3ClientConfig = {
  region: getEnv('S3_REGION'),
  endpoint: getEnv('S3_ENDPOINT'),
  credentials: {
    accessKeyId: getEnv('S3_ACCESS_KEY'),
    secretAccessKey: getEnv('S3_SECRET_KEY'),
  },
};

interface S3DownloadOptions {
  bucket?: string;
  key: string;
  file: string;
}

interface S3UploadOptions {
  bucket?: string;
  key: string;
  file: string;
  metadata?: Record<string, string>;
  contentType?: string;
}

export async function s3Download(options: S3DownloadOptions) {
  const bucket = options.bucket || s3Bucket;
  const key = options.key;
  const file = options.file;
  console.debug('s3Download', bucket, key, file);
  if (!bucket) throw Error('no bucket');
  if (!key) throw Error('no key');
  if (!file) throw Error('no file');

  const fileStat = await lstat(file).catch(() => null);
  if (fileStat) throw Error('file exist');

  let s3: S3Client | undefined;
  let writer: WriteStream | undefined;
  try {
    s3 = new S3Client(s3ClientConfig);

    const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const body = res.Body as Readable;

    if (!body) throw Error('no body');
    if (!body.pipe) throw Error('no body.pipe');

    writer = createWriteStream(file);
    body.pipe(writer);

    await new Promise((resolve, reject) => {
      if (!writer) return reject(new Error('no writer'));
      writer.on('error', (err) => reject(err));
      writer.on('finish', () => resolve(1));
    });
  } catch (error) {
    console.error('s3Download', bucket, key, file, error);
    throw error;
  } finally {
    if (writer) writer.destroy();
    if (s3) s3.destroy();
  }
}

export async function s3Upload(options: S3UploadOptions) {
  const bucket = options.bucket || s3Bucket;
  const key = options.key;
  const file = options.file;
  console.debug('s3Upload', bucket, key, file);
  if (!bucket) throw Error('no bucket');
  if (!key) throw Error('no key');
  if (!file) throw Error('no file');

  const fileStat = await lstat(file).catch(() => null);
  if (!fileStat?.isFile()) throw new Error('file not exist');

  let s3: S3Client | undefined;
  let fileReader: ReadStream | undefined;
  try {
    s3 = new S3Client(s3ClientConfig);
    fileReader = createReadStream(file);
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileReader,
      Metadata: options.metadata,
      ContentType: options.contentType,
    }));
    console.info('s3Upload ok', bucket, key);
    return `${s3BaseUrl}/${bucket}/${key}`;
  } catch (error) {
    console.error('s3Upload', bucket, key, file, error);
    throw error;
  } finally {
    if (fileReader) fileReader.destroy();
    if (s3) s3.destroy();
  }
}
