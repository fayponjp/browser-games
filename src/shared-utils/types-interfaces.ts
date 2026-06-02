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
    classes: string
}

export interface Board2048 extends Game {
    tiles: Tile[]
}

// looks like 1024 is a gradient, dark center lightens out
// go with whatever for colors beyond
// check logic so if value is > 4, text-white otherwise board brown
