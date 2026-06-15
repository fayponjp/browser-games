export interface Game {
    gameOver: boolean,
    gameWon: boolean,
    history?: []
}

export interface WordleGame extends Game {
    guessRow: number,
    currentWord: string[],
    guesses: Array<Array<string>>
}

export interface PkmnGame extends Game {
    guessedLetters: Array<string>,
    currentPkmn: string | undefined,
    currentSprite: string | undefined
}

export interface Tile {
    id: string,
    x: number,
    y: number,
    value: number | undefined,
    merged: boolean,
}

export interface Board2048 extends Game {
    tiles: Tile[]
}

export interface AnimatingTiles {
    removed: Set<string>;
    appearing: Set<string>;
}
