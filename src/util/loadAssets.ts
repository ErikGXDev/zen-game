import k from "@/kaplay";
import "@/screens/mainMenu";

function loadAssets() {
  k.loadFont("inter", "/fonts/Inter-Regular.ttf", {
    filter: "linear",
  });
  k.loadFont("inter-bold", "/fonts/Inter-Bold.ttf", {
    filter: "linear",
  });
}

export { loadAssets };
