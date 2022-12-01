import {
  UserRoleModel,
  UserModel,
  AssetModel,
  DeviceModel,
  EditorModel,
  FireUserModel,
  PageModel,
  PlaylistModel,
  ProjectModel,
  FileModel,
  LogModel,
  SiteModel,
} from "./interfaces";
import gqlRepo from "./gqlRepo";

export const userRoleRepo = gqlRepo<UserRoleModel>("authUserRoles");
export const userRepo = gqlRepo<UserModel>("users");
export const assetRepo = gqlRepo<AssetModel>("assets");
export const deviceRepo = gqlRepo<DeviceModel>("devices");
export const editorRepo = gqlRepo<EditorModel>("editors");
export const fireUserRepo = gqlRepo<FireUserModel>("fireUsers");
export const logRepo = gqlRepo<LogModel>("logs");
export const pageRepo = gqlRepo<PageModel>("pages");
export const playlistRepo = gqlRepo<PlaylistModel>("playlists");
export const projectRepo = gqlRepo<ProjectModel>("projects");
export const fileRepo = gqlRepo<FileModel>("files");
export const siteRepo = gqlRepo<SiteModel>("sites");
