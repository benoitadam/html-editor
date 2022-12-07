import { GqlProps } from "common/models/gqlRepo";
import { SiteModel } from "common/models/interfaces";

export const siteProps: GqlProps<SiteModel> = ['id', 'key', 'title', 'items', 'updatedAt'];
export default siteProps;