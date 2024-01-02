import { fs, os, path } from "zx";
import { ILauncher, logsPath } from "../../model";

export const launcherCommand = (launcher: ILauncher) => {
  const { settings } = launcher;

  let complete = [];
  let debug = " &> /dev/null";

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

  let space = {
    pre: "",
    mid: "",
    post: "",
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
      complete.push('cd "' + path.dirname(launcher.info.exec || '') + '"');
      complete.push(
        command.pre.join(" ") +
          space.pre +
          'WINEPREFIX="' +
          launcher.info.prefix +
          '" "' +
          launcher.info.runner +
          '" ' +
          command.mid.join(" ") +
          space.mid +
          '"' +
          launcher.info.exec +
          '"' +
          space.post +
          command.post.join(" ") +
          debug
      );
      break;
    case "proton":
      complete.push('cd "' + path.dirname(launcher.info.exec || '') + '"');
      complete.push(
        command.pre.join(" ") +
          space.pre +
          'STEAM_COMPAT_CLIENT_INSTALL_PATH="' +
          steamPath +
          '" STEAM_COMPAT_DATA_PATH="' +
          launcher.info.prefix +
          '" "' +
          launcher.info.runner +
          '" run "' +
          launcher.info.exec +
          '"' +
          space.post +
          command.post.join(" ") +
          debug
      );
      break;
    case "linux":
      complete.push(
        command.pre.join(" ") +
          space.pre +
          '"' +
          launcher.info.exec +
          '"' +
          space.post +
          command.post.join(" ") +
          debug
      );
      break;
    case "legendary":
      if (launcher.info.savePath) {
        complete.push(
          'legendary sync-saves -y --skip-upload --save-path "' +
            launcher.info.savePath +
            '" ' +
            launcher.info.id +
            debug
        );
      }
      if (launcher.info.runnerType == "wine") {
        complete.push(
          "legendary update -y --update-only " +
            launcher.info.id +
            debug.replace(">", ">>")
        );
        complete.push(
          command.pre.join(" ") +
            space.pre +
            'legendary launch --wine "' +
            launcher.info.runner +
            '" --wine-prefix "' +
            launcher.info.prefix +
            '" ' +
            launcher.info.id +
            space.post +
            command.post.join(" ") +
            debug.replace(">", ">>")
        );
      } else {
        complete.push(
          "legendary update -y --update-only " +
            launcher.info.id +
            debug.replace(">", ">>")
        );
        complete.push(
          'STEAM_COMPAT_CLIENT_INSTALL_PATH="' +
            steamPath +
            '" STEAM_COMPAT_DATA_PATH="' +
            launcher.info.prefix +
            '" ' +
            command.pre.join(" ") +
            space.pre +
            'legendary launch --no-wine --wrapper "' +
            "'" +
            launcher.info.runner +
            "' run\" " +
            launcher.info.id +
            space.post +
            command.post.join(" ") +
            debug.replace(">", ">>")
        );
      }
      break;
    case "steam":
      complete.push(
        command.pre.join(" ") +
          space.pre +
          "%command%" +
          space.post +
          command.post.join(" ")
      );
      break;
    case "retroarch":
      complete.push(
        command.pre.join(" ") +
          space.pre +
          launcher.info.executable +
          ' --verbose -L "' +
          launcher.info.core +
          '"' +
          ' "' +
          launcher.info.rom +
          '"' +
          space.post +
          command.post.join(" ") +
          debug
      );
      break;
  }

  return complete;
};
