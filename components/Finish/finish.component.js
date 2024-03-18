import { getScores, getSettings  } from "../../data/data.js";


export function Finish() {
    const element = document.createElement('div');

    if (getScores().player1 ===  getSettings().pointsToWin) {
        element.append('WIN')
    } else {
        element.append('LOSE')
    }


    return element; 
}