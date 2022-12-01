import { mkdir, readdir, rm } from 'fs/promises';
import path from 'path';
import { AssetItem, AssetModel } from 'common/models/interfaces';
import { s3Download, s3Upload } from '~src/helpers/s3';
import { cmdExec } from '../helpers/cmd';
import getImageSize from './getImageSize';
import { tmpdir } from 'os';

export default async function pdfConverter(
  asset: AssetModel,
  onProgress: (progress: number) => Promise<void>,
): Promise<Partial<AssetModel>> {
  console.info('pdfConverter', asset);

  if (!asset) throw new Error('no asset');
  
  const id = asset.id;
  const sourceKey = String(asset.sourceFileId || '');

  if (!id) throw new Error('no id');
  if (!sourceKey) throw new Error('no sourceFileId');

  const dir = path.join(tmpdir(), sourceKey);
  const sourceFile = dir + '-doc.pdf';
  const imageFormat = path.join(dir, '%04d.jpg');
  console.debug('pdfConverter', sourceFile, imageFormat);

  await rm(sourceFile, { force: true }).catch(() => null);
  await rm(dir, { recursive: true, force: true }).catch(() => null);
  await mkdir(dir).catch(() => null);
  await s3Download({ key: sourceKey, file: sourceFile });
  await onProgress(20);
  await cmdExec({
    cmd: 'gs -sDEVICE=jpeg -o imageFormat -dJPEGQ=95 -r200x200 sourceFile',
    replace: {
      gs: 'C:/Program Files/gs/gs9.56.1/bin/gswin64.exe',
      imageFormat,
      sourceFile,
    },
  });
  await onProgress(80);

  const items: AssetItem[] = [];
  const pageFiles = await readdir(dir);
  let p = 0;
  for (const f of pageFiles.sort((a, b) => a.localeCompare(b))) {
    p++;
    try {
      const pageFile = path.join(dir, f);
      const num = String(f.split('.')[0]);
      const key = `${sourceKey}_${num}.jpg`;
      const size = await getImageSize(pageFile);
      await s3Upload({ key, file: pageFile });
      items.push({
        p,
        k: key,
        w: size.width || 0,
        h: size.height || 0,
        t: 'image/jpeg',
      });
    } catch (error) {
      items.push({ p, e: String(error) });
    }
  }

  await rm(sourceFile, { recursive: true }).catch(() => null);
  await rm(dir).catch(() => null);

  return {
    items,
  };
}
