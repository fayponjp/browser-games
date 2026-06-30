import { createFileRoute } from '@tanstack/react-router';
import LoadingIndicator from '../shared-components/loadingIndicator';
import { GuessPokemon } from '../gamePokemon/GamePokemon';

export const Route = createFileRoute('/GamePkmn')({
    component: GuessPokemon,
    pendingComponent: () => <LoadingIndicator />,
    pendingMs: 150,
    pendingMinMs: 200,
});
