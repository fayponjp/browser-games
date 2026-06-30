import './gamepkmn.css';
import { useGetPkmn, usePkmnGuessing } from './pokemon.hooks';
import { PlayerUI } from './PlayerUI/PlayerUI';

const TypeDisplay = ({ typeValue }: { typeValue: string }) => {
    return (
        <div
            className='p-2 rounded text-white w-20 text-center'
            style={{
                backgroundColor: `var(--type-${typeValue})`,
                color: `contrast-color(var(--type-${typeValue}))`,
            }}
        >
            {typeValue.toUpperCase()}
        </div>
    );
};

export const GuessPokemon = () => {
    const { pokemonSprite, options, pkmnType } = usePkmnGuessing();
    const { Typing, Reveal } = options;

    useGetPkmn();
    const typeElements = pkmnType?.map((typeStr: string) => (
        <TypeDisplay typeValue={typeStr} />
    )) || undefined;

    return (
        <div className='lg:w-full steps-bg relative items-center text-[#2b2a2a] dark:text-[#f3eded] shadow shadow-gray-500 max-w-xl w-[calc(100%-1rem)] mx-auto grid grid-rows-[auto_1fr] my-4 font-[Rubik] rounded-2xl overflow-hidden'>
            <div className='mx-auto overflow-hidden w-full h-full mt-auto pkmn-glow relative flex text-6xl '>
                <img
                    className={`${Reveal ? '' : 'sprite'} max-h-[60%] z-10 aspect-square m-auto transition ease-in-out`}
                    src={pokemonSprite}
                />
                <div className=' text-outline-white absolute mx-auto inset-x-0 bottom-9 text-center z-10'>
                    <p>?</p>
                    <p>POKéMON</p>
                </div>
                <div
                    className={`absolute w-full justify-center font-bold gap-2 mb-1 flex flex-row mx-auto bottom-0 transition-discrete  text-sm ${Typing ? '' : 'hidden'}`}
                >
                    {typeElements}
                </div>
            </div>
            <PlayerUI />
        </div>
    );
};
