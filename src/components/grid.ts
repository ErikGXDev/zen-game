import k from "@/kaplay";
import { GameObj } from "kaplay";

function createGrid(w: number, h: number, parent: GameObj, size: number = 64) {
  for (let i = 1; i < w; i++) {
    parent.add([
      k.rect(1, h * size),
      k.pos(i * size, 0),
      k.color("#858A97"),
      k.opacity(0.2),
    ]);
  }

  for (let j = 1; j < h; j++) {
    parent.add([
      k.rect(w * size, 1),
      k.pos(0, j * size),
      k.color("#858A97"),
      k.opacity(0.2),
    ]);
  }
}

export { createGrid };
