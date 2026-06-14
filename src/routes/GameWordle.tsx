import { createFileRoute } from '@tanstack/react-router'
import NotWordle from '../gameWordle/GameWordle'
import LoadingIndicator from '../shared-components/loadingIndicator'
export const Route = createFileRoute('/GameWordle')({
  component: NotWordle,
  pendingComponent: () => <LoadingIndicator/>,
  pendingMs: 150,
  pendingMinMs: 200,
})
