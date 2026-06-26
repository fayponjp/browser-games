import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { retrievePkmn } from './pokemon.util';
import type { PkmnTypes } from './pokemon.types';

export type Options = {
    Typing: boolean;
    Letters: boolean;
    Reveal: boolean;
}

interface PokemonGuessGame {
    pokemon: string | undefined;
    setPokemon: (pkmn: string | undefined) => void;
    pokemonSprite: string | undefined;
    setPokemonSprite: (pkmnSprite: string) => void;
    pkmnType: any | undefined;
    setType: (type: any) => void;
    streak: number;
    updateStreak: () => void;
    resetStreak: () => void;
    options: Options;
    updateOptions: (updates: Partial<Options>) => void;
}

const initialPkmnState = {
    pokemon: undefined,
    pokemonSprite: undefined,
    pkmnType: undefined,
    streak: 0,
    options: {
        Typing: false,
        Letters: false,
        Reveal: false
    }
}

export const usePkmnGuessing = create<PokemonGuessGame>()(
    persist(
        (set) => ({
            ...initialPkmnState,
            setPokemon: (pokemon) => set(() => ({ pokemon })),
            setPokemonSprite: (pokemonSprite) => set(() => ({ pokemonSprite })),
            setType: (pkmnType) => set(() => ({ pkmnType })),
            updateStreak: () => set((state) => ({streak: state.streak + 1})),
            resetStreak: () => set(() => ({streak: 0})),
            updateOptions: (updates) => set((state) => ({ options: { ...state.options, ...updates}}))
        }),
        {
            name: 'game-pkmn-guessing',
            partialize: (state: PokemonGuessGame) => ({
                pokemon: state.pokemon,
                pokemonSprite: state.pokemonSprite,
                streak: state.streak,
                options: state.options
            })
        },
    )
);

export const useGetPkmn = () => {
    const { pokemon, setPokemon, setPokemonSprite, setType } = usePkmnGuessing();
    const fetchPkmn = async () => {
        const response = await retrievePkmn();

        if (response) {
            const { name, sprite, type } = response;

            setPokemon(name);
            setPokemonSprite(sprite);
            setType(type);

            console.log(type)
        }
    }

    useEffect(() => {
        if (!pokemon) {
            fetchPkmn();
        }

    }, [pokemon]);
}