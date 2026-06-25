import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { retrievePkmn } from './pokemon.util';
import type { PkmnTypes } from './pokemon.types';

interface PokemonGuessGame {
    pokemon: string | undefined;
    setPokemon: (pkmn: string | undefined) => void;
    pokemonSprite: string | undefined;
    setPokemonSprite: (pkmnSprite: string) => void;
    pkmnType: string | undefined;
    setType: (type: PkmnTypes) => void;
    streak: number;
    updateStreak: () => void;
    resetStreak: () => void;
}

const initialPkmnState = {
    pokemon: undefined,
    pokemonSprite: undefined,
    pkmnType: undefined,
    streak: 0
}

export const usePkmnGuessing = create<PokemonGuessGame>()(
    persist(
        (set) => ({
            ...initialPkmnState,
            setPokemon: (pokemon) => set(() => ({ pokemon })),
            setPokemonSprite: (pokemonSprite) => set(() => ({ pokemonSprite })),
            setType: (pkmnType) => set(() => ({ pkmnType })),
            updateStreak: () => set((state) => ({streak: state.streak + 1})),
            resetStreak: () => set(() => ({streak: 0}))
        }),
        {
            name: 'game-pkmn-guessing',
            partialize: (state: PokemonGuessGame) => ({
                pokemon: state.pokemon,
                pokemonSprite: state.pokemonSprite,
                streak: state.streak
            })
        },
    )
);

export const useGetPkmn = () => {
    const { pokemon, setPokemon, setPokemonSprite } = usePkmnGuessing();
    const fetchPkmn = async () => {
        const response = await retrievePkmn();

        if (response) {
            const { name, sprite, type } = response;

            console.log(type[0])
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