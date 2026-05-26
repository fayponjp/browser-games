import { useEffect, useRef, useState } from 'react';

import type { Tile } from '../shared-utils/types-interfaces';
import { genInitialTiles } from './2048.util';
import {
    processDirection,
    tileVariants,
    valid2048InputsArr,
} from './types-2048';

export default function Game2048() {
    const [tiles, setTiles] = useState<Tile[]>(genInitialTiles);

    let board: React.ReactElement[] = [];
    for (let tile of tiles) {
        const element = (
            <div
                key={`tile-${tile.x}-${tile.y}`}
                className={`h-26 w-26 flex rounded-lg ${tile.value ? `${tileVariants[tile.value]} shadow-sm shadow-black/50` : 'bg-(--board-card-null) inset-shadow-xs inset-shadow-black/75'}`}
            >
                <span className='m-auto'>{tile.value}</span>
            </div>
        );

        board.push(element);
    }

    const inputHandler = (directionInput: string): void => {
        if (valid2048InputsArr.includes(directionInput)) {
            setTiles((prevTiles) => {
                const direction = processDirection[directionInput];
                if (direction === 'Left') {
                    let tilesRow = 0;

                    const newTileGrid: Tile[] = [];
                    while (tilesRow <= 3) {
                        const processRow = prevTiles.filter(
                            (tile) => tile.x === tilesRow,
                        );

                        const valuedTiles: Tile[] = [];
                        const nullTiles: Tile[] = [];
                        processRow.forEach((tile) => {
                            if (tile.value) {
                                const newTile = { ...tile, y: valuedTiles.length };
                                valuedTiles.push(newTile);
                            } else {
                                const newTile = {
                                    ...tile,
                                    y: processRow.length - (nullTiles.length + 1),
                                };
                                nullTiles.push(newTile);
                            }
                        });

                        let prevTile: Tile | undefined = undefined;
                        let currentTile: Tile | undefined = undefined;
                        for (let i = 0; i < valuedTiles.length; i++) {
                            currentTile = valuedTiles[i];

                            if (prevTile) {
                                const currVal = currentTile.value;
                                const prevVal = prevTile.value;
                                const prevMerged = prevTile.merged;
                                const valuesMatch = currVal === prevVal;

                                // match, is not newly merged
                                if (valuesMatch && !prevMerged) {
                                    valuedTiles[i - 1] = {
                                        ...prevTile,
                                        value: prevTile!.value! * 2,
                                        merged: true,
                                    };
                                    valuedTiles[i] = {
                                        ...currentTile,
                                        value: undefined,
                                        merged: false,
                                    };
                                    // don't match, prev is empty so element prior is merged
                                } else if (!valuesMatch && !prevVal) {
                                    valuedTiles[i - 1] = {
                                        ...prevTile,
                                        value: currentTile.value,
                                        merged: true,
                                    };
                                    valuedTiles[i] = {
                                        ...currentTile,
                                        value: undefined,
                                        merged: false,
                                    };
                                }
                            }

                            prevTile = valuedTiles[i];
                        }

                        nullTiles.sort((a, b) => a.y - b.y);
                        newTileGrid.push(...valuedTiles, ...nullTiles);

                        tilesRow++;
                    }

                    newTileGrid.forEach(
                        (tile) => tile.merged = false
                    );

                    return newTileGrid
                } else if (direction === 'Up') {
                    return prevTiles
                }

                return prevTiles
            })
        }
    };
    const inputHandlerRef = useRef(inputHandler);
    useEffect(() => {
        inputHandlerRef.current = inputHandler;
    });

    useEffect(() => {
        const handleKeyInput = (e: KeyboardEvent) => {
            inputHandler(e.key);
        };
        document.addEventListener('keydown', handleKeyInput);

        return () => document.removeEventListener('keydown', handleKeyInput);
    }, []);

    // useEffect(() => {
    //     console.log(tiles)
    // }, [tiles])
    return (
        <div className='font-[Rubik] font-bold h-full w-full flex items-center justify-center bg-gray-800'>
            <div className='grid grid-cols-4 grid-rows-4 rounded-2xl p-3 gap-3 bg-(--board-bg)'>
                {board}
            </div>
        </div>
    );
}
