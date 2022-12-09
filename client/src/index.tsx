import app from './app';
import { lang$ } from './appAll';
import * as appAll from './appAll';
import gqlInit from './gqlInit';
import router from './helpers/router';
import { getSitePage, siteRoute, stopAutoRefresh } from './site';

(async () => {
  console.debug('app');
  Object.assign(app, appAll);
  gqlInit();

  router.add('/', siteRoute);
  router.add('/:siteKey', siteRoute);
  router.add('/:siteKey/:sitePage', siteRoute);

  router.add('/clear', () => {
    localStorage.clear();
    location.href = '/';
  });

  router.add('/admin', () => {
    console.debug('admin import');
    stopAutoRefresh();
    import('./admin');
  });

  router.add('/device', () => {
    console.debug('device import');
    import('./device');
  });

  router.updated$.subscribe(() => {
    const lang = router.current.params.lang;
    if (lang) lang$.next(lang);
    const pageClass = 'page--' + getSitePage();
    document.body.className = pageClass;
  });

  router.forceRefresh();
})();