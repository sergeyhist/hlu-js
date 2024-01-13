import { fs, $ } from "zx";
import {
  ILauncher,
  appsPath,
  globalAppsPath,
  scriptsPath,
  userPath,
} from "../../model";
import { generalSelector } from "../selector";
import { getLaunchers } from "./getLaunchers";
import { listSelector } from "../list";

export const launcherRemover = async () => {
  const launchers = getLaunchers();
  const launcher = await generalSelector({
    type: "launchers",
    list: launchers,
  });
  const launcherInfo: ILauncher = JSON.parse(launcher.split("///")[1]);
  const removeOption = await listSelector({
    name: "Choose remove option:",
    items: ["All", "Script", "Desktop file"],
  });

  if (["1"].includes(removeOption.toString())) {
    launchers.splice(+launcher.split("///")[0], 1);
    fs.outputJsonSync(userPath + "/launchers.json", launchers, { spaces: 2 });
  }

  ["1", "2"].includes(removeOption.toString()) &&
    fs.removeSync(
      `${scriptsPath}/${launcherInfo.info.category}/${launcherInfo.name}.sh`
    );

  ["1", "3"].includes(removeOption.toString()) &&
    fs
      .remove(`${appsPath}/${launcherInfo.name}.desktop`)
      .then(async () => await $`update-desktop-database "${globalAppsPath}"`);
};
