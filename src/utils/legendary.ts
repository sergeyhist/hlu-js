import { $, chalk, fs, os } from "zx";
import { IEGSApp } from "../model";
import { listSelector } from "./list";
import { generalInput } from "./input";
import { verboseBash } from "./common";

$.verbose = false;

interface IGetListArguments {
  type: "all" | "installed";
  isFull?: boolean;
}

export const getLegendaryList = async ({ type, isFull }: IGetListArguments) => {
  const apps: IEGSApp[] = [];

  let appsJson;

  switch (type) {
    case "all":
      appsJson = await $`legendary list --json`;
      break;
    case "installed":
      appsJson = await $`legendary list-installed --json`;
      break;
  }

  appsJson = JSON.parse(appsJson.stdout);

  for (let app of appsJson) {
    apps.push({
      name: app.app_title,
      id: app.app_name,
    });
  }

  const app =
    apps[
      +(await listSelector({
        name: "EGS Games",
        items: apps.map((app) => app.name),
        descriptions: apps.map((app) => app.name),
      })) - 1
    ];

  return isFull ? app : app.id;
};

export const legendaryHelper = async () => {
  if (
    fs.existsSync("/usr/local/bin/legendary") ||
    fs.existsSync("/usr/bin/legendary")
  ) {
    switch (fs.existsSync(os.homedir + "/.config/legendary/user.json")) {
      case false:
        switch (
          await generalInput({
            qstring: chalk.green("Sign in") + " ? " + chalk.cyan("y|N"),
          })
        ) {
          case "y":
          case "Y":
            await verboseBash(`legendary auth`);
          default:
            break;
        }
      case true:
        if (fs.existsSync(os.homedir + "/.config/legendary/user.json")) {
          switch (
            await listSelector({
              name: "Legendary Helper",
              items: [
                "Sign out",
                "Import game",
                "Install game",
                "Verify game",
                "Repair game",
                "Update game",
                "Move game",
                "Uninstall game",
                "Check updates",
                "Upload cloud saves",
                "Fix cloud saves",
                "Game info",
                "Install EOS-Overlay",
                "Update EOS-Overlay",
                "Remove EOS-Overlay",
              ],
            })
          ) {
            case "1":
              await verboseBash(`legendary auth --delete`);
              break;
            case "2":
              await verboseBash(
                `legendary import ${await getLegendaryList({
                  type: "all",
                })} "${await generalInput({
                  qstring:
                    "Enter " +
                    chalk.cyan("path") +
                    " to the " +
                    chalk.green("game"),
                  hfile: "legendary_paths",
                })}"`
              );
              break;
            case "3":
              await verboseBash(
                `legendary install --base-path "${await generalInput({
                  qstring:
                    "Enter " +
                    chalk.cyan("path") +
                    " where the " +
                    chalk.green("game") +
                    " will be installed",
                  hfile: "legendary_paths",
                })}" ${await getLegendaryList({ type: "all" })}`
              );
              break;
            case "4":
              await verboseBash(
                `legendary verify ${await getLegendaryList({
                  type: "installed",
                })}`
              );
              break;
            case "5":
              await verboseBash(
                `legendary repair ${await getLegendaryList({
                  type: "installed",
                })}`
              );
              break;
            case "6":
              await verboseBash(
                `legendary update ${await getLegendaryList({
                  type: "installed",
                })}`
              );
              break;
            case "7":
              await verboseBash(
                `legendary move ${await getLegendaryList({
                  type: "installed",
                })} "${await generalInput({
                  qstring:
                    "Enter " +
                    chalk.cyan("path") +
                    " where the " +
                    chalk.green("game") +
                    " will be moved",
                  hfile: "legendary_paths",
                })}"`
              );
              break;
            case "8":
              await verboseBash(
                `legendary uninstall ${await getLegendaryList({
                  type: "installed",
                })}`
              );
              break;
            case "9":
              await verboseBash(`legendary list-installed --check-updates`);
              break;
            case "10":
              await verboseBash(
                `legendary sync-saves --skip-download --disable-filters`
              );
              break;
            case "11":
              await verboseBash(`legendary clean-saves --delete-incomplete`);
              break;
            case "12":
              await verboseBash(
                `legendary info ${await getLegendaryList({ type: "all" })}`
              );
              break;
            case "13":
              await verboseBash(
                `legendary eos-overlay install --path "${await generalInput({
                  qstring:
                    "Enter " +
                    chalk.cyan("path") +
                    " where the " +
                    chalk.green("eos-overlay") +
                    " will be installed",
                  hfile: "legendary_paths",
                })}/.overlay"`
              );
              break;
            case "14":
              await verboseBash(`legendary eos-overlay update`);
              break;
            case "15":
              await verboseBash(`legendary eos-overlay remove`);
              break;
          }
        }
    }
  } else {
    console.log(chalk.green("Legendary") + " " + chalk.cyan("not installed!"));
  }
};
