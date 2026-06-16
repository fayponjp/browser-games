import type { GameDetails } from './landing.types';
import { useLanding } from './landing.util';

export const Card = ({
    title,
    description,
    name
} : 
    GameDetails, 
) => {
    const { setActiveGame, activeGame } = useLanding();
    const activeGameMatch = name === activeGame;
    return (
        <section
            className={`${activeGameMatch ? 'outline-skew transition ease-in-out -translate-x-2  lg:-translate-y-2' : ''} shadow-sm shadow-[#ceffd3] z-10 grid relative grid-rows-[1fr_auto] rounded grow max-h-90  lg:max-w-[50%]`}
            onClick={() => setActiveGame(name)}
        >
            <div className='p-4 flex flex-col gap-2 grow z-11 bg-(--game-card-bg)'>
                <h2 className='font-bold'>{title}</h2>
                {description}
            </div>
        </section>
    );
};