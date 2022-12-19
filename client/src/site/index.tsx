import { GqlProps } from 'common/models/gqlRepo';
import { siteRepo } from 'common/models/gqlRepos';
import { importND, ROOT_ID } from 'common/box';
import setTitle from '~src/helpers/setTitle';
import { render } from 'react-dom';
import RenderFactory from '~src/render/RenderFactory';
import { RouterValue } from '~src/helpers/router';
import site$ from './site$';
import siteProps from './siteProps';
import { startAutoRefresh } from './autoRefresh';

export * from './site$';
export * from './sitePage';
export * from './autoRefresh';

let oldUpdatedAt = '';
site$.subscribe((site) => {
  const updatedAt = site?.updatedAt || '';
  if (oldUpdatedAt !== updatedAt) {
    oldUpdatedAt === updatedAt;
    setTitle(site?.title || '...');
    importND(site?.items || {});
  }
});

export const renderSite = () => {
  render(<RenderFactory id={ROOT_ID} />, document.body);
}

let isInit = true;

export const siteRoute = async (route: RouterValue) => {
  console.debug('site', route);

  const siteKey = route.params.siteKey || '';
  
  if (site$.value?.key !== siteKey) site$.next(null);

  renderSite();

  // return importND(data);

  if (isInit || !site$.value) {
    isInit = false;
    const site = await siteRepo.find({ key: siteKey }, siteProps);
    site$.next(site);
  }

  startAutoRefresh();
}
