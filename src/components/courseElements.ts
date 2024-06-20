import k from "@/kaplay";
import { GameObj } from "kaplay";

function createWall(x: number, y: number, parent: GameObj) {
  const wall = parent.add([
    k.rect(64, 64),
    k.color("#2B313F"),
    k.pos(x, y),
    k.area(),
    k.body({ isStatic: true }),
    "wall",
  ]);

  return wall;
}

export { createWall };
