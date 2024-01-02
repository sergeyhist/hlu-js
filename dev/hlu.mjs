#!/usr/bin/env zx

// src/hlu.mts
import { $ as $12, cd as cd7, chalk as chalk16, fs as fs18, os as os9 } from "zx";

// src/utils/common.ts
import { $ as $7, cd as cd3, chalk as chalk9, fs as fs12, globby as globby2, os as os6, path as path4 } from "zx";

// src/model/constants.ts
import { fs, os } from "zx";
import { $ } from "zx";
$.verbose = false;
var flags = {
  restart: 0
};
var steamBlockList = ["228980", "1391110", "1161040", "1826330"];
var steamProtonList = ["1580130", "1493710", "1887720", "1420170"];
var gpuVersion = $`lspci | grep VGA`;
var userPath = os.homedir + "/.local/share/Hist";
var appsPath = os.homedir + "/.local/share/applications/HLU";
var scriptsPath = userPath + "/Scripts";
var iconsPath = userPath + "/Icons";
var packagesPath = userPath + "/Packages";
var releasesPath = userPath + "/Packages/Releases";
var historyPath = userPath + "/.history";
var logsPath = userPath + "/.logs";
var protonPath = userPath + "/.proton";
var wineList = {
  prefixes: fs.readJsonSync(userPath + "/prefixes.json").wine,
  runners: fs.readJsonSync(userPath + "/runners.json").wine
};
var protonList = {
  prefixes: fs.readJsonSync(userPath + "/prefixes.json").proton,
  runners: fs.readJsonSync(userPath + "/runners.json").proton
};
var steamApps = {
  wine: [],
  native: [],
  protonBuilds: [],
  blockList: []
};
var retroarchCores = [];
var prefixCommands = [
  {
    name: "Wine config",
    command: "winecfg"
  },
  {
    name: "Control panel",
    command: "control"
  },
  {
    name: "Task manager",
    command: "taskmgr"
  },
  {
    name: "Explorer",
    command: "explorer"
  },
  {
    name: "Install/Uninstall apps",
    command: "uninstaller"
  },
  {
    name: "Registry editor",
    command: "regedit"
  },
  {
    name: "Kill running apps",
    command: "wineserver -k"
  },
  {
    name: "Force kill running apps",
    command: "wineserver -k9"
  },
  {
    name: "Custom command",
    command: "input value"
  }
];

// src/utils/launcher/launcherInit.ts
import { chalk as chalk6, fs as fs6, os as os4, path as path2, $ as $5 } from "zx";

// src/utils/input.ts
import { $ as $2, chalk, fs as fs2, question } from "zx";
var generalInput = async ({
  qstring,
  hfile,
  def,
  text
}) => {
  const choices = [];
  let historyString = "";
  if (def) {
    choices.push(def);
  }
  if (hfile) {
    if (fs2.existsSync(historyPath + "/" + hfile) && fs2.statSync(historyPath + "/" + hfile).size != 0) {
      for (let item of fs2.readFileSync(historyPath + "/" + hfile, {
        encoding: "utf8",
        flag: "r"
      }).split("\n")) {
        choices.push(item);
      }
    } else {
      await $2`touch ${historyPath}/${hfile}`;
    }
    if (choices.length) {
      historyString = ' (press "' + chalk.cyan("Tab") + '" for ' + chalk.green("history") + " or " + chalk.green("default") + ")";
    }
  }
  if (text) {
    console.log(text);
  }
  let answer = await question(qstring + historyString + ": ", {
    choices
  });
  if (hfile) {
    if (answer != def) {
      if (fs2.statSync(historyPath + "/" + hfile).size != 0) {
        if (!choices.includes(answer)) {
          fs2.appendFileSync(historyPath + "/" + hfile, "\n" + answer);
        }
      } else {
        fs2.appendFileSync(historyPath + "/" + hfile, answer);
      }
    }
  }
  return answer;
};

// src/utils/legendary.ts
import { $ as $4, chalk as chalk4, fs as fs4, os as os3 } from "zx";

// src/utils/list.ts
import { chalk as chalk3, fs as fs3, os as os2, question as question2, $ as $3, globby, path, cd } from "zx";

