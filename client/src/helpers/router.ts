import messager from "common/helpers/messager";

const PLUS_EXP = /\+/g;
const queryDecode = (s: string) => decodeURIComponent(s.replace(PLUS_EXP, ' '));

export type RouterHandler = (route: RouterValue) => void;

export type RouterParams = Record<string, string>;

export type RouterNode = {
    children?: { [part: string]: RouterNode },
    prop?: string,
    match?: string,
    handler?: RouterHandler|null,
    params?: RouterParams;
};

export type RouterValue = RouterNode & {
    host: string,
    path: string,
    params: RouterParams,
};

export const routerRoot: RouterNode = {};

export const routerCurrent$ = messager<RouterValue>({ host: '', path: '', params: {} });

export const routerAdd = (match: string, handler: RouterHandler|null, params?: RouterParams) => {
    const parts = match.split('/');
    if (parts[0] === '') parts.splice(0,1);
    let node = routerRoot;
    for (const part of parts) {
        const children = node.children || (node.children = {});
        if (part[0] === ':') {
            node = children[':'] || (children[':'] = {});
            node.prop = part.substring(1);
            continue;
        }
        node = children[part] || (children[part] = {});
    }
    node.match = match;
    node.handler = handler;
    node.params = params;
};

export const routerResolve = (path: string): RouterValue => {
    let host = location.host;
    
    const queryIndex = path.indexOf('?');
    const query = queryIndex === -1 ? '' : path.substring(queryIndex + 1);
    const pathWithoutQuery = queryIndex === -1 ? path : path.substring(0, queryIndex);
    const parts = pathWithoutQuery.split('/');
    let node = routerRoot;
    let params: RouterParams = {};

    if (parts[0] === '') parts.splice(0,1);
    if (parts[0] && parts[0].endsWith(':') && parts[1] === '') {
        host = parts[2];
        parts.splice(0,3);
    }

    parts.forEach(part => {
        const children = node.children;
        if (!children) return;
        const next = children[part] || children[':'];
        if (!next) return;
        if (next.prop) params[next.prop] = part;
        node = next;
    });

    if (node.params) params = { ...node.params, ...params };

    if (query) {
        query.split('&').forEach(part => {
            const equalIndex = part.indexOf('=');
            const k = queryDecode(equalIndex === -1 ? part : part.substring(0, equalIndex));
            const v = queryDecode(equalIndex === -1 ? 'true' : part.substring(equalIndex + 1));
            const v0 = params[k];
            if (v0 === undefined) params[k] = v;
            else params[k] = v0 + '&' + v;
        });
    }

    return { ...node, host, path, params };
};

export const routerForceRefresh = () => {
    console.debug('routerForceRefresh');
    const value = routerResolve(location.href);
    routerCurrent$.next(value);
    if (value.handler) value.handler(value);
}

export const routerRefresh = (event?: Event|string) => {
    const type = event ? typeof event === 'string' ? event : event.type : '';
    console.debug('routerRefresh', type, location.href);
    if (routerCurrent$.value.path === location.href) return;
    routerForceRefresh();
}

export const routerPush = (route: string) => {
    history.pushState({}, "", route);
    routerRefresh();
}

export const routerReplace = (route: string) => {
    history.replaceState({}, "", route);
    routerRefresh();
}

export const routerBack = () => {
    history.back();
    routerRefresh();
}

export const routerParams = () => routerCurrent$.value.params;

window.addEventListener('locationchange', routerRefresh);
window.addEventListener('hashchange', routerRefresh);
window.addEventListener('popstate', routerRefresh);
setInterval(routerRefresh, 1000);

const _history = (type: string) => {
    const fun = (history as any)[type];
    (history as any)[type] = function () {
        const r = fun.apply(history, arguments);
        routerRefresh('history_' + type);
        return r;
    };
}

_history('pushState');
_history('replaceState');
_history('back');

