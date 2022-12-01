import Fastify from 'fastify';
import cors from '@fastify/cors';
import firebaseSync from './firebase/firebaseSync';
import startAssetsLogic from './startAssetsLogic';
import initGql from './initGql';
import onUpdateFile from './onUpdateFile';
import { initUserEditor } from './initUser';
import { FileModel } from 'common/models/interfaces';
import firebaseTranscodings from './firebase/firebaseTranscodings';
import info from './info.json';
import { logRepo } from 'common/models/gqlRepos';
import { timeInitOffset } from 'common/helpers/time';
import screenshot from './screenshot';
import { createReadStream } from 'fs';
import { needObj } from 'common/helpers/need';

const app = async () => {
  console.info('app start ', info.version);
  initGql();

  const log = await logRepo.insert({ time: Date.now(), type: 'INFO', msg: 'apiStart' }, ['createdAt']);
  if (!log) throw new Error('no insert log in hasura');
  timeInitOffset(new Date(log.createdAt).getTime());
  console.info('app log', log);

  await firebaseSync();
  await startAssetsLogic();
  await firebaseTranscodings();

  const server = Fastify({ logger: true });

  console.info('server register cors');
  await server.register(cors);

  server.get('/version', async (_, reply) => {
    console.debug('/version');
    await reply.send(info.version);
  });

  // server.post('/init-device', async ({ body }, reply) => {
  //   console.debug('/init-device', body);
  //   needObj(body, 'body');
  //   const data = await initUserDevice(body)
  //   await reply.send(data);
  // });

  server.post('/init-editor', async ({ body }, reply) => {
    console.debug('/init-editor', body);
    needObj(body, 'body');
    const data = await initUserEditor(body)
    await reply.send(data);
  });

  server.get('/screenshot', async (request, reply) => {
    console.debug('/screenshot', request.url, request.query);
    const screenshotFile = await screenshot(request.query as { url: string });
    const stream = createReadStream(screenshotFile);
    await reply.type('image/png').send(stream);
  });

  type HasuraBody<T> = { event: { data: { new: T } } };
  server.post('/on-update-file', async (request, reply) => {
    console.debug('/on-update-file', request.body);
    const body = request.body as HasuraBody<FileModel>;
    needObj(body, 'body');
    const data = await onUpdateFile(body.event.data.new.id);
    await reply.send(data);
  });

  server.all('/test', async (request, reply) => {
    console.debug('/*', request.url, request.body);
    const { url, body, query } = request;
    await reply.send({ url, body, query });
  });

  console.info(`server starting`);
  server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err;
    console.info(`server started at ${address}`);
  });
}

app().catch(err => {
  console.error('app error', err);
});

// query FileWithNotConversionQuery {
//     files(limit: 1, where: {conversionProgress: {_eq: -1}}) {
//       id
//       conversionProgress
//       updatedAt
//     }
//   }

//   mutation MyMutation {
//     updateFiles(where: {conversionProgress: {_eq: -1}}, _set: {conversionProgress: 0}) {
//       affected_rows
//       returning {
//         id
//       }
//     }
//   }

// (async () => {
//     // recupérer tout les items sans transcodage
//     // pour chaque items ajouter un transcodage
//     // const data = await gqlFetch<FileData>(`query IsUploaded($id: uuid!) { file(id: $id) { isUploaded } }`, {
//         //     id: 'd04084c9-c5d3-474f-98fd-28965931c6ed'
//         // });
//     const files = await gqlItems<FileData>('file', `{conversionProgress:{_neq:100}}`, ['id', 'conversionProgress', 'updatedAt']);

//     // const item = await gqlSelect<FileData>('file', 'd04084c9-c5d3-474f-98fd-28965931c6ed', ['isUploaded']);

//     console.debug('items', items);
// })();

// fastify.post('/transcode', async (request, reply) => {
//     console.info('/transcode', request.body);
//     const data: FileDate = (request.body as any).event.data.new;
//     const result = await transcode(data);
//     reply.send(result);
// });

// fastify.post('/file_insert', async (request, reply) => {
//     console.info('/file_insert', request.body);
//     const data: FileDate = (request.body as any).event.data.new;
//     const result = await transcode(data);
//     reply.send(result);
// });

// export default async function transcode(data: FileDate) {
//     console.info('transcode', data);

//     if (!data.id) return 'no id';
//     // if (!data.mime_type) return 'no mime_type';
//     // if (!data.is_uploaded) return 'no is_uploaded';
//     // if (!data.uploaded_by_user_id) return 'no uploaded_by_user_id';
//     // if (data.metadata && data.metadata.ok) return 'already processing (metadata.ok)';

//     const isUploaded = await gqlFetch(`query IsUploaded($id: uuid) { file(id: $id) { isUploaded } }`, { id: data.id });

//     console.info('transcode isUploaded', isUploaded);
