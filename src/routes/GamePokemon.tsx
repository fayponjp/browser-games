import { createFileRoute } from '@tanstack/react-router';
import PokeHangman from '../gamePokemon/GamePokemon';
import LoadingIndicator from '../shared-components/loadingIndicator';
export const Route = createFileRoute('/GamePokemon')({
    component: PokeHangman,
    pendingComponent: () => <LoadingIndicator/>,
    pendingMs: 150,
    pendingMinMs: 200,
});