// src/utils/exit.ts
import { spawnSync } from "child_process";
import { chalk as chalk2 } from "zx";
var scriptExit = async () => {
  switch (await generalInput({
    qstring: "Restart " + chalk2.green("HLU") + " ? " + chalk2.cyan("y|N")
  })) {
    case "y":
    case "Y":
      const argv = process.argv;
      flags.restart = 1;
      spawnSync(argv[0], argv.slice(1), {
        cwd: process.cwd(),
        stdio: "inherit"
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

// src/utils/list.ts
var listSelector = async ({
  items,
  name,
  descriptions,
  values,
  options
}) => {
  const listOutput = ["\n" + chalk3.bold.magenta(name) + "\n"];
  const listDescriptions = (descriptions == null ? void 0 : descriptions.map((description) => " - " + chalk3.blue(description))) || [];
  const listValues = (values == null ? void 0 : values.map((value) => " - (" + chalk3.cyan(value) + ")")) || [];
  items.forEach(
    (item, index) => listOutput.push(
      " " + chalk3.cyan(index + 1) + (listValues[index] || "") + " - " + chalk3.green(item) + (listDescriptions[index] || "")
    )
  );
  while (true) {
    listOutput.forEach((element) => console.log(element));
    let answer = await question2(
      "\nChoose " + chalk3.cyan("item") + " from the " + chalk3.green("list") + " above (" + chalk3.cyan("q|Q") + " for " + chalk3.green("exit") + "): "
    );
    switch (answer) {
      case "q":
      case "Q":
        if (options == null ? void 0 : options.includes("continue")) {
          return 0;
        } else {
          await scriptExit();
        }
      default:
        if (!isNaN(+answer)) {
          if (+answer <= items.length && +answer > 0) {
            return answer;
          }
        }
    }
  }
};
var steamListInit = async () => {
  var _a, _b;
  const libraries = [];
  const appmanifests = [];
  const paths = [
    os2.homedir + "/.steam/",
    os2.homedir + "/.var/app/com.valvesoftware.Steam/.steam/"
  ];
  for (let path8 of paths) {
    if (fs3.existsSync(path8)) {
      let temp = await $3`echo $(grep path ${path8}root/steamapps/libraryfolders.vdf | cut -d'"' -f4) | tr -d '\n'`;
      for (let item of temp.stdout.split(" ")) {
        libraries.push(item);
      }
      for (let item of libraries) {
        if (fs3.existsSync(item)) {
          for (let item2 of await globby(item, {
            expandDirectories: { files: ["appmanifest_*"] },
            deep: 2
          })) {
            !appmanifests.includes(item2) && appmanifests.push(item2);
          }
        }
      }
    }
  }
  for (let item of appmanifests) {
    const appid = await $3`echo $(grep '"appid"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    const nameOutput = await $3`echo $(grep '"name"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    const name = nameOutput.stdout.replace(" \\", "");
    const installPath = await $3`echo $(grep '"installdir"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    const dirname = await $3`dirname ${item} | tr -d '\n'`;
    if (steamBlockList.includes(appid.stdout)) {
      steamApps.blockList.push({
        name,
        appId: appid.stdout
      });
    } else if (steamProtonList.includes(appid.stdout)) {
      steamApps.protonBuilds.push({
        name,
        appId: appid.stdout,
        path: dirname.stdout + "/common/" + installPath.stdout + "/proton"
      });
    } else {
      if (fs3.existsSync(dirname.stdout + "/compatdata/" + appid.stdout + "/pfx")) {
        steamApps.wine.push({
          name,
          appId: appid.stdout,
          path: dirname.stdout + "/common/" + installPath.stdout,
          prefix: dirname.stdout + "/compatdata/" + appid.stdout
        });
      } else {
        steamApps.native.push({
          name,
          appId: appid.stdout,
          path: dirname.stdout + "/common/" + installPath.stdout
        });
      }
    }
  }
  if (fs3.existsSync("/usr/share/steam/compatibilitytools.d/")) {
    const tools = await globby(
      "/usr/share/steam/compatibilitytools.d/",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2
      }
    );
    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: path.basename(path.dirname(tool)),
        path: tool
      });
    }
  }
  if (fs3.existsSync(os2.homedir + "/.steam/root/compatibilitytools.d")) {
    const tools = await globby(
      os2.homedir + "/.steam/root/compatibilitytools.d",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2
      }
    );
    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: path.basename(path.dirname(tool)),
        path: tool
      });
    }
  }
  if (fs3.existsSync(
    os2.homedir + "/.var/app/com.valvesoftware.Steam/.steam/root/compatibilitytools.d"
  )) {
    const tools = await globby(
      os2.homedir + "/.var/app/com.valvesoftware.Steam/.steam/root/compatibilitytools.d",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2
      }
    );
    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: path.basename(path.dirname(tool)),
        path: tool
      });
    }
  }
  for (let app of steamApps.wine) {
    !!app.prefix && ((_a = protonList.prefixes) == null ? void 0 : _a.push({
      name: app.name,
      path: app.prefix
    }));
  }
  for (let app of steamApps.protonBuilds) {
    !!app.path && ((_b = protonList.runners) == null ? void 0 : _b.push({
      name: app.name,
      path: app.path
    }));
  }
};
var retroarchListInit = async () => {
  const cwd2 = process.cwd();
  let coreName;
  const getName = (infoPath) => {
    if (fs3.existsSync(infoPath)) {
      for (let line of fs3.readFileSync(infoPath, { encoding: "utf-8" }).split("\\n")) {
        if (line.includes("display_name")) {
          return line.split('"')[1];
        }
      }
    } else {
      return path.basename(infoPath, ".info");
    }
  };
  const coresInit = async (coresPath, infoPath) => {
    if (fs3.existsSync(coresPath)) {
      cd(coresPath);
      const cores = await globby("", {
        expandDirectories: { extensions: ["so"] },
        absolute: true
      });
      cores.forEach((item) => {
        if (infoPath) {
          coreName = getName(
            item.replace(coresPath, infoPath).replace(".so", ".info")
          );
        } else {
          coreName = getName(item.replace(".so", ".info"));
        }
        !!coreName && retroarchCores.push({
          name: coreName,
          path: item
        });
      });
    }
  };
  await coresInit(os2.homedir + "/.config/retroarch/cores");
  await coresInit(
    os2.homedir + "/.var/app/org.libretro.RetroArch/config/retroarch/cores",
    "/var/lib/flatpak/app/org.libretro.RetroArch/current/19bc2de02efb8da5e2bea76f858cce45b1b20b11a2e134c462f22db0eba59d4f/files/share/libretro/info"
  );
  await coresInit("/usr/lib/libretro", "/usr/share/libretro/info");
  cd(cwd2);
};

// src/utils/legendary.ts
$4.verbose = false;
var getLegendaryList = async ({ type, isFull }) => {
  const apps = [];
  let appsJson;
  switch (type) {
    case "all":
      appsJson = await $4`legendary list --json`;
      break;
    case "installed":
      appsJson = await $4`legendary list-installed --json`;
      break;
  }
  appsJson = JSON.parse(appsJson.stdout);
  for (let app2 of appsJson) {
    apps.push({
      name: app2.app_title,
      id: app2.app_name
    });
  }
  const app = apps[+await listSelector({
    name: "EGS Games",
    items: apps.map((app2) => app2.name),
    descriptions: apps.map((app2) => app2.name)
  }) - 1];
  return isFull ? app : app.id;
};
var legendaryHelper = async () => {
  if (fs4.existsSync("/usr/local/bin/legendary") || fs4.existsSync("/usr/bin/legendary")) {
    switch (fs4.existsSync(os3.homedir + "/.config/legendary/user.json")) {
      case false:
        switch (await generalInput({
          qstring: chalk4.green("Sign in") + " ? " + chalk4.cyan("y|N")
        })) {
          case "y":
          case "Y":
            await verboseBash(`legendary auth`);
          default:
            break;
        }
      case true:
        if (fs4.existsSync(os3.homedir + "/.config/legendary/user.json")) {
          switch (await listSelector({
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
              "Remove EOS-Overlay"
            ]
          })) {
            case "1":
              await verboseBash(`legendary auth --delete`);
              break;
            case "2":
              await verboseBash(
                `legendary import ${await getLegendaryList({
                  type: "all"
                })} "${await generalInput({
                  qstring: "Enter " + chalk4.cyan("path") + " to the " + chalk4.green("game"),
                  hfile: "legendary_paths"
                })}"`
              );
              break;
            case "3":
              await verboseBash(
                `legendary install --base-path "${await generalInput({
                  qstring: "Enter " + chalk4.cyan("path") + " where the " + chalk4.green("game") + " will be installed",
                  hfile: "legendary_paths"
                })}" ${await getLegendaryList({ type: "all" })}`
              );
              break;
            case "4":
              await verboseBash(
                `legendary verify ${await getLegendaryList({
                  type: "installed"
                })}`
              );
              break;
            case "5":
              await verboseBash(
                `legendary repair ${await getLegendaryList({
                  type: "installed"
                })}`
              );
              break;
            case "6":
              await verboseBash(
                `legendary update ${await getLegendaryList({
                  type: "installed"
                })}`
              );
              break;
            case "7":
              await verboseBash(
                `legendary move ${await getLegendaryList({
                  type: "installed"
                })} "${await generalInput({
                  qstring: "Enter " + chalk4.cyan("path") + " where the " + chalk4.green("game") + " will be moved",
                  hfile: "legendary_paths"
                })}"`
              );
              break;
            case "8":
              await verboseBash(
                `legendary uninstall ${await getLegendaryList({
                  type: "installed"
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
                  qstring: "Enter " + chalk4.cyan("path") + " where the " + chalk4.green("eos-overlay") + " will be installed",
                  hfile: "legendary_paths"
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
    console.log(chalk4.green("Legendary") + " " + chalk4.cyan("not installed!"));
  }
};

// src/utils/selector.ts
var generalSelector = async ({
  type,
  subType,
  list
}) => {
  const selectedList = subType === "proton" ? protonList : wineList;
  switch (type) {
    case "launchers":
      if (!!list) {
        const index = +await listSelector({
          name: "Launchers",
          items: list.map((item) => item.name || "")
        }) - 1;
        return `${index}///${JSON.stringify(list[index])}`;
      }
    case "prefixes":
    case "runners":
      return selectedList[type][+await listSelector({
        name: "Prefixes",
        items: selectedList[type].map((element) => element.name),
        descriptions: selectedList[type].map((element) => element.path)
      }) - 1].path;
    case "prefix commands":
      return prefixCommands[+await listSelector({
        name: "Prefix Commands",
        items: prefixCommands.map((command) => command.name),
        descriptions: prefixCommands.map((command) => command.command)
      }) - 1].command;
    case "git releases":
      return list[+await listSelector({
        name: "Git Releases",
        items: list.map((element) => element.name),
        descriptions: list.map((element) => element.url)
      }) - 1].url;
    case "retroarch cores":
      return retroarchCores[+await listSelector({
        name: "Retroarch Cores",
        items: retroarchCores.map((core) => core.name),
        descriptions: retroarchCores.map((core) => core.path)
      }) - 1].path;
  }
  return "";
};

// src/utils/settings.ts
import { chalk as chalk5, fs as fs5 } from "zx";
var settingsInit = async ({ launcher, settings }) => {
  var _a, _b, _c, _d, _e, _f, _g;
  let menu;
  let item;
  let input;
  let selected;
  let limit;
  while (menu != "0") {
    menu = await listSelector({
      name: "Settings",
      items: settings.map((option) => option.name),
      options: ["continue"]
    });
    if (menu != 0) {
      do {
        item = await listSelector({
          name: settings[+menu - 1].name,
          items: settings[+menu - 1].settings.map((option) => option.name),
          values: settings[+menu - 1].settings.map(
            (option) => option.value || ""
          ),
          options: ["continue"]
        });
        if (item != "0") {
          limit = 0;
          selected = settings[+menu - 1].settings[+item - 1];
          if ((_a = selected.limitation) == null ? void 0 : _a.file) {
            for (let item2 of selected.limitation.file) {
              if (fs5.existsSync(item2)) {
                limit = 1;
              }
            }
            if (limit == 0) {
              console.log(
                "\n" + chalk5.green(selected.limitation.file) + chalk5.red(" not installed!")
              );
            }
          } else if ((_b = selected.limitation) == null ? void 0 : _b.launcher) {
            if (selected.limitation.launcher.includes(launcher.info.type) || selected.limitation.launcher.includes(
              launcher.info.runnerType
            )) {
              limit = 1;
            } else {
              console.log(
                "\nOnly for " + chalk5.green(selected.limitation.launcher.join(","))
              );
            }
          } else if ((_c = selected.limitation) == null ? void 0 : _c.video) {
            const gpu = await gpuVersion;
            if (selected.limitation.video.some(
              (element) => gpu.stdout.includes(element)
            )) {
              limit = 1;
            } else {
              console.log(
                "\nOnly for " + chalk5.green(selected.limitation.video)
              );
            }
          } else {
            limit = 1;
          }
          if (limit == 1) {
            if ((_d = selected.exampleValue) == null ? void 0 : _d.includes("input_value")) {
              const colors = {
                cyan: "\x1B[36m",
                green: "\x1B[32m",
                zero: "\x1B[0m"
              };
              input = await generalInput({
                qstring: (_e = selected.text) == null ? void 0 : _e.replace(/cyan_/g, colors.cyan).replace(/green_/g, colors.green).replace(/_end/g, colors.zero),
                hfile: selected.name.replace(/ /g, "_"),
                def: selected.defaultValue,
                text: (_f = selected.additionalText) == null ? void 0 : _f.replace(/cyan_/g, colors.cyan).replace(/green_/g, colors.green).replace(/_end/g, colors.zero)
              });
              if (input != "") {
                settings[+menu - 1].settings[+item - 1].value = selected.exampleValue.replace("input_value", input).replace(
                  "launcher_name",
                  ((_g = launcher.name) == null ? void 0 : _g.replace(/ /g, "_")) || ""
                );
              } else {
                settings[+menu - 1].settings[+item - 1].value = "";
              }
            } else {
              if (!settings[+menu - 1].settings[+item - 1].value) {
                settings[+menu - 1].settings[+item - 1].value = selected.exampleValue;
              } else {
                settings[+menu - 1].settings[+item - 1].value = "";
              }
            }
          }
        }
      } while (item != "0");
    }
  }
  return settings;
};

// src/utils/launcher/launcherInit.ts
var launcherInit = async (type) => {
  var _a;
  const launcher = {
    name: "",
    info: {
      type
    }
  };
  let settings;
  let launchers;
  let launcher_settings = [];
  switch (type) {
    case "wine":
    case "proton":
      launcher.info.prefix = await generalSelector({
        type: "prefixes",
        subType: type
      });
      launcher.info.runner = await generalSelector({
        type: "runners",
        subType: type
      });
      launcher.info.exec = await getExecutable({
        location: await generalInput({
          qstring: "Enter " + chalk6.cyan("path") + " to the " + chalk6.green("app") + " folder or " + chalk6.cyan("full path") + " to the " + chalk6.green("executable") + " file",
          hfile: "exec_paths"
        }),
        ext: ["exe"]
      });
      launcher.name = await generalInput({
        qstring: "Enter " + chalk6.cyan("name") + " of the " + chalk6.green("launcher"),
        hfile: "launcher_names",
        def: path2.basename(launcher.info.exec, ".exe")
      });
      break;
    case "linux":
      launcher.info.exec = await getExecutable({
        location: await generalInput({
          qstring: "Enter " + chalk6.cyan("path") + " to the " + chalk6.green("app") + " folder or " + chalk6.cyan("full path") + " to the " + chalk6.green("executable") + " file",
          hfile: "exec_paths"
        })
      });
      launcher.name = await generalInput({
        qstring: "Enter " + chalk6.cyan("name") + " of the " + chalk6.green("launcher"),
        hfile: "launcher_names",
        def: path2.basename(launcher.info.exec)
      });
      break;
    case "legendary":
      switch (await listSelector({
        name: "Runner Type",
        items: ["Wine", "Proton"]
      })) {
        case "1":
          launcher.info.prefix = await generalSelector({
            type: "prefixes",
            subType: type
          });
          launcher.info.runner = await generalSelector({
            type: "runners",
            subType: type
          });
          launcher.info.runnerType = "wine";
          launcher.info.userPath = "/drive_c/users";
          break;
        case "2":
          launcher.info.prefix = await generalSelector({
            type: "prefixes",
            subType: type
          });
          launcher.info.runner = await generalSelector({
            type: "runners",
            subType: type
          });
          launcher.info.runnerType = "proton";
          launcher.info.userPath = "/pfx/drive_c/users";
      }
      const egsApp = await getLegendaryList({
        type: "installed",
        isFull: true
      });
      launcher.name = egsApp.name;
      launcher.info.id = egsApp.id;
      if (!!launcher.info.prefix && !!launcher.info.userPath && fs6.existsSync(
        launcher.info.prefix + launcher.info.userPath + "/steamuser"
      ) && launcher.info.runnerType == "wine") {
        const users = [os4.userInfo().username, "steamuser"];
        launcher.info.userPath = launcher.info.userPath + "/" + users[+await listSelector({
          name: "User name for cloud saves",
          items: users
        }) - 1];
      } else if (launcher.info.runnerType == "proton") {
        launcher.info.userPath = launcher.info.userPath + "/steamuser";
      } else {
        launcher.info.userPath = launcher.info.userPath + "/" + os4.userInfo().username;
      }
      const egsUserInfo = fs6.readJsonSync(
        os4.homedir + "/.config/legendary/user.json"
      );
      let egsAppInfo = await $5`legendary info ${launcher.info.id} --json`;
      let egsEosInfo = await $5`legendary eos-overlay info`;
      if (!egsEosInfo.stderr.includes("No Legendary-managed installation found")) {
        switch (await generalInput({
          qstring: "Install " + chalk6.green("EOS-Overlay") + "? " + chalk6.cyan("y|N")
        })) {
          case "y":
          case "Y":
            launcher.info.runnerType == "wine" ? await verboseBash(
              `legendary eos-overlay enable --prefix "${launcher.info.prefix}"`
            ) : await verboseBash(
              `legendary eos-overlay enable --prefix "${launcher.info.prefix}/pfx"`
            );
            break;
        }
      }
      egsAppInfo = JSON.parse(egsAppInfo.stdout);
      if (egsAppInfo.game.cloud_saves_supported == true) {
        launcher.info.savePath = egsAppInfo.game.cloud_save_folder.replace(
          "{AppData}",
          launcher.info.prefix + launcher.info.userPath + "/AppData/Local"
        ).replace(
          "{UserSavedGames}",
          launcher.info.prefix + launcher.info.userPath + "/Saved Games"
        ).replace(
          "{UserDir}",
          launcher.info.prefix + launcher.info.userPath + "/Documents"
        ).replace("{InstallDir}", (_a = egsAppInfo.install) == null ? void 0 : _a.install_path).replace("{EpicID}", egsUserInfo.account_id);
      }
      break;
    case "retroarch":
      const retroarchNative = await $5`echo $(command -v retroarch)`;
      const retroarchFlatpak = await $5`echo $(command -v org.libretro.RetroArch)`;
      const retroarchNativeExec = retroarchNative.stdout != "/n" ? retroarchNative.stdout.trim() : null;
      const retroarchFlatpakExec = retroarchFlatpak.stdout != "/n" ? retroarchFlatpak.stdout.trim() : null;
      if (retroarchNativeExec && retroarchFlatpakExec) {
        const retroarchType = await listSelector({
          name: "Retroarch executable",
          items: ["Native", "Flatpak"]
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
        qstring: "Enter " + chalk6.cyan("path") + " to the " + chalk6.green("ROM") + " (Example: " + chalk6.cyan("/folder/with/rom/ROM.extension") + ")"
      });
      launcher.name = await generalInput({
        qstring: "Enter " + chalk6.cyan("name") + " of the " + chalk6.green("launcher"),
        hfile: "launcher_names",
        def: path2.basename(launcher.info.rom)
      });
  }
  launcher.info.category = await generalInput({
    qstring: "Enter " + chalk6.cyan("category") + " of the " + chalk6.green("launcher") + " (Default: " + chalk6.cyan("General") + ")",
    hfile: "launcher_categories"
  });
  if (!launcher.info.category) {
    launcher.info.category = "General";
  }
  settings = await settingsInit({
    launcher,
    settings: fs6.readJsonSync(userPath + "/settings.json")
  });
  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value) {
        launcher_settings.push({
          name: settings[i].settings[j].name,
          value: settings[i].settings[j].value
        });
      }
    }
  }
  if (fs6.existsSync(userPath + "/launchers.json")) {
    launchers = fs6.readJsonSync(userPath + "/launchers.json");
    for (let i in launchers) {
      if (launchers[i].name == launcher.name) {
        launchers.splice(i, 1);
      }
    }
    launchers.push({
      name: launcher.name,
      info: launcher.info,
      settings: launcher_settings
    });
    fs6.outputJsonSync(userPath + "/launchers.json", launchers, {
      spaces: 2
    });
  } else {
    launchers = [
      {
        name: launcher.name,
        info: launcher.info,
        settings: launcher_settings
      }
    ];
    fs6.outputJsonSync(userPath + "/launchers.json", launchers, {
      spaces: 2
    });
  }
};

