import { useRef } from 'react';
import { handleHorizontal, handleVertical } from './2048.util';
import {
    animateDirection,
    tileVariants,
    type Direction,
} from './types-2048';
import {
    useGroupAnimatingTiles,
    useClearAnimatingTiles,
    useSwipe,
    useCheckForValidMoves,
    useAttachKeyListener,
    useUpdateScore,
} from './hooks-2048';
import { use2048 } from './hooks-2048';

export default function Game2048() {
    const {
        tiles,
        topScore,
        gameOver,
        animatingTiles,
        updateTiles,
        currentDirection,
        score,
        updateScore,
        resetGame,
    } = use2048();

    let board: React.ReactElement[] = [];
    for (let tile of tiles) {
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
    useAttachKeyListener(inputHandler);

    const tileContainer = useRef(null);
    useSwipe(tileContainer, inputHandler);

    useUpdateScore();

    return (
        <div className='font-[Rubik] bg-orange-50 px-4 font-bold w-full flex gap-4 lg:flex-col flex-col-reverse justify-end lg:justify-start pt-20 lg:items-center'>
            <h1 className='text-board-brown font-medium grid grid-cols-[1fr_1fr_1fr] gap-4 w-full lg:w-full max-w-lg bg-(--board-card-null) p-2 rounded-sm'>
                <dl className='p-2 text-center rounded bg-(--board-card-2)/80'>
                    <dt className='text-sm'>Score:</dt>
                    <dd className='font-bold'>{score}</dd>
                </dl>
                <dl className='p-2 text-center rounded bg-(--board-card-2)/80'>
                    <dt className='text-sm'>Top Score:</dt>
                    <dd className='font-bold'>{topScore}</dd>
                </dl>

                <button
                    className='cursor-pointer text-white transition-colors ease-in-out bg-(--board-card-2048) rounded-sm py-2 px-3 hover:brightness-110'
                    onClick={resetGame}
                >
                    New Game <span>&#8634;</span> 
                </button>
            </h1>
            <div
                ref={tileContainer}
                className='grid grid-cols-4 grid-rows-4 rounded-2xl p-3 gap-3 bg-(--board-bg) w-full lg:max-w-lg lg:w-full aspect-square'
            >
                {board}
            </div>
            <div className={`w-full max-w-lg text-center px-6 py-4 bg-(--board-card-2) text-4xl text-board-brown rounded`}>{gameOver ? 'GAME OVER' : '2048'}</div>
        </div>
    );
}
