import { chalk, fs, os, question, $, globby, path, cd } from "zx";
import {
  protonList,
  retroarchCores,
  steamApps,
  steamBlockList,
  steamProtonList,
} from "../model";
import { scriptExit } from "./exit";

interface ISelectorArguments {
  name: string;
  items: string[];
  descriptions?: string[];
  values?: string[];
  options?: string[];
}

export const listSelector = async ({
  items,
  name,
  descriptions,
  values,
  options,
}: ISelectorArguments) => {
  const listOutput = ["\n" + chalk.bold.magenta(name) + "\n"];
  const listDescriptions =
    descriptions?.map((description) => " - " + chalk.blue(description)) || [];
  const listValues =
    values?.map((value) => " - (" + chalk.cyan(value) + ")") || [];

  items.forEach((item, index) =>
    listOutput.push(
      " " +
        chalk.cyan(index + 1) +
        (listValues[index] || "") +
        " - " +
        chalk.green(item) +
        (listDescriptions[index] || "")
    )
  );

  while (true) {
    listOutput.forEach((element) => console.log(element));

    let answer = await question(
      "\nChoose " +
        chalk.cyan("item") +
        " from the " +
        chalk.green("list") +
        " above (" +
        chalk.cyan("q|Q") +
        " for " +
        chalk.green("exit") +
        "): "
    );

    switch (answer) {
      case "q":
      case "Q":
        if (options?.includes("continue")) {
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

export const steamListInit = async () => {
  const libraries: string[] = [];
  const appmanifests: string[] = [];

  const paths = [
    os.homedir + "/.steam/",
    os.homedir + "/.var/app/com.valvesoftware.Steam/.steam/",
  ];

  for (let path of paths) {
    if (fs.existsSync(path)) {
      let temp =
        await $`echo $(grep path ${path}root/steamapps/libraryfolders.vdf | cut -d'"' -f4) | tr -d '\n'`;

      for (let item of temp.stdout.split(" ")) {
        libraries.push(item);
      }

      for (let item of libraries) {
        if (fs.existsSync(item)) {
          for (let item2 of await globby(item, {
            expandDirectories: { files: ["appmanifest_*"] },
            deep: 2,
          })) {
            !appmanifests.includes(item2) && appmanifests.push(item2);
          }
        }
      }
    }
  }

  for (let item of appmanifests) {
    const appid =
      await $`echo $(grep '"appid"' ${item} | cut -d'"' -f4) | tr -d '\n'`;

    const nameOutput =
      await $`echo $(grep '"name"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    const name = nameOutput.stdout.replace(" \\", "");

    const installPath =
      await $`echo $(grep '"installdir"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    const dirname = await $`dirname ${item} | tr -d '\n'`;

    if (steamBlockList.includes(appid.stdout)) {
      steamApps.blockList.push({
        name: name,
        appId: appid.stdout,
      });
    } else if (steamProtonList.includes(appid.stdout)) {
      steamApps.protonBuilds.push({
        name: name,
        appId: appid.stdout,
        path: dirname.stdout + "/common/" + installPath.stdout + "/proton",
      });
    } else {
      if (
        fs.existsSync(dirname.stdout + "/compatdata/" + appid.stdout + "/pfx")
      ) {
        steamApps.wine.push({
          name: name,
          appId: appid.stdout,
          path: dirname.stdout + "/common/" + installPath.stdout,
          prefix: dirname.stdout + "/compatdata/" + appid.stdout,
        });
      } else {
        steamApps.native.push({
          name: name,
          appId: appid.stdout,
          path: dirname.stdout + "/common/" + installPath.stdout,
        });
      }
    }
  }

  if (fs.existsSync("/usr/share/steam/compatibilitytools.d/")) {
    const tools: string[] = await globby(
      "/usr/share/steam/compatibilitytools.d/",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2,
      }
    );

    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: path.basename(path.dirname(tool)),
        path: tool,
      });
    }
  }

  if (fs.existsSync(os.homedir + "/.steam/root/compatibilitytools.d")) {
    const tools = await globby(
      os.homedir + "/.steam/root/compatibilitytools.d",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2,
      }
    );

    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: path.basename(path.dirname(tool)),
        path: tool,
      });
    }
  }

  if (
    fs.existsSync(
      os.homedir +
        "/.var/app/com.valvesoftware.Steam/.steam/root/compatibilitytools.d"
    )
  ) {
    const tools = await globby(
      os.homedir +
        "/.var/app/com.valvesoftware.Steam/.steam/root/compatibilitytools.d",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2,
      }
    );

    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: path.basename(path.dirname(tool)),
        path: tool,
      });
    }
  }

  for (let app of steamApps.wine) {
    !!app.prefix &&
      protonList.prefixes?.push({
        name: app.name,
        path: app.prefix,
      });
  }

  for (let app of steamApps.protonBuilds) {
    !!app.path &&
      protonList.runners?.push({
        name: app.name,
        path: app.path,
      });
  }
};

export const retroarchListInit = async () => {
  const cwd = process.cwd();
  let coreName;

  const getName = (infoPath: string) => {
    if (fs.existsSync(infoPath)) {
      for (let line of fs
        .readFileSync(infoPath, { encoding: "utf-8" })
        .split("\\n")) {
        if (line.includes("display_name")) {
          return line.split('"')[1];
        }
      }
    } else {
      return path.basename(infoPath, ".info");
    }
  };

  const coresInit = async (coresPath: string, infoPath?: string) => {
    if (fs.existsSync(coresPath)) {
      cd(coresPath);

      const cores = await globby(coresPath, {
        expandDirectories: { extensions: ["so"] },
        absolute: true,
      });

      cores?.forEach((item) => {
        if (infoPath) {
          coreName = getName(
            item.replace(coresPath, infoPath).replace(".so", ".info")
          );
        } else {
          coreName = getName(item.replace(".so", ".info"));
        }

        !!coreName &&
          retroarchCores.push({
            name: coreName,
            path: item,
          });
      });
    }
  };

  await coresInit(os.homedir + "/.config/retroarch/cores");
  await coresInit(
    os.homedir + "/.var/app/org.libretro.RetroArch/config/retroarch/cores",
    "/var/lib/flatpak/app/org.libretro.RetroArch/current/19bc2de02efb8da5e2bea76f858cce45b1b20b11a2e134c462f22db0eba59d4f/files/share/libretro/info"
  );
  await coresInit("/usr/lib/libretro", "/usr/share/libretro/info");

  cd(cwd);
};
