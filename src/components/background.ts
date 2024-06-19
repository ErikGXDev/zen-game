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

export { createBackground, createGrid };
