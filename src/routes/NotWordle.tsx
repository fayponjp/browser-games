import { createFileRoute } from '@tanstack/react-router'
import NotWordle from '../not-wordle/not-wordle'

export const Route = createFileRoute('/NotWordle')({
  component: NotWordle,
})
