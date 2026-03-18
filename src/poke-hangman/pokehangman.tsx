import { useEffect, useState } from 'react';
import { retrievePkmn } from '../utils/pokemon';
import type { PkmnGame } from '../utils/types';
import { loadFromCache, saveToCache } from '../utils/caching';
import { isLetter, useKeyhandler } from '../utils/shared';

const LetterDisplay = ({
    pokemon,
    guessedLetters,
}: {
    pokemon: string;
    guessedLetters: Array<string>;
}) => {
    const letters = Array.from(pokemon);

    const guessElements = letters.map((letter, index) => {
        const isCurrentLetter = guessedLetters.includes(letter);
        const isALetter = isLetter(letter);
        return <div key={index}>{!isCurrentLetter && isALetter ? '_': letter}</div>;
    });

    const gameBoard = (
        <div className='tracking-widest uppercase flex flex-row gap-2 text-5xl justify-center'>
            {guessElements}
        </div>
    );

    return gameBoard;
};

export default function PokeHangman() {
    const pkmnGameCacheKey = 'pkmnCurrentGameState';
    const cachedGame: PkmnGame | null = loadFromCache(pkmnGameCacheKey);
    const [game, updateGame] = useState<PkmnGame>(
        cachedGame || {
            gameOver: false,
            gameWon: false,
            guessedLetters: [],
            currentPkmn: undefined,
        },
    );

    const strikes = !game.currentPkmn
        ? 0
        : game.guessedLetters.filter(
              (letter) => !game.currentPkmn!.includes(letter),
          ).length;
    const isGameWon = game.currentPkmn
        ? [...game.currentPkmn].every((letter) =>
              game.guessedLetters.includes(letter),
          )
        : false;
    const isGameLost = strikes >= 5;
    const isGameOver = isGameWon || isGameLost;

    useEffect(() => {
        if (!game.currentPkmn) {
            const fetchPkmn = async () => {
                const data = await retrievePkmn();
                if (data) {
                    updateGame((prevGame) => ({
                        ...prevGame,
                        currentPkmn: data,
                    }));
                }
            };

            fetchPkmn();
        }
    }, [game.currentPkmn]);

    const letterElements = game.currentPkmn ? (
        <LetterDisplay
            pokemon={game.currentPkmn}
            guessedLetters={game.guessedLetters}
        />
    ) : null;

    const [currentLetter, setCurrentLetter] = useState<string>();
    function handleInput(letterInput: string) {
        if (letterInput !== currentLetter) setCurrentLetter(letterInput);
    }

    function handleEnter() {
        if (
            currentLetter &&
            strikes < 5 &&
            !game.guessedLetters.includes(currentLetter)
        ) {
            updateGame((prevGame) => ({
                ...prevGame,
                guessedLetters: [...prevGame.guessedLetters, currentLetter],
            }));
            setCurrentLetter(undefined);
        }
    }

    function handleBackspace() {
        setCurrentLetter(undefined);
    }

    function handleRestart() {
        updateGame({
            gameOver: false,
            gameWon: false,
            guessedLetters: [],
            currentPkmn: undefined,
        });
    }

    useKeyhandler([currentLetter], handleInput, handleEnter, handleBackspace);

    useEffect(() => {
        if (game.currentPkmn) saveToCache(pkmnGameCacheKey, game);
    }, [game]);

    return (
        <main className='max-w-5xl mx-auto mt-10 flex flex-col gap-25 text-gray-700 text-center py-8'>
            {letterElements}
            <div>
                <div
                    className={`rounded-[50%] border-4 h-25 w-25 mx-auto flex relative overflow-hidden shadow ${strikes >= 1 ? '' : 'hidden'}`}
                >
                    <div
                        className={`absolute max-h[50%] top-0 bottom-[50%] bg-red-600 w-full ${strikes >= 4 ? '' : 'hidden'}`}
                    ></div>
                    <div
                        className={`absolute max-h[50%] top-[50%] bottom-0 bg-white w-full ${strikes >= 3 ? '' : 'hidden'}`}
                    ></div>
                    <div
                        className={`rounded-[50%] border-3 h-5 w-5 m-auto bg-white z-10 ${strikes >= 5 ? '' : 'hidden'}`}
                    ></div>
                    <div className='absolute flex top-0 bottom-0 w-full'>
                        <div
                            className={`border my-auto w-full ${strikes >= 2 ? '' : 'hidden'}`}
                        ></div>
                    </div>
                </div>
            </div>
            <div>
                {!isGameOver ? (
                    <>
                        <p>Current Guess:</p>
                        <p className='uppercase mt-4 text-7xl '>
                            {currentLetter ? (
                                currentLetter
                            ) : (
                                <span className='animate-blink'>_</span>
                            )}
                        </p>
                    </>
                ) : (
                    <>
                        {isGameWon ? (
                            <p className='font-bold'>Congratulations, you got it!</p>
                        ) : (
                            <p className='font-bold'>
                                Game Over! The Pokemon was {game.currentPkmn}!
                            </p>
                        )}
                    </>
                )}
            </div>
            <button
                onClick={handleRestart}
                className='p-4 w-50 mx-auto bg-zinc-600 hover:bg-zinc-400 hover:text-black active:bg-zinc-400 active:text-black transition delay-75 ease-in-out rounded-4xl text-white cursor-pointer'
            >
                {isGameOver ? 'New Game' : 'Reset'}
            </button>
            {game.guessedLetters ? (
                <div>
                    <p>Previous Guesses:</p>
                    <p className='uppercase mt-4 text-xl top-[50%]'>
                        {game.guessedLetters.join(', ')}
                    </p>
                </div>
            ) : (
                <div className='flex mx-auto flex-col '>
                    <p>Press any letter key to start</p>
                    <p>Press enter to confirm your guess</p>
                </div>
            )}
        </main>
    );
}
