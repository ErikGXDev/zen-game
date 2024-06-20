import { createBackground, createField } from "@/components/background";
import k from "@/kaplay";
import { createPlayer } from "@/components/player";
import { createHole, createWall } from "@/components/courseElements";
import { createGrid } from "@/components/grid";

k.scene("game", () => {
  createBackground();
  const playField = createField(15, 10);
  createGrid(15, 10, playField);
  createPlayer(100, 100, playField);
  createWall(400, 400, playField);
  createWall(500, 500, playField);
  createHole(600, 200, playField);

  //registerCameraControls();
  console.log("Game Loaded!");
});
