import type { LinkProps } from '@tanstack/react-router'

export type GameDetails = {
    title: React.ReactNode,
    description: React.ReactNode,
    name: string
}

export const GameRoute: Record<string, LinkProps['to']> = {
    '2048': '/Game2048',
    'Not Wordle': '/GameWordle',
    'PokeHangman': '/GamePokemon'
}