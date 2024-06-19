import k from "@/kaplay";

function createBackground() {
  const bg = k.add([
    k.rect(k.width() + 20, k.height() + 20),
    k.pos(0, 0),
    k.color(43, 49, 63),
  ]);
  bg.onUpdate(() => {
    let c = k.camPos();
    bg.pos.x = c.x - k.width() / 2 - 10;
    bg.pos.y = c.y - k.height() / 2 - 10;
  });
  return bg;
}

let size = 64;

function createField(w: number, h: number) {
  const playField = k.add([
    k.pos(k.width() / 2 - (w * size) / 2, k.height() / 2 - (h * size) / 2),
  ]);

  for (let i = 1; i < w; i++) {
    playField.add([
      k.rect(1, h * size),
      k.pos(i * size, 0),
      k.color(43, 49, 63),
      k.opacity(0.2),
    ]);
  }

  for (let j = 1; j < h; j++) {
    playField.add([
      k.rect(w * size, 1),
      k.pos(0, j * size),
      k.color(43, 49, 63),
      k.opacity(0.2),
    ]);
  }

  function addGridDeco(xw: number, yh: number) {
    let r1 = k.rand(-10, 10);
    let r2 = k.rand(-10, 10);

    playField.add([
      k.circle(64),
      k.color(139, 189, 150),
      k.pos(xw * size + size / 2 + r1, yh * size + size / 2 + r2),
      k.z(-10),
    ]);

    playField.add([
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

  playField.add([k.rect(w * size, h * size), k.color(139, 189, 150), k.z(-10)]);

  return playField;
}

export { createBackground, createField };
