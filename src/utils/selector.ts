import {
  IGitRelease,
  ILauncher,
  prefixCommands,
  protonList,
  retroarchCores,
  wineList,
} from "../model";
import { listSelector } from "./list";

interface ISelectorArguments {
  type: string;
  subType?: string;
  list?: unknown[];
}

export const generalSelector = async ({
  type,
  subType,
  list,
}: ISelectorArguments): Promise<string> => {
  const selectedList = subType === "proton" ? protonList : wineList;

  switch (type) {
    case "launchers":
      if (!!list) {
        const index =
          +(await listSelector({
            name: "Launchers",
            items: (list as ILauncher[]).map((item) => item.name || ""),
          })) - 1;

        return `${index}///${JSON.stringify(list[index])}`;
      }
    case "prefixes":
    case "runners":
      return selectedList[type][
        +(await listSelector({
          name: "Prefixes",
          items: selectedList[type].map((element) => element.name),
          descriptions: selectedList[type].map((element) => element.path),
        })) - 1
      ].path;
    case "prefix commands":
      return prefixCommands[
        +(await listSelector({
          name: "Prefix Commands",
          items: prefixCommands.map((command) => command.name),
          descriptions: prefixCommands.map((command) => command.command),
        })) - 1
      ].command;
    case "git releases":
      return (list as IGitRelease[])[
        +(await listSelector({
          name: "Git Releases",
          items: (list as IGitRelease[]).map((element) => element.name),
          descriptions: (list as IGitRelease[]).map((element) => element.url),
        })) - 1
      ].url;
    case "retroarch cores":
      return retroarchCores[
        +(await listSelector({
          name: "Retroarch Cores",
          items: retroarchCores.map((core) => core.name),
          descriptions: retroarchCores.map((core) => core.path),
        })) - 1
      ].path;
  }

  return "";
};
