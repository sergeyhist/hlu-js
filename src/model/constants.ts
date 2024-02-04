import { fs, os } from "zx";
import { $ } from "zx";
import {
  IDefaultFields,
  IFlags,
  IPrefixCommand,
  ISteamList,
  IWineList,
} from "./types";

$.verbose = false;

export const flags: IFlags = {
  restart: 0,
};

export const steamBlockList = ["228980", "1391110", "1161040", "1826330"];
export const steamProtonList = ["1580130", "1493710", "1887720", "1420170"];

export const gpuVersion = $`lspci | grep VGA`;

export const userPath = os.homedir + "/.local/share/Hist";
export const appsPath = os.homedir + "/.local/share/applications/HLU";
export const globalAppsPath = os.homedir + "/.local/share/applications/";
export const scriptsPath = userPath + "/Scripts";
export const iconsPath = userPath + "/Icons";
export const packagesPath = userPath + "/Packages";
export const releasesPath = userPath + "/Packages/Releases";
export const historyPath = userPath + "/.history";
export const logsPath = userPath + "/.logs";
export const protonPath = userPath + "/.proton";

if (!fs.existsSync(userPath + "/prefixes.json")) {
  fs.outputJsonSync(
    userPath + "/prefixes.json",
    {
      wine: [
        {
          name: "Default",
          path: os.homedir + "/.wine",
        },
      ],
      proton: [
        {
          name: "Default",
          path: protonPath,
        },
      ],
    },
    {
      spaces: 2,
    }
  );
}

if (!fs.existsSync(userPath + "/runners.json")) {
  fs.outputJsonSync(
    userPath + "/runners.json",
    {
      wine: [
        {
          name: "Default",
          path: "/usr/bin/wine",
        },
      ],
      proton: [],
    },
    {
      spaces: 2,
    }
  );
}

export const wineList: IWineList = {
  prefixes: fs.readJsonSync(userPath + "/prefixes.json").wine,
  runners: fs.readJsonSync(userPath + "/runners.json").wine,
};

export const protonList: IWineList = {
  prefixes: fs.readJsonSync(userPath + "/prefixes.json").proton,
  runners: fs.readJsonSync(userPath + "/runners.json").proton,
};

export const steamApps: ISteamList = {
  wine: [],
  native: [],
  protonBuilds: [],
  blockList: [],
};

export const retroarchCores: IDefaultFields[] = [];

export const prefixCommands: IPrefixCommand[] = [
  {
    name: "Wine config",
    command: "winecfg",
  },
  {
    name: "Control panel",
    command: "control",
  },
  {
    name: "Task manager",
    command: "taskmgr",
  },
  {
    name: "Explorer",
    command: "explorer",
  },
  {
    name: "Install/Uninstall apps",
    command: "uninstaller",
  },
  {
    name: "Registry editor",
    command: "regedit",
  },
  {
    name: "Kill running apps",
    command: "wineserver -k",
  },
  {
    name: "Force kill running apps",
    command: "wineserver -k9",
  },
  {
    name: "Custom command",
    command: "input value",
  },
];
