import { NavigationLinks } from './NavigationLink';

export const NavigationPopover = () => {
    return (
        <div className='relative m-auto w-full max-w-5xl'>
            <button
                popoverTarget='navPopover'
                className='font-mono flex-row flex gap-2 [anchor-name:--nav-anchor] cursor-pointer absolute right-2 lg:right-0 top-5 shadow-md bg-gray-50 p-2 rounded hover:bg-slate-100 transition-colors ease-in-out'
            >
                <span className='text-2xl hidden lg:block text-board-brown'>
                    MENU
                </span>{' '}
                <span className='text-board-brown text-3xl'>&#9776;</span>
            </button>
            <div
                id='navPopover'
                popover='auto'
                className='animate-down lg:my-2 lg:mx-0 mx-2 overflow-visible font-mono [position-anchor:--nav-anchor] [position-area:span-bottom_left] lg:[position-area:bottom_span-left] inset-0 absolute rounded'
            >
                <nav className='flex flex-col gap-0.5 text-center overflow-visible max-w-45'>
                    <NavigationLinks classes='bg-white' route='/'>
                        <span>Home</span>
                    </NavigationLinks>
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
        </div>
    );
};

export const NavigationBar = () => {
    return (
        <div>
            This is the header
        </div>
    )
}