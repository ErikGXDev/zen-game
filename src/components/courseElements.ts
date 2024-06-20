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
    k.circle(24),
    k.color("#494F59"),
    k.pos(x, y),
    k.area({ scale: 0.4 }),
    "hole",
  ]);

  hole.add([k.circle(20), k.color("#1D2633")]);

  return hole;
}

export { createWall, createHole };
