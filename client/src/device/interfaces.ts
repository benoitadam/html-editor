export interface DeviceInfoData {
  os: string;
  version: string;
  type: string;
  width: number;
  height: number;
  orientation: string;
  webview: string;
  [other: string]: string|number;
}

export type ScreenSize = {
  width: number;
  height: number;
};

export interface DownloadFileResult {
  fileName: string;
  downloadUrl: string;
  code: number;
  fileLength: number;
  lastModified: number;
  mimetype: string;
  localUrl: string;
}

export interface DownloadFile {
  fileName: string;
  isFile: boolean;
  size: number;
  lastModified: number;
  canRead: boolean;
  canWrite: boolean;
  isHidden: boolean;
  localUrl: string;
}

export interface Bridge {
  // downloadFile(url: string): Promise<DownloadFileResult|null>,
  // clearDownloadFiles(): Promise<void>,
  // getDownloadFiles(): Promise<DownloadFile[]>,
  info(): DeviceInfoData;
  screenshot(): Promise<string>;
  inBackground(value?: boolean): boolean;
  screenOff(value?: boolean): boolean;
  kioskOn(value?: boolean): boolean;
  reload(): void;
  reboot(): void;
  restart(): void;
  exit(): void;
  reset(): void;
}

export interface Context extends Bridge {
  invoke(method: string, ...args: any[]): Promise<any>;
  evalScript(script: string, ...args: any[]): Promise<void>;
  takeScreenshot(): Promise<void>;
  setKiosk(value: boolean): Promise<void>;
  getMethods(): string[];
  signUp(): Promise<void>;
  signIn(): Promise<void>;
}

// export type OrientationName = 'all' | 'default' | 'landscape' | 'landscape_left' | 'landscape_right' | 'other' | 'portrait' | 'portrait_down' | 'portrait_up' | 'unknown' | '';
// export type ScreenshotOptions = {
//     width?: number,
//     height?: number,
//     quality?: number,
//     format?: 'png' | "jpg",
// };
// export type DeviceScreenOptions = {
//     width?: number,
//     height?: number,
//     scale?: number,
// };
// export interface FileInfo {
//     exists: boolean;
//     uri: string;
//     isDirectory: boolean;
//     modificationTime?: number;
// }
// export interface FileDownloadOptions {
//     cacheDirectory?: boolean;
//     headers?: Record<string, string>;
// }
// export interface DiskInfo {
//     free: number;
//     total: number;
// }
// setDeviceScreen(options: DeviceScreenOptions): Promise<void>,
// getDeviceInfo(): Promise<DeviceInfo>,
// screenshot(options?: ScreenshotOptions): Promise<string>,
// setOrientation(orientationLock: OrientationName): Promise<void>,
// getOrientation(): Promise<OrientationName>,
// nativeEval(script: string): Promise<any>,
// eval(script: string, data?: any): Promise<any>,
// exitApp(): Promise<void>,
// reloadApp(): Promise<void>,
// fileDownload(uri: string, filename: string, options: FileDownloadOptions): Promise<string | undefined>,
// getFileInfo(fileUri: string): Promise<FileInfo>,
// writeFile(fileUri: string, base64: string): Promise<void>,
// readFile(fileUri: string): Promise<string>,
// readDir(fileUri: string): Promise<string[]>,
// makeDir(fileUri: string): Promise<void>,
// getDiskInfo(): Promise<DiskInfo>,
// setKiosk(activate: boolean): Promise<void>
