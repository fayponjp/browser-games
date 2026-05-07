import { useState } from 'react';
import { useKeyhandler } from '../utils/shared';

export default function Game2048() {
    const grid = new Array(4).fill(0).map((_, i) => {
        return new Array(4).fill(null).map((_, j) => (
            <div
                className='h-full text-center text-3xl flex rounded font-bold bg-amber-200'
                key={`col${i}-row${j}`}
            >
                <div className='m-auto'>0</div>
            </div>
        ));
    });
    const inputHandler = (directionInput: string): void => {
        console.log(directionInput);
    };
    useKeyhandler([], inputHandler);
    return (
        <div className='h-full w-full flex items-center justify-center bg-gray-800'>
            <div className='grid grid-rows-4 gap-8 p-8 grid-cols-4 rounded max-h-700 h-[60%] max-w-lg items-center justify-center w-[95%]  bg-gray-500/50'>
                {grid}
            </div>
        </div>
    );
}
