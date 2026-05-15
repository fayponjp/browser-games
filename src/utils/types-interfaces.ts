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

export interface Board2048 extends Game {
    
}

export type Valid2048Inputs = 'a' | 's' | 'd' | 'f' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

export const valid2048InputsArr: string[] = ['a', 's', 'd', 'f', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']