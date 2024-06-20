import { createBackground, createField } from "@/components/background";
import { createUIHolder, registerCameraControls } from "@/components/camera";
import {
  createGrass,
  createGround,
  createWall,
} from "@/components/courseElements";
import { createGrid } from "@/components/grid";
import k from "@/kaplay";
import { alignToGrid } from "@/util/math";
import { GameObj } from "kaplay";

k.scene("editor", () => {
  createBackground();

  const field = createField(15, 10);

  createGrid(15, 10, field);

  registerCameraControls();

  let uiHolder = createUIHolder();

  let selectedElement = "grass";

  function createPreviewElement(
    createFunc: (x: number, y: number, parent: GameObj) => GameObj | GameObj[]
  ) {
    let previewElement;

    let createdElement = createFunc(0, 0, field);

    if (Array.isArray(createdElement)) {
      previewElement = createdElement[0];
      createdElement[1].use(k.follow(previewElement));
    } else {
      previewElement = createdElement;
    }

    previewElement.onMouseMove(() => {
      let truePos = k.mousePos().sub(field.pos);
      previewElement.pos = alignToGrid(truePos);
    });

    previewElement.onMousePress(() => {
      for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (button.isHovering()) {
          return;
        }
      }

      createFunc(previewElement.pos.x, previewElement.pos.y, field);
    });

    return previewElement;
  }

  function replaceCurrentPreviewElement(
    createFunc: (x: number, y: number, parent: GameObj) => GameObj | GameObj[]
  ) {
    currPreviewElement.destroy();
    currPreviewElement = createPreviewElement(createFunc);
  }

  let currPreviewElement = createPreviewElement(createGrass);

  function updateElementButtonColors() {
    buttons.forEach((button) => {
      console.log(button.element, selectedElement);
      if (button.element === selectedElement) {
        button.color = k.rgb("#75CEE6");
      } else {
        button.color = k.rgb("#F6E8DB");
      }
    });
  }

  function createElementButton(
    x: number,
    y: number,
    parent: GameObj,
    element: string,
    createFunc: (x: number, y: number, parent: GameObj) => GameObj | GameObj[],
    iconFunc: (p: GameObj) => GameObj
  ) {
    let button = parent.add([
      k.rect(64, 64, { radius: 4 }),
      k.pos(x, y),
      k.opacity(0.5),
      k.area(),
      k.color("#F6E8DB"),
      "elementButton",
      {
        element,
        createFunc,
      },
    ]);

    iconFunc(button);

    button.onClick(() => {
      console.log("Clicked", element);
      selectedElement = element;
      updateElementButtonColors();
      replaceCurrentPreviewElement(createFunc);
    });

    return button;
  }

  let buttons: GameObj[] = [
    createElementButton(10, 10, uiHolder, "grass", createGrass, (p) =>
      p.add([k.sprite("grass"), k.pos(8, 8), k.scale(0.75)])
    ),
    createElementButton(10, 86, uiHolder, "wall", createWall, (p) => {
      let wall = createWall(8, 8, p);
      wall.use(k.scale(0.75));
      return wall;
    }),
    createElementButton(10, 162, uiHolder, "ground", createGround, (p) => {
      let ground = p.add([k.circle(24), k.color(122, 161, 131), k.pos(32, 32)]);
      ground.add([k.circle(20), k.color(139, 189, 150), k.pos(0, 0)]);
      return ground;
    }),
  ];
});
