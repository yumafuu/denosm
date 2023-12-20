import { tty } from "cliffy/ansi/tty.ts";

export const eraseScreen = () => {
  tty
    .cursorHide
    .cursorTo(0, 0)
    .eraseScreen();
};

export const render = (list, query, index) => {
  eraseScreen();

  console.log(`? ${query}`);
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const line = `${i === index ? ">" : " "} ${item.item}`;
    console.log(line);
  }
};
