import { chalk, fs } from "zx";
import { packagesPath, userPath } from "../../model";
import { getExecutable } from "../common";
import { generalInput } from "../input";
import { listSelector } from "../list";
import { packageInstaller } from "../packages";
import { generalSelector } from "../selector";

export const runnerManager = async () => {
  let runner;
  let runners = fs.readJsonSync(userPath + "/runners.json");

  switch (
    await listSelector({
      name: "Runners Manager",
      items: [
        "Add wine runner",
        "Delete wine runner",
        "Install GE-Proton",
        "Install GE-Wine",
      ],
    })
  ) {
    case "1":
      runner = await generalInput({
        qstring:
          "Enter " + chalk.cyan("path") + " to the " + chalk.green("runner"),
        hfile: "pfx_paths",
      });

      runner = await getExecutable({ location: runner, ext: ["wine"] });

      runners.wine.push({
        name: await generalInput({
          qstring:
            "Enter " + chalk.cyan("name") + " of the " + chalk.green("runner"),
          hfile: "pfx_names",
        }),
        path: runner,
      });

      fs.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });
      break;
    case "2":
      runner = await generalSelector({ type: "runners", subType: "wine" });

      for (let i in runners.wine) {
        if (runner == runners.wine[i].path && runner != "/usr/bin/wine") {
          runners.wine.splice(i, 1);
        }
      }

      fs.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });

      switch (
        await generalInput({
          qstring: "Delete " + chalk.green("folder") + "? " + chalk.cyan("y|N"),
        })
      ) {
        case "y":
        case "Y":
          fs.removeSync(runner);
          break;
      }
      break;
    case "3":
      await packageInstaller({ type: "release", pack: "GE-Proton" });
      break;
    case "4":
      await packageInstaller({ type: "release", pack: "GE-Wine" });

      for (let i in runners.wine) {
        if (runners.wine[i].name == "GE-Wine") {
          runners.wine.splice(i, 1);
        }
      }
      runners.wine.push({
        name: "GE-Wine",
        path: packagesPath + "/GE-Wine/bin/wine",
      });
      fs.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });
      break;
  }
};