// src/utils/launcher/launcherEditor.ts
import { chalk as chalk7, fs as fs8 } from "zx";

// src/utils/launcher/getLaunchers.ts
import { fs as fs7 } from "zx";
var getLaunchers = () => {
  return fs7.readJsonSync(userPath + "/launchers.json").slice(0).filter((launcher) => !!launcher.name).sort((a, b) => {
    var _a;
    return (_a = a.name) == null ? void 0 : _a.localeCompare(b.name);
  }).sort((a, b) => {
    var _a;
    return (_a = a.info.category) == null ? void 0 : _a.localeCompare(b.info.category || "");
  });
};

// src/utils/launcher/launcherEditor.ts
var launcherEditor = async () => {
  var _a;
  const launchers = getLaunchers();
  const settings = fs8.readJsonSync(userPath + "/settings.json");
  let launcherSettings = [];
  let items = [];
  const selected = await generalSelector({
    type: "launchers",
    list: launchers
  });
  const index = selected.split("///")[0];
  const launcher = JSON.parse(selected.split("///")[1]);
  switch (launcher.info.type) {
    case "wine":
    case "proton":
      items = [
        "Change settings",
        "Change name",
        "Change category",
        "Change executable",
        "Change prefix and runner"
      ];
      break;
    case "linux":
      items = [
        "Change settings",
        "Change name",
        "Change category",
        "Change executable"
      ];
      break;
    case "legendary":
      items = ["Change settings", "Change name", "Change category"];
      break;
    case "retroarch":
      items = ["Change settings", "Change name", "Change category"];
      break;
  }
  switch (await listSelector({
    name: "Launcher Editor",
    items
  })) {
    case "1":
      for (let i in settings) {
        for (let j in settings[i].settings) {
          (_a = launcher.settings) == null ? void 0 : _a.forEach(
            (option) => option.name == settings[i].settings[j].name && (settings[i].settings[j].value = option.value)
          );
        }
      }
      const newSettings = await settingsInit({ launcher, settings });
      for (let i in newSettings) {
        for (let j in newSettings[i].settings) {
          if (newSettings[i].settings[j].value) {
            launcherSettings.push({
              name: settings[i].settings[j].name,
              value: settings[i].settings[j].value
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
        settings: launcherSettings
      });
      fs8.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
    case "2":
      launcher.name = await generalInput({
        qstring: "Enter " + chalk7.green("launcher") + " " + chalk7.cyan("name"),
        hfile: "launcher_names"
      });
      launchers.splice(index, 1);
      launchers.push(launcher);
      fs8.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
    case "3":
      launcher.info.category = await generalInput({
        qstring: "Enter " + chalk7.green("launcher") + " " + chalk7.cyan("category"),
        hfile: "launcher_categories"
      });
      launchers.splice(index, 1);
      launchers.push(launcher);
      fs8.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
    case "4":
      switch (launcher.info.type) {
        case "wine":
        case "proton":
          launcher.info.exec = await getExecutable({
            location: await generalInput({
              qstring: "Enter " + chalk7.green("path to the") + " " + chalk7.cyan("executable"),
              hfile: "exec_paths"
            }),
            ext: ["exe"]
          });
          break;
        case "linux":
          launcher.info.exec = await getExecutable({
            location: await generalInput({
              qstring: "Enter " + chalk7.green("path to the") + " " + chalk7.cyan("executable"),
              hfile: "exec_paths"
            })
          });
          break;
      }
      launchers.splice(index, 1);
      launchers.push(launcher);
      fs8.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
    case "5":
      launcher.info.prefix = await generalSelector({
        type: "prefixes",
        subType: launcher.info.type
      });
      launcher.info.runner = await generalSelector({
        type: "runners",
        subType: launcher.info.type
      });
      launchers.splice(index, 1);
      launchers.push(launcher);
      fs8.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
  }
};

// src/utils/launcher/launcherCommand.ts
import { fs as fs9, os as os5, path as path3 } from "zx";
var launcherCommand = (launcher) => {
  const { settings } = launcher;
  let complete = [];
  let debug = " &> /dev/null";
  let steamPath = fs9.existsSync(os5.homedir + "/.steam/steam") ? os5.homedir + "/.steam/steam" : fs9.existsSync(
    os5.homedir + "/.var/app/com.valvesoftware.Steam/.steam/steam"
  ) ? os5.homedir + "/.var/app/com.valvesoftware.Steam/.steam/steam" : "";
  let command = {
    pre: [],
    mid: [],
    post: []
  };
  let space = {
    pre: "",
    mid: "",
    post: ""
  };
  if (!!launcher.settings) {
    let gamescope;
    let strangle;
    settings == null ? void 0 : settings.forEach((option) => {
      if (option.value != "") {
        switch (option.name) {
          case "Enable virtual desktop":
            command.mid.push(option.value);
            break;
          case "Add arguments":
            command.post.push(option.value);
            break;
          case "Enable debug":
            debug = ' &> "' + logsPath + "/" + launcher.name.replace(/ /g, "_") + '.log"';
            break;
          case "Enable gamescope":
            gamescope = option.value;
            break;
          case "Enable libstrangle":
            strangle = option.value;
            break;
          default:
            command.pre.push(option.value);
        }
      }
    });
    strangle && command.pre.push(strangle);
    gamescope && command.pre.push(gamescope);
  }
  if (command.pre.length > 0) {
    space.pre = " ";
  }
  if (command.mid.length > 0) {
    space.mid = " ";
  }
  if (command.post.length > 0) {
    space.post = " ";
  }
  switch (launcher.info.type) {
    case "wine":
      complete.push('cd "' + path3.dirname(launcher.info.exec || "") + '"');
      complete.push(
        command.pre.join(" ") + space.pre + 'WINEPREFIX="' + launcher.info.prefix + '" "' + launcher.info.runner + '" ' + command.mid.join(" ") + space.mid + '"' + launcher.info.exec + '"' + space.post + command.post.join(" ") + debug
      );
      break;
    case "proton":
      complete.push('cd "' + path3.dirname(launcher.info.exec || "") + '"');
      complete.push(
        command.pre.join(" ") + space.pre + 'STEAM_COMPAT_CLIENT_INSTALL_PATH="' + steamPath + '" STEAM_COMPAT_DATA_PATH="' + launcher.info.prefix + '" "' + launcher.info.runner + '" run "' + launcher.info.exec + '"' + space.post + command.post.join(" ") + debug
      );
      break;
    case "linux":
      complete.push(
        command.pre.join(" ") + space.pre + '"' + launcher.info.exec + '"' + space.post + command.post.join(" ") + debug
      );
      break;
    case "legendary":
      if (launcher.info.savePath) {
        complete.push(
          'legendary sync-saves -y --skip-upload --save-path "' + launcher.info.savePath + '" ' + launcher.info.id + debug
        );
      }
      if (launcher.info.runnerType == "wine") {
        complete.push(
          "legendary update -y --update-only " + launcher.info.id + debug.replace(">", ">>")
        );
        complete.push(
          command.pre.join(" ") + space.pre + 'legendary launch --wine "' + launcher.info.runner + '" --wine-prefix "' + launcher.info.prefix + '" ' + launcher.info.id + space.post + command.post.join(" ") + debug.replace(">", ">>")
        );
      } else {
        complete.push(
          "legendary update -y --update-only " + launcher.info.id + debug.replace(">", ">>")
        );
        complete.push(
          'STEAM_COMPAT_CLIENT_INSTALL_PATH="' + steamPath + '" STEAM_COMPAT_DATA_PATH="' + launcher.info.prefix + '" ' + command.pre.join(" ") + space.pre + `legendary launch --no-wine --wrapper "'` + launcher.info.runner + `' run" ` + launcher.info.id + space.post + command.post.join(" ") + debug.replace(">", ">>")
        );
      }
      break;
    case "steam":
      complete.push(
        command.pre.join(" ") + space.pre + "%command%" + space.post + command.post.join(" ")
      );
      break;
    case "retroarch":
      complete.push(
        command.pre.join(" ") + space.pre + launcher.info.executable + ' --verbose -L "' + launcher.info.core + '" "' + launcher.info.rom + '"' + space.post + command.post.join(" ") + debug
      );
      break;
  }
  return complete;
};

// src/utils/launcher/launcherRunner.ts
var launcherRunner = async () => {
  let launchers = await getLaunchers();
  let launcher = await generalSelector({ type: "launchers", list: launchers });
  let commands = launcherCommand(JSON.parse(launcher.split("///")[1]));
  await verboseBash(commands.join("; "));
};

// src/utils/launcher/launcherInfo.ts
var launcherInfo = async () => {
  let launchers = getLaunchers();
  let launcher = await generalSelector({ type: "launchers", list: launchers });
  console.log(JSON.parse(launcher.split("///")[1]));
};

// src/utils/launcher/launcherRemover.ts
import { fs as fs10 } from "zx";
var launcherRemover = async () => {
  let launchers = getLaunchers();
  let launcher = await generalSelector({ type: "launchers", list: launchers });
  const launcherInfo2 = JSON.parse(launcher.split("///")[1]);
  launchers.splice(+launcher.split("///")[0], 1);
  fs10.outputJsonSync(userPath + "/launchers.json", launchers, { spaces: 2 });
  fs10.removeSync(`${appsPath}/${launcherInfo2.name}.desktop`);
  fs10.removeSync(
    `${scriptsPath}/${launcherInfo2.info.category}/${launcherInfo2.name}.sh`
  );
};

// src/utils/launcher/launcherGenerator.ts
import { cd as cd2, chalk as chalk8, fs as fs11, $ as $6 } from "zx";

// src/utils/launcher/launcherSGDB.ts
import { fetch as fetch2 } from "zx";
var steamGridDB = "https://www.steamgriddb.com/api/v2";
var fetchLaunchers = async (name) => {
  return fetch2(`${steamGridDB}/search/autocomplete/${name}`, {
    headers: { Authorization: "Bearer 4b651cdf8aaa440703430ad6c1a318fd" }
  }).then((response) => response.json()).then((response) => response);
};
var fetchLauncherIcon = async (id) => {
  return fetch2(`${steamGridDB}/icons/game/${id}`, {
    headers: { Authorization: "Bearer 4b651cdf8aaa440703430ad6c1a318fd" }
  }).then((response) => response.json()).then((response) => response);
};

// src/utils/launcher/launcherGenerator.ts
var generateScript = (launcher) => {
  const command = launcherCommand(launcher);
  fs11.ensureDirSync(scriptsPath + "/" + launcher.info.category);
  fs11.writeFileSync(
    scriptsPath + "/" + launcher.info.category + "/" + launcher.name + ".sh",
    "#!/bin/bash\n" + command.join("\n")
  );
  fs11.chmod(
    scriptsPath + "/" + launcher.info.category + "/" + launcher.name + ".sh",
    493
  );
};
var saveIcon = (path8, launcher) => {
  fs11.writeFileSync(
    `${appsPath}/${launcher.name}.desktop`,
    `[Desktop Entry]
Name=${launcher.name}
Exec="${`${scriptsPath}/${launcher.info.category}/${launcher.name}.sh`}"
Type=Application
Icon=${path8}`
  );
};
var generateDesktop = (launcher) => {
  generateScript(launcher);
  fetchLaunchers(launcher.name).then(
    (games) => fetchLauncherIcon(games.data[0].id).then((icons) => {
      cd2(iconsPath);
      icons.data.length > 0 && $6`wget ${icons.data[0].thumb} -O ${launcher.name}.ico`.then(() => {
        const iconPath = icons.data.length > 0 ? `${iconsPath}/${launcher.name}.ico` : "gamehub";
        saveIcon(iconPath, launcher);
      });
    })
  );
};
var launcherGenerator = async (type) => {
  const launchers = getLaunchers();
  const generateOption = await listSelector({
    name: "Select option:",
    items: [
      `All ${type === "icon" ? "(icons from SteamGridDB)" : ""}`,
      "Select specific launcher"
    ]
  });
  if (generateOption === "1") {
    type === "script" && fs11.emptyDirSync(scriptsPath);
    type === "icon" && fs11.emptyDirSync(iconsPath);
    type === "icon" && fs11.emptyDirSync(appsPath);
    launchers.forEach(async (launcher) => {
      type === "script" ? generateScript(launcher) : generateDesktop(launcher);
    });
  }
  if (generateOption === "2") {
    const launcher = await generalSelector({
      type: "launchers",
      list: launchers
    }).then((data) => JSON.parse(data.split("///")[1]));
    if (type === "script")
      return generateScript(launcher);
    const iconPath = await generalInput({
      qstring: "Enter " + chalk8.cyan("path") + " to the " + chalk8.green("icon file"),
      hfile: "icon_paths"
    });
    !iconPath ? generateDesktop(launcher) : saveIcon(iconPath, launcher);
  }
  console.log(
    chalk8.green(
      `${type === "script" ? "Script" : "Desktop file"}${generateOption === "1" ? "s" : ""}`
    ) + " been generated in the " + chalk8.green(type === "icon" ? appsPath : scriptsPath) + " folder"
  );
};

// src/utils/common.ts
import { exec } from "child_process";
$7.verbose = false;
var verboseBash = async (command) => {
  $7.verbose = true;
  await $7`eval ${command}`;
  $7.verbose = false;
};
var ensurePaths = async () => {
  fs12.ensureDirSync(packagesPath);
  fs12.ensureDirSync(releasesPath);
  fs12.ensureDirSync(historyPath);
  fs12.ensureDirSync(logsPath);
  fs12.ensureDirSync(protonPath);
  fs12.ensureDirSync(appsPath);
  fs12.ensureDirSync(iconsPath);
  fs12.ensureDirSync(scriptsPath);
  fs12.writeFileSync(
    `${appsPath}/HLU.desktop`,
    `[Desktop Entry]
Name=HLU
Exec=${__filename}
Type=Application
Icon=terminal
Terminal=true
Actions=Launchers;Services;

[Desktop Action Launchers]
Name=Launchers
Exec=${__filename} run

[Desktop Action Services]
Name=Services
Exec=${__filename} services`
  );
  if (!fs12.existsSync(userPath + "/settings.json") || !fs12.existsSync(userPath + "/packages.json")) {
    cd3(userPath);
    await $7`git clone https://github.com/sergeyhist/hlu-js.git`;
    fs12.copySync("hlu-js/settings.json", userPath + "/settings.json");
    fs12.copySync("hlu-js/packages.json", userPath + "/packages.json");
    fs12.removeSync("hlu-js");
  }
  if (!fs12.existsSync(userPath + "/prefixes.json")) {
    fs12.outputJsonSync(
      userPath + "/prefixes.json",
      {
        wine: [
          {
            name: "Default",
            path: os6.homedir + "/.wine"
          }
        ],
        proton: [
          {
            name: "Default",
            path: protonPath
          }
        ]
      },
      {
        spaces: 2
      }
    );
  }
  if (!fs12.existsSync(userPath + "/runners.json")) {
    fs12.outputJsonSync(
      userPath + "/runners.json",
      {
        wine: [
          {
            name: "Default",
            path: "/usr/bin/wine"
          }
        ],
        proton: []
      },
      {
        spaces: 2
      }
    );
  }
};
var getExecutable = async ({
  ext,
  location,
  title = "Executables"
}) => {
  const executables = {
    all: [],
    names: [],
    paths: []
  };
  try {
    cd3(location);
    if (ext) {
      if (ext.includes("wine")) {
        executables.names = await globby2("", {
          expandDirectories: { files: ext }
        });
        executables.paths = await globby2("", {
          absolute: true,
          expandDirectories: { files: ext }
        });
      } else {
        executables.names = await globby2("", {
          expandDirectories: { extensions: ext }
        });
        executables.paths = await globby2("", {
          absolute: true,
          expandDirectories: { extensions: ext }
        });
      }
    } else {
      executables.all = await globby2("", {
        absolute: true
      });
      for (let item of executables.all) {
        try {
          fs12.accessSync(item, fs12.constants.X_OK);
          executables.names.push(path4.basename(item));
          executables.paths.push(item);
        } catch (e) {
        }
      }
    }
    return executables.paths[+await listSelector({
      name: title,
      items: executables.names,
      descriptions: executables.paths
    }) - 1];
  } catch (e) {
    return location;
  }
};
var steamOptions = async () => {
  const launcherSettings = [];
  const launcher = { name: "Steam Game", info: { type: "steam" } };
  let settings = await settingsInit({
    launcher,
    settings: fs12.readJsonSync(userPath + "/settings.json")
  });
  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value) {
        launcherSettings.push({
          name: settings[i].settings[j].name,
          value: settings[i].settings[j].value || ""
        });
      }
    }
  }
  const command = launcherCommand({ ...launcher, settings: launcherSettings });
  const sessionType = await $7`echo $XDG_SESSION_TYPE`;
  console.log(
    "Copy & paste " + chalk9.cyan("this") + " to the " + chalk9.green("steam game") + " properties:\n" + chalk9.cyan(command)
  );
  $7`echo ${command}`;
  switch (sessionType.stdout.trim()) {
    case "wayland":
      exec(`wl-copy ${command}`, { timeout: 1e3 });
      break;
    default:
      $7`echo ${command} | xclip -sel clip`;
  }
};

