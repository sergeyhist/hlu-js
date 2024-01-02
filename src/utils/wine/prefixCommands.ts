import { chalk, os } from "zx";
import { verboseBash } from "../common";
import { generalInput } from "../input";
import { generalSelector } from "../selector";

interface ICommandsArguments {
  type: string;
}

export const prefixCommands = async ({ type }: ICommandsArguments) => {
  let prefix;
  let runner;
  let command;

  prefix = await generalSelector({ type: "prefixes", subType: type });
  runner = await generalSelector({ type: "runners", subType: type });
  command = await generalSelector({ type: "prefix commands" });

  if (command == "input value") {
    command = await generalInput({
      qstring:
        "Enter " +
        chalk.green("custom") +
        " " +
        chalk.cyan("command") +
        " (Example: " +
        chalk.cyan("notepad") +
        ")",
      hfile: "pfxcoms",
    });
  }
  switch (type) {
    case "wine":
      await verboseBash(`WINEPREFIX="${prefix}" "${runner}" ${command}`);
      break;
    case "proton":
      await verboseBash(
        `STEAM_COMPAT_CLIENT_INSTALL_PATH="${os.homedir}/.steam/steam" STEAM_COMPAT_DATA_PATH="${prefix}" "${runner}" run ${command}`
      );
  }
};
