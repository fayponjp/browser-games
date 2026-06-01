import { useEffect, useRef, useState } from 'react';

import type { Tile } from '../shared-utils/types-interfaces';
import { genInitialTiles, handleHorizontal, handleVertical } from './2048.util';
import {
    processDirection,
    tileVariants,
    valid2048InputsArr,
    type Direction,
} from './types-2048';
import { useSwipe, useTouchHandler } from '../shared-utils/hooks';

export default function Game2048() {
    const [tiles, setTiles] = useState<Tile[]>(genInitialTiles);
    // derive score 
    // check if moves are possible for game over
    const [animationDirection, setAnimationDirection] = useState<
        Direction | undefined
    >();

    let score = 0;

    let board: React.ReactElement[] = [];
    for (let tile of tiles) {
        const element = (
            <div
                key={`tile-${tile.x}-${tile.y}`}
                // ${tile.classes} 
                className={`h-26 w-26 flex rounded-lg 
                    transition-colors
                    duration-100
                    ease-in-out
                    ${tile.value ? `${tileVariants[tile.value]} shadow-sm shadow-black/50` 
                    : 'bg-(--board-card-null) inset-shadow-xs inset-shadow-black/75'}`}
            >
                <span className='m-auto'>{tile.value}</span>
                <p className='text-sm absolute'>
                    {tile.x},{tile.y}
                </p>
            </div>
        );

        score += tile.value || 0;

        board.push(element);
    }

    const inputHandler = (direction: Direction): void => {
        setTiles((prevTiles) => {
            if (direction === 'Left' || direction === 'Right') {
                return handleHorizontal(prevTiles, direction);
            } else {
                return handleVertical(prevTiles, direction);
            }
        });
    };

    const inputHandlerRef = useRef(inputHandler);
    useEffect(() => {
        inputHandlerRef.current = inputHandler;
    });

    useEffect(() => {
        const handleKeyInput = (e: KeyboardEvent) => {
            if (valid2048InputsArr.includes(e.key)) {
                const direction = processDirection[e.key];
                setAnimationDirection(direction);
                inputHandler(direction);
            }
        };
        document.addEventListener('keydown', handleKeyInput);

        return () => document.removeEventListener('keydown', handleKeyInput);
    }, []);

    const tileContainer = useRef(null);
    useSwipe(tileContainer, inputHandler);

    // useEffect(() => {
    //     console.log(tiles)
    // }, [tiles])

    return (
        <div className='font-[Rubik] font-bold h-full w-full flex flex-col items-center justify-center bg-gray-800'>
            <div
                ref={tileContainer}
                className='grid grid-cols-4 grid-rows-4 rounded-2xl p-3 gap-3 bg-(--board-bg)'
            >
                {board}
            </div>

            <div className='m-4 text-white'>
                <p>Score: {score}</p>
            </div>
        </div>
    );
}
