import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: () => (
        <>
            <header className='bg-orange-400'>
                <nav className='flex'>
                    <Link
                        to='/'
                        className='px-5 py-2 hover:bg-orange-300 [&.active]:bg-slate-200 rounded-t [&.active]:text-orange-600 [&.active]:font-bold'
                    >
                        Home
                    </Link>
                    <Link
                        to='/NotWordle'
                        className='px-5 py-2 hover:bg-orange-300 [&.active]:bg-zinc-800 rounded-t [&.active]:text-gray-200 [&.active]:font-bold'
                    >
                        <span className='p-1 bg-(--correct) text-white'>N</span><span className='p-1 bg-(--almost) text-white'>O</span><span className='p-1 bg-(--incorrect) text-white'>T</span> - Wordle
                    </Link>
                    <Link
                        to='/PokeHangman'
                        className='px-5 py-2 hover:bg-orange-300 [&.active]:bg-slate-200 rounded-t [&.active]:font-bold'
                    >
                        <span className='text-red-700'>Poké</span><span className='text-neutral-800'>Hangman</span>
                    </Link>
                </nav>
            </header>
            <Outlet />
        </>
    ),
});
