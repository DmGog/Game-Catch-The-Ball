import { Finish } from "./components/Finish/finish.component.js";
import { Game } from "./components/Game/game.component.js";
import {
  addEventListener,
  GAME_STATUSES,
  getGameStatus,
  movePlayer1Down,
  movePlayer1Left,
  movePlayer1Right,
  movePlayer1Up,
  movePlayer2Down,
  movePlayer2Left,
  movePlayer2Right,
  movePlayer2Up,
} from "./data/data.js";

function renderUI() {
  const appElement = document.getElementById("app");
  appElement.innerHTML = "";

  switch (getGameStatus()) {
    case GAME_STATUSES.IN_PROGRESS:
      const gameElement = Game();
      appElement.append(gameElement);
      break;
    case GAME_STATUSES.FINISH:
      const finishElement = Finish();
      appElement.append(finishElement);
  }
}

function setupKeyboardsControl() {
  window.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
        movePlayer1Up();
        break;
      case "ArrowDown":
        movePlayer1Down();
        break;
      case "ArrowLeft":
        movePlayer1Left();
        break;
      case "ArrowRight":
        movePlayer1Right();
        break;
    }
  });
}

function setupKeyboardsControl2() {
  window.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "KeyW":
        movePlayer2Up();
        break;
      case "KeyS":
        movePlayer2Down();
        break;
      case "KeyA":
        movePlayer2Left();
        break;
      case "KeyD":
        movePlayer2Right();
        break;
    }
  });
}

setupKeyboardsControl();
setupKeyboardsControl2();

renderUI();

addEventListener(renderUI);
