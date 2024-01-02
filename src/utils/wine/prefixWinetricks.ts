import { cd, chalk, glob, path } from "zx";
import { verboseBash } from "../common";
import { generalInput } from "../input";
import { generalSelector } from "../selector";

interface IArguments {
  type: string;
}

export const prefixWinetricks = async ({ type }: IArguments) => {
  let prefix = await generalSelector({ type: "prefixes", subType: type });
  let runner = await generalSelector({ type: "runners", subType: type });

  if (type === "proton") {
    cd(path.dirname(runner));

    prefix += "/pfx";
    runner = path.dirname(runner) + "/" + (await glob(["**/wine64"][0]));
  }

  const command = await generalInput({
    qstring:
      "Enter " +
      chalk.green("winetricks") +
      " " +
      chalk.cyan("arguments") +
      " (Example: " +
      chalk.cyan("vcrun2019") +
      ") (For " +
      chalk.green("gui") +
      " just " +
      chalk.cyan('press "Enter"') +
      ")",
    hfile: "winetricks_args",
  });

  switch (type) {
    case "wine":
      await verboseBash(
        `WINEPREFIX="${prefix}" WINE="${runner}" winetricks ${command}`
      );
      break;

    case "proton":
      await verboseBash(
        `WINEPREFIX="${prefix}" WINE="${runner}" winetricks ${command}`
      );
      break;
  }
};
