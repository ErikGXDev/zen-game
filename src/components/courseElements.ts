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

function createGrass(x: number, y: number, parent: GameObj) {
  const grass = parent.add([k.sprite("grass"), k.pos(x, y)]);

  return grass;
}

function createGround(
  x: number,
  y: number,
  parent: GameObj,
  size: number = 64
) {
  let r1 = k.rand(-10, 10);
  let r2 = k.rand(-10, 10);

  parent.add([
    k.circle(64),
    k.color(139, 189, 150),
    k.pos(x + size / 2 + r1, y + size / 2 + r2),
    k.z(-10),
  ]);

  parent.add([
    k.circle(72),
    k.color(122, 161, 131),
    k.pos(x + size / 2 + r1, y + size / 2 + r2),
    k.z(-11),
  ]);
}

export { createWall, createHole, createGround, createGrass };
