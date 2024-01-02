import { $, chalk, fs, question } from "zx";
import { historyPath } from "../model";

interface arguments {
  qstring: string;
  hfile?: string;
  def?: string;
  text?: string;
}

export const generalInput = async ({
  qstring,
  hfile,
  def,
  text,
}: arguments) => {
  const choices: string[] = [];
  let historyString = "";

  if (def) {
    choices.push(def);
  }

  if (hfile) {
    if (
      fs.existsSync(historyPath + "/" + hfile) &&
      fs.statSync(historyPath + "/" + hfile).size != 0
    ) {
      for (let item of fs
        .readFileSync(historyPath + "/" + hfile, {
          encoding: "utf8",
          flag: "r",
        })
        .split("\n")) {
        choices.push(item);
      }
    } else {
      await $`touch ${historyPath}/${hfile}`;
    }
    if (choices.length) {
      historyString =
        ' (press "' +
        chalk.cyan("Tab") +
        '" for ' +
        chalk.green("history") +
        " or " +
        chalk.green("default") +
        ")";
    }
  }

  if (text) {
    console.log(text);
  }

  let answer = await question(qstring + historyString + ": ", {
    choices: choices,
  });

  if (hfile) {
    if (answer != def) {
      if (fs.statSync(historyPath + "/" + hfile).size != 0) {
        if (!choices.includes(answer)) {
          fs.appendFileSync(historyPath + "/" + hfile, "\n" + answer);
        }
      } else {
        fs.appendFileSync(historyPath + "/" + hfile, answer);
      }
    }
  }

  return answer;
};