export const router = {
    current$: routerCurrent$,
    current: routerCurrent$.value,
    root: routerRoot,
    add: routerAdd,
    resolve: routerResolve,
    push: routerPush,
    replace: routerReplace,
    back: routerBack,
    refresh: routerRefresh,
    forceRefresh: routerForceRefresh,
};

routerCurrent$.subscribe(current => {
    router.current = current;
});

routerForceRefresh();

export default router;

// router.add('', (o) => console.debug('app', o));
// router.add(':siteId', (o) => console.debug('site1', o));
// router.add('site/:siteId', (o) => console.debug('site2', o));
// router.add('site/:siteId/:page', (o) => console.debug('site3', o));
// router.add('clear', (o) => console.debug('clear', o));
// router.add('admin', (o) => console.debug('admin1', o));
// router.add('admin/auth', (o) => console.debug('admin2', o));
// router.add('admin/sites', (o) => console.debug('admin3', o));
// router.add('admin/sites/:siteId', (o) => console.debug('admin4', o));
// router.add('admin/devices', (o) => console.debug('admin5', o));
// router.add('admin/devices/:deviceId', (o) => console.debug('admin6', o));
// router.add('device', (o) => console.debug('device', o));
// router.add('device/:siteId', (o) => console.debug('device1', o));
// router.add('device/:siteId/:page', (o) => console.debug('device2', o));

// const testRoute = (test: string, match: string, params?: Record<string, string>) => {
//     const r = router.resolve(test);
//     if (r.match === match) {
//         console.debug(test, match, 'ok', r);
//     } else {
//         console.error(test, match, 'ko', r);
//     }
// }

// testRoute('a', ':siteId');
// testRoute('b', ':siteId');
// testRoute('site/a', 'site/:siteId', { siteId: 'a' });
// testRoute('site/a/b', 'site/:siteId/:page', { siteId: 'a', page: 'b' });
// testRoute('clear', 'clear');
// testRoute('admin', 'admin');
// testRoute('admin/auth', 'admin/auth');
// testRoute('admin/sites', 'admin/sites');
// testRoute('admin/sites/a', 'admin/sites/:siteId', { siteId: 'a' });
// testRoute('admin/devices', 'admin/devices');
// testRoute('admin/devices/a', 'admin/devices/:deviceId', { deviceId: 'a' });
// testRoute('device', 'device');
// testRoute('device/a', 'device/:siteId');
// testRoute('device/a/b', 'device/:siteId/:page');

// router.push('/cosmo/page1');
// router.push('/cosmo/page2');
// router.push('/cosmo/page3');
// router.replace('/cosmo/page4');
// router.push('/cosmo/page5');
// router.back();
// router.back();
// router.push('/cosmo/page6');
// router.back();
// router.push('/cosmo/page7');




// const router$ = messager({
//     mode: null,
//     root: '/',
// });

// const clearSlashes = (path: string) => path.toString().replace(/\/$/, '').replace(/^\//, '');

// config: (options) => {
//     this.mode = options && options.mode && options.mode == 'history' 
//                 && !!(history.pushState) ? 'history' : 'hash';
//     this.root = options && options.root ? '/' + clearSlashes(options.root) + '/' : '/';
//     return this;
// }

// getFragment: function() {
//     var fragment = '';
//     if(this.mode === 'history') {
//         fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
//         fragment = fragment.replace(/\\?(.*)$/, '');
//         fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
//     } else {
//         var match = window.location.href.match(/#(.*)$/);
//         fragment = match ? match[1] : '';
//     }
//     return this.clearSlashes(fragment);
// }

// const removeRoute = (param) {
//     for(let i=0, l=routes.length; i<l; i++) {
//         const r = routes[i];
//         if(r.handler === param || r.re.toString() === param.toString()) {
//             this.routes.splice(i, 1); 
//             return this;
//         }
//     }
//     return this;
// }
