import { cd, chalk, fs, $ } from "zx";
import {
  ILauncher,
  appsPath,
  globalAppsPath,
  iconsPath,
  scriptsPath,
  userPath,
} from "../../model";
import { getLaunchers } from "./getLaunchers";
import { launcherCommand } from "./launcherCommand";
import { fetchLauncherIcon, fetchLaunchers } from "./launcherSGDB";
import { generalSelector } from "../selector";
import { listSelector } from "../list";
import { generalInput } from "../input";

const generateScript = (launcher: ILauncher) => {
  const command = launcherCommand(launcher);

  fs.ensureDirSync(scriptsPath + "/" + launcher.info.category);

  fs.writeFileSync(
    scriptsPath + "/" + launcher.info.category + "/" + launcher.name + ".sh",
    "#!/bin/bash\n" + command
  );

  fs.chmod(
    scriptsPath + "/" + launcher.info.category + "/" + launcher.name + ".sh",
    0o755
  );
};

const saveIcon = (path: string, launcher: ILauncher) => {
  fs.writeFile(
    `${appsPath}/${launcher.name}.desktop`,
    `[Desktop Entry]\nName=${
      launcher.name
    }\nExec=\"${`${scriptsPath}/${launcher.info.category}/${launcher.name}.sh`}\"\nType=Application\nIcon=${path}\nCategories=HLU;Games;`
  ).then(async () => await $`update-desktop-database "${globalAppsPath}"`);
};

const generateDesktop = (launcher: ILauncher) => {
  generateScript(launcher);

  fetchLaunchers(launcher.name).then((games) =>
    !!games?.data[0]?.id
      ? fetchLauncherIcon(games.data[0].id).then((icons) => {
          cd(iconsPath);

          if (icons.data.length > 0) {
            $`wget ${icons.data[0].thumb} -O ${launcher.name}.ico`.then(() => {
              saveIcon(`${iconsPath}/${launcher.name}.ico`, launcher);
            });
          } else {
            saveIcon(`${userPath}/HLU.png`, launcher);
          }
        })
      : saveIcon(`${userPath}/HLU.png`, launcher)
  );
};

export const launcherGenerator = async (type: "icon" | "script") => {
  const launchers: ILauncher[] = getLaunchers();

  const generateOption = await listSelector({
    name: "Select option:",
    items: [
      `All ${type === "icon" ? "(icons from SteamGridDB)" : ""}`,
      "Select specific launcher",
    ],
  });

  if (generateOption === "1") {
    type === "script" && fs.emptyDirSync(scriptsPath);
    type === "icon" && fs.emptyDirSync(iconsPath);
    type === "icon" && fs.emptyDirSync(appsPath);

    launchers.forEach(async (launcher: ILauncher) => {
      type === "script" ? generateScript(launcher) : generateDesktop(launcher);
    });
  }

  if (generateOption === "2") {
    const launcher = await generalSelector({
      type: "launchers",
      list: launchers,
    }).then((data) => JSON.parse(data.split("///")[1]));

    if (type === "script") return generateScript(launcher);

    const iconPath = await generalInput({
      qstring:
        "Enter " + chalk.cyan("path") + " to the " + chalk.green("icon file"),
      hfile: "icon_paths",
    });

    !iconPath ? generateDesktop(launcher) : saveIcon(iconPath, launcher);
  }

  console.log(
    chalk.green(
      `${type === "script" ? "Script" : "Desktop file"}${
        generateOption === "1" ? "s" : ""
      }`
    ) +
      " been generated in the " +
      chalk.green(type === "icon" ? appsPath : scriptsPath) +
      " folder"
  );
};