// src/utils/wine/prefixCommands.ts
import { chalk as chalk10, os as os7 } from "zx";
var prefixCommands2 = async ({ type }) => {
  let prefix;
  let runner;
  let command;
  prefix = await generalSelector({ type: "prefixes", subType: type });
  runner = await generalSelector({ type: "runners", subType: type });
  command = await generalSelector({ type: "prefix commands" });
  if (command == "input value") {
    command = await generalInput({
      qstring: "Enter " + chalk10.green("custom") + " " + chalk10.cyan("command") + " (Example: " + chalk10.cyan("notepad") + ")",
      hfile: "pfxcoms"
    });
  }
  switch (type) {
    case "wine":
      await verboseBash(`WINEPREFIX="${prefix}" "${runner}" ${command}`);
      break;
    case "proton":
      await verboseBash(
        `STEAM_COMPAT_CLIENT_INSTALL_PATH="${os7.homedir}/.steam/steam" STEAM_COMPAT_DATA_PATH="${prefix}" "${runner}" run ${command}`
      );
  }
};

// src/utils/wine/prefixWinetricks.ts
import { cd as cd4, chalk as chalk11, glob, path as path5 } from "zx";
var prefixWinetricks = async ({ type }) => {
  let prefix = await generalSelector({ type: "prefixes", subType: type });
  let runner = await generalSelector({ type: "runners", subType: type });
  if (type === "proton") {
    cd4(path5.dirname(runner));
    prefix += "/pfx";
    runner = path5.dirname(runner) + "/" + await glob(["**/wine64"][0]);
  }
  const command = await generalInput({
    qstring: "Enter " + chalk11.green("winetricks") + " " + chalk11.cyan("arguments") + " (Example: " + chalk11.cyan("vcrun2019") + ") (For " + chalk11.green("gui") + " just " + chalk11.cyan('press "Enter"') + ")",
    hfile: "winetricks_args"
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

// src/utils/wine/prefixManager.ts
import { $ as $9, chalk as chalk13, fs as fs14, path as path7 } from "zx";

// src/utils/packages.ts
import { cd as cd5, chalk as chalk12, fs as fs13, path as path6, $ as $8, os as os8 } from "zx";
var gitReleases = async ({
  author,
  gitName,
  ext
}) => {
  let git_objects;
  let git_result = [];
  const response = await fetch(
    "https://api.github.com/repos/" + author + "/" + gitName + "/releases"
  );
  if (response.ok) {
    git_objects = JSON.parse(await response.text());
    for (let i = 0; i < 10 && i < git_objects.length; i++) {
      for (let item of git_objects[i].assets) {
        if (item.browser_download_url.includes("." + ext)) {
          git_result.push({
            name: item.name,
            url: item.browser_download_url
          });
        }
      }
    }
  }
  return git_result;
};
var packageInstaller = async ({ type, pack }) => {
  let packages = fs13.readJsonSync(userPath + "/packages.json");
  let release;
  let status;
  const gitBuild = async () => {
    if (packages.git[pack].delete_folders) {
      for (let item of packages.git[pack].delete_folders) {
        fs13.removeSync(item);
      }
    }
    if (packages.git[pack].build_command) {
      try {
        await verboseBash(`${packages.git[pack].build_command}`);
      } catch (error) {
        switch (await generalInput({
          qstring: "Retry " + chalk12.green("build") + "? " + chalk12.cyan("y|N")
        })) {
          case "y":
          case "Y":
            await verboseBash(`${packages.git[pack].build_command}`);
            break;
        }
      }
    }
  };
  let release_install = async () => {
    var _a, _b;
    release = await generalSelector({
      type: "git releases",
      list: await gitReleases({
        author: packages.release[pack].author,
        gitName: packages.release[pack].git_name,
        ext: packages.release[pack].extension
      })
    });
    cd5(releasesPath);
    console.log("\n" + chalk12.green("Downloading..."));
    await verboseBash(`wget ${release}`);
    if ((_a = packages.release[pack].flags) == null ? void 0 : _a.includes("archive")) {
      fs13.emptyDirSync(
        path6.basename(release, "." + packages.release[pack].extension)
      );
      console.log("\n" + chalk12.green("Extracting..."));
      await $8`tar -xf ${path6.basename(release)} -C ${path6.basename(
        release,
        "." + packages.release[pack].extension
      )} --strip-components 1`;
      fs13.removeSync(path6.basename(release));
      console.log("\n" + chalk12.green("Installing...") + "\n");
      if ((_b = packages.release[pack].flags) == null ? void 0 : _b.includes("install")) {
        for (let folder of packages.release[pack].folders) {
          folder = folder.replace("hlu_packspath", packagesPath).replace("home_dir", os8.homedir + "");
          if (fs13.existsSync(folder)) {
            folder = folder + "/" + packages.release[pack].path.replace("name", pack);
            fs13.removeSync(folder);
            fs13.copySync(
              path6.basename(release, "." + packages.release[pack].extension),
              folder
            );
            if (fs13.existsSync(folder + "/compatibilitytool.vdf")) {
              let newArray = [];
              for (let line of fs13.readFileSync(folder + "/compatibilitytool.vdf", {
                encoding: "utf-8",
                flag: "r"
              }).split("\n")) {
                let selectedLine = line;
                if (line.includes("Internal name")) {
                  selectedLine = '    "' + pack + '"';
                }
                if (line.includes('"display_name"')) {
                  selectedLine = '      "display_name" "' + pack + '"';
                }
                newArray.push(selectedLine);
              }
              fs13.writeFileSync(
                folder + "/compatibilitytool.vdf",
                newArray.join("\n")
              );
            }
          }
        }
        fs13.removeSync(
          path6.basename(release, "." + packages.release[pack].extension)
        );
      } else {
        fs13.removeSync(packages.release[pack].git_name);
        fs13.moveSync(
          path6.basename(release, "." + packages.release[pack].extension),
          packages.release[pack].git_name
        );
      }
    }
  };
  switch (type) {
    case "git":
      if (fs13.existsSync(
        packagesPath + "/" + path6.basename(packages.git[pack].url, ".git")
      )) {
        cd5(packagesPath);
        cd5(path6.basename(packages.git[pack].url, ".git"));
        $8.verbose = true;
        if (packages.git[pack].url_args) {
          status = await $8`git reset --hard; git submodule--helper update ${packages.git[pack].url_args}; git pull ${packages.git[pack].url}`;
        } else {
          status = await $8`git reset --hard; git pull ${packages.git[pack].url}`;
        }
        $8.verbose = false;
        if (status.stdout.includes("Already up to date") && packages.git[pack].build_command) {
          switch (await generalInput({
            qstring: "Rebuild " + chalk12.green("package") + " ? " + chalk12.cyan("y|N")
          })) {
            case "y":
            case "Y":
              await gitBuild();
          }
        } else {
          await gitBuild();
        }
      } else {
        cd5(packagesPath);
        if (packages.git[pack].url_args) {
          await $8`git clone ${packages.git[pack].url_args} ${packages.git[pack].url}`;
        } else {
          await $8`git clone ${packages.git[pack].url}`;
        }
        cd5(path6.basename(packages.git[pack].url, ".git"));
        await gitBuild();
      }
      break;
    case "release":
      if (fs13.existsSync(userPath + "/" + packages.release[pack].git_name)) {
        switch (await generalInput({
          qstring: "Download another " + chalk12.green("release package") + " ? " + chalk12.cyan("y|N")
        })) {
          case "y":
          case "Y":
            await release_install();
        }
      } else {
        await release_install();
      }
      break;
  }
};

// src/utils/wine/prefixManager.ts
var prefixManager = async ({ type }) => {
  let prefix;
  let runner;
  let items = [];
  let prefixes = fs14.readJsonSync(userPath + "/prefixes.json");
  switch (type) {
    case "wine":
      items = [
        "Add prefix",
        "Delete prefix",
        "Create prefix",
        "DXVK Install/Uninstall",
        "VKD3D Install/Uninstall",
        "MF Install",
        "MF-Cab Install"
      ];
      break;
    case "proton":
      items = ["Add prefix", "Delete prefix"];
      break;
  }
  switch (await listSelector({
    name: "Prefixes Manager",
    items
  })) {
    case "1":
      prefix = await generalInput({
        qstring: "Enter " + chalk13.cyan("path") + " to the " + chalk13.green("prefix"),
        hfile: "pfx_paths"
      });
      fs14.ensureDirSync(prefix);
      prefixes[type].push({
        name: await generalInput({
          qstring: "Enter " + chalk13.cyan("name") + " of the " + chalk13.green("prefix"),
          hfile: "pfx_names",
          def: path7.basename(prefix)
        }),
        path: prefix
      });
      fs14.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2
      });
      break;
    case "2":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      for (let i in prefixes[type]) {
        if (prefix == prefixes[type][i].path && prefix != "/home/hist/.wine" && prefix != protonPath) {
          prefixes[type].splice(i, 1);
        }
      }
      fs14.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2
      });
      switch (await generalInput({
        qstring: "Delete " + chalk13.green("folder") + "? " + chalk13.cyan("y|N")
      })) {
        case "y":
        case "Y":
          fs14.emptyDirSync(prefix);
          break;
      }
      break;
    case "3":
      prefix = await generalInput({
        qstring: "Enter " + chalk13.cyan("path") + " to the " + chalk13.green("prefix"),
        hfile: "pfx_paths"
      });
      prefixes[type].push({
        name: await generalInput({
          qstring: "Enter " + chalk13.cyan("name") + " of the " + chalk13.green("prefix"),
          hfile: "pfx_names",
          def: path7.basename(prefix)
        }),
        path: prefix
      });
      fs14.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2
      });
      runner = await generalSelector({ type: "runners", subType: type });
      switch (await listSelector({
        name: "Prefix Arch",
        items: ["32bit", "64bit"]
      })) {
        case "1":
          await $9`WINEARCH=win32 WINEPREFIX=${prefix} ${runner} wineboot -u`;
          break;
        case "2":
          await $9`WINEPREFIX=${prefix} ${runner} wineboot -u`;
          break;
      }
      break;
    case "4":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });
      switch (await listSelector({
        name: "DXVK Installer",
        items: ["Git master", "Release"]
      })) {
        case "1":
          await packageInstaller({ type: "git", pack: "DXVK" });
          verboseBash(
            `WINEPREFIX=${prefix}; cp ${releasesPath}/dxvk/x64/*.dll $WINEPREFIX/drive_c/windows/system32; cp ${releasesPath}/dxvk/x32/*.dll $WINEPREFIX/drive_c/windows/syswow64; ${runner}boot -u`
          );
          break;
        case "2":
          await packageInstaller({ type: "release", pack: "DXVK" });
          verboseBash(
            `WINEPREFIX=${prefix}; cp ${releasesPath}/dxvk/x64/*.dll $WINEPREFIX/drive_c/windows/system32; cp ${releasesPath}/dxvk/x32/*.dll $WINEPREFIX/drive_c/windows/syswow64; ${runner}boot -u`
          );
          break;
      }
      break;
    case "5":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });
      switch (await listSelector({
        name: "VKD3D Installer",
        items: ["Git master", "Release"]
      })) {
        case "1":
          await packageInstaller({ type: "git", pack: "VKD3D" });
          verboseBash(
            `WINEPREFIX=${prefix} PATH=${path7.dirname(
              runner
            )}:$PATH WINELOADER=${runner} ${packagesPath}/vkd3d-proton/dlls/vkd3d-proton-master/setup_vkd3d_proton.sh install`
          );
          break;
        case "2":
          await packageInstaller({ type: "release", pack: "VKD3D" });
          verboseBash(
            `WINEPREFIX=${prefix} PATH=${path7.dirname(
              runner
            )}:$PATH WINELOADER=${runner} ${releasesPath}/vkd3d-proton/setup_vkd3d_proton.sh install`
          );
          break;
      }
      break;
    case "6":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });
      await packageInstaller({ type: "git", pack: "MF" });
      verboseBash(
        `WINEPREFIX=${prefix} PATH=${path7.dirname(
          runner
        )}:$PATH WINELOADER=${runner} ${packagesPath}/mf-install/mf-install.sh uninstall`
      );
      break;
    case "7":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });
      await packageInstaller({ type: "git", pack: "MF-Cab" });
      verboseBash(
        `WINEPREFIX=${prefix} PATH=${path7.dirname(
          runner
        )}:$PATH WINELOADER=${runner} ${packagesPath}/mf-installcab/install-mf-64.sh uninstall`
      );
      break;
  }
};

