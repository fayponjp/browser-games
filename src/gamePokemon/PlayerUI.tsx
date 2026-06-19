import { usePkmnGuessing } from './pokemon.hooks';

export const PlayerUI = () => {
    const {pokemon} = usePkmnGuessing();
    return (
        <div className='flex flex-col items-center rounded-b grow z-10 bg-[#383636] max-w-5xl w-full h-full mx-auto'>
            <div className='relative -mt-9.5'>
                <div
                    className={`rounded-[50%] border-4 border-(--theme-dark) h-20 aspect-square mx-auto flex relative overflow-hidden shadow`}
                >
                    <div
                        className={`absolute max-h[50%] top-0 bottom-[50%] bg-red-600 w-full`}
                    ></div>
                    <div
                        className={`absolute max-h[50%] top-[50%] bottom-0 bg-white w-full`}
                    ></div>
                    <div
                        className={`rounded-[50%] border-4 border-(--theme-dark) flex h-8 w-8 m-auto bg-white z-10`}
                    >
                        <div className='rounded-[50%] h-3 w-3 bg-white border z border-(--theme-dark) m-auto'></div>
                    </div>
                    <div className='absolute flex top-0 bottom-0 w-full'>
                        <div
                            className={`border-2 border-(--theme-dark) my-auto w-full`}
                        ></div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full h-full mx-auto'>
                <input
                    type='text'
                    className='bg-white max-w-28 rounded px-4 py-2 shadow shadow-gray-500'
                />
                <p>{pokemon}</p>
            </div>
        </div>
    );
};
