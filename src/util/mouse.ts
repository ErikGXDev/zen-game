import k from "@/kaplay";

function trueMousePos() {
  return k.toWorld(k.mousePos());
}

export { trueMousePos };
