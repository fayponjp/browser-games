import { useEffect, useRef, useState } from 'react';

import type { Tile } from '../shared-utils/types-interfaces';
import { genInitialTiles, handleHorizontal, handleVertical } from './2048.util';
import {
    processDirection,
    tileVariants,
    valid2048InputsArr,
    type Direction,
} from './types-2048';
import { useTouchHandler } from '../shared-utils/hooks';

export default function Game2048() {
    const [tiles, setTiles] = useState<Tile[]>(genInitialTiles);

    const [animationDirection, setAnimationDirection] = useState<Direction | undefined>();

    let board: React.ReactElement[] = [];
    for (let tile of tiles) {
        const element = (
            <div
                key={`tile-${tile.x}-${tile.y}`}
                className={`h-26 w-26 flex rounded-lg ${tile.value ? `${tileVariants[tile.value]} shadow-sm shadow-black/50` : 'bg-(--board-card-null) inset-shadow-xs inset-shadow-black/75'}`}
            >
                <span className='m-auto'>{tile.value}</span>
                <p className='text-sm absolute'>{tile.x},{tile.y}</p>
            </div>
        );

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
    useTouchHandler(tileContainer);

    // useEffect(() => {
    //     console.log(tiles)
    // }, [tiles])

    return (
        <div className='font-[Rubik] font-bold h-full w-full flex items-center justify-center bg-gray-800'>
            <div ref={tileContainer} className='grid grid-cols-4 grid-rows-4 rounded-2xl p-3 gap-3 bg-(--board-bg)'>
                {board}
            </div>
        </div>
    );
}
