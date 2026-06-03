import { useEffect, useRef } from 'react';
import { handleHorizontal, handleVertical } from './2048.util';
import {
    processDirection,
    tileVariants,
    valid2048InputsArr,
    type Direction,
} from './types-2048';
import { useGroupAnimatingTiles, useClearAnimatingTiles, useSwipe, useCheckForValidMoves } from './hooks-2048';
import { use2048 } from './hooks-2048';

export default function Game2048() {
    const { tiles, animatingTiles, updateTiles, score, updateScore, gameOver } = use2048();

    let board: React.ReactElement[] = [];
    for (let tile of tiles) {
        const isRemoving = animatingTiles.removed.has(tile.id);
        const isAppearing = animatingTiles.appearing.has(tile.id);
        
        const element = (
            <div
                key={`tile-${tile.id}`}
                className={`h-26 w-26 flex rounded-lg 
                    transition-colors
                    duration-100
                    ease-in-out
                    ${isRemoving ? 'animate-shrinkOut' : ''}
                    ${isAppearing ? 'animate-popIn' : ''}
                    ${tile.value ? `${tileVariants[tile.value]} shadow-sm shadow-black/50` 
                    : 'bg-(--board-card-null) inset-shadow-xs inset-shadow-black/75'}`}
            >
                <span className='m-auto'>{tile.value}</span>
            </div>
        );
        board.push(element);
    }

    useGroupAnimatingTiles();
    useClearAnimatingTiles();
    useCheckForValidMoves();

    const inputHandler = (direction: Direction): void => {
        updateTiles((prevTiles) => {
            if (direction === 'Left' || direction === 'Right') {
                const {newTileGrid, pointsEarned} = handleHorizontal(prevTiles, direction);
                updateScore((prev) => prev + pointsEarned);
                return newTileGrid;
            } else {
                const {newTileGrid, pointsEarned} = handleVertical(prevTiles, direction);
                updateScore((prev) => prev + pointsEarned)
                return newTileGrid
            }
        });
    };

    useEffect(() => {
        const handleKeyInput = (e: KeyboardEvent) => {
            if (valid2048InputsArr.includes(e.key)) {
                const direction = processDirection[e.key];
                inputHandler(direction);
            }
        };
        document.addEventListener('keydown', handleKeyInput);

        if (gameOver) {
            document.removeEventListener('keydown', handleKeyInput);
        }
        return () => document.removeEventListener('keydown', handleKeyInput);
    }, [gameOver]);

    const tileContainer = useRef(null);
    useSwipe(tileContainer, inputHandler);

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
