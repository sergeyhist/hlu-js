import { chalk, fs } from "zx";
import { ILauncher, ILauncherSettings, userPath } from "../../model";
import { getExecutable } from "../common";
import { generalInput } from "../input";
import { listSelector } from "../list";
import { generalSelector } from "../selector";
import { settingsInit } from "../settings";
import { getLaunchers } from "./getLaunchers";

export const launcherEditor = async () => {
  const launchers = getLaunchers();
  const settings = fs.readJsonSync(userPath + "/settings.json");

  let launcherSettings: ILauncherSettings[] = [];
  let items: string[] = [];

  const selected = await generalSelector({
    type: "launchers",
    list: launchers,
  });

  const index = selected.split("///")[0];
  const launcher: ILauncher = JSON.parse(selected.split("///")[1]);

  switch (launcher.info.type) {
    case "wine":
    case "proton":
      items = [
        "Change settings",
        "Change name",
        "Change category",
        "Change executable",
        "Change prefix and runner",
      ];
      break;
    case "linux":
      items = [
        "Change settings",
        "Change name",
        "Change category",
        "Change executable",
      ];
      break;
    case "legendary":
      items = ["Change settings", "Change name", "Change category"];
      break;
    case "retroarch":
      items = ["Change settings", "Change name", "Change category"];
      break;
  }

  switch (
    await listSelector({
      name: "Launcher Editor",
      items: items,
    })
  ) {
    case "1":
      for (let i in settings) {
        for (let j in settings[i].settings) {
          launcher.settings?.forEach(
            (option) =>
              option.name == settings[i].settings[j].name &&
              (settings[i].settings[j].value = option.value)
          );
        }
      }

      const newSettings = await settingsInit({ launcher, settings });

      for (let i in newSettings) {
        for (let j in newSettings[i].settings) {
          if (newSettings[i].settings[j].value) {
            launcherSettings.push({
              name: settings[i].settings[j].name,
              value: settings[i].settings[j].value,
            });
          }
        }
      }

      for (let i in launchers) {
        if (launchers[i].name == launcher.name) {
          launchers.splice(i, 1);
        }
      }

      launchers.push({
        name: launcher.name,
        info: launcher.info,
        settings: launcherSettings,
      });

      fs.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2,
      });

      break;
    case "2":
      launcher.name = await generalInput({
        qstring: "Enter " + chalk.green("launcher") + " " + chalk.cyan("name"),
        hfile: "launcher_names",
      });

      launchers.splice(index, 1);
      launchers.push(launcher);

      fs.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2,
      });

      break;
    case "3":
      launcher.info.category = await generalInput({
        qstring:
          "Enter " + chalk.green("launcher") + " " + chalk.cyan("category"),
        hfile: "launcher_categories",
      });

      launchers.splice(index, 1);
      launchers.push(launcher);

      fs.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2,
      });

      break;
    case "4":
      switch (launcher.info.type) {
        case "wine":
        case "proton":
          launcher.info.exec = await getExecutable({
            location: await generalInput({
              qstring:
                "Enter " +
                chalk.green("path to the") +
                " " +
                chalk.cyan("executable"),
              hfile: "exec_paths",
            }),
            ext: ["exe"],
          });

          break;
        case "linux":
          launcher.info.exec = await getExecutable({
            location: await generalInput({
              qstring:
                "Enter " +
                chalk.green("path to the") +
                " " +
                chalk.cyan("executable"),
              hfile: "exec_paths",
            }),
          });
          break;
      }

      launchers.splice(index, 1);
      launchers.push(launcher);

      fs.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2,
      });

      break;
    case "5":
      launcher.info.prefix = await generalSelector({
        type: "prefixes",
        subType: launcher.info.type,
      });

      launcher.info.runner = await generalSelector({
        type: "runners",
        subType: launcher.info.type,
      });

      launchers.splice(index, 1);
      launchers.push(launcher);

      fs.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2,
      });

      break;
  }
};
