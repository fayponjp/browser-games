import { createFileRoute } from '@tanstack/react-router';
import Game2048 from '../2048/Game2048';
import LoadingIndicator from '../shared/loadingIndicator';

export const Route = createFileRoute('/Game2048')({
    component: Game2048,
    pendingComponent: () => <LoadingIndicator />,
    pendingMs: 150,
    pendingMinMs: 200,
});
