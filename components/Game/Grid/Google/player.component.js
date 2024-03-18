export function Player(playerNumber) {
    const element = document.createElement('img');

    element.src = `assets/images/player${playerNumber}.png`;

    return element;
}