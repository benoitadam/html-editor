const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '../.env');

require('dotenv').config({ path: envPath });

const { version } = require('./package.json');
const jsonPath = './src/app.generated.json';

let app = {};
try { app = require(jsonPath); } catch(e) {}

app.time = Date.now();
app.host = process.env.HOST;
app.name = process.env.NAME;
app.appUrl = `https://${app.host}`;
app.apiUrl = `https://${app.host}/api`;
app.authUrl = `https://${app.host}/api/auth`;
app.gqlUrl = `https://${app.host}/api/gql`;
app.gqlWsUrl = `wss://${app.host}/api/gql`;

const [major, minor] = version.split('.');
const [,, revision] = (app.version||version).split('.');
app.version = [major, minor, Number(revision||0)+1].join('.');

console.debug({ app });
fs.writeFileSync(jsonPath, JSON.stringify(app, null, 2));

const rm = (path) => {
    try {
        fs.rmSync(path, { recursive: true });
    }
    catch (error) {
        if (error.code === 'ENOENT') return;
        throw error;
    }
}

rm('.parcel-cache');
rm('dist');