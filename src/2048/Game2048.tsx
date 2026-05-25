import { useEffect, useState } from 'react';
import {
    tileVariants,
    valid2048InputsArr,
} from '../shared-utils/types-interfaces';
import type { Tile } from '../shared-utils/types-interfaces';
import { genInitialTiles } from './2048.util';

export default function Game2048() {
    const [tiles, setTiles] = useState<Tile[]>(genInitialTiles);

    // action logic - direction is up/down, then handle y +/-. x +/-
    // if up/down and y is 0/3 respectively, don't do anything. if left/right and x is 0/3 respectively, don't do anything.
    // derive the graphic from the tiles. every action is done to the tiles
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

    // might make this into an async function? returns
    const inputHandler = (directionInput: string): void => {
        if (valid2048InputsArr.includes(directionInput)) {
            // if LEFT, if RIGHT
            if (
                directionInput.toLowerCase() === 'a' ||
                directionInput === 'ArrowLeft'
            ) {
                let tilesRow = 0;
                let prevTile: Tile | undefined = undefined;
                let currentTile: Tile | undefined = undefined;

                //if LEFT, 0; 3
                let initIndex = 0;

                while (tilesRow <= 3) {
                    const processRow = tiles.filter(
                        (tile) => tile.x === tilesRow && tile.value
                    );

                    const emptyRows = tiles.filter(
                        (tile) => tile.x === tilesRow && !tile.value
                    )
                    console.log(emptyRows)

                    for (let i = 0; i <= processRow.length; i++) {
                        currentTile = processRow[i];

                        // if (prevTile && currentTile.value) {
                        //     if (
                        //         prevTile.value === currentTile.value &&
                        //         !prevTile.merged
                        //     ) {
                        //         processRow[i - 1] = {
                        //             ...currentTile,
                        //             value: currentTile.value * 2,
                        //             merged: true,
                        //         };
                        //     } else if (!prevTile.value) {
                        //         processRow[i-1] = currentTile;
                        //     }
                        // }

                        prevTile = currentTile;

                        // processRow[i] = {...processRow[i], x: i}
                    } 

                    tilesRow++;
                }
            } else if (
                directionInput.toLowerCase() === 'd' ||
                directionInput === 'ArrowRight'
            ) {
                console.log('right');
            }
        }
    };
    // useKeyhandler([], inputHandler);

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) =>
            inputHandler(e.key),
        );
    }, []);
    return (
        <div className='font-[Rubik] font-bold h-full w-full flex items-center justify-center bg-gray-800'>
            <div className='grid grid-cols-4 grid-rows-4 rounded-2xl p-3 gap-3 bg-(--board-bg)'>
                {board}
            </div>
        </div>
    );
}
