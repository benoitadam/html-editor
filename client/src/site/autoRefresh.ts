import { siteRepo } from "common/models/gqlRepos";
import site$ from "./site$";
import siteProps from "./siteProps";

let autoRefreshTimer: any = null;

export const startAutoRefresh = async () => {
  clearInterval(autoRefreshTimer);
  autoRefreshTimer = setInterval(refreshSite, 10000);
}

export const stopAutoRefresh = () => {
  clearInterval(autoRefreshTimer);
}

export const refreshSite = async () => {
    if (!site$.value) return;
    const site = await siteRepo.get(site$.value.id, siteProps).catch(() => null);
    if (site) site$.next(site);
}
  