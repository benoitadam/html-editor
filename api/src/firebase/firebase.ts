import { initializeApp, cert, App } from 'firebase-admin/lib/app';
import { Database, getDatabase } from 'firebase-admin/lib/database';
import { DataSnapshot as _DataSnapshot } from 'firebase-admin/lib/database';
import config from '~firebaseConfig.json';

export type DataSnapshot = _DataSnapshot;

export type Firebase = {
  config: typeof config;
  app: App;
  db: Database;
}

let firebase: Firebase | undefined;
export const initFirebase = async () => {
  await Promise.resolve(null);
  if (firebase) return firebase;
  const app = initializeApp({
    credential: cert({
      clientEmail: config.clientEmail,
      privateKey: config.privateKey,
      projectId: config.projectId
    }),
    databaseURL: config.databaseUrl,
    storageBucket: config.storageBucket
  });
  const db = getDatabase(app);
  return firebase = { config, app, db };
}