export const GAME_STATUSES = {
  SETTINGS: "settings",
  IN_PROGRESS: "in-progress",
  FINISH: "finish",
};

const data = {
  scores: {
    player1: 0,
    player2: 0,
  },
  coords: {
    google: { x: 1, y: 1 },
    player1: { x: 2, y: 2 },
    player2: { x: 1, y: 2 },
  },
  settings: {
    gridSize: {
      columnsCount: 5,
      rowsCount: 5,
    },
    maximumMissesCount: 30,
    pointsToWin: 30,
  },
  gameStatus: GAME_STATUSES.IN_PROGRESS,
};

// getter selectors
export function getGooglePosition() {
  return data.coords.google;
}
export function getPlayer1Position() {
  return data.coords.player1;
}
export function getPlayer2Position() {
  return data.coords.player2;
}
export function getGameStatus() {
  return data.gameStatus;
}

export function getScores() {
  return data.scores;
}
export function getSettings() {
  return data.settings;
}

let subscriber = () => {};

export function addEventListener(observer) {
  subscriber = observer;
}

function jumpGoogleToRandomPosition() {
  let newX, newY;
  do {
    newX = generateRandomInt(data.settings.gridSize.columnsCount);
    newY = generateRandomInt(data.settings.gridSize.rowsCount);
  } while (
    (data.coords.google.x === newX && data.coords.google.y === newY) ||
    (data.coords.player1.x === newX && data.coords.player1.y === newY) ||
    (data.coords.player2.x === newX && data.coords.player2.y === newY)
  );

  data.coords.google.x = newX;
  data.coords.google.y = newY;
}

function generateRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function catchGoogle(playerNumber) {
  clearInterval(jumpIntervalId);
  if (playerNumber === 1) {
    data.scores.player1++;
    if (data.scores.player1 === data.settings.pointsToWin) {
      data.gameStatus = GAME_STATUSES.FINISH;
    } else {
      jumpGoogleToRandomPosition();
      runJumpInterval();
    }
  } else if (playerNumber === 2) {
    data.scores.player2++;
    if (data.scores.player2 === data.settings.pointsToWin) {
      data.gameStatus = GAME_STATUSES.FINISH;
    } else {
      jumpGoogleToRandomPosition();
      runJumpInterval();
    }
  }
  subscriber();
}

function missOffer() {
    jumpGoogleToRandomPosition();
    subscriber();
}

let jumpIntervalId;

function runJumpInterval() {
  jumpIntervalId = setInterval(missOffer, 2000);
}

runJumpInterval();

// setter / mutations

function checkGoogleAndPlayerPositionsAndCallSubscriber(playerNumber, delta) {
  const coords = data.coords[`player${playerNumber}`];

  const newCoords = {
    x: coords.x + delta.x,
    y: coords.y + delta.y,
  };

  if (!isNewPlayerCoordsCorrect(newCoords)) return;

  coords.x = newCoords.x;
  coords.y = newCoords.y;

  if (isPlayer1CoordsTheSameWithGoogle()) {
    catchGoogle(1);
  }
  if (isPlayer2CoordsTheSameWithGoogle()) {
    catchGoogle(2);
  }
  subscriber();
}

function isNewPlayerCoordsCorrect(coords) {
  if (coords.x > data.settings.gridSize.columnsCount - 1) return false;

  if (coords.x < 0) return false;

  if (coords.y > data.settings.gridSize.rowsCount - 1) return false;

  if (coords.y < 0) return false;

  if (coords.x === data.coords.player1.x && coords.y === data.coords.player1.y)
    return false;
  if (coords.x === data.coords.player2.x && coords.y === data.coords.player2.y)
    return false;

  return true;
}

//player1

export function movePlayer1Up() {
  const delta = { x: 0, y: -1 };
  checkGoogleAndPlayerPositionsAndCallSubscriber(1, delta);
}
export function movePlayer1Down() {
  const delta = { x: 0, y: 1 };
  checkGoogleAndPlayerPositionsAndCallSubscriber(1, delta);
}
export function movePlayer1Left() {
  const delta = { x: -1, y: 0 };
  checkGoogleAndPlayerPositionsAndCallSubscriber(1, delta);
}
export function movePlayer1Right() {
  const delta = { x: 1, y: 0 };
  checkGoogleAndPlayerPositionsAndCallSubscriber(1, delta);
}

function isPlayer1CoordsTheSameWithGoogle() {
  return (
    data.coords.player1.x === data.coords.google.x &&
    data.coords.player1.y === data.coords.google.y
  );
}

// player2

export function movePlayer2Up() {
  const delta = { x: 0, y: -1 };
  checkGoogleAndPlayerPositionsAndCallSubscriber(2, delta);
}
export function movePlayer2Down() {
  const delta = { x: 0, y: 1 };
  checkGoogleAndPlayerPositionsAndCallSubscriber(2, delta);
}
export function movePlayer2Left() {
  const delta = { x: -1, y: 0 };
  checkGoogleAndPlayerPositionsAndCallSubscriber(2, delta);
}
export function movePlayer2Right() {
  const delta = { x: 1, y: 0 };
  checkGoogleAndPlayerPositionsAndCallSubscriber(2, delta);
}

function isPlayer2CoordsTheSameWithGoogle() {
  return (
    data.coords.player2.x === data.coords.google.x &&
    data.coords.player2.y === data.coords.google.y
  );
}
