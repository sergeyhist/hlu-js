import { spawnSync } from "child_process";
import { chalk } from "zx";
import {flags} from "../model";
import { generalInput } from "./input";

export const scriptExit = async () => {
  switch (
    await generalInput({
      qstring: "Restart " + chalk.green("HLU") + " ? " + chalk.cyan("y|N"),
    })
  ) {
    case "y":
    case "Y":
      const argv = process.argv;

      flags.restart = 1;
      spawnSync(argv[0], argv.slice(1), {
        cwd: process.cwd(),
        stdio: "inherit",
      });
    case "n":
    case "N":
    case "":
    case " ":
      process.exit(1);
    default:
      await scriptExit();
  }
};
