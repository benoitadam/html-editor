import { getHomePage } from "common/box";
import router from "~src/helpers/router";

export const getSitePage = () => router.current.params.sitePage || getHomePage();

export const setSitePage = (page: string) => {
  if (getSitePage() === page) return;
  
  const route = router.current;
  const { siteKey, siteId } = route.params;
  const pathEnd = page ? `/${page}` : '';
  
  if (route.match?.startsWith('/admin')) {
    if (siteKey) {
        router.push(`/admin/${siteKey}${pathEnd}`);
        return;
    }
    router.push(`/admin/site/${siteId}${pathEnd}`);
    return;
  }

  router.push(`/${siteKey}${pathEnd}`);
}

export const setPage = setSitePage;
export const pageSet = setSitePage;
