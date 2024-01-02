import { chalk, fs, os, path, $ } from "zx";
import { IEGSApp, ILauncher, LauncherType, userPath } from "../../model";
import { getExecutable, verboseBash } from "../common";
import { generalInput } from "../input";
import { getLegendaryList } from "../legendary";
import { listSelector } from "../list";
import { generalSelector } from "../selector";
import { settingsInit } from "../settings";

export const launcherInit = async (type: LauncherType) => {
  const launcher: ILauncher = {
    name: '',
    info: {
      type: type,
    },
  };

  let settings;
  let launchers;
  let launcher_settings = [];

  switch (type) {
    case "wine":
    case "proton":
      launcher.info.prefix = await generalSelector({
        type: "prefixes",
        subType: type,
      });
      launcher.info.runner = await generalSelector({
        type: "runners",
        subType: type,
      });

      launcher.info.exec = await getExecutable({
        location: await generalInput({
          qstring:
            "Enter " +
            chalk.cyan("path") +
            " to the " +
            chalk.green("app") +
            " folder or " +
            chalk.cyan("full path") +
            " to the " +
            chalk.green("executable") +
            " file",
          hfile: "exec_paths",
        }),
        ext: ["exe"],
      });

      launcher.name = await generalInput({
        qstring:
          "Enter " + chalk.cyan("name") + " of the " + chalk.green("launcher"),
        hfile: "launcher_names",
        def: path.basename(launcher.info.exec, ".exe"),
      });

      break;

    case "linux":
      launcher.info.exec = await getExecutable({
        location: await generalInput({
          qstring:
            "Enter " +
            chalk.cyan("path") +
            " to the " +
            chalk.green("app") +
            " folder or " +
            chalk.cyan("full path") +
            " to the " +
            chalk.green("executable") +
            " file",
          hfile: "exec_paths",
        }),
      });

      launcher.name = await generalInput({
        qstring:
          "Enter " + chalk.cyan("name") + " of the " + chalk.green("launcher"),
        hfile: "launcher_names",
        def: path.basename(launcher.info.exec),
      });

      break;

    case "legendary":
      switch (
        await listSelector({
          name: "Runner Type",
          items: ["Wine", "Proton"],
        })
      ) {
        case "1":
          launcher.info.prefix = await generalSelector({
            type: "prefixes",
            subType: type,
          });
          launcher.info.runner = await generalSelector({
            type: "runners",
            subType: type,
          });
          launcher.info.runnerType = "wine";
          launcher.info.userPath = "/drive_c/users";
          break;
        case "2":
          launcher.info.prefix = await generalSelector({
            type: "prefixes",
            subType: type,
          });
          launcher.info.runner = await generalSelector({
            type: "runners",
            subType: type,
          });
          launcher.info.runnerType = "proton";
          launcher.info.userPath = "/pfx/drive_c/users";
      }

      const egsApp = (await getLegendaryList({
        type: "installed",
        isFull: true,
      })) as IEGSApp;

      launcher.name = egsApp.name;
      launcher.info.id = egsApp.id;

      if (
        !!launcher.info.prefix &&
        !!launcher.info.userPath &&
        fs.existsSync(
          launcher.info.prefix + launcher.info.userPath + "/steamuser"
        ) &&
        launcher.info.runnerType == "wine"
      ) {
        const users = [os.userInfo().username, "steamuser"];

        launcher.info.userPath =
          launcher.info.userPath +
          "/" +
          users[
            +(await listSelector({
              name: "User name for cloud saves",
              items: users,
            })) - 1
          ];
      } else if (launcher.info.runnerType == "proton") {
        launcher.info.userPath = launcher.info.userPath + "/steamuser";
      } else {
        launcher.info.userPath =
          launcher.info.userPath + "/" + os.userInfo().username;
      }

      const egsUserInfo = fs.readJsonSync(
        os.homedir + "/.config/legendary/user.json"
      );

      let egsAppInfo: any = await $`legendary info ${launcher.info.id} --json`;
      let egsEosInfo: any = await $`legendary eos-overlay info`;

      if (
        !egsEosInfo.stderr.includes("No Legendary-managed installation found")
      ) {
        switch (
          await generalInput({
            qstring:
              "Install " +
              chalk.green("EOS-Overlay") +
              "? " +
              chalk.cyan("y|N"),
          })
        ) {
          case "y":
          case "Y":
            launcher.info.runnerType == "wine"
              ? await verboseBash(
                  `legendary eos-overlay enable --prefix "${launcher.info.prefix}"`
                )
              : await verboseBash(
                  `legendary eos-overlay enable --prefix "${launcher.info.prefix}/pfx"`
                );
            break;
        }
      }

      egsAppInfo = JSON.parse(egsAppInfo.stdout);

      if (egsAppInfo.game.cloud_saves_supported == true) {
        launcher.info.savePath = egsAppInfo.game.cloud_save_folder
          .replace(
            "{AppData}",
            launcher.info.prefix + launcher.info.userPath + "/AppData/Local"
          )
          .replace(
            "{UserSavedGames}",
            launcher.info.prefix + launcher.info.userPath + "/Saved Games"
          )
          .replace(
            "{UserDir}",
            launcher.info.prefix + launcher.info.userPath + "/Documents"
          )
          .replace("{InstallDir}", egsAppInfo.install?.install_path)
          .replace("{EpicID}", egsUserInfo.account_id);
      }

      break;
    case "retroarch":
      const retroarchNative = await $`echo $(command -v retroarch)`;
      const retroarchFlatpak =
        await $`echo $(command -v org.libretro.RetroArch)`;

      const retroarchNativeExec =
        retroarchNative.stdout != "/n" ? retroarchNative.stdout.trim() : null;
      const retroarchFlatpakExec =
        retroarchFlatpak.stdout != "/n" ? retroarchFlatpak.stdout.trim() : null;

      if (retroarchNativeExec && retroarchFlatpakExec) {
        const retroarchType = await listSelector({
          name: "Retroarch executable",
          items: ["Native", "Flatpak"],
        });

        switch (retroarchType) {
          case "1":
            launcher.info.executable = "retroarch";
            break;
          case "2":
            launcher.info.executable = "org.libretro.RetroArch";
            break;
        }
      } else if (retroarchNativeExec && !retroarchFlatpakExec) {
        launcher.info.executable = "retroarch";
      } else if (!retroarchNativeExec && retroarchFlatpakExec) {
        launcher.info.executable = "org.libretro.RetroArch";
      }

      launcher.info.core = await generalSelector({ type: "retroarch cores" });
      launcher.info.rom = await generalInput({
        qstring:
          "Enter " +
          chalk.cyan("path") +
          " to the " +
          chalk.green("ROM") +
          " (Example: " +
          chalk.cyan("/folder/with/rom/ROM.extension") +
          ")",
      });

      launcher.name = await generalInput({
        qstring:
          "Enter " + chalk.cyan("name") + " of the " + chalk.green("launcher"),
        hfile: "launcher_names",
        def: path.basename(launcher.info.rom),
      });
  }

  launcher.info.category = await generalInput({
    qstring:
      "Enter " +
      chalk.cyan("category") +
      " of the " +
      chalk.green("launcher") +
      " (Default: " +
      chalk.cyan("General") +
      ")",
    hfile: "launcher_categories",
  });

  if (!launcher.info.category) {
    launcher.info.category = "General";
  }

  settings = await settingsInit({
    launcher,
    settings: fs.readJsonSync(userPath + "/settings.json"),
  });

  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value) {
        launcher_settings.push({
          name: settings[i].settings[j].name,
          value: settings[i].settings[j].value,
        });
      }
    }
  }
  if (fs.existsSync(userPath + "/launchers.json")) {
    launchers = fs.readJsonSync(userPath + "/launchers.json");

    for (let i in launchers) {
      if (launchers[i].name == launcher.name) {
        launchers.splice(i, 1);
      }
    }

    launchers.push({
      name: launcher.name,
      info: launcher.info,
      settings: launcher_settings,
    });

    fs.outputJsonSync(userPath + "/launchers.json", launchers, {
      spaces: 2,
    });
  } else {
    launchers = [
      {
        name: launcher.name,
        info: launcher.info,
        settings: launcher_settings,
      },
    ];
    fs.outputJsonSync(userPath + "/launchers.json", launchers, {
      spaces: 2,
    });
  }
};
