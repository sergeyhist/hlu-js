import { $, chalk, fs, path } from "zx";
import { packagesPath, protonPath, releasesPath, userPath } from "../../model";
import { verboseBash } from "../common";
import { generalInput } from "../input";
import { listSelector } from "../list";
import { packageInstaller } from "../packages";
import { generalSelector } from "../selector";

interface IArguments {
  type: string;
}

export const prefixManager = async ({ type }: IArguments) => {
  let prefix;
  let runner;
  let items: string[] = [];
  let prefixes = fs.readJsonSync(userPath + "/prefixes.json");

  switch (type) {
    case "wine":
      items = [
        "Add prefix",
        "Delete prefix",
        "Create prefix",
        "DXVK Install/Uninstall",
        "VKD3D Install/Uninstall",
        "MF Install",
        "MF-Cab Install",
      ];
      break;
    case "proton":
      items = ["Add prefix", "Delete prefix"];
      break;
  }
  switch (
    await listSelector({
      name: "Prefixes Manager",
      items: items,
    })
  ) {
    case "1":
      prefix = await generalInput({
        qstring:
          "Enter " + chalk.cyan("path") + " to the " + chalk.green("prefix"),
        hfile: "pfx_paths",
      });
      fs.ensureDirSync(prefix);
      prefixes[type].push({
        name: await generalInput({
          qstring:
            "Enter " + chalk.cyan("name") + " of the " + chalk.green("prefix"),
          hfile: "pfx_names",
          def: path.basename(prefix),
        }),
        path: prefix,
      });
      fs.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2,
      });
      break;
    case "2":
      prefix = await generalSelector({ type: "prefixes", subType: type });

      for (let i in prefixes[type]) {
        if (
          prefix == prefixes[type][i].path &&
          prefix != "/home/hist/.wine" &&
          prefix != protonPath
        ) {
          prefixes[type].splice(i, 1);
        }
      }
      fs.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2,
      });
      switch (
        await generalInput({
          qstring: "Delete " + chalk.green("folder") + "? " + chalk.cyan("y|N"),
        })
      ) {
        case "y":
        case "Y":
          fs.emptyDirSync(prefix);
          break;
      }
      break;
    case "3":
      prefix = await generalInput({
        qstring:
          "Enter " + chalk.cyan("path") + " to the " + chalk.green("prefix"),
        hfile: "pfx_paths",
      });

      prefixes[type].push({
        name: await generalInput({
          qstring:
            "Enter " + chalk.cyan("name") + " of the " + chalk.green("prefix"),
          hfile: "pfx_names",
          def: path.basename(prefix),
        }),
        path: prefix,
      });
      fs.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2,
      });

      runner = await generalSelector({ type: "runners", subType: type });

      switch (
        await listSelector({
          name: "Prefix Arch",
          items: ["32bit", "64bit"],
        })
      ) {
        case "1":
          await $`WINEARCH=win32 WINEPREFIX=${prefix} ${runner} wineboot -u`;
          break;
        case "2":
          await $`WINEPREFIX=${prefix} ${runner} wineboot -u`;
          break;
      }
      break;
    case "4":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });

      switch (
        await listSelector({
          name: "DXVK Installer",
          items: ["Git master", "Release"],
        })
      ) {
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

      switch (
        await listSelector({
          name: "VKD3D Installer",
          items: ["Git master", "Release"],
        })
      ) {
        case "1":
          await packageInstaller({ type: "git", pack: "VKD3D" });

          verboseBash(
            `WINEPREFIX=${prefix} PATH=${path.dirname(
              runner
            )}:$PATH WINELOADER=${runner} ${packagesPath}/vkd3d-proton/dlls/vkd3d-proton-master/setup_vkd3d_proton.sh install`
          );
          break;
        case "2":
          await packageInstaller({ type: "release", pack: "VKD3D" });

          verboseBash(
            `WINEPREFIX=${prefix} PATH=${path.dirname(
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
        `WINEPREFIX=${prefix} PATH=${path.dirname(
          runner
        )}:$PATH WINELOADER=${runner} ${packagesPath}/mf-install/mf-install.sh uninstall`
      );
      break;
    case "7":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });

      await packageInstaller({ type: "git", pack: "MF-Cab" });

      verboseBash(
        `WINEPREFIX=${prefix} PATH=${path.dirname(
          runner
        )}:$PATH WINELOADER=${runner} ${packagesPath}/mf-installcab/install-mf-64.sh uninstall`
      );
      break;
  }
};
