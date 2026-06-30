import { Link } from '@tanstack/react-router';
import { Card } from './GameCard';
import { GameRoute } from './landing.types';
import './landing.css';
import { useLanding } from './landing.util';
import { games } from './games.objects';
export const Landing = () => {
    const { activeGame } = useLanding();
    const activeGameRoute = GameRoute[activeGame];

    const cardComponents = games.map((game) => {
        return (
            <Card
                key={game.name}
                title={game.title}
                description={game.description}
                name={game.name}
            />
        );
    });

    return (
        <main className='grid w-full max-w-5xl relative grid-rows-[auto_1fr_auto] font-[Rubik] h-full gap-4 p-8 m-auto '>
            <h2 className='py-8 text-5xl font-mono max-w-5xl w-full mx-auto'>
                Games
            </h2>
            <div className='flex flex-col lg:flex-row gap-4 max-w-5xl w-full mx-auto justify-between'>
                {cardComponents}
            </div>

            <Link
                to={activeGameRoute}
                className='pressable-link fixed shadow-lg shadow-[#46ff56] z-11 bottom-10 left-10 lg:inset-x-0 lg:bottom-25 w-fit mx-auto block rounded cursor-pointer'
            >
                <div className='link-facade rounded font-[Rubik] py-4 px-5 lg:text-3xl text-lg font-bold'>
                    PLAY
                    {' '}<span className='lg:text-lg'>{activeGame}</span>
                </div>
            </Link>
        </main>
    );
};
