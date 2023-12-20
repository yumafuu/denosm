import { tty } from "cliffy/ansi/tty.ts";

export const hideCursor = () => {
  tty.cursorHide();
}

export const eraseScreen = () => {
  tty
    .cursorTo(0, 0)
    .eraseScreen();
};

export const resetScreen = () => {
  tty
    .cursorShow()
};

export const render = (list, query, index) => {
  eraseScreen();

  console.log(`? ${query}`);
  let result = ""
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const line = `${i === index ? ">" : " "} ${item.item}`;
    result += line + "\n";
  }

  console.log(result);
};
