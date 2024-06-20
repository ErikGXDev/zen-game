import { createBackground, createField } from "@/components/background";
import k from "@/kaplay";
import { createPlayer } from "@/components/player";

k.scene("game", () => {
  createBackground();
  const playField = createField(15, 10);
  createPlayer(100, 100, playField);

  //registerCameraControls();
  console.log("Game Loaded!");
});
