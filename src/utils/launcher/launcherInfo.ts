import { generalSelector } from "../selector";
import { getLaunchers } from "./getLaunchers";

export const launcherInfo = async () => {
  let launchers = getLaunchers();
  let launcher = await generalSelector({ type: "launchers", list: launchers });

  console.log(JSON.parse(launcher.split("///")[1]));
};
