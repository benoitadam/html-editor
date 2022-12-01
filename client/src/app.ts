import appGenerated from './app.generated.json';

global = (window || self || global || globalThis) as any;
global.global = global;

export type AppGenerated = typeof appGenerated;
export interface App extends AppGenerated {
  app: any;
  global: any;
  fullVersion: string;
  appUrl: string;
  apiUrl: string;
  authUrl: string;
  gqlUrl: string;
  gqlWsUrl: string;
}

const app: App = (global as any).app || ((global as any).app = {} as any);

Object.assign(app, appGenerated);

app.app = app;
app.global = global;
app.appUrl = `https://${app.host}`;
app.apiUrl = `https://${app.host}/api`;
app.authUrl = `https://${app.host}/api/auth`;
app.gqlUrl = `https://${app.host}/api/gql`;
app.gqlWsUrl = `wss://${app.host}/api/gql`;

export default app;
