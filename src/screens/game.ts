import { createBackground } from "@/components/background";
import k from "@/kaplay";

k.scene("game", () => {
  createBackground();
  createGrid(15, 10);

  //registerCameraControls();
  console.log("Game Loaded!");
});

let size = 64;

function createGrid(w: number, h: number) {
  const gridHolder = k.add([
    k.pos(k.width() / 2 - (w * size) / 2, k.height() / 2 - (h * size) / 2),
  ]);

  for (let i = 1; i < w; i++) {
    gridHolder.add([
      k.rect(1, h * size),
      k.pos(i * size, 0),
      k.color(43, 49, 63),
      k.opacity(0.2),
    ]);
  }

  for (let j = 1; j < h; j++) {
    gridHolder.add([
      k.rect(w * size, 1),
      k.pos(0, j * size),
      k.color(43, 49, 63),
      k.opacity(0.2),
    ]);
  }

  function addGridDeco(xw: number, yh: number) {
    let r1 = k.rand(-10, 10);
    let r2 = k.rand(-10, 10);

    gridHolder.add([
      k.circle(64),
      k.color(139, 189, 150),
      k.pos(xw * size + size / 2 + r1, yh * size + size / 2 + r2),
      k.z(-10),
    ]);

    gridHolder.add([
      k.circle(72),
      k.color(122, 161, 131),
      k.pos(xw * size + size / 2 + r1, yh * size + size / 2 + r2),
      k.z(-11),
    ]);
  }

  for (let i = 0; i < w; i++) {
    addGridDeco(i, 0);
    addGridDeco(i, h - 1);
  }

  for (let i = 1; i < h - 1; i++) {
    addGridDeco(0, i);
    addGridDeco(w - 1, i);
  }

  gridHolder.add([
    k.rect(w * size, h * size),
    k.color(139, 189, 150),
    k.z(-10),
  ]);

  let length = size * w;
}

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