// src/utils/wine/runnerManager.ts
import { chalk as chalk14, fs as fs15 } from "zx";
var runnerManager = async () => {
  let runner;
  let runners = fs15.readJsonSync(userPath + "/runners.json");
  switch (await listSelector({
    name: "Runners Manager",
    items: [
      "Add wine runner",
      "Delete wine runner",
      "Install GE-Proton",
      "Install GE-Wine"
    ]
  })) {
    case "1":
      runner = await generalInput({
        qstring: "Enter " + chalk14.cyan("path") + " to the " + chalk14.green("runner"),
        hfile: "pfx_paths"
      });
      runner = await getExecutable({ location: runner, ext: ["wine"] });
      runners.wine.push({
        name: await generalInput({
          qstring: "Enter " + chalk14.cyan("name") + " of the " + chalk14.green("runner"),
          hfile: "pfx_names"
        }),
        path: runner
      });
      fs15.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });
      break;
    case "2":
      runner = await generalSelector({ type: "runners", subType: "wine" });
      for (let i in runners.wine) {
        if (runner == runners.wine[i].path && runner != "/usr/bin/wine") {
          runners.wine.splice(i, 1);
        }
      }
      fs15.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });
      switch (await generalInput({
        qstring: "Delete " + chalk14.green("folder") + "? " + chalk14.cyan("y|N")
      })) {
        case "y":
        case "Y":
          fs15.removeSync(runner);
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
        path: packagesPath + "/GE-Wine/bin/wine"
      });
      fs15.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });
      break;
  }
};

