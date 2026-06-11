import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavigationPopover } from '../navigation/Navigation';

export const Route = createRootRoute({
    component: () => (
        <>
            <NavigationPopover />
            <Outlet />
        </>
    ),
});
