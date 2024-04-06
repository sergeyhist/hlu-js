import { fs, os, path } from "zx";
import { ILauncher, logsPath } from "../../model";

export const launcherCommand = (launcher: ILauncher) => {
  const { settings } = launcher;

  let complete = [];
  let debug = "&> /dev/null";

  let steamPath = fs.existsSync(os.homedir + "/.steam/steam")
    ? os.homedir + "/.steam/steam"
    : fs.existsSync(
        os.homedir + "/.var/app/com.valvesoftware.Steam/.steam/steam"
      )
    ? os.homedir + "/.var/app/com.valvesoftware.Steam/.steam/steam"
    : "";

  let command: { pre: string[]; mid: string[]; post: string[] } = {
    pre: [],
    mid: [],
    post: [],
  };

  if (!!launcher.settings) {
    let gamescope;
    let strangle;

    settings?.forEach((option) => {
      if (option.value != "") {
        switch (option.name) {
          case "Enable virtual desktop":
            command.mid.push(option.value);
            break;
          case "Add arguments":
            command.post.push(option.value);
            break;
          case "Enable debug":
            debug =
              ' &> "' +
              logsPath +
              "/" +
              launcher.name.replace(/ /g, "_") +
              '.log"';
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

  switch (launcher.info.type) {
    case "wine":
      complete.push(`cd \"${path.dirname(launcher.info.exec || "")}\";`);
      complete.push(`WINEPREFIX=\"${launcher.info.prefix}\"`);
      complete.push(command.pre.join(" "));
      complete.push(`\"${launcher.info.runner}\"`);
      complete.push(command.mid.join(" "));
      complete.push(`\"${launcher.info.exec}\"`);
      complete.push(command.post.join(" "));
      complete.push(debug);
      break;
    case "proton":
      complete.push(`cd \"${path.dirname(launcher.info.exec || "")}\";`);
      complete.push(`STEAM_COMPAT_CLIENT_INSTALL_PATH=\"${steamPath}\"`);
      complete.push(`STEAM_COMPAT_DATA_PATH=\"${launcher.info.prefix}\"`);
      !!command.pre?.length && complete.push(command.pre.join(" "));
      complete.push(
        `\"${launcher.info.runner}\" run \"${launcher.info.exec}\"`
      );
      !!command.post?.length && complete.push(command.post.join(" "));
      !!debug && complete.push(debug);
      break;
    case "linux":
      complete.push(command.pre.join(" "));
      complete.push(`\"${launcher.info.exec}\"`);
      complete.push(command.post.join(" "));
      complete.push(debug);
      break;
    case "legendary":
      if (launcher.info.savePath) {
        complete.push(
          `legendary sync-saves -y --skip-upload --save-path \"${launcher.info.savePath}" ${launcher.info.id}`
        );
        complete.push(debug + ";");
      }

      complete.push(
        `legendary update -y --update-only \"${launcher.info.id}\"`
      );
      complete.push(debug.replace(">", ">>") + ";");

      if (launcher.info.runnerType == "wine") {
        complete.push(command.pre.join(" "));
        complete.push(
          `legendary launch --wine \"${launcher.info.runner}\" --wine-prefix \"${launcher.info.prefix}\" ${launcher.info.id}`
        );
      } else {
        complete.push(
          `STEAM_COMPAT_CLIENT_INSTALL_PATH=\"${steamPath}\" STEAM_COMPAT_DATA_PATH=\"${launcher.info.prefix}\"`
        );
        complete.push(command.pre.join(" "));
        complete.push(
          `legendary launch --no-wine --wrapper \"${launcher.info.runner}\" run ${launcher.info.id}`
        );
      }

      complete.push(command.post.join(" "));
      complete.push(debug.replace(">", ">>"));
      break;
    case "steam":
      complete.push(command.pre.join(" "));
      complete.push("%command%");
      complete.push(command.post.join(" "));
      break;
    case "retroarch":
      complete.push(command.pre.join(" "));
      complete.push(
        `${launcher.info.executable} --verbose -L \"${launcher.info.core}\" \"${launcher.info.rom}\"`
      );
      complete.push(command.post.join(" "));
      complete.push(debug);
      break;
  }

  return complete.join(" ");
};
