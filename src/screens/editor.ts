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
import { GameObj, MouseButton } from "kaplay";

k.scene("editor", () => {
  createBackground();

  const field = createField(15, 10);

  createGrid(15, 10, field);

  registerCameraControls();

  let uiHolder = createUIHolder();

  let selectedElement = "grass";

  let mouseDown = false;

  const hoveringElements: GameObj[] = [];

  function createPreviewElement(
    createFunc: (x: number, y: number, parent: GameObj) => GameObj
  ) {
    let previewElement: GameObj;

    let createdElement = createFunc(0, 0, field);

    if (Array.isArray(createdElement)) {
      previewElement = createdElement[0];
      createdElement[1].use(k.follow(previewElement));
    } else {
      previewElement = createdElement;
    }

    previewElement.use(k.opacity(0.5));
    previewElement.unuse("area");
    // @ts-ignore
    previewElement.use({ lastPos: null });

    function createNewElement() {
      for (let i = 0; i < elementButtons.length; i++) {
        let button = elementButtons[i];
        if (button.isHovering()) {
          return;
        }
      }

      if (hoveringElements.length > 0) {
        for (let i = 0; i < hoveringElements.length; i++) {
          hoveringElements[i].destroy();
        }

        hoveringElements.length = 0;
      }

      let element = createFunc(
        previewElement.pos.x,
        previewElement.pos.y,
        field
      );

      k.wait(1, () => {
        element.unuse("area");
        element.use(k.area());

        element.onHover(() => {
          hoveringElements.push(element);
          console.log(hoveringElements);
        });

        element.onHoverEnd(() => {
          hoveringElements.splice(hoveringElements.indexOf(element), 1);
          console.log(hoveringElements);
        });
      });
    }

    previewElement.onUpdate(() => {
      if (k.isMouseDown("left")) {
        mouseDown = true;
      } else {
        mouseDown = false;
      }

      let truePos = k
        .mousePos()
        .sub(field.pos)
        .add(k.camPos().sub(k.width() / 2, k.height() / 2));
      previewElement.pos = alignToGrid(truePos);
      if (!previewElement.lastPos) {
        previewElement.lastPos = previewElement.pos;
      }
      console.log(previewElement.pos, previewElement.lastPos);
      if (
        !(
          previewElement.pos.x == previewElement.lastPos.x &&
          previewElement.pos.y == previewElement.lastPos.y
        )
      ) {
        console.log("Change!");
        if (mouseDown) {
          console.log("Creating element!!!");
          createNewElement();
        }
        previewElement.lastPos = previewElement.pos;
      }
    });

    previewElement.onMousePress((m: MouseButton) => {
      if (m == "right") {
        const element = hoveringElements.shift();
        if (element) {
          element.destroy();
        }
      }
    });

    return previewElement;
  }

  function replaceCurrentPreviewElement(
    createFunc: (x: number, y: number, parent: GameObj) => GameObj
  ) {
    currPreviewElement.destroy();
    currPreviewElement = createPreviewElement(createFunc);
  }

  let currPreviewElement = createPreviewElement(createGrass);

  function updateElementButtonColors() {
    elementButtons.forEach((button) => {
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
    iconName: string,
    createFunc: (x: number, y: number, parent: GameObj) => GameObj
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

    button.add([k.sprite(iconName), k.pos(8, 8)]);

    button.onClick(() => {
      console.log("Clicked", element);
      selectedElement = element;
      updateElementButtonColors();
      replaceCurrentPreviewElement(createFunc);
    }, "left");

    return button;
  }

  let elementButtons: GameObj[] = [
    createElementButton(10, 10, uiHolder, "grass", "grass_icon", createGrass),
    createElementButton(10, 86, uiHolder, "wall", "wall_icon", createWall),
    createElementButton(
      10,
      162,
      uiHolder,
      "ground",
      "ground_icon",
      createGround
    ),
  ];
});
