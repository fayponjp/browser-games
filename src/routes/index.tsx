import { createFileRoute, Link, type LinkProps } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/')({
    component: () => <Home />,
});

function Card({
    title,
    route,
    customClasses,
    description,
}: {
    title: string | ReactNode;
    route: LinkProps['to'];
    customClasses?: string;
    description?: string | ReactNode;
}) {
    return (
        <section
            className={`${customClasses} grid grid-rows-[1fr_auto] shadow rounded hover:-translate-1 grow max-h-70 transition ease-in-out  lg:max-w-[50%] overflow-hidden`}
        >
            <div className='p-4 flex flex-col gap-2 grow'>
                <h2>{title}</h2>
                {description}
            </div>
            <div className='bg-white px-4 py-1'>
                <Link
                    to={route}
                    className=' w-full cursor-pointer underline text-blue-500'
                >
                    Play
                </Link>
            </div>
        </section>
    );
}

function Home() {
    return (
        <>
            <main className='grid grid-rows-[auto_1fr] gap-4 p-8'>
                <h2 className='py-8 text-5xl font-mono max-w-5xl w-full mx-auto'>
                    Games
                </h2>
                <div className='flex flex-col lg:flex-row gap-4 max-w-5xl w-full mx-auto'>
                    <Card
                        title={
                            <>
                                <span className='p-1 bg-(--correct) text-white'>
                                    N
                                </span>
                                <span className='p-1 bg-(--almost) text-white'>
                                    O
                                </span>
                                <span className='p-1 bg-(--incorrect) text-white'>
                                    T
                                </span>{' '}
                                - Wordle
                            </>
                        }
                        description={
                            <>
                                <p>
                                    Guess the randomly-generated 5-letter word!
                                </p>
                                <p>Only valid words will count as guesses.</p>
                                <p>
                                    Mechanics and look are based off the NY
                                    Times'{' '}
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
                        }
                        route='/NotWordle'
                        customClasses='border-(--correct) bg-(--wordle-bg) text-white'
                    />
                    <Card
                        title={
                            <>
                                <span className='text-red-700'>Poké</span>
                                <span className='text-neutral-800'>
                                    Hangman
                                </span>
                            </>
                        }
                        description={
                            <>
                                <p>A pocket monster-themed twist on the classic word game.</p>
                                <p>Guess the pokémon's name before the pokéball is fully drawn!</p>
                            </>
                        }
                        route='/PokeHangman'
                        customClasses='bg-red-700/50'
                    />
                </div>
            </main>
            <footer className='bg-slate-800 text-white flex'>
                <div className='max-w-5xl mx-auto w-full text-end text-sm py-2'>
                    © GameTryal 2026
                </div>
            </footer>
        </>
    );
}
