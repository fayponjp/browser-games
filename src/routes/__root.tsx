import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavigationBar } from '../navigation/Navigation';

export const Route = createRootRoute({
    component: () => (
        <>
            <NavigationBar />
            <Outlet />
        </>
    ),
});
