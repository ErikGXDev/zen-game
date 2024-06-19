import k from "@/kaplay";
import { GameObj } from "kaplay";

function createPlayer(x: number, y: number, parent: GameObj) {
  const player = parent.add([
    k.circle(16),
    k.color("#2B313F"),
    k.pos(x, y),
    k.area(),
    k.state("idle", ["rolling", "flying", "finished"]),
  ]);

  player.add([k.circle(10), k.color("#F6F8FB")]);

  player.onMouseDown(() => {
    if (player.isHovering()) {
    }
  });

  player.onMouseRelease(() => {});
}

export { createPlayer };
