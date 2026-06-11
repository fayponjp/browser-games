import { createFileRoute } from '@tanstack/react-router';
import PokeHangman from '../poke-hangman/GamePokeHangman';
import LoadingIndicator from '../shared-components/loadingIndicator';
export const Route = createFileRoute('/PokeHangman')({
    component: PokeHangman,
    pendingComponent: () => <LoadingIndicator/>,
    pendingMs: 150,
    pendingMinMs: 200,
});
