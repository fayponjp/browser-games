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
            <>
                <span className='text-red-700'>Poké</span>
                <span >Hangman</span>
            </>
        ),
        description: (
            <>
                <p>A pocket monster-themed twist on the classic word game.</p>
                <p>
                    Guess the pokémon's name before the pokéball is fully drawn!
                </p>
            </>
        ),
        name: 'PokeHangman',
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
            <div>
                <span>Who's that pokemon?</span>
            </div>
        ),
        description: (
            <>
                <p>A recreation of the eyecatch in the pokemon anime.</p>
            </>
        ),
        name: 'Who\'s that Pokemon?'
    }
];
