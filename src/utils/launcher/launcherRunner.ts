import { verboseBash } from "../common";
import { generalSelector } from "../selector";
import { getLaunchers } from "./getLaunchers";
import { launcherCommand } from "./launcherCommand";

export const launcherRunner = async () => {
  let launchers = await getLaunchers();
  let launcher = await generalSelector({ type: "launchers", list: launchers });
  let commands = launcherCommand(JSON.parse(launcher.split("///")[1]));

  await verboseBash(commands.join("; "));
};
