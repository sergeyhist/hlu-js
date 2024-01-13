#!/usr/bin/env zx

import { $, cd, chalk, fs, os } from "zx";
import {
  listSelector,
  scriptExit,
  ensurePaths,
  launcherInit,
  steamListInit,
  retroarchListInit,
  launcherEditor,
  launcherRunner,
  launcherRemover,
  launcherGenerator,
  launcherInfo,
  prefixCommands,
  prefixWinetricks,
  prefixManager,
  runnerManager,
  packageInstaller,
  updater,
  steamOptions,
  systemdController,
} from "./utils";
import { flags } from "./model";
import { legendaryHelper } from "./utils/legendary";

$.verbose = false;

process.on("beforeExit", async () => {
  if (flags.restart == 0) {
    await scriptExit();
  }
});

process.on("uncaughtException", async (err, origin) => {
  console.log(
    "\n\t" +
      chalk.red("Error") +
      "\n" +
      err +
      "\n\t" +
      chalk.red("Origin") +
      "\n" +
      origin +
      "\n"
  );

  if (flags.restart == 0) {
    await scriptExit();
  }
});

const cwd = process.cwd();

const mainProcess = async () => {
  ensurePaths();

  if (process.argv[3] == "run") {
    return await launcherRunner();
  }

  if (process.argv[3] == "services") {
    return await systemdController();
  }

  if (
    fs.existsSync(os.homedir + "/.steam") ||
    fs.existsSync(os.homedir + "/.var/app/com.valvesoftware.Steam")
  ) {
    await steamListInit();
  }
  await retroarchListInit();

  switch (
    await listSelector({
      name: "Hist Linux Utilities",
      items: [
        "Launcher Controller",
        "Wine/Proton Helper",
        "Legendary Helper",
        "Systemd Controller",
        "Launch options for steam game",
        "Install Luxtorpeda",
        "Update settings and packages",
      ],
    })
  ) {
    case "1":
      switch (
        await listSelector({
          name: "Launcher Controller",
          items: [
            "Create launcher",
            "Edit launcher",
            "Run launcher",
            "Delete launcher/script/desktop file",
            "Generate bash scripts",
            "Generate desktop files",
            "Display information",
          ],
        })
      ) {
        case "1":
          switch (
            await listSelector({
              name: "Launcher Creator",
              items: ["Wine", "Proton", "Linux", "Legendary", "Retroarch"],
            })
          ) {
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
      switch (
        await listSelector({
          name: "Wine/Proton Helper",
          items: [
            "Prefix commands",
            "Winetricks",
            "Prefixes manager",
            "Runners manager",
          ],
        })
      ) {
        case "1":
          switch (
            await listSelector({
              name: "Prefix Type",
              items: ["Wine", "Proton"],
            })
          ) {
            case "1":
              await prefixCommands({ type: "wine" });
              break;
            case "2":
              await prefixCommands({ type: "proton" });
              break;
          }
          break;
        case "2":
          switch (
            await listSelector({
              name: "Prefix Type",
              items: ["Wine", "Proton"],
            })
          ) {
            case "1":
              await prefixWinetricks({ type: "wine" });
              break;
            case "2":
              await prefixWinetricks({ type: "proton" });
              break;
          }
          break;
        case "3":
          switch (
            await listSelector({
              name: "Prefix Type",
              items: ["Wine", "Proton"],
            })
          ) {
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

  cd(cwd);
};

mainProcess();
