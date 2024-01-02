export interface IDefaultFields {
  name: string;
  path: string;
}

export interface IWineList {
  [key: string]: IDefaultFields[];
  prefixes: IDefaultFields[];
  runners: IDefaultFields[];
}

export interface IWineFile {
  [key: string]: IDefaultFields[];
  wine: IDefaultFields[];
  proton: IDefaultFields[];
}

interface ISteamFields {
  name: string;
  appId?: string;
  path?: string;
  prefix?: string;
}

export interface ISteamList {
  wine: ISteamFields[];
  native: ISteamFields[];
  protonBuilds: ISteamFields[];
  blockList: ISteamFields[];
}

export interface IPrefixCommand {
  name: string;
  command: string;
}

export interface IGitRelease {
  name: string;
  url: string;
}

export interface IEGSApp {
  name: string;
  id: string;
}

export interface IFlags {
  restart: 0 | 1;
}

export interface ILauncherSettings {
  name: string;
  value: string;
}

export interface ILauncherInfo {
  type: string;
  exec?: string;
  category?: string;
  prefix?: string;
  runner?: string;
  runnerType?: string;
  userPath?: string;
  savePath?: string;
  id?: string;
  executable?: string;
  core?: string;
  rom?: string;
}

export interface ILauncher {
  name: string;
  info: ILauncherInfo;
  settings?: ILauncherSettings[];
}

export interface ISettingsElement {
  name: string;
  value?: string;
  exampleValue?: string;
  defaultValue?: string;
  text: string;
  additionalText?: string;
  limitation?: {[key: string]: string[]};
}

export interface ISettings {
  name: string;
  settings: ISettingsElement[];
}

export interface IGitReleasePackage {
  author: string;
  gitName: string;
  extension: string;
  flags: string[];
  path?: string;
  folders?: string[];
}

export interface IGitPackage {
  url: string;
  args?: string;
  deleteFolders?: string[];
  command?: string;
}

export interface ISGDBItem {
  id: number | string;
  name?: string;
  url?: string;
  thumb?: string;
}

export interface ISGDBResponse {
  success: boolean;
  data: ISGDBItem[];
}

export interface ISystemdService {
  name: string;
  path: string;
  type: 'user' | 'root';
}

export type LauncherType = "wine" | "proton" | "legendary" | "retroarch" | "linux";
