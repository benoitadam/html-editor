import { GqlProps } from 'common/models/gqlRepo';
import { siteRepo } from 'common/models/gqlRepos';
import { SiteModel } from 'common/models/interfaces';
import { importND, ROOT_ID } from 'common/box';
import setTitle from '~src/helpers/setTitle';
import site$ from './site$';
import { render } from 'react-dom';
import RenderFactory from '~src/render/RenderFactory';
import { RouterValue } from '~src/helpers/router';
import { sitePage$ } from './sitePage$';

export * from './site$';
export * from './sitePage$';

export const siteProps: GqlProps<SiteModel> = ['id', 'key', 'title', 'items', 'updatedAt'];

let oldUpdatedAt = '';
site$.subscribe((site) => {
  const updatedAt = site?.updatedAt || '';
  if (oldUpdatedAt !== updatedAt) {
    oldUpdatedAt === updatedAt;
    setTitle(site?.title || '...');
    importND(site?.items || {});
  }
});

const refreshSite = async () => {
  if (!site$.value) return;
  const site = await siteRepo.get(site$.value.id, siteProps);
  site$.next(site);
}

export const renderSite = () => {
  render(<RenderFactory id={ROOT_ID} />, document.body);
}

let autoRefreshTimer: any = null;

export const startAutoRefresh = async () => {
  clearInterval(autoRefreshTimer);
  autoRefreshTimer = setInterval(refreshSite, 10000);
}

export const stopAutoRefresh = () => {
  clearInterval(autoRefreshTimer);
}

let isInit = true;

export const siteRoute = async (route: RouterValue) => {
  console.debug('site', route);

  const key = route.params.siteKey || '';
  const page = route.params.sitePage || '';
  
  sitePage$.next(page);

  if (site$.value?.key !== key) {
    site$.next(null);
    document.title = key;
  }

  if (isInit || !site$.value) {
    const site = await siteRepo.find({ key }, siteProps);
    site$.next(site);
  }

  if (isInit) {
    isInit = false;
    renderSite();
    startAutoRefresh();
  }
}
