import { createFileRoute } from '@tanstack/react-router';
import PokeHangman from '../poke-hangman/pokehangman';
import LoadingIndicator from '../shared/loadingIndicator';
export const Route = createFileRoute('/PokeHangman')({
    component: PokeHangman,
    pendingComponent: () => <LoadingIndicator/>,
    pendingMs: 150,
    pendingMinMs: 200,
});
