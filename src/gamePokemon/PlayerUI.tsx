import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { usePkmnGuessing } from './pokemon.hooks';

export const PlayerUI = () => {
    const { pokemon, setPokemon, streak, updateStreak } = usePkmnGuessing();
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentInput, setCurrentInput] = useState<string>('');
    const handleInputChange = (input: string) => {
        const cleanedInput = input.toLowerCase();
        setCurrentInput(cleanedInput);
    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleEnter = useEffectEvent(() => {
        if (currentInput === pokemon) {
            updateStreak();
            setPokemon(undefined);
        } else {
            console.log('nope');
        }

        setCurrentInput('');
    });

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleEnter();
            }
        };
        document.addEventListener('keydown', handleKeydown);

        return () => document.removeEventListener('keydown', handleKeydown);
    }, []);

    return (
        <div className='flex flex-col items-center grow z-10 bg-transparent max-w-xl w-full h-full mx-auto'>
            <div className='absolute text-(--text-dark) flex flex-row w-[calc(100%-1.5rem)] px-1 text-xl top-5 justify-between'>
                <div
                    className='bg-gray-200/40 w-fit rounded-br-lg rounded-l-xl pr-3 h-fit relative flex flex-row items-center gap-2'
                    onClick={focusInput}
                >
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
                    <span>
                        {currentInput ? (
                            currentInput.toUpperCase()
                        ) : (
                            <p className='text-center italic'>-</p>
                        )}
                    </span>
                </div>

                <div>
                    <span className='text-xs'>STREAK</span> #
                    {streak.toString().padStart(3, '0')}
                </div>
            </div>
            <div className='flex flex-col w-[calc(100%-2rem)] gap-4 h-full mb-4 overflow-hidden px-3 py-3 bg-gray-600/20 dark:bg-gray-600/50 rounded'>
                <div className='focus-within:outline-2 focus-within:outline-blue-300 bg-gray-200 shadow shadow-slate-700 w-full grid grid-cols-[1fr_auto] rounded overflow-hidden pl-2'>
                    <input
                        type='text'
                        className=' text-(--text-dark) outline-hidden'
                        value={currentInput}
                        placeholder={'-'}
                        ref={inputRef}
                        onChange={(e) =>
                            handleInputChange(e.currentTarget.value)
                        }
                    />
                    <button
                        onClick={handleEnter}
                        className={`${pokemon ? '' : 'hidden'} w-fit bg-white py-2 px-1 cursor-pointer text-(--text-dark)`}
                    >
                        <div className='ml-1'>Enter &crarr;</div>
                    </button>
                </div>
                <div className='grow grid grid-rows-[auto_1fr]'>
                    <h2 className='text-xl font-bold border-b border-b-blue-200 pb-2'>How to play</h2>
                    <ul className='flex flex-col justify-evenly max-w-[75%] list-disc pl-4 mt-2'>
                        <li>Guess the pokemon by their silhouette.</li>
                        <li>
                            Enable hints from the buttons on the right if needed.
                        </li>
                        <li>Enabling a hint will reset your streak.</li>
                        <li>Aim for high streaks!</li>
                    </ul>
                    <div className='absolute right-1 bottom-20 grid grid-cols-1 text-xs grid-rows-4 rounded'>
                        {/* <button className='p-1 h-15 cursor-pointer shadow bg-blue-300 dark:bg-blue-500 '>
                            Type
                        </button>
                        <button className='p-1 h-15 cursor-pointer inset-shadow inset-shadow-sm inset-shadow-gray-600/40 shadow bg-blue-300 dark:bg-blue-400 '>
                            Letter Count
                        </button>
                        <button className='p-1 h-15 cursor-pointer shadow bg-blue-300 dark:bg-blue-500 '>
                            Reveal
                        </button> */}
                        <button className='option-btn rounded-xl p-0 cursor-pointer'>
                            <span className='option-facade text-xl block py-3 px-11 rounded-xl -translate-y-2 text-white'>
                                Test
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
