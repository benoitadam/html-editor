const { version } = require('./package.json');

let build = {};
try { build = require('./src/build.json'); } catch(e) {}

build.time = Date.now();

if (build.version !== version) {
    build.version = version;
    build.vTime = build.time;
    build.minor = 0;
} else {
    build.minor = (build.minor||0) + 1;
}

require('fs').writeFileSync('./src/build.json', JSON.stringify(build, null, 2));

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