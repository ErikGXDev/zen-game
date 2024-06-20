import k from "@/kaplay";
import { Vec2 } from "kaplay";

function getMagnitute(vel: Vec2) {
  return Math.sqrt(vel.x * vel.x + vel.y * vel.y);
}

function alignToGrid(vec: Vec2, stepSize: number = 64) {
  return k.vec2(
    Math.floor(vec.x / stepSize) * stepSize,
    Math.floor(vec.y / stepSize) * stepSize
  );
}

export { getMagnitute, alignToGrid };
