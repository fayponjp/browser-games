import { useEffect, useState } from 'react';
import { retrievePkmn } from '../utils/pokemon';
import type { PkmnGame } from '../utils/types';
import { saveToCache } from '../utils/caching';

export default function PokeHangman() {
    const [pokemon, setPokemon] = useState<string | undefined>();
    const [game, updateGame] = useState<PkmnGame | undefined>();
    const pkmnGameCacheKey = 'pkmnCurrentGameState';

    useEffect(() => {
        if (!game) {
            const fetchPkmn = async () => {
                const data = await retrievePkmn();

                if (data) {
                    setPokemon(data);
                    const newGame = {
                        gameOver: false,
                        gameWon: false,
                        guessedLetters: [],
                    }
                    updateGame(newGame);

                    saveToCache(pkmnGameCacheKey, newGame);
                }
            };

            fetchPkmn();
        }
    }, []);

    return <div>{pokemon}</div>;
}
