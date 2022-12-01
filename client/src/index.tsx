import appInit from './appInit';
import gqlInit from './gqlInit';
import { routerAdd, routerForceRefresh } from './helpers/router';
import { siteRoute, stopAutoRefresh } from './site';
import '../public/cosmo';

(async () => {
  console.debug('appInit');
  appInit();
  gqlInit();

  routerAdd('', siteRoute);
  routerAdd(':siteKey', siteRoute);
  routerAdd(':siteKey/:sitePage', siteRoute);

  routerAdd('clear', () => {
    localStorage.clear();
    location.href = '/';
  });

  routerAdd('admin', () => {
    console.debug('admin import');
    stopAutoRefresh();
    import('./admin');
  });

  routerAdd('device', () => {
    console.debug('device import');
    import('./device');
  });

  routerForceRefresh();
})();