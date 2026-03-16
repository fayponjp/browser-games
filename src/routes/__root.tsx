import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: () => (
        <>
            <header className='border-b-gray-500 border-b py-2'>
                <nav className='p-2 flex gap-2'>
                    <Link to='/' className='[&.active]:font-bold'>
                        Home
                    </Link>
                    <Link to='/NotWordle' className='[&.active]:font-bold'>
                        Not-Wordle
                    </Link>
                    <Link to='/PokeHangman' className='[&.active]:font-bold'>
                        Poké-Hangman
                    </Link>
                </nav>
            </header>
            <Outlet />
        </>
    ),
});
