import { generate } from 'random-words';
import { useRef, useState, useEffect } from 'react';
import wordExists from 'word-exists';
import type { WordleGame } from '../utils/types-interfaces-vars';
import AnswerGrid from './AnswerGrid/AnswerGrid';
import Keyboard from './Keyboard/Keyboard';

import Guide from './Guide/Guide';
import Popover from './Popover/Popover';
import { useKeyhandler } from '../utils/shared';
import { saveToCache, loadFromCache } from '../utils/caching';

export default function NotWordle() {
    const notWordleCacheKey = 'notWordleCurrentGameState';
    const cachedGame: WordleGame | null = loadFromCache(notWordleCacheKey);

    const [game, setGame] = useState<WordleGame>(cachedGame || {
        guessRow: 0,
        gameOver: false,
        gameWon: false,
        currentWord: Array.from(generate({ minLength: 5, maxLength: 5 })), 
        guesses: [[]]
    });

    const rowRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    function handleInput(letterInput: string): void {
        if (game.gameOver) return;

        setGame((prev) => {
            const updatedGuesses = prev.guesses.map((row, index) =>
                index === game.guessRow && row.length < 5
                    ? [...row, letterInput]
                    : row,
            );

            return {...prev, guesses: updatedGuesses}
        });
    }

    function handleBackspace(): void {
        setGame((prev) => {
            const updatedGuesses = prev.guesses.map((row, index) =>
                index === game.guessRow && row.length > 0
                    ? row.slice(0, -1)
                    : row,
            );

            return {...prev, guesses: updatedGuesses}
        });
    }

    function handleEnter(): void {
        const currentWord = game.guesses[game.guessRow]?.join('');
        if (!currentWord || currentWord.length < 5) return;

        if (!wordExists(currentWord)) {
            rowRef.current?.classList.add('shake');
            setTimeout(() => rowRef.current?.classList.remove('shake'), 250);
            return;
        }

        const isCorrect = currentWord === game.currentWord.join('');
        const isLastGuess = game.guessRow + 1 === 6;

        setGame((prev) => ({
            ...prev,
            guessRow: prev.guessRow + 1,
            gameOver: isCorrect || isLastGuess,
            gameWon: isCorrect,
            guesses: [...prev.guesses, []]
        }));
    }

    useKeyhandler([game.guesses], handleInput, handleEnter, handleBackspace)

    function restartGame(): void {
        setGame({ guessRow: 0, gameOver: false, gameWon: false, currentWord: Array.from(generate({ minLength: 5, maxLength: 5 })), guesses: [[]] });
    }

    useEffect(() => {
        if (game.gameOver) {
            popoverRef.current?.showPopover();
        }
    }, [game.gameOver]);

    useEffect(() => {
        saveToCache(notWordleCacheKey, game);
    }, [game])

    return (
        <>
            <main className='flex flex-col justify-center bg-zinc-800  items-center'>
                <section className='max-w-125 w-full flex flex-col mx-auto py-4 gap-10'>
                    <AnswerGrid
                        game={game}
                        rowRef={rowRef}
                    />
                    <Keyboard
                        letters={game.guesses}
                        onClick={handleInput}
                        word={game.currentWord}
                        game={game}
                        handleBackspace={handleBackspace}
                        handleEnter={handleEnter}
                    />
                    <button className='hover:scale-105 transition ease-in-out bg-white p-2 rounded text-black cursor-pointer' onClick={restartGame}>Reset</button>
                </section>
                <Popover
                    popoverRef={popoverRef}
                    game={game}
                    letters={game.guesses}
                    word={game.currentWord}
                />
            </main>
            <Guide />
        </>
    );
}
