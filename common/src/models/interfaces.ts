type uuid = string;
type timestamp = string;
type integer = number;
type jsonb = any;

export interface AuthSession {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  expireInMs: number;
  expireTime: number;
  role: string | null;
  canEdit: boolean;
  headers: Record<string, string>;
  error?: any;
};

export type Session = (AuthSession & { isAuth: true }) | (Partial<AuthSession> & { isAuth: false })

// device data

export interface DeviceConfig {
  screenEnd?: string;
  screenStart?: string;
  turnScreenOn?: boolean;
  showConsole?: boolean;
  remoteConsole?: boolean;
}

export interface DeviceInfo {
  os?: string; // os
  version?: string; // version
  type?: string;
  webview?: string; // browser
  width?: number; // width
  height?: number; // height
  orientation?: string; // orientation
  fully?: string;
}

export enum DeviceCommand {
  None = "",
  TurnScreenOn = "turnScreenOn",
  TurnScreenOff = "turnScreenOff",
  Reload = "reload",
  Restart = "restart",
  Exit = "exit",
  Screenshot = "screenshot",
  LockKiosk = "lockKiosk",
  UnlockKiosk = "unlockKiosk",
  BringToBackground = "bringToBackground",
  BringToForeground = "bringToForeground",
  Reboot = "reboot",
}

// auth tables

export interface UserRoleModel {
  id: uuid;
  createdAt: timestamp;
  userId: uuid;
  role: string;

  user: UserModel | null;
}

export interface UserModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  lastSeen: timestamp | null;
  disabled: boolean;
  displayName: string;
  avatarUrl: string;
  locale: string;
  email: string;
  phoneNumber: string | null;
  passwordHash: string | null;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  newEmail: string | null;
  otpMethodLastUsed: string | null;
  otpHash: string | null;
  otpHashExpiresAt: timestamp;
  defaultRole: string | null;
  isAnonymous: boolean;
  totpSecret: string | null;
  activeMfaType: string | null;
  ticket: string | null;
  ticketExpiresAt: timestamp;
  metadata: jsonb | null;
  currentChallenge: string | null;
  roles: string[];
}

// public tables

export interface AssetInfo {
  w?: number; // width
  h?: number; // height
  d?: number; // duration
}

export interface AssetItem {
  k?: string; // file key
  p?: number; // page number
  t?: 'video/mp4'|'video/webm'|'image/jpeg'; // type
  w?: number; // width
  h?: number; // height
  e?: string; // error
}

export interface AssetModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  sourceFileId: uuid | null;
  projectId: uuid | null;
  type: "" | "video" | "image" | "pdf";
  updatedByUserId: uuid | null;
  items: AssetItem[];
  name: string | null;
  jobProgress: integer;
  jobState: string | null;
  jobCount: integer;
  sourceInfo: AssetInfo | null;

  sourceFile: FileModel | null;
  project: ProjectModel | null;
  updatedByUser: UserModel | null;
}

export interface DeviceModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  lastSeen: timestamp | null;
  name: string | null;
  config: DeviceConfig | null;
  info: DeviceInfo | null;
  action: string | null;
  state: string | null;
  command: DeviceCommand | null;
  updatedByUserId: uuid | null;
  projectId: uuid | null;
  playlistId: uuid | null;
  deviceUserId: uuid | null;
  fire: jsonb | null;
  key: string | null;
  deleted_at: timestamp | null;

  updatedByUser: UserModel | null;
  project: ProjectModel | null;
  playlist: PlaylistModel | null;
  deviceUser: UserModel | null;
}

export interface EditorModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  userId: uuid;
  projectId: uuid;

  user: UserModel | null;
  project: ProjectModel | null;
}

export interface FireUserModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  signInAt: timestamp;
  email: string | null;
  userId: string | null;
  key: string;
  deviceKeys: string[] | null;

  user: UserModel | null;
}

export interface LogModel {
  id: uuid;
  createdAt: timestamp;
  userId: uuid;
  type: string;
  time: integer;
  msg: string;

  user: UserModel | null;
}

export interface PageModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  key: string;
  title: string;
  items: jsonb;
  userId: uuid;

  user: UserModel | null;
}

export interface PlaylistModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  name: string | null;
  nodes: jsonb | null;
  projectId: string | null;
  updatedByUserId: string | null;

  project: ProjectModel | null;
  updatedByUser: UserModel | null;
}

export interface SiteModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  key: string | null;
  title: string | null;
  items: jsonb | null;
  projectId: string | null;
  project: ProjectModel | null;
}

export interface ProjectModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  name: string | null;
  key: string;
}

// storage tables

export interface FileModel {
  id: uuid;
  createdAt: timestamp;
  updatedAt: timestamp;
  bucketId: string;
  name: string | null;
  size: integer | null;
  mimeType: string | null;
  etag: string | null;
  isUploaded: boolean | null;
  uploadedByUserId: uuid | null;

  uploadedByUser: UserModel | null;
}
