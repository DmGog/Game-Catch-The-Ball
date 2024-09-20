import {Position} from "./position.js";

const GAME_STATUSES = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN-PROGRESS",
    WIN: "WIN",
    LOSE: "LOSE"
}

export class Game {
    #status = GAME_STATUSES.PENDING;
    #settings = {
        gridSize: {
            rowsCount: 3,
            columnsCount: 3
        },
        jumpInterval: 1000, // milliseconds,
        gameEnd: {
            pointsToWin: 10,
            pointsToLose: 5
        }
    }

    #numberUtility;

    //-----google
    #googlePosition;
    #googleScore = 0;
    #jumpIntervalId;

    //-----players
    #player1Position;
    #player2Position;


    // dependency injection
    constructor(numberUtility) {
        this.#numberUtility = numberUtility
        //this.#google = new Google(new Position());
        //this.#google.jump()
    }

    async setSettings(settings) {
        this.#settings = settings
    }

    async #jumpGoogle() {
        // create new position
        const newPosition = new Position(
            await this.#numberUtility
                .getRandomNumber(0, this.#settings.gridSize.columnsCount - 1),
            await this.#numberUtility
                .getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
        )

        // check new posision
        if (!!this.#googlePosition && newPosition.isEqual(this.#googlePosition)) {
            return this.#jumpGoogle();
        }
        if (newPosition.isEqual(this.#player1Position) || newPosition.isEqual(this.#player2Position)) {
            return this.#jumpGoogle();
        }

        this.#googlePosition = newPosition

        this.#googleScore ++

        if (this.#googleScore === this.#settings.gameEnd.pointsToLose) {
            this.#status = GAME_STATUSES.LOSE;
            clearInterval(this.#jumpIntervalId);
        }


    }

    async #runGoogleJumpInterval() {
        this.#jumpIntervalId = setInterval(async () => {
            await this.#jumpGoogle();
        }, this.#settings.jumpInterval)
    }

    async start() {
        // "Принцип единого уровня абстракции" (Single Level of Abstraction Principle, SLAP).
        this.#status = GAME_STATUSES.IN_PROGRESS

        // генерация позиции Player1 и Player2
        this.#player1Position = new Position(await this.#numberUtility
                .getRandomNumber(0, this.#settings.gridSize.columnsCount - 1),
            await this.#numberUtility
                .getRandomNumber(0, this.#settings.gridSize.rowsCount - 1))
        this.#player2Position = new Position(await this.#numberUtility
                .getRandomNumber(0, this.#settings.gridSize.columnsCount - 1),
            await this.#numberUtility
                .getRandomNumber(0, this.#settings.gridSize.rowsCount - 1))


        // Проверка несовпадения позиция Player1 и Player2
        if (this.#player2Position.isEqual(this.#player1Position)) {
            return this.#player2Position = new Position(
                await this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.columnsCount - 1),
                await this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
            );
        }
        await this.#jumpGoogle();
        await this.#runGoogleJumpInterval();
    }


    // getter
    async getStatus() {
        return this.#status
    }

    async getGooglePosition() {
        return this.#googlePosition
    }

    async getPlayer1Position() {
        return this.#player1Position;
    }

    async getPlayer2Position() {
        return this.#player2Position;
    }
}