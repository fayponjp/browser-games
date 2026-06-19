import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { retrievePkmn } from './pokemon.util';

interface PokemonGuessGame {
    pokemon: string | undefined;
    setPokemon: (pkmn: string) => void;
    pokemonSprite: string | undefined;
    setPokemonSprite: (pkmnSprite: string) => void;
}

const initialPkmnState = {
    pokemon: undefined,
    pokemonSprite: undefined,
}

export const usePkmnGuessing = create<PokemonGuessGame>()(
    persist(
        (set) => ({
            ...initialPkmnState,
            setPokemon: (pkmn) => set(() => ({ pokemon: pkmn })),
            setPokemonSprite: (spriteUrl) => set(() => ({ pokemonSprite: spriteUrl }))
        }),
        {
            name: 'game-pkmn-guessing',
            partialize: (state: PokemonGuessGame) => ({
                pokemon: state.pokemon,
                pokemonSprite: state.pokemonSprite
            })
        },
    )
);

export const useGetPkmn = () => {
    const { pokemon, setPokemon, setPokemonSprite } = usePkmnGuessing();
    const fetchPkmn = async () => {
        const response = await retrievePkmn();

        if (response) {
            const { name, sprite } = response;

            setPokemon(name);
            setPokemonSprite(sprite)
        }
    }

    useEffect(() => {
        if (!pokemon) {
            fetchPkmn();
        }

    }, [pokemon]);
}