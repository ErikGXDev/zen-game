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
    k.layer("player"),
    k.scale(1),
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
  ]);

  arrows.play("0");

  player.onMouseDown(() => {
    if (player.isHovering() && player.state === "idle") {
      player.enterState("dragging");
    }
  });

  player.onMouseRelease(() => {
    console.log(player.state);
    if (player.state === "dragging") {
      arrows.play("0");

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
    // This loop is running at about 40 fps
    // I didnt use onUpdate because it runs at 60/144 fps
    // kaplay does not have a way to change the update rate
    loop = k.loop(0.025, () => {
      player.moveBy(player.velocity);

      player.velocity = player.velocity.scale(0.95);

      if (getMagnitute(player.velocity) < 0.4) {
        console.log("Stopped rolling");
        player.enterState("idle");
        player.velocity = k.vec2(0, 0);
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

  player.onCollide("wall", (wall, col) => {
    console.log("Collided with wall");

    player.resolveCollision(wall);

    if (!col) return;

    if (col.isBottom() || col.isTop()) {
      player.velocity = k.vec2(player.velocity.x, -player.velocity.y);
    } else if (col.isLeft() || col.isRight()) {
      player.velocity = k.vec2(-player.velocity.x, player.velocity.y);
    }
  });

  player.onCollide("hole", (hole) => {
    let magnitude = getMagnitute(player.velocity);

    // Stop player from moving
    stopLoop();
    player.velocity = k.vec2(0, 0);

    player.enterState("finished");

    finishAnimation(hole, magnitude);
  });

  async function finishAnimation(hole: GameObj, magnitude: number) {
    await k.tween(
      player.pos,
      hole.pos,
      0.75,
      (p) => (player.pos = p),
      k.easings.easeOutElastic
    );
    await k.wait(0.5);
    await k.tween(
      player.scale,
      k.vec2(0, 0),
      1,
      (p) => (player.scale = p),
      k.easings.easeInBounce
    );
  }
}

export { createPlayer };
