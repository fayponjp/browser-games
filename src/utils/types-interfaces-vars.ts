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
    value?: number,
    merged: boolean,
}

export interface Board2048 extends Game {
    tiles: Tile[]
}

export type Valid2048Inputs = 'a' | 's' | 'd' | 'f' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

export const valid2048InputsArr: string[] = ['a', 's', 'd', 'f', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']


// looks like 1024 is a gradient, dark center lightens out
// go with whatever for colors beyond
