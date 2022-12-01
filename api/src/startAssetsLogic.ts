import { assetRepo, fileRepo, logRepo } from 'common/models/gqlRepos';
import { AssetModel } from 'common/models/interfaces';
import { SECOND, MINUTE } from 'common/helpers/time';
import pdfConverter from './converters/pdfConverter';
import videoConverter from './converters/videoConverter';
import imageConverter from './converters/imageConverter';
import { s3BucketUrl } from './helpers/s3';

const TIMEOUT = 5 * MINUTE;
const INTERVAL = 1 * MINUTE;

async function cleanAssets() {
  try {
    console.debug('cleanAssets');
    const log = await logRepo.insert({ time: Date.now(), type: 'INFO', msg: 'cleanAssets' }, ['createdAt']);
    if (!log) return;
    const now = new Date(log.createdAt).getTime();
    const timeout = new Date(now - TIMEOUT).toISOString();
    const files = await assetRepo.updateItems(
      {
        jobProgress: { _lt: 100, _gte: 0 },
        updatedAt: { _lt: timeout },
        jobCount: { _lt: 3 },
      },
      {
        jobProgress: -1,
        jobState: 'error:timeout',
      },
      ['id'],
    );
    console.debug('cleanAssets files', files);
    return files;
  } catch (error) {
    console.error('cleanAssets error', error);
    return [];
  }
}

async function assetLogic() {
  const asset = await assetRepo.find({ jobProgress: -1 }, ['id', 'updatedAt', 'type', 'sourceFileId', 'jobCount']);
  if (!asset) return null;

  console.debug('assetLogic asset', asset);
  const { id, updatedAt, type, sourceFileId } = asset;
  const jobCount = (asset.jobCount || 0) + 1;

  if (!id) throw new Error('asset no id');
  if (!updatedAt) throw new Error('asset no updatedAt');
  if (!sourceFileId) throw new Error('asset no sourceFileId');

  const lockFiles = await assetRepo.updateItems({ id, updatedAt }, { jobProgress: 0, jobCount }, ['id']);
  console.debug('assetLogic lockFiles', lockFiles);

  if (!lockFiles[0]) return null;
  if (lockFiles[0].id !== id) throw new Error('lockFiles');

  const onProgress = async (jobProgress: number) => {
    console.debug('asset progress', id, jobProgress);
    await assetRepo.update(id, { jobProgress });
  };

  const onSuccess = async (changes: Partial<AssetModel>) => {
    console.debug('asset success', id, changes);
    await assetRepo.update(id, {
      jobProgress: 100,
      jobState: 'success',
      ...changes,
    });
  };

  try {
    const file = await fileRepo.get(sourceFileId, ['id', 'mimeType']);
    if (!file) throw new Error('no file');
    if (type === 'image') {
      await onSuccess(await imageConverter(asset, onProgress));
      return;
    }
    if (type === 'pdf') {
      await onSuccess(await pdfConverter(asset, onProgress));
      return;
    }
    if (type === 'video') {
      const sourceKey = asset.sourceFileId || '';
      const sourceUrl = s3BucketUrl + '/' + sourceKey;
      await onSuccess(await videoConverter(sourceKey, sourceUrl, onProgress));
      return;
    }
    throw new Error('not implemented');
  } catch (error) {
    console.error('assetLogic error', id, error);
    const jobState = 'Error:' + String((error as Error)?.message || error);
    await assetRepo.update(id, { jobState });
  }
}

export default async function startAssetsLogic() {
  console.info('startAssetsLogic');
  await cleanAssets();
  setInterval(cleanAssets, TIMEOUT);
  setInterval(assetLogic, INTERVAL);
}

// const files = await fileRepo.where('{ jobProgress: {_lt: 100} }', 0, ['id', 'jobProgress', 'updatedAt']);
// for (const file of files) {
//     if (file.jobProgress === 0)
// }
// while (true) {
//     const file
//     if (!files.length) return;
//     const { id, jobProgress, updatedAt } = file;
//     fileRepo.updateWhere({ id, jobProgress, updatedAt }, { jobProgress: 1 }, ['id', 'jobId']);
// }
