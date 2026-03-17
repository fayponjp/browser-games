export interface Game {
    gameOver: boolean,
    gameWon: boolean,
    history?: []
}

export interface WordleGame extends Game {
    guessRow: number,
    currentWord: string[],
}

export interface PkmnGame extends Game {
    guessedLetters: Array<string>,
    currentPkmn: string | undefined
}