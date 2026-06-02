import { useEffect, useRef, useState } from 'react';

import type { Tile } from '../shared-utils/types-interfaces';
import { genInitialTiles, handleHorizontal, handleVertical } from './2048.util';
import {
    processDirection,
    tileVariants,
    valid2048InputsArr,
    type Direction,
} from './types-2048';
import { useSwipe } from '../shared-utils/hooks';

interface AnimatingTiles {
    removed: Set<string>;
    appearing: Set<string>;
}

export default function Game2048() {
    const [tiles, setTiles] = useState<Tile[]>(genInitialTiles);
    const prevTilesRef = useRef<Tile[]>(tiles);
    const [animatingTiles, setAnimatingTiles] = useState<AnimatingTiles>({
        removed: new Set(),
        appearing: new Set(),
    });

    let score = 0;

    let board: React.ReactElement[] = [];
    for (let tile of tiles) {
        const isRemoving = animatingTiles.removed.has(tile.id);
        const isAppearing = animatingTiles.appearing.has(tile.id);
        
        const element = (
            <div
                key={`tile-${tile.id}`}
                // ${tile.classes} 
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
                <p className='text-sm absolute'>
                    {tile.x},{tile.y}
                </p>
            </div>
        );

        score += tile.value || 0;

        board.push(element);
    }

    // Detect which tiles were removed or appeared
    useEffect(() => {
        const prevTileValueMap = new Map(
            prevTilesRef.current.map((t) => [t.id, t.value])
        );
        const currentTileValueMap = new Map(tiles.map((t) => [t.id, t.value]));

        const removedTiles = new Set<string>();
        const appearingTiles = new Set<string>();

        // Find tiles that became null (were numbered, now null)
        prevTilesRef.current.forEach((tile) => {
            if (tile.value !== undefined && tile.value !== null) {
                const currentValue = currentTileValueMap.get(tile.id);
                if (currentValue === undefined || currentValue === null) {
                    removedTiles.add(tile.id);
                }
            }
        });

        // Find tiles that are new or updated
        tiles.forEach((tile) => {
            if (tile.value !== undefined && tile.value !== null) {
                const prevValue = prevTileValueMap.get(tile.id);
                // New tile or tile that gained a value
                if (prevValue === undefined || prevValue === null) {
                    appearingTiles.add(tile.id);
                } else if (prevValue !== tile.value) {
                    // Tile value changed (merged), treat as appearing
                    appearingTiles.add(tile.id);
                }
            }
        });

        if (removedTiles.size > 0 || appearingTiles.size > 0) {
            setAnimatingTiles({ removed: removedTiles, appearing: appearingTiles });
        }

        prevTilesRef.current = tiles;
    }, [tiles]);

    // Clear animation state after duration
    useEffect(() => {
        if (animatingTiles.removed.size > 0 || animatingTiles.appearing.size > 0) {
            const timer = setTimeout(
                () => setAnimatingTiles({ removed: new Set(), appearing: new Set() }),
                150
            );
            return () => clearTimeout(timer);
        }
    }, [animatingTiles]);

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
