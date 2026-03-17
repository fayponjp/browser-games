import { useEffect, useState, type ReactElement } from 'react';
import { retrievePkmn } from '../utils/pokemon';
import type { PkmnGame } from '../utils/types';
import { loadFromCache, saveToCache } from '../utils/caching';
import { useKeyhandler } from '../utils/shared';

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
        return <div key={index}>{isCurrentLetter ? letter : '_'}</div>;
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

    const strikes = (!game.currentPkmn) ? 0 : game.guessedLetters.filter(
            (letter) => !game.currentPkmn!.includes(letter),
        ).length;

    const [letterElements, setLetterElements] = useState<ReactElement>();

    useEffect(() => {
        if (!game.currentPkmn) {
            const fetchPkmn = async () => {
                const data = await retrievePkmn();
                if (data) {
                    updateGame((prevGame) => ({
                        ...prevGame,
                        currentPkmn: data,
                    }));

                    setLetterElements(
                        <LetterDisplay
                            pokemon={data}
                            guessedLetters={game.guessedLetters}
                        />,
                    );

                    saveToCache(pkmnGameCacheKey, {
                        ...game,
                        currentPkmn: data,
                    });
                }
            };

            fetchPkmn();
        }
    }, []);

    useEffect(() => {
        if (game.currentPkmn) {
            setLetterElements(
                <LetterDisplay
                    pokemon={game.currentPkmn}
                    guessedLetters={game.guessedLetters}
                />,
            );

            saveToCache(pkmnGameCacheKey, game);
        }
    }, [game.guessedLetters]);

    const [currentLetter, setCurrentLetter] = useState<string>();
    function handleInput(letterInput: string) {
        setCurrentLetter(letterInput);
    }

    function handleEnter() {
        if (currentLetter && strikes < 5 && !game.guessedLetters.includes(currentLetter)) {
            updateGame((prevGame) => ({
                ...prevGame,
                guessedLetters: [...prevGame.guessedLetters, currentLetter],
            }));
        }
    }

    function handleBackspace() {
        setCurrentLetter(undefined);
    }

    useKeyhandler([currentLetter], handleInput, handleEnter, handleBackspace);

    return (
        <main className='max-w-5xl mx-auto mt-10 flex flex-col gap-32 text-gray-700 text-center py-8'>
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
                {strikes < 5 ? <p>Current Guess:</p> : <p>Game Over!</p>}
                <p className='uppercase mt-4 text-7xl '>
                    {currentLetter ? (
                        currentLetter
                    ) : (
                        <span className='animate-blink'>_</span>
                    )}
                </p>
            </div>
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
