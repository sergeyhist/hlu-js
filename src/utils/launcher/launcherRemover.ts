import { fs } from "zx";
import { ILauncher, appsPath, scriptsPath, userPath } from "../../model";
import { generalSelector } from "../selector";
import { getLaunchers } from "./getLaunchers";

export const launcherRemover = async () => {
  let launchers = getLaunchers();
  let launcher = await generalSelector({ type: "launchers", list: launchers });

  const launcherInfo: ILauncher = JSON.parse(launcher.split("///")[1]);

  launchers.splice(+launcher.split("///")[0], 1);

  fs.outputJsonSync(userPath + "/launchers.json", launchers, { spaces: 2 });
  fs.removeSync(`${appsPath}/${launcherInfo.name}.desktop`);
  fs.removeSync(
    `${scriptsPath}/${launcherInfo.info.category}/${launcherInfo.name}.sh`
  );
};