// src/utils/updater.ts
import { cd as cd6, fs as fs16, $ as $10 } from "zx";
var updater = async () => {
  cd6(userPath);
  await $10`git clone https://github.com/sergeyhist/hlu-js.git`;
  fs16.copySync(
    userPath + "/hlu-js/settings.json",
    userPath + "/settings.json"
  );
  fs16.copySync(
    userPath + "/hlu-js/packages.json",
    userPath + "/packages.json"
  );
  fs16.removeSync(userPath + "/hlu-js");
};

// src/utils/systemd.ts
import { chalk as chalk15, $ as $11, fs as fs17 } from "zx";
var systemdController = async () => {
  let addService = async () => {
    let service = {
      name: "",
      path: "",
      type: "user"
    };
    service.name = await generalInput({
      qstring: "Enter " + chalk15.cyan("name") + " of the " + chalk15.green("service") + " (Example: " + chalk15.cyan("gdm.service") + ")",
      hfile: "service_names"
    });
    let path8 = await $11`systemctl show --user -p FragmentPath ${service.name} | tr -d '\\n'`;
    if (path8.stdout == "FragmentPath=") {
      path8 = await $11`systemctl show -p FragmentPath ${service.name} | tr -d '\\n'`;
      service.type = "root";
    } else {
      service.type = "user";
    }
    service.path = path8.stdout.split("=").pop();
    return service;
  };
  let services = [];
  let systemd_menu;
  switch (fs17.existsSync(userPath + "/services.json")) {
    case false:
      services.push(await addService());
      fs17.outputJsonSync(userPath + "/services.json", services, {
        spaces: 2
      });
    case true:
      while (systemd_menu != 0) {
        let service = 0;
        systemd_menu = await listSelector({
          name: "Systemd Controller",
          items: ["Services list", "Add Service"],
          options: ["continue"]
        });
        if (systemd_menu != 0) {
          switch (systemd_menu) {
            case "2":
              services = fs17.readJsonSync(userPath + "/services.json");
              services.push(await addService());
              fs17.outputJsonSync(userPath + "/services.json", services, {
                spaces: 2
              });
            case "1":
              while (service + 1 != 0) {
                let statuses = [];
                let status;
                services = fs17.readJsonSync(userPath + "/services.json");
                for (let item of services) {
                  if (item.type == "user") {
                    status = await $11`systemctl show --user -p ActiveState ${item.name} | tr -d '\\n'`;
                  } else {
                    status = await $11`systemctl show -p ActiveState ${item.name} | tr -d '\\n'`;
                  }
                  statuses.push(status.stdout.split("=").pop());
                }
                service = +await listSelector({
                  name: "Services List",
                  items: services.map((service2) => service2.name),
                  descriptions: services.map((service2) => service2.path),
                  values: statuses,
                  options: ["continue"]
                }) - 1;
                if (service + 1 != 0) {
                  switch (await listSelector({
                    name: services[service].name,
                    items: [
                      "Start",
                      "Stop",
                      "Restart",
                      "Enable",
                      "Disable",
                      "Status",
                      "Reset",
                      "Unlist"
                    ],
                    options: ["continue"]
                  })) {
                    case "1":
                      if (services[service].type == "user") {
                        await $11`systemctl start --user ${services[service].name}`;
                      } else {
                        await $11`systemctl start ${services[service].name}`;
                      }
                      break;
                    case "2":
                      if (services[service].type == "user") {
                        await $11`systemctl stop --user ${services[service].name}`;
                      } else {
                        await $11`systemctl stop ${services[service].name}`;
                      }
                      break;
                    case "3":
                      if (services[service].type == "user") {
                        await $11`systemctl restart --user ${services[service].name}`;
                      } else {
                        await $11`systemctl restart ${services[service].name}`;
                      }
                      break;
                    case "4":
                      if (services[service].type == "user") {
                        await $11`systemctl enable --user ${services[service].name}`;
                      } else {
                        await $11`systemctl enable ${services[service].name}`;
                      }
                      break;
                    case "5":
                      if (services[service].type == "user") {
                        await $11`systemctl disable --user ${services[service].name}`;
                      } else {
                        await $11`systemctl disable ${services[service].name}`;
                      }
                      break;
                    case "6":
                      if (services[service].type == "user") {
                        await verboseBash(
                          `systemctl status --user ${services[service].name}`
                        );
                      } else {
                        await verboseBash(
                          `systemctl status ${services[service].name}`
                        );
                      }
                      break;
                    case "7":
                      if (services[service].type == "user") {
                        await verboseBash(
                          `systemctl reset-failed --user ${services[service].name}`
                        );
                      } else {
                        await verboseBash(
                          `systemctl reset-failed ${services[service].name}`
                        );
                      }
                      break;
                    case "8":
                      services.splice(service, 1);
                      fs17.outputJsonSync(userPath + "/services.json", services, {
                        spaces: 2
                      });
                      break;
                  }
                }
              }
              break;
          }
        }
      }
  }
};

