import k from "@/kaplay";
import "@/screens/mainMenu";
import "@/screens/game";

function loadAssets() {
  k.loadFont("inter", "/fonts/Inter-Regular.ttf", {
    filter: "linear",
  });
  k.loadFont("inter-bold", "/fonts/Inter-Bold.ttf", {
    filter: "linear",
  });

  k.loadSprite("ball", "sprites/ball.png");

  k.loadSpriteAtlas("sprites/terrain.png", {
    grass: {
      x: 0,
      y: 0,
      width: 64,
      height: 64,
    },

    water: {
      x: 64,
      y: 0,
      width: 64,
      height: 64,
    },
  });

  k.loadSprite("arrows", "sprites/arrows.png", {
    sliceX: 3,
    anims: {
      "1": { from: 0, to: 0 },
      "2": { from: 1, to: 1 },
      "3": { from: 2, to: 2 },
    },
  });

  /*
  k.loadSpriteAtlas("sprites/arrows.png", {
    arrow0: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    arrow1: {
      x: 0,
      y: 0,
      width: 16,
      height: 48,
    },
    arrow2: {
      x: 16,
      y: 0,
      width: 16,
      height: 48,
    },
    arrow3: {
      x: 32,
      y: 0,
      width: 16,
      height: 48,
    },
  });*/
}

export { loadAssets };
