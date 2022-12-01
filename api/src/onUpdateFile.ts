import { assetRepo, fileRepo } from 'common/models/gqlRepos';

export default async function onUpdateFile(fileId: string) {
  console.info('onUpdateFile', fileId);
  const file = await fileRepo.get(fileId, ['id', 'mimeType', 'name']);
  if (!file) return;
  const { id, mimeType, name } = file;
  if (!mimeType) return;
  const mt = mimeType;
  const type = mt.includes('video') ? 'video' : mt.includes('image') ? 'image' : mt.includes('pdf') ? 'pdf' : '';
  return await assetRepo.insert({ type, sourceFileId: id, name }).catch(() => null);
}
