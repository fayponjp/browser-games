import type { GameDetails } from './landing.types';

export const games: GameDetails[] = [
    {
        title: (
            <>
                <span className='p-1 bg-(--correct) text-white'>N</span>
                <span className='p-1 bg-(--almost) text-white'>O</span>
                <span className='p-1 bg-(--incorrect) text-white'>T</span> -
                Wordle
            </>
        ),
        description: (
            <>
                <p>Guess the randomly-generated 5-letter word!</p>
                <p>Only valid words will count as guesses.</p>
                <p>
                    Mechanics and look are based off the NY Times'{' '}
                    <a
                        target='_blank'
                        className=' text-orange-600 underline'
                        href='https://www.nytimes.com/games/wordle/index.html'
                    >
                        Wordle
                    </a>{' '}
                    browser game.
                </p>
            </>
        ),
        name: 'Not Wordle',
    },
    {
        title: (
            <div className='bg-(--board-card-128) w-fit px-2 rounded'>
                <span>2048</span>
            </div>
        ),
        description: (
            <>
                <p>Combine same-value tiles to get a bigger tile and aim for the highest score!</p>
                <p>
                    Based on the popular game from{' '}
                    <a
                        href='https://play2048.co/'
                        target='_blank'
                        className=' text-orange-600 underline'
                    >
                        Play2048.co
                    </a>.
                </p>
            </>
        ),
        name: '2048',
    },
    {
        title: (
            <div className='relative flex items-center gap-2'>
                <div
                    className={`rounded-[50%] relative border-4 border-(--theme-dark) h-10 aspect-square flex overflow-hidden shadow`}
                >
                    <div
                        className={`absolute max-h[50%] top-0 bottom-[50%] bg-red-600 w-full`}
                    ></div>
                    <div
                        className={`absolute max-h[50%] top-[50%] bottom-0 bg-white w-full`}
                    ></div>
                    <div
                        className={`rounded-[50%] border-3 border-(--theme-dark) flex h-4 aspect-square m-auto bg-white z-10`}
                    >
                        <div className='rounded-[50%] h-1 aspect-square bg-white border z border-(--theme-dark) m-auto'></div>
                    </div>
                    <div className='absolute flex top-0 bottom-0 w-full'>
                        <div
                            className={`border-2 border-(--theme-dark) my-auto w-full`}
                        ></div>
                    </div>
                </div>
                <span className='text-xs'>Who's that pokémon?</span>
            </div>
        ),
        description: (
            <>
                <p>Identify the pokémon from their silhouette!</p>
                <p>A recreation of the eyecatch in the pokémon anime.</p>
            </>
        ),
        name: 'Who\'s that Pokemon?'
    }
];
