import k from "@/kaplay";

function registerCameraControls() {
  let speed = 500;
  let target = k.add([k.pos(k.width() / 2, k.height() / 2)]);

  k.onKeyDown("a", () => {
    target.move(-speed, 0);
  });

  k.onKeyDown("d", () => {
    target.move(speed, 0);
  });

  k.onKeyDown("w", () => {
    target.move(0, -speed);
  });

  k.onKeyDown("s", () => {
    target.move(0, speed);
  });

  k.onUpdate(() => {
    k.camPos(k.lerp(k.camPos(), target.pos, 0.1));
  });
}

function createUIHolder() {
  let uiHolder = k.add([k.pos(), k.layer("ui"), k.opacity(0), k.scale(1)]);
  uiHolder.onUpdate(() => {
    uiHolder.pos = k.camPos().sub(k.width() / 2, k.height() / 2);
  });
  return uiHolder;
}

export { registerCameraControls, createUIHolder };
