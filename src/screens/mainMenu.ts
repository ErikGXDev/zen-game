import { createBackground } from "@/components/background";
import k from "@/kaplay";

k.scene("mainMenu", () => {
  createBackground();
  const menuHolder = k.add([
    k.pos(k.width() / 2 - 125, k.height() / 3),
    k.anchor("left"),
  ]);
  menuHolder.add([
    k.text("Zen Game", {
      font: "inter-bold",
      size: 50,
    }),
    k.anchor("left"),
  ]);

  ["Play", "Settings", "Credits"].forEach((text, index) => {
    menuHolder.add([
      k.rect(250, 50),
      k.color(51, 143, 179),
      k.pos(0, index * 60 + 80),
      k.anchor("left"),
    ]);
    menuHolder.add([
      k.text(text, { font: "inter-bold", size: 45 }),
      k.pos(5, index * 60 + 80),
      k.anchor("left"),
    ]);
  });

  console.log("Main Menu Loaded!");
});
