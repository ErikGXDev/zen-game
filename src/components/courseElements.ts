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

function createHole(x: number, y: number, parent: GameObj) {
  const hole = parent.add([
    k.circle(20),
    k.color("#DA807A"),
    k.pos(x, y),
    k.area(),
    k.z(1),
    "hole",
  ]);

  hole.add([k.circle(24), k.color("#2B313F")]);

  return hole;
}

export { createWall, createHole };
