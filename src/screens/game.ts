import { createBackground, createField } from "@/components/background";
import k from "@/kaplay";
import { createPlayer } from "@/components/player";
import { createWall } from "@/components/courseElements";

k.scene("game", () => {
  createBackground();
  const playField = createField(15, 10);
  createPlayer(100, 100, playField);
  createWall(400, 400, playField);
  createWall(500, 500, playField);

  //registerCameraControls();
  console.log("Game Loaded!");
});
