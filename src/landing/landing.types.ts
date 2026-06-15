import type { LinkProps } from '@tanstack/react-router'

export type GameDetails = {
    title: React.ReactNode,
    description: React.ReactNode,
    name: GameTitles
}

export type GameTitles = '2048' | 'Not Wordle' | 'PokeHangman' | 'Home'

export const GameRoute: Record<GameTitles, LinkProps['to']> = {
    'Home': '/',
    '2048': '/Game2048',
    'Not Wordle': '/GameWordle',
    'PokeHangman': '/GamePokemon',
}