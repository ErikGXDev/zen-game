import k from "@/kaplay";

function createBackground() {
  const bg = k.add([
    k.rect(k.width(), k.height()),
    k.pos(0, 0),
    k.color(43, 49, 63),
  ]);
}

export { createBackground };
