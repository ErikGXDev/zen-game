import k from "@/kaplay";
import { EventController, GameObj } from "kaplay";
import { trueMousePos } from "../util/mouse";
import { getMagnitute } from "../util/math";

function createPlayer(x: number, y: number, parent: GameObj) {
  const player = parent.add([
    k.circle(16),
    k.color("#2B313F"),
    k.pos(x, y),
    k.area(),
    k.state("idle", ["idle", "dragging", "rolling", "flying", "finished"]),
    {
      velocity: k.vec2(0, 0),
    },
  ]);

  player.add([k.circle(10), k.color("#F6F8FB")]);

  const arrowHolder = player.add([
    k.pos(0, 0),
    k.anchor("center"),
    k.rotate(0),
  ]);

  const arrows = arrowHolder.add([
    k.sprite("arrows"),
    k.anchor("bot"),
    k.pos(0, -32),
    k.opacity(0),
  ]);

  player.onMouseDown(() => {
    if (player.isHovering()) {
      player.enterState("dragging");
      arrows.opacity = 1;
    }
  });

  player.onMouseRelease(() => {
    console.log(player.state);
    if (player.state === "dragging") {
      arrows.opacity = 0;

      const velocityThreshold = 28;
      const vel = player.worldPos().sub(trueMousePos()).scale(0.2);

      let mag = getMagnitute(vel);

      let factor = Math.min(mag, velocityThreshold) / mag;

      console.log(mag, factor, k.dt());

      player.velocity = vel.scale(factor);

      player.enterState("rolling");
    }
  });

  let loop: EventController;

  function stopLoop() {
    loop.cancel();
  }

  player.onStateEnter("rolling", () => {
    loop = k.loop(0.025, () => {
      player.moveBy(player.velocity);

      player.velocity = player.velocity.scale(0.95);

      if (getMagnitute(player.velocity) < 0.4) {
        console.log("Stopped rolling");
        player.enterState("idle");
        stopLoop();
      }
    });
  });

  player.onUpdate(() => {
    if (player.state === "dragging") {
      let mousePos = trueMousePos();
      arrowHolder.angle = mousePos.angle(player.worldPos()) - 90;
      let dist = mousePos.dist(player.worldPos());
      if (dist > 100) {
        arrows.play("3");
      } else if (dist > 50) {
        arrows.play("2");
      } else {
        arrows.play("1");
      }
    }

    if (player.state === "rolling") {
    }
  });
}

export { createPlayer };
