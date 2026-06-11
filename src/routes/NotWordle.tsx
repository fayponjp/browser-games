import { createFileRoute } from '@tanstack/react-router'
import NotWordle from '../not-wordle/GameNotWordle'
import LoadingIndicator from '../shared-components/loadingIndicator'
export const Route = createFileRoute('/NotWordle')({
  component: NotWordle,
  pendingComponent: () => <LoadingIndicator/>,
  pendingMs: 150,
  pendingMinMs: 200,
})
