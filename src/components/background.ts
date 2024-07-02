import k from "@/kaplay";
import { GameObj } from "kaplay";
import { createGround } from "./courseElements";

function createBackground() {
  const bg = k.add([
    k.rect(k.width() + 20, k.height() + 20),
    k.pos(0, 0),
    k.color(43, 49, 63),
    k.z(-100),
  ]);
  bg.onUpdate(() => {
    let c = k.camPos();
    bg.pos.x = c.x - k.width() / 2 - 10;
    bg.pos.y = c.y - k.height() / 2 - 10;
  });
  return bg;
}

function createField(w: number, h: number, size: number = 64) {
  const field = k.add([
    k.pos(k.width() / 2 - (w * size) / 2, k.height() / 2 - (h * size) / 2),
  ]);

  return field;
}

/*
function generateDecoField(
  w: number,
  h: number,
  parent: GameObj,
  size: number = 64
) {
  for (let i = 0; i < w; i++) {
    createGround(i * size, 0, parent);
    createGround(i * size, (h - 1) * size, parent);
  }

  for (let i = 1; i < h - 1; i++) {
    createGround(0, i * size, parent);
    createGround((w - 1) * size, i * size, parent);
  }

  parent.add([k.rect(w * size, h * size), k.color(139, 189, 150), k.z(-10)]);

  return parent;
}
*/

export { createBackground, createField };
