import { useEffect, useState, type ReactElement } from 'react';
import { retrievePkmn } from '../utils/pokemon';
import type { PkmnGame } from '../utils/types';
import { loadFromCache, saveToCache } from '../utils/caching';

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
        return (
            <div key={index}>
                {isCurrentLetter ? letter : '_'}
            </div>
        );
    });

    const gameBoard = (
        <div className='max-w-5xl mx-auto flex flex-row gap-2 text-5xl justify-center'>
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
        }
    }, [game.guessedLetters, game.currentPkmn]);

    return <main>{letterElements}</main>;
}
