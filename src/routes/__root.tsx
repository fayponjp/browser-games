import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavigationPopover } from '../navigation/NavigationPopover';


export const Route = createRootRoute({
    component: () => (
        <>
            <NavigationPopover />
            <Outlet />
        </>
    ),
});
