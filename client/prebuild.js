require('dotenv').config({ path: require('path').resolve(process.cwd(), '../', '.env') });
const { version } = require('./package.json');
const jsonPath = './src/app.generated.json';

let app = {};
try { app = require(jsonPath); } catch(e) {}

app.time = Date.now();
app.host = process.env.HOST;
app.name = process.env.NAME;

const [major, minor] = version.split('.');
const [,, revision] = (app.version||version).split('.');
app.version = [major, minor, Number(revision||0)+1].join('.');

console.debug({ app });
require('fs').writeFileSync(jsonPath, JSON.stringify(app, null, 2));

const rm = (path) => {
    try {
        require('fs').rmSync(path, { recursive: true });
    }
    catch (error) {
        if (error.code === 'ENOENT') return;
        throw error;
    }
}

rm('.parcel-cache');
rm('dist');