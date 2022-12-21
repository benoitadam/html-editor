import { manifest } from '@parcel/service-worker';
import { version } from './app.generated.json';

const CACHE_KEY = version;

const indexJs = manifest.find(p => p.includes('index') && p.includes('js'))!;
const indexHtml = manifest.find(p => p.includes('index') && p.includes('html'))!;
const urlsToCache = [indexHtml, indexJs];

// const assetMap: Record<string, boolean> = {
//     'js': true,
//     'css': true,
//     'json': true,
//     'jpeg': true,
//     'jpg': true,
//     'png': true,
//     'gif': true,
//     'ico': true,
//     'svg': true,
//     'woff2': true,
// };

async function cacheOrFetch(request: any, isIndex = false) {
    const cache = await caches.open(CACHE_KEY);

    const cacheRes = await cache.match(request);
    if (cacheRes) {
        if (isIndex) {
            fetch(request).then(fetchRes => cache.put(request, fetchRes.clone()));
        }
        return cacheRes;
    }

    const fetchRes = await fetch(request);
    cache.put(request, fetchRes.clone());

    return fetchRes;
}

async function swInstall() {
    console.debug('swInstall', CACHE_KEY);
    const cache = await caches.open(CACHE_KEY);
    await cache.addAll(urlsToCache);
}

async function swActivate() {
    console.debug('swActivate', CACHE_KEY);
    const keys = await caches.keys();
    await Promise.all(keys.map(key => key !== CACHE_KEY && caches.delete(key)));
}

async function swFetch(request: any) {
    const url: string = request.url;
    const method: string = request.method;
    console.debug('swFetch', CACHE_KEY, method, url);

    if (method !== 'GET') {
        return await fetch(request);
    }

    if (!url.includes(location.host)) {
        console.debug('swFetch external', url);
        return await cacheOrFetch(request);
    }

    if (url.includes('/api/')) {
        console.debug('swFetch api', url);
        return await fetch(request);
    }

    const isAsset = url.includes('/files/') || (url.match(/\.(\w+)(\?.+)?$/)||[])[1];
    if (isAsset) {
        console.debug('swFetch asset', url);
        return await cacheOrFetch(request);
    }

    return await cacheOrFetch(indexHtml, true);
}

addEventListener('install', (e: any) => e.waitUntil(swInstall()));
addEventListener('activate', (e: any) => e.waitUntil(swActivate()));
addEventListener('fetch', (e: any) => e.respondWith(swFetch(e.request)));