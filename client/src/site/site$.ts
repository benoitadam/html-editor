import { storageMessager } from "common/helpers/storage";
import { SiteModel } from "common/models/interfaces";

export const site$ = storageMessager<SiteModel|null>('site', null);
export default site$;