import { AssetModel } from 'common/models/interfaces';

export default async function imageConverter(
  asset: AssetModel,
  onProgress: (progress: number) => Promise<void>,
): Promise<Partial<AssetModel>> {
  console.info('imageConverter', asset);
  await Promise.resolve(null);
  return {};
}
