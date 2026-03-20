import { createFileRoute } from '@tanstack/react-router'
import NotWordle from '../not-wordle/not-wordle'
import LoadingIndicator from '../shared/loadingIndicator'
export const Route = createFileRoute('/NotWordle')({
  component: NotWordle,
  pendingComponent: () => <LoadingIndicator/>,
  pendingMs: 150,
  pendingMinMs: 200,
})
