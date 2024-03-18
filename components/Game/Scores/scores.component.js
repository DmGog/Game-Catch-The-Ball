import {getScores} from "../../../data/data.js";

export function Scores() {
    const container = document.createElement("div");

    const player1Score = document.createElement("div");
    player1Score.textContent = "Player 1: ";
    const scoresEl = getScores().player1;
    const player1Image = document.createElement("img");
    player1Image.src = "./assets/images/player1.png";
    player1Score.append(player1Image, scoresEl);


    const player2Score = document.createElement("div");
    player2Score.textContent = "Player 2: ";
        const scoresEl2 = getScores().player2;
    const player2Image = document.createElement("img");
    player2Image.src = "./assets/images/player2.png";
    player2Score.append(player2Image, scoresEl2);

    container.append(player1Score, player2Score)

    return container;
}