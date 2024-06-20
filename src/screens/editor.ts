import { createBackground, createField } from "@/components/background";
import { createUIHolder, registerCameraControls } from "@/components/camera";
import { createGrass, createWall } from "@/components/courseElements";
import { createGrid } from "@/components/grid";
import k from "@/kaplay";
import { alignToGrid } from "@/util/math";

k.scene("editor", () => {
  createBackground();

  const field = createField(15, 10);

  createGrid(15, 10, field);

  registerCameraControls();

  let uiHolder = createUIHolder();

  let selectedElement: string = "grass";

  const previewElement = createGrass(0, 0, field);

  previewElement.onMouseMove(() => {
    let truePos = k.mousePos().sub(field.pos);
    previewElement.pos = alignToGrid(truePos);
  });

  previewElement.onMousePress(() => {
    createGrass(previewElement.pos.x, previewElement.pos.y, field);
  });
});