// src/hlu.mts
$12.verbose = false;
process.on("beforeExit", async () => {
  if (flags.restart == 0) {
    await scriptExit();
  }
});
process.on("uncaughtException", async (err, origin) => {
  console.log(
    "\n	" + chalk16.red("Error") + "\n" + err + "\n	" + chalk16.red("Origin") + "\n" + origin + "\n"
  );
  if (flags.restart == 0) {
    await scriptExit();
  }
});
var cwd = process.cwd();
var mainProcess = async () => {
  ensurePaths();
  if (process.argv[3] == "run") {
    return await launcherRunner();
  }
  if (process.argv[3] == "services") {
    return await systemdController();
  }
  if (fs18.existsSync(os9.homedir + "/.steam") || fs18.existsSync(os9.homedir + "/.var/app/com.valvesoftware.Steam")) {
    await steamListInit();
  }
  await retroarchListInit();
  switch (await listSelector({
    name: "Hist Linux Utilities",
    items: [
      "Launcher Controller",
      "Wine/Proton Helper",
      "Legendary Helper",
      "Systemd Controller",
      "Launch options for steam game",
      "Install Luxtorpeda",
      "Update settings and packages"
    ]
  })) {
    case "1":
      switch (await listSelector({
        name: "Launcher Controller",
        items: [
          "Create launcher",
          "Edit launcher",
          "Run launcher",
          "Delete launcher",
          "Generate bash scripts",
          "Generate desktop files",
          "Display information"
        ]
      })) {
        case "1":
          switch (await listSelector({
            name: "Launcher Creator",
            items: ["Wine", "Proton", "Linux", "Legendary", "Retroarch"]
          })) {
            case "1":
              await launcherInit("wine");
              break;
            case "2":
              await launcherInit("proton");
              break;
            case "3":
              await launcherInit("linux");
              break;
            case "4":
              await launcherInit("legendary");
              break;
            case "5":
              await launcherInit("retroarch");
              break;
          }
          break;
        case "2":
          await launcherEditor();
          break;
        case "3":
          await launcherRunner();
          break;
        case "4":
          await launcherRemover();
          break;
        case "5":
          await launcherGenerator("script");
          break;
        case "6":
          await launcherGenerator("icon");
          break;
        case "7":
          await launcherInfo();
          break;
      }
      break;
    case "2":
      switch (await listSelector({
        name: "Wine/Proton Helper",
        items: [
          "Prefix commands",
          "Winetricks",
          "Prefixes manager",
          "Runners manager"
        ]
      })) {
        case "1":
          switch (await listSelector({
            name: "Prefix Type",
            items: ["Wine", "Proton"]
          })) {
            case "1":
              await prefixCommands2({ type: "wine" });
              break;
            case "2":
              await prefixCommands2({ type: "proton" });
              break;
          }
          break;
        case "2":
          switch (await listSelector({
            name: "Prefix Type",
            items: ["Wine", "Proton"]
          })) {
            case "1":
              await prefixWinetricks({ type: "wine" });
              break;
            case "2":
              await prefixWinetricks({ type: "proton" });
              break;
          }
          break;
        case "3":
          switch (await listSelector({
            name: "Prefix Type",
            items: ["Wine", "Proton"]
          })) {
            case "1":
              await prefixManager({ type: "wine" });
              break;
            case "2":
              await prefixManager({ type: "proton" });
              break;
          }
          break;
        case "4":
          await runnerManager();
          break;
      }
      break;
    case "3":
      await legendaryHelper();
      break;
    case "4":
      await systemdController();
      break;
    case "5":
      await steamOptions();
      break;
    case "6":
      await packageInstaller({ type: "release", pack: "Luxtorpeda" });
      break;
    case "7":
      await updater();
      break;
  }
  cd7(cwd);
};
mainProcess();
