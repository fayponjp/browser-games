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
            className={`${activeGameMatch ? ' transition ease-in-out -translate-x-2  lg:-translate-y-2 shadow-[#46ff56]' : ''}  shadow-lg  z-10 grid relative grid-rows-[1fr_auto] max-h-90 rounded lg:max-w-[50%]`}
            onClick={() => setActiveGame(name)}
        >
            <div className='p-4 flex flex-col gap-2 z-11 rounded bg-(--game-card-bg-dark) leading-relaxed'>
                <h2 className='font-bold'>{title}</h2>
                {description}
            </div>
        </section>
    );
};