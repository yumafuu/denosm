import {
  colors,
  tty,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/mod.ts";

export const hideCursor = () => {
  tty.cursorHide();
};

export const eraseScreen = () => {
  tty
    .cursorTo(0, 0)
    .eraseScreen();
};

export const resetScreen = () => {
  tty
    .cursorShow();
};

export const render = (
  list: { item: string }[],
  query: string,
  index: number,
) => {
  eraseScreen();

  console.log(`? ${query}`);
  let result = "";
  for (let i = 0; i < list.length; i++) {
    const value = list[i].item;
    let highlighted = "";

    for (let i = 0; i < value.length; i++) {
      const s = value[i];
      if (query.includes(s)) {
        highlighted += colors.bold.blue(s);
      } else {
        highlighted += s;
      }
    }

    const line = `${i === index ? ">" : " "} ${highlighted}`;
    result += line + "\n";
  }

  console.log(result);
};
