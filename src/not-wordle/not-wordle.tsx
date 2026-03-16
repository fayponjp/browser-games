import { generate } from 'random-words';
import { useRef, useState, useEffect } from 'react';
import wordExists from 'word-exists';
import type { WordleGame } from '../utils/types';
import AnswerGrid from './AnswerGrid/AnswerGrid';
import Keyboard from './Keyboard/Keyboard';

import Guide from './Guide/Guide';
import Popover from './Popover/Popover';

export default function NotWordle() {
    const initialWord = generate({ minLength: 5, maxLength: 5 });
    const [word, setWord] = useState(Array.from(initialWord));
    const [game, setGame] = useState<WordleGame>({
        guessRow: 0,
        gameOver: false,
        gameWon: false,
    });
    const [letters, setLetters] = useState<Array<Array<string>>>([[]]);
    const rowRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    function handleInput(letterInput: string): void {
        if (game.gameOver) return;

        setLetters((prev) => {
            return prev.map((row, index) =>
                index === game.guessRow && row.length < 5
                    ? [...row, letterInput]
                    : row,
            );
        });
    }

    function handleBackspace(): void {
        setLetters((prevLetters) =>
            prevLetters.map((row, index) =>
                index === game.guessRow && row.length > 0
                    ? row.slice(0, -1)
                    : row,
            ),
        );
    }

    function handleEnter(): void {
        const currentWord = letters[game.guessRow]?.join('');
        if (!currentWord || currentWord.length < 5) return;

        if (!wordExists(currentWord)) {
            rowRef.current?.classList.add('shake');
            setTimeout(() => rowRef.current?.classList.remove('shake'), 250);
            return;
        }

        const isCorrect = currentWord === word.join('');
        const isLastGuess = game.guessRow + 1 === 6;

        setLetters((prev) => [...prev, []]);
        setGame((prev) => ({
            ...prev,
            guessRow: prev.guessRow + 1,
            gameOver: isCorrect || isLastGuess,
            gameWon: isCorrect,
        }));
    }

    function handleKeyDown(e: KeyboardEvent): void {
        const rex = /^[A-Za-z]$/;
        if (rex.test(e.key)) handleInput(e.key);

        if (e.key === 'Enter') {
            handleEnter();
        }

        if (e.key === 'Backspace') {
            handleBackspace();
        }
    }

    function restartGame(): void {
        setGame({ guessRow: 0, gameOver: false, gameWon: false });
        setLetters([[]]);
        setWord(Array.from(generate({ minLength: 5, maxLength: 5 })));
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [letters]);

    useEffect(() => {
        if (game.gameOver) {
            popoverRef.current?.showPopover();
        }
    }, [game.gameOver]);

    return (
        <>
            <main className='flex flex-col justify-center'>
                <section className='max-w-125 w-full flex flex-col mx-auto py-4'>
                    <AnswerGrid
                        letters={letters}
                        word={word}
                        game={game}
                        rowRef={rowRef}
                    />
                    <Keyboard
                        letters={letters}
                        onClick={handleInput}
                        word={word}
                        game={game}
                        handleBackspace={handleBackspace}
                        handleEnter={handleEnter}
                    />
                    <button className='absolute right-10 bg-white p-2 rounded text-black cursor-pointer' onClick={() => restartGame}>Reset</button>
                </section>
                <Popover
                    popoverRef={popoverRef}
                    game={game}
                    letters={letters}
                    word={word}
                />
            </main>
            <Guide />
        </>
    );
}
