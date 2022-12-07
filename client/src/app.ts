import appGenerated from './app.generated.json';

const win = (window || self || global || globalThis) as any;
win.win = win;

export type AppGenerated = typeof appGenerated;
export interface App extends AppGenerated {
  app: any;
  win: any;
  appUrl: string;
  apiUrl: string;
  authUrl: string;
  gqlUrl: string;
  gqlWsUrl: string;
}

const app: App = win.app || (win.app = {});

Object.assign(app, appGenerated);

app.app = app;
app.win = win;
app.appUrl = `https://${app.host}`;
app.apiUrl = `https://${app.host}/api`;
app.authUrl = `https://${app.host}/api/auth`;
app.gqlUrl = `https://${app.host}/api/gql`;
app.gqlWsUrl = `wss://${app.host}/api/gql`;

export default app;
