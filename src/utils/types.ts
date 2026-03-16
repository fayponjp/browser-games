export interface Game {
    gameOver: boolean,
    gameWon: boolean,
    history?: []
}

export interface WordleGame extends Game {
    guessRow: number;
}

export interface PkmnGame extends Game {
    guessedLetters: Array<string>;
    currentPkmn: string | undefined;
}