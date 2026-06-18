import { Link } from '@tanstack/react-router';
import { Card } from './GameCard';
import { GameRoute } from './landing.types';
import './landing.css';
import { useLanding } from './landing.util';
import { games } from './games.objects';
export const Landing = () => {
    const {activeGame } = useLanding();
    const activeGameRoute = GameRoute[activeGame];

    const cardComponents = games.map((game) => {
        return (
            <Card key={game.name} title = {game.title} description={game.description} name={game.name} />
        )
    });
    
    return (
        <main className='grid grid-rows-[auto_1fr_auto] font-[Rubik] h-full gap-4 p-8 lg:min-w-lg m-auto'>
            <h2 className='py-8 text-5xl font-mono max-w-5xl w-full mx-auto'>
                Games
            </h2>
            <div className='flex flex-col lg:flex-row gap-4 max-w-5xl w-full mx-auto'>
                {cardComponents}
            </div>
            <div className='fixed m-auto  w-fit h-fit bottom-10 left-10 lg:inset-x-0 lg:bottom-25 z-100'>
                <Link to={activeGameRoute} className='relative block cursor-pointer hover:scale-110 transition pulse'>
                    <div className='absolute inset-0 bg-linear-to-r dark:to-(--theme-color-gradient-end) to-(--theme-color-gradient-end) from-(--theme-color) translate-x-3 translate-y-2 -skew-x-30' />
                    <div className='px-6 py-4 dark:bg-(--game-card-bg-dark) bg-(--game-card-bg-light) relative -skew-x-30 w-fit transition delay-200 shadow-gray-400 shadow-sm lg:shadow-none'>
                        <span className='skew-x-30 block font-[Rubik] lg:text-3xl text-lg font-bold'>PLAY <span className='lg:text-lg'>{activeGame}</span></span>
                    </div>
                </Link>
            </div>
        </main>
    );
};
