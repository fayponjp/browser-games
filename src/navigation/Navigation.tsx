import { useLocation } from '@tanstack/react-router';
import { NavigationLinks } from './NavigationLink';
import './navigation.css';

export const NavigationPopover = () => {
    return (
        <div className='relative m-auto w-full max-w-5xl'>
            <button
                popoverTarget='navPopover'
                className='font-mono gradient-text text-(--theme-green) flex-row ml-2 lg:ml-0 flex gap-2 [anchor-name:--nav-anchor] cursor-pointer p-2 rounded-xs hover:shadow-[inset_0_-2px_0_0_var(--theme-green)] transition-colors ease-in-out'
            >
                <span className='text-2xl hidden lg:block'>
                    MENU
                </span>{' '}
                <span className='lg:text-3xl text-5xl'>&#9776;</span>
            </button>
            <div
                id='navPopover'
                popover='auto'
                className='animate-down bg-gray-300 text-(--theme-green) backdrop:bg-gray-700/50 lg:backdrop:bg-transparent lg:my-2 lg:mx-0 mx-2 mt-2 lg:mt-0 overflow-hidden [position-anchor:--nav-anchor] [position-area:right_span-bottom] lg:[position-area:bottom_span-right] inset-0 absolute rounded'
            >
                <nav className='flex flex-col gap-0.5 overflow-visible max-w-45'>
                    <NavigationLinks route='/'>
                        <span>Home</span>
                    </NavigationLinks>
                    <NavigationLinks
                        route='/NotWordle'
                        classes='text-white'
                    >
                        <span className='p-1 bg-(--correct)'>N</span>
                        <span className='p-1 bg-(--almost)'>O</span>
                        <span className='p-1 bg-(--incorrect)'>
                            T
                        </span>{' '}
                        <span className='text-black'>- Wordle</span>
                    </NavigationLinks>
                    <NavigationLinks route='/PokeHangman'>
                        <span className='text-red-700'>Poké</span>
                        <span className='text-neutral-800'>Hangman</span>
                    </NavigationLinks>
                    <NavigationLinks
                        route='/Game2048'
                        classes='font-[Rubik]'
                    >
                        <span>2048</span>
                    </NavigationLinks>
                </nav>
            </div>
        </div>
    );
};

export const NavigationBar = () => {
    const location = useLocation();

    const isHome = location.pathname === '/';

    return (
        <div className={`w-full bg-(--theme-dark) ${isHome ? 'hidden' : ''}`}>
            <NavigationPopover />
        </div>
    )
}