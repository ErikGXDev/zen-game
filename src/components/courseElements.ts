import k from "@/kaplay";
import { GameObj } from "kaplay";

function createWall(x: number, y: number, parent: GameObj) {
  const wall = parent.add([
    k.rect(64, 64),
    k.color("#1D2633"),
    k.pos(x, y),
    k.area(),
    k.body({ isStatic: true }),
    "wall",
  ]);

  wall.add([k.rect(48, 48), k.color("#2B313F"), k.pos(8, 8)]);

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
  /* 
  // KAPLAY, WHYY
  // WHAT THE HELL
  // WHY IS THIS SO HARD

  const cS = parent.add([k.pos(x, y), k.z(-10)]);

  cS.add([
    k.circle(64),
    k.color(139, 189, 150),
    k.pos(size / 2, size / 2),
    k.z(-10),
  ]);

  const cB = parent.add([k.pos(x, y), k.z(-11)]);

  cB.add([
    k.circle(72),
    k.color(122, 161, 131),
    k.pos(size / 2, size / 2),
    k.z(-11),
  ]);

  return [cS, cB];

  */

  const ground = k.add([k.pos(x, y), k.z(-8)]);

  ground.add([
    k.circle(64),
    k.color(139, 189, 150),
    k.pos(size / 2, size / 2),
    k.z(-10),
  ]);
  ground.add([
    k.circle(72),
    k.color(122, 161, 131),
    k.pos(size / 2, size / 2),
    k.z(-11),
  ]);

  return ground;
}

export { createWall, createHole, createGround, createGrass };
