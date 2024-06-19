import { createBackground } from "@/components/background";
import k from "@/kaplay";

k.scene("mainMenu", () => {
  createBackground();
  const menuHolder = k.add([
    k.pos(k.width() / 4, k.height() / 3),
    k.anchor("left"),
  ]);
  menuHolder.add([
    k.text("Zen Game", {
      font: "inter-bold",
      size: 65,
    }),
    k.anchor("left"),
  ]);

  const buttonHeight = 80;
  const gap = 100;

  const buttons = {
    Play: () => {
      k.go("game");
    },
    Settings: () => {
      console.log("Settings");
    },
    Credits: () => {
      console.log("Credits");
    },
  };

  Object.keys(buttons).forEach((text, index) => {
    const menuItem = menuHolder.add([]);
    let menuItemRect = menuItem.add([
      k.area(),
      k.rect(300, buttonHeight),
      k.color(58, 66, 84),
      k.pos(0, index * gap + buttonHeight),
      k.anchor("left"),
    ]);
    menuItem.add([
      k.text(text, { font: "inter-bold", size: buttonHeight - 20 }),
      k.pos(10, index * gap + buttonHeight + 2),
      k.anchor("left"),
    ]);

    menuItemRect.onHover(() => {
      k.setCursor("pointer");
    });
    menuItemRect.onHoverEnd(() => {
      k.setCursor("default");
    });
    menuItemRect.onClick(() => {
      //@ts-ignore
      buttons[text]();
      k.setCursor("default");
    });
    menuItem.onUpdate(() => {
      if (menuItemRect.isHovering()) {
        menuItemRect.width = k.lerp(menuItemRect.width, 330, 0.1);
        menuItemRect.color = k.lerp(menuItemRect.color, k.rgb("#DA807A"), 0.1);
      } else {
        menuItemRect.width = k.lerp(menuItemRect.width, 300, 0.1);
        menuItemRect.color = k.lerp(menuItemRect.color, k.rgb(58, 66, 84), 0.1);
      }
    });
  });

  console.log("Main Menu Loaded!");
});
