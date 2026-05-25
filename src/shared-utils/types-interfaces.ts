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
    x: number,
    y: number,
    value: number | undefined,
    merged: boolean,
}

export interface Board2048 extends Game {
    tiles: Tile[]
}

export const valid2048InputsArr: string[] = ['a', 's', 'd', 'f', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

// looks like 1024 is a gradient, dark center lightens out
// go with whatever for colors beyond
// check logic so if value is > 4, text-white otherwise board brown
export const tileVariants: Record<string, string>= {
    "2": "bg-(--board-card-2) text-board-brown text-4xl",
    "4": "bg-(--board-card-4) text-board-brown text-4xl",
    "8": "bg-(--board-card-8) text-white text-4xl",
    "16": "bg-(--board-card-16) text-white text-4xl",
    "32": "bg-(--board-card-32) text-white text-4xl",
    "64": "bg-(--board-card-64) text-white text-4xl",
    "128": "bg-(--board-card-128) text-white text-3xl",
    "256": "bg-(--board-card-256) text-white text-3xl",
    "512": "bg-(--board-card-512) text-white text-3xl",
    "1024": "bg-(--board-card-1024) text-white text-2xl",
    "2048": "bg-(--board-card-2048) text-white text-2xl",
}