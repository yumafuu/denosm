import $ from "dax";
import { keypress } from "cliffy/keypress/mod.ts";
import { Fzf } from "https://esm.sh/fzf";
import { hideCursor, eraseScreen, render, resetScreen } from "../tty/index.js";
import { GetSSMParameters, ListSSMParameters } from "../ssm/index.js";

export const FuzzyFindAction = async ({ profile, query }) => {
  let list;
  const pbList = $.progress("Loading");
  await pbList.with(async () => {
    list = await ListSSMParameters(profile);
  });

  const options = list
    .Parameters
    .map((p) => p.Name)
    .filter((p) => query ? p.includes(query) : true);

  if (options.length === 1) {
    const name = options[0];
    const value = (await GetSSMParameters(profile, name)).Value;
    printResult(value);

    return
  }

  let search = "";
  const fzf = new Fzf(options);
  let currentIndex = 0;
  let hits = fzf.find(search);

  hideCursor();
  render(hits, search, currentIndex);

  for await (const event of keypress()) {
    if (event.key === "escape") {
      keypress().dispose();
      break;
    }
    if (event.key === "return") {
      keypress().dispose();
      break;
    }
    if (event.ctrlKey && event.key === "c") {
      keypress().dispose();
      break;
    }
    if (event.ctrlKey && event.key === "d") {
      keypress().dispose();
      break;
    }
    if (event.ctrlKey && event.key === "w") search = "";

    if (event.key === "backspace") search = search.slice(0, -1);
    if (!event.ctrlKey && event.key.length === 1) search += event.key;

    if (event.key === "up" || (event.ctrlKey && event.key === "k")) {
      console.log("up");
      currentIndex -= 1;
      currentIndex = currentIndex < 0 ? 0 : currentIndex;
    }
    if (event.key === "down" || (event.key === "enter")) {
      console.log("down");
      currentIndex += 1;
      currentIndex = currentIndex > hits.length - 1
        ? hits.length - 1
        : currentIndex;
    }

    hits = fzf.find(search);
    if (hits.length === 0) currentIndex = 0;
    if (currentIndex > hits.length - 1) {
      currentIndex = hits.length - 1;
    }

    currentIndex = currentIndex < 0 ? 0 : currentIndex;

    render(hits, search, currentIndex);
  }

  const selected = hits[currentIndex]
  if (!selected) {
    console.log("No parameter selected");
    return;
  }
  const name = selected.item

  resetScreen();
  let parameter;
  const pbGet = $.progress(`${name}`);
  await pbGet.with(async () => {
    parameter = await GetSSMParameters(profile, name);
  });
  const value = parameter.Value;

  printResult(value);
  return value;
};

const printResult = (value) => {
  console.log(value);
}