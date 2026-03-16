import { createFileRoute } from '@tanstack/react-router'
import PokeHangman from '../poke-hangman/pokehangman'
export const Route = createFileRoute('/PokeHangman')({
  component: PokeHangman,
})
