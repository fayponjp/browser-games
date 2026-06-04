import { useEffect, useRef } from 'react';
import { handleHorizontal, handleVertical } from './2048.util';
import {
    animateDirection,
    processDirection,
    tileVariants,
    valid2048InputsArr,
    type Direction,
} from './types-2048';
import {
    useGroupAnimatingTiles,
    useClearAnimatingTiles,
    useSwipe,
    useCheckForValidMoves,
} from './hooks-2048';
import { use2048 } from './hooks-2048';

export default function Game2048() {
    const {
        tiles,
        topScore,
        updateTopScore,
        animatingTiles,
        updateTiles,
        currentDirection,
        score,
        updateScore,
        updateDirection,
        gameOver,
        resetGame,
    } = use2048();

    let board: React.ReactElement[] = [];
    for (let tile of tiles) {
        const isRemoving = animatingTiles.removed.has(tile.id);
        const isAppearing = animatingTiles.appearing.has(tile.id);

        const variantValue = tile.value
            ? tile.value > 2048
                ? 'high'
                : tile.value
            : undefined;

        const element = (
            <div
                key={`tile-${tile.id}`}
                className={`h-full aspect-square flex rounded-lg 
                    transition-colors
                    duration-100
                    ease-in-out
                    ${isAppearing ? animateDirection[currentDirection!] : ''}
                    ${
                        variantValue
                            ? `${tileVariants[variantValue]} shadow-sm shadow-black/50`
                            : 'bg-(--board-card-null) inset-shadow-xs inset-shadow-black/75'
                    }`}
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
                const { newTileGrid, pointsEarned } = handleHorizontal(
                    prevTiles,
                    direction,
                );
                updateScore((prev) => prev + pointsEarned);
                return newTileGrid;
            } else {
                const { newTileGrid, pointsEarned } = handleVertical(
                    prevTiles,
                    direction,
                );
                updateScore((prev) => prev + pointsEarned);
                return newTileGrid;
            }
        });
    };

    useEffect(() => {
        const handleKeyInput = (e: KeyboardEvent) => {
            if (valid2048InputsArr.includes(e.key)) {
                const direction = processDirection[e.key];
                updateDirection(direction);
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

    useEffect(() => {
        updateTopScore((prev) => {
            if (prev< score) return score;
            return prev;
        })
    }, [score])

    return (
        <div className='font-[Rubik] font-bold h-full w-full flex flex-col items-center justify-center bg-orange-200/10'>
            <div
                ref={tileContainer}
                className='grid grid-cols-4 grid-rows-4 rounded-2xl p-3 gap-3 bg-(--board-bg) max-w-lg w-full aspect-square'
            >
                {board}
            </div>

            <div className='m-4 text-board-brown font-medium flex flex-row justify-between w-full max-w-lg bg-(--board-card-2) p-2 rounded'>
                <span className='py-2'>Score: {score}</span>
                <span className='py-2'>Top Score: {topScore}</span>
                <span className='py-2 font-bold'>
                    {gameOver ? 'Game Over!' : ''}
                </span>
                <button
                    className='cursor-pointer text-white bg-amber-950/40 rounded-sm py-2 px-3 hover:bg-amber-950/30'
                    onClick={resetGame}
                >
                    New Game
                </button>
            </div>
        </div>
    );
}
