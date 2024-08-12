import { $, cd, chalk, fs, globby, os, path } from "zx";
import {
  appsPath,
  dirsPath,
  globalAppsPath,
  historyPath,
  iconsPath,
  ILauncherSettings,
  logsPath,
  menusPath,
  packagesPath,
  protonPath,
  releasesPath,
  scriptsPath,
  userPath,
} from "../model";
import { launcherCommand } from "./launcher";
import { listSelector } from "./list";
import { settingsInit } from "./settings";
import { exec } from "child_process";

$.verbose = false;

export const verboseBash = async (command: string) => {
  $.verbose = true;
  await $`eval ${command}`;
  $.verbose = false;
};

export const ensurePaths = async () => {
  fs.ensureDirSync(packagesPath);
  fs.ensureDirSync(releasesPath);
  fs.ensureDirSync(historyPath);
  fs.ensureDirSync(logsPath);
  fs.ensureDirSync(protonPath);
  fs.ensureDirSync(appsPath);
  fs.ensureDirSync(dirsPath);
  fs.ensureDirSync(menusPath);
  fs.ensureDirSync(iconsPath);
  fs.ensureDirSync(scriptsPath);

  !fs.existsSync(`${userPath}/HLU.png`) &&
    (await $`cd ${userPath}; wget https://raw.githubusercontent.com/sergeyhist/hlu-js/main/images/HLU.png`);

  !fs.existsSync(`${dirsPath}/hlu.directory`) &&
    fs.writeFileSync(
      `${dirsPath}/hlu.directory`,
      `[Desktop Entry]\nType=Directory\nName=HLU\nIcon=${userPath}/HLU.png`
    );

  !fs.existsSync(`${menusPath}/hlu.menu`) &&
    fs.writeFileSync(
      `${menusPath}/hlu.menu`,
      `<!DOCTYPE Menu PUBLIC "-//freedesktop//DTD Menu 1.0//EN"\n"http://www.freedesktop.org/standards/menu-spec/menu-1.0.dtd">\n<Menu>\n<Name>Applications</Name>\n<Menu>\n<Name>HLU</Name>\n<Directory>hlu.directory</Directory>\n<Include>\n<Category>HLU</Category>\n</Include>\n</Menu>\n</Menu>`
    );

  fs.writeFile(
    `${appsPath.split("/").slice(0, -1).join("/")}/HLU.desktop`,
    `[Desktop Entry]\nName=HLU\nExec=${__filename}\nType=Application\nIcon=${userPath}/HLU.png\nTerminal=true\nCategories=HLU;Games;\nActions=Launchers;Services;\n\n[Desktop Action Launchers]\nName=Launchers\nExec=${__filename} run\n\n[Desktop Action Services]\nName=Services\nExec=${__filename} services`
  ).then(async () => await $`update-desktop-database "${globalAppsPath}"`);

  if (
    !fs.existsSync(userPath + "/settings.json") ||
    !fs.existsSync(userPath + "/packages.json")
  ) {
    cd(userPath);
    await $`git clone https://github.com/sergeyhist/hlu-js.git`;
    fs.copySync("hlu-js/settings.json", userPath + "/settings.json");
    fs.copySync("hlu-js/packages.json", userPath + "/packages.json");
    fs.removeSync("hlu-js");
  }
};

interface IGetExecutableArguments {
  location: string;
  ext?: string[];
  title?: string;
}

export const getExecutable = async ({
  ext,
  location,
  title = "Executables",
}: IGetExecutableArguments) => {
  const executables: {
    all: string[];
    names: string[];
    paths: string[];
  } = {
    all: [],
    names: [],
    paths: [],
  };

  try {
    cd(location);

    if (ext) {
      if (ext.includes("wine")) {
        executables.names = await globby("", {
          expandDirectories: { files: ext },
        });
        executables.paths = await globby("", {
          absolute: true,
          expandDirectories: { files: ext },
        });
      } else {
        executables.names = await globby("", {
          expandDirectories: { extensions: ext },
        });
        executables.paths = await globby("", {
          absolute: true,
          expandDirectories: { extensions: ext },
        });
      }
    } else {
      executables.all = await globby("", {
        absolute: true,
      });
      for (let item of executables.all) {
        try {
          fs.accessSync(item, fs.constants.X_OK);
          executables.names.push(path.basename(item));
          executables.paths.push(item);
        } catch (e) {}
      }
    }
    return executables.paths[
      +(await listSelector({
        name: title,
        items: executables.names,
        descriptions: executables.paths,
      })) - 1
    ];
  } catch (e) {
    return location;
  }
};

export const steamOptions = async () => {
  const launcherSettings: ILauncherSettings[] = [];
  const launcher = { name: "Steam Game", info: { type: "steam" } };

  let settings = await settingsInit({
    launcher,
    settings: fs.readJsonSync(userPath + "/settings.json"),
  });

  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value) {
        launcherSettings.push({
          name: settings[i].settings[j].name,
          value: settings[i].settings[j].value || "",
        });
      }
    }
  }

  const command = launcherCommand({ ...launcher, settings: launcherSettings });
  const sessionType = await $`echo $XDG_SESSION_TYPE`;

  console.log(
    "Copy & paste " +
      chalk.cyan("this") +
      " to the " +
      chalk.green("steam game") +
      " properties:\n" +
      chalk.cyan(command)
  );
  $`echo ${command}`;

  switch (sessionType.stdout.trim()) {
    case "wayland":
      exec(`wl-copy ${command}`, { timeout: 1000 });
      break;
    default:
      $`echo ${command} | xclip -sel clip`;
  }
};
