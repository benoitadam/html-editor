import appGenerated from './app.generated.json';

export type AppGenerated = typeof appGenerated;
export interface App extends AppGenerated { app: any; win: any; }

// const win = (window || self || global || globalThis) as any;
// const app: App = win.app || (win.app = {});
// Object.assign(app, appGenerated);

const app = appGenerated as App;
app.app = app;
app.win = window;
app.win[app.name] = app;
app.win.__app = app;

// (document as any)._app = app;

export default app;
