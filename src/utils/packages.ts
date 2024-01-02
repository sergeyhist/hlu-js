import { cd, chalk, fs, path, $, os } from "zx";
import { packagesPath, releasesPath, userPath } from "../model";
import { verboseBash } from "./common";
import { generalInput } from "./input";
import { generalSelector } from "./selector";

interface IReleasesArguments {
  author: string;
  gitName: string;
  ext: string;
}

export const gitReleases = async ({
  author,
  gitName,
  ext,
}: IReleasesArguments) => {
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
            url: item.browser_download_url,
          });
        }
      }
    }
  }

  return git_result;
};

interface IInstallerArguments {
  type: string;
  pack: string;
}

export const packageInstaller = async ({ type, pack }: IInstallerArguments) => {
  let packages = fs.readJsonSync(userPath + "/packages.json");
  let release;
  let status;

  const gitBuild = async () => {
    if (packages.git[pack].delete_folders) {
      for (let item of packages.git[pack].delete_folders) {
        fs.removeSync(item);
      }
    }
    if (packages.git[pack].build_command) {
      try {
        await verboseBash(`${packages.git[pack].build_command}`);
      } catch (error) {
        switch (
          await generalInput({
            qstring: "Retry " + chalk.green("build") + "? " + chalk.cyan("y|N"),
          })
        ) {
          case "y":
          case "Y":
            await verboseBash(`${packages.git[pack].build_command}`);
            break;
        }
      }
    }
  };

  let release_install = async () => {
    release = await generalSelector({
      type: "git releases",
      list: await gitReleases({
        author: packages.release[pack].author,
        gitName: packages.release[pack].git_name,
        ext: packages.release[pack].extension,
      }),
    });

    cd(releasesPath);

    console.log("\n" + chalk.green("Downloading..."));

    await verboseBash(`wget ${release}`);

    if (packages.release[pack].flags?.includes("archive")) {
      fs.emptyDirSync(
        path.basename(release, "." + packages.release[pack].extension)
      );
      console.log("\n" + chalk.green("Extracting..."));
      await $`tar -xf ${path.basename(release)} -C ${path.basename(
        release,
        "." + packages.release[pack].extension
      )} --strip-components 1`;
      fs.removeSync(path.basename(release));
      console.log("\n" + chalk.green("Installing...") + "\n");
      if (packages.release[pack].flags?.includes("install")) {
        for (let folder of packages.release[pack].folders) {
          folder = folder
            .replace("hlu_packspath", packagesPath)
            .replace("home_dir", os.homedir + "");
          if (fs.existsSync(folder)) {
            folder =
              folder + "/" + packages.release[pack].path.replace("name", pack);
            fs.removeSync(folder);
            fs.copySync(
              path.basename(release, "." + packages.release[pack].extension),
              folder
            );
            if (fs.existsSync(folder + "/compatibilitytool.vdf")) {
              let newArray = [];
              for (let line of fs
                .readFileSync(folder + "/compatibilitytool.vdf", {
                  encoding: "utf-8",
                  flag: "r",
                })
                .split("\n")) {
                let selectedLine = line;
                if (line.includes("Internal name")) {
                  selectedLine = '    "' + pack + '"';
                }
                if (line.includes('"display_name"')) {
                  selectedLine = '      "display_name" "' + pack + '"';
                }
                newArray.push(selectedLine);
              }
              fs.writeFileSync(
                folder + "/compatibilitytool.vdf",
                newArray.join("\n")
              );
            }
          }
        }
        fs.removeSync(
          path.basename(release, "." + packages.release[pack].extension)
        );
      } else {
        fs.removeSync(packages.release[pack].git_name);
        fs.moveSync(
          path.basename(release, "." + packages.release[pack].extension),
          packages.release[pack].git_name
        );
      }
    }
  };

  switch (type) {
    case "git":
      if (
        fs.existsSync(
          packagesPath + "/" + path.basename(packages.git[pack].url, ".git")
        )
      ) {
        cd(packagesPath);
        cd(path.basename(packages.git[pack].url, ".git"));
        $.verbose = true;
        if (packages.git[pack].url_args) {
          status =
            await $`git reset --hard; git submodule--helper update ${packages.git[pack].url_args}; git pull ${packages.git[pack].url}`;
        } else {
          status =
            await $`git reset --hard; git pull ${packages.git[pack].url}`;
        }
        $.verbose = false;
        if (
          status.stdout.includes("Already up to date") &&
          packages.git[pack].build_command
        ) {
          switch (
            await generalInput({
              qstring:
                "Rebuild " + chalk.green("package") + " ? " + chalk.cyan("y|N"),
            })
          ) {
            case "y":
            case "Y":
              await gitBuild();
          }
        } else {
          await gitBuild();
        }
      } else {
        cd(packagesPath);

        if (packages.git[pack].url_args) {
          await $`git clone ${packages.git[pack].url_args} ${packages.git[pack].url}`;
        } else {
          await $`git clone ${packages.git[pack].url}`;
        }

        cd(path.basename(packages.git[pack].url, ".git"));

        await gitBuild();
      }
      break;
    case "release":
      if (fs.existsSync(userPath + "/" + packages.release[pack].git_name)) {
        switch (
          await generalInput({
            qstring:
              "Download another " +
              chalk.green("release package") +
              " ? " +
              chalk.cyan("y|N"),
          })
        ) {
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
