import { NavigationLinks } from './NavigationLink';
import burger from '../assets/burger.svg';

export const NavigationPopover = () => {
    return (
        <>
            <button
                popoverTarget='navPopover'
                className='font-mono [anchor-name:--nav-anchor] cursor-pointer absolute top-3 right-3 shadow bg-gray-50 p-2 rounded hover:bg-slate-100 transition-colors ease-in-out'
            >
                <img className='h-8' src={burger} />
            </button>
            <div
                id='navPopover'
                popover='auto'
                className='animate-down overflow-visible font-mono [position-anchor:--nav-anchor] [position-area:span-bottom_left] lg:[position-area:bottom_span-left] inset-0 absolute rounded'
            >
                <nav className='flex flex-col text-center overflow-visible max-w-45'>
                    <NavigationLinks
                        classes='bg-black text-white'
                        route='/NotWordle'
                    >
                        <span className='p-1 bg-(--correct) text-white'>N</span>
                        <span className='p-1 bg-(--almost) text-white'>O</span>
                        <span className='p-1 bg-(--incorrect) text-white'>
                            T
                        </span>{' '}
                        - Wordle
                    </NavigationLinks>
                    <NavigationLinks route='/PokeHangman' classes='bg-white'>
                        <span className='text-red-700'>Poké</span>
                        <span className='text-neutral-800'>Hangman</span>
                    </NavigationLinks>
                    <NavigationLinks
                        route='/Game2048'
                        classes='text-board-brown font-[Rubik] text-xl p-1 bg-(--board-card-2)'
                    >
                        <span>2048</span>
                    </NavigationLinks>
                </nav>
            </div>
        </>
    );
};
