import { Vec2 } from "kaplay";

function getMagnitute(vel: Vec2) {
  return Math.sqrt(vel.x * vel.x + vel.y * vel.y);
}

export { getMagnitute };
