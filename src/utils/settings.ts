import { chalk, fs } from "zx";
import { gpuVersion, ILauncher, ISettings } from "../model";
import { generalInput } from "./input";
import { listSelector } from "./list";

interface IInitArguments {
  launcher: ILauncher;
  settings: ISettings[];
}

export const settingsInit = async ({ launcher, settings }: IInitArguments) => {
  let menu;
  let item;
  let input;
  let selected;
  let limit;

  while (menu != "0") {
    menu = await listSelector({
      name: "Settings",
      items: settings.map((option) => option.name),
      options: ["continue"],
    });

    if (menu != 0) {
      do {
        item = await listSelector({
          name: settings[+menu - 1].name,
          items: settings[+menu - 1].settings.map((option) => option.name),
          values: settings[+menu - 1].settings.map(
            (option) => option.value || ""
          ),
          options: ["continue"],
        });

        if (item != "0") {
          limit = 0;
          selected = settings[+menu - 1].settings[+item - 1];

          if (selected.limitation?.file) {
            for (let item of selected.limitation.file) {
              if (fs.existsSync(item)) {
                limit = 1;
              }
            }
            if (limit == 0) {
              console.log(
                "\n" +
                  chalk.green(selected.limitation.file) +
                  chalk.red(" not installed!")
              );
            }
          } else if (selected.limitation?.launcher) {
            if (
              selected.limitation.launcher.includes(launcher.info.type) ||
              selected.limitation.launcher.includes(
                launcher.info.runnerType as string
              )
            ) {
              limit = 1;
            } else {
              console.log(
                "\n" +
                  "Only for " +
                  chalk.green(selected.limitation.launcher.join(","))
              );
            }
          } else if (selected.limitation?.video) {
            const gpu = await gpuVersion;

            if (
              selected.limitation.video.some((element) =>
                gpu.stdout.includes(element)
              )
            ) {
              limit = 1;
            } else {
              console.log(
                "\n" + "Only for " + chalk.green(selected.limitation.video)
              );
            }
          } else {
            limit = 1;
          }
          if (limit == 1) {
            if (selected.exampleValue?.includes("input_value")) {
              const colors = {
                cyan: "\x1B[36m",
                green: "\x1B[32m",
                zero: "\x1B[0m",
              };

              input = await generalInput({
                qstring: selected.text
                  ?.replace(/cyan_/g, colors.cyan)
                  .replace(/green_/g, colors.green)
                  .replace(/_end/g, colors.zero),
                hfile: selected.name.replace(/ /g, "_"),
                def: selected.defaultValue,
                text: selected.additionalText
                  ?.replace(/cyan_/g, colors.cyan)
                  .replace(/green_/g, colors.green)
                  .replace(/_end/g, colors.zero),
              });

              if (input != "") {
                settings[+menu - 1].settings[+item - 1].value =
                  selected.exampleValue
                    .replace("input_value", input)
                    .replace(
                      "launcher_name",
                      launcher.name?.replace(/ /g, "_") || ""
                    );
              } else {
                settings[+menu - 1].settings[+item - 1].value = "";
              }
            } else {
              if (!settings[+menu - 1].settings[+item - 1].value) {
                settings[+menu - 1].settings[+item - 1].value =
                  selected.exampleValue;
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
