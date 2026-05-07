import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: () => (
        <>
            <header className='bg-white shadow'>
                <nav className='flex gap-2'>
                    <Link
                        to='/'
                        className='transition ease-in-out px-5 py-2 border-b-3 border-b-white hover:border-b-orange-500 rounded-t [&.active]:border-b-amber-600  [&.active]:font-bold'
                    >
                        Home
                    </Link>
                    <Link
                        to='/NotWordle'
                        className='transition ease-in-out px-5 py-2 border-b-3 border-b-white hover:border-b-orange-500 rounded-t [&.active]:border-b-amber-600 [&.active]:font-bold'
                    >
                        <span className='p-1 bg-(--correct) text-white'>N</span>
                        <span className='p-1 bg-(--almost) text-white'>O</span>
                        <span className='p-1 bg-(--incorrect) text-white'>
                            T
                        </span>{' '}
                        - Wordle
                    </Link>
                    <Link
                        to='/PokeHangman'
                        className='transition ease-in-out px-5 py-2 border-b-3 border-b-white hover:border-b-orange-500 rounded-t [&.active]:border-b-amber-600 [&.active]:font-bold'
                    >
                        <span className='text-red-700'>Poké</span>
                        <span className='text-neutral-800'>Hangman</span>
                    </Link>
                    <Link
                        to='/Game2048'
                        className='transition ease-in-out px-5 py-2 border-b-3 border-b-white hover:border-b-orange-500 rounded-t [&.active]:border-b-amber-600 [&.active]:font-bold'
                    >
                        <span>2048</span>
                    </Link>
                </nav>
            </header>
            <Outlet />
        </>
    ),
});
