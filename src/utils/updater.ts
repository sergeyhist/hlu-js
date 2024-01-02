import { cd, fs, $ } from "zx";
import { userPath } from "../model";

export const updater = async () => {
  cd(userPath);

  await $`git clone https://github.com/sergeyhist/hlu-js.git`;
  fs.copySync(
    userPath + "/hlu-js/settings.json",
    userPath + "/settings.json"
  );
  fs.copySync(
    userPath + "/hlu-js/packages.json",
    userPath + "/packages.json"
  );

  fs.removeSync(userPath + "/hlu-js");
};
