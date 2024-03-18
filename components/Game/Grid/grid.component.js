import { getSettings, getGooglePosition, getPlayer1Position, getPlayer2Position } from "../../../data/data.js";
import { Google } from "./Google/google.component.js";
import { Player } from "./Google/player.component.js";


export function Grid() {
    const container = document.createElement("table");

    for(let y = 0; y < getSettings().gridSize.rowsCount; y++) {
        const rowElement = document.createElement("tr"); 
        
        for (let x = 0; x < getSettings().gridSize.columnsCount; x++) {
          const cellElement = document.createElement("td");

          if (x === getGooglePosition().x && y === getGooglePosition().y) {
            const offerElement = Google();
            cellElement.append(offerElement);
          }

          if (x === getPlayer1Position().x && y === getPlayer1Position().y) {
            const player1Element = Player(1);
            cellElement.append(player1Element);
          } 
          if (x === getPlayer2Position().x && y === getPlayer2Position().y) {
            const player2Element = Player(2);
            cellElement.append(player2Element);
          } 

          rowElement.append(cellElement);
        }
    
        container.append(rowElement);
    }

    return container;
}