import { useLocation } from '@tanstack/react-router';
import { NavigationLink } from './NavigationLink';
import './navigation.css';
import { games } from '../landing/games.objects';
import { GameRoute } from '../landing/landing.types';
import { Link } from '@tanstack/react-router';
export const NavigationPopover = () => {
    const navigationLinks = games.map((game) => {
        if (game.name) return <NavigationLink key={game.name} route={GameRoute[game.name]} >{game.title}</NavigationLink>
    });
    return (
        <div className='relative m-auto w-full flex flex-row justify-between items-center max-w-5xl px-3 py-1'>
            <button
                popoverTarget='navPopover'
                className='font-mono gradient-text text-(--theme-green) flex-row lg:ml-0 flex gap-2 [anchor-name:--nav-anchor] cursor-pointer hover:shadow-[inset_0_-2px_0_0_var(--theme-green)] transition-colors ease-in-out'
            >
                <span className='text-2xl hidden lg:block'>
                    MENU
                </span>{' '}
                <span className='lg:text-3xl text-6xl'>&#9776;</span>
            </button>
            <div
                id='navPopover'
                popover='auto'
                className='animate-right bg-transparent backdrop:bg-gray-700/50 lg:backdrop:bg-transparent lg:my-2 lg:mx-0 mx-2 mt-2 lg:mt-0 overflow-visible [position-anchor:--nav-anchor] [position-area:right_span-bottom] lg:[position-area:bottom_span-right] inset-0 absolute'
            >
                <nav className='flex bg-(--game-card-bg) flex-col gap-2 skew-x-10 shadow-xs shadow-white overflow-hidden max-w-45'>
                    {navigationLinks}
                </nav>
            </div>
            <Link to='/' className='gradient-text text-2xl'>HOME</Link>
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