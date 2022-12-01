const fs = require('fs');
const { version } = require('./package.json');
const info = require('./src/info.json');
const buildTime = Date.now();
const versionTime = (info.version === version ? info.versionTime : 0) || buildTime;

const ENV_COPY_ALERT = ''.padStart(500, '\n\n\n\n\n##### COPY FROM ../server/app/.env #####\n\n\n\n\n');
fs.writeFileSync('.env', ENV_COPY_ALERT + fs.readFileSync('../server/app/.env'));

fs.writeFileSync('./src/info.json', JSON.stringify({
    ...info,
    version,
    versionTime,
    buildTime,
}, null, 2));

try {
    fs.rmSync('dist', { recursive: true });
}
catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
}