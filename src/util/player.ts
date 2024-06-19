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

  const arrowHolder = player.add([
    k.pos(0, 0),
    k.anchor("center"),
    k.area(),
    k.rotate(0),
  ]);

  const arrows = arrowHolder.add([k.sprite("arrow0"), k.pos(0, 32)]);

  let isDragging = false;

  player.onMouseDown(() => {
    if (player.isHovering()) {
      isDragging = true;
    }
  });

  player.onMouseRelease(() => {
    if (isDragging) {
      isDragging = false;
      player.use("rolling");
    }
  });

  player.onUpdate(() => {
    if (isDragging) {
      arrowHolder.angle = k.mousePos().angle(arrowHolder.pos) - 90;
      let dist = k.mousePos().dist(player.pos);
      if (dist > 100) {
        arrows.play("3");
      } else if (dist > 50) {
        arrows.play("2");
      } else {
        arrows.play("1");
      }
    }
  });
}

export { createPlayer };
