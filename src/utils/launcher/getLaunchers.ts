import { fs } from "zx";
import { ILauncher, userPath } from "../../model";

export const getLaunchers = () => {
  return fs
    .readJsonSync(userPath + "/launchers.json")
    .slice(0)
    .filter((launcher: ILauncher) => !!launcher.name)
    .sort((a: ILauncher, b: ILauncher) => {
      return a.name?.localeCompare(b.name);
    })
    .sort((a: ILauncher, b: ILauncher) => {
      return a.info.category?.localeCompare(b.info.category || "");
    });
};
