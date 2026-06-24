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
            <div className='flex flex-col w-[calc(100%-2rem)] h-full mb-4 overflow-hidden px-3 py-3 bg-gray-600/50 rounded'>
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
                <div>
                    <h2 className='text-xl font-bold'>How to play</h2>
                    <p>Guess the pokemon by their silhouette</p>
                </div>
            </div>
            <div className='absolute text-(--text-dark) flex flex-row w-[calc(100%-1.5rem)] px-2 text-xl top-6 justify-between'>
                <div className='bg-gray-200/40 max-w-[50%] rounded-br-lg rounded-l-xl w-70 h-fit relative flex flex-row items-center gap-2' onClick={focusInput}>
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
        </div>
    );
};
