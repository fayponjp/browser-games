import type { Tile } from '../shared-utils/types-interfaces';
import type { Direction } from './types-2048';

const generateCoords = () => {
    function getRandomTile() {
        return Math.floor(Math.random() * 4);
    }

    const x = getRandomTile();
    const y = getRandomTile();

    const coords = [x, y];

    return coords;
};

const initialCoords = () => {
    const firstSet = generateCoords();
    let secondSet = generateCoords();

    while (firstSet[0] === secondSet[0] && firstSet[1] === secondSet[1]) {
        secondSet = generateCoords();
    }

    return [firstSet, secondSet];
};

const generateTileValue = () => {
    const rand = Math.random();
    return rand > 0.2 ? 2 : 4;
};

export const genInitialTiles = () => {
    const initCoords = initialCoords();
    const initTileBoard: Tile[] = [];
    const [firstSet, secondSet] = initCoords;
    const [firstSetX, firstSetY] = firstSet;
    const [secondSetX, secondSetY] = secondSet;

    Array.from(Array(4).keys()).map((rowId) =>
        Array.from(Array(4).keys()).map((colId) => {
            let initValue: number | undefined = undefined;
            if (
                (firstSetX === rowId && firstSetY === colId) ||
                (secondSetX === rowId && secondSetY === colId)
            ) {
                initValue = generateTileValue();
            }

            // if (rowId === 0 && colId === 0) initValue = 2;
            // if (rowId === 0 && colId === 1) initValue = 4;
            // if (rowId === 1 && colId === 0) initValue = 8;
            // if (rowId === 1 && colId === 1) initValue = 8;
            // if (rowId === 1 && colId === 3) initValue = 16;
            // if (rowId === 2 && colId === 2) initValue = 32;
            // if (rowId === 2 && colId === 3) initValue = 64;
            // if (rowId === 3 && colId === 3) initValue = 128;
            // if (rowId === 3 && colId === 1) initValue = 256;
            // if (rowId === 3 && colId === 0) initValue = 512;
            // if (rowId === 0 && colId === 3) initValue = 1024;
            // if (rowId === 0 && colId === 3) initValue = 64

            initTileBoard.push({
                x: rowId,
                y: colId,
                merged: false,
                value: initValue,
                classes: ''
            });
        }),
    );

    return initTileBoard;
};

const generateNewTile = (tiles: Tile[]) => {

    const arrLength = tiles.length;
    let isNull = false;

    while (!isNull) {
        const randomIndex = Math.ceil(Math.random() * (arrLength - 1));

        if (!tiles[randomIndex].value) {
            tiles[randomIndex].value = generateTileValue();
            isNull = true;
        }
    }
}

export const handleHorizontal = (tiles: Tile[], direction: Direction): Tile[] => {
    let tilesRowIndex = 0;

    const newTileGrid: Tile[] = [];
    let nullTileTotalQty = 0;
    let didTilesUpdate = false;
    while (tilesRowIndex <= 3) {
        const processRow = tiles.filter((tile) => tile.x === tilesRowIndex);

        const valuedTilesQty = processRow.filter((tile) => tile.value).length;
        const nullTilesQty = processRow.filter((tile) => !tile.value).length;
        nullTileTotalQty += nullTilesQty;
        const valuedTiles: Tile[] = [];
        const nullTiles: Tile[] = [];

        processRow.forEach((tile) => {
            const originalCoord = tile.y;
            let comparisonCoord;
            const updatedValueY = direction === 'Left'
                            ? valuedTiles.length
                            : nullTilesQty + valuedTiles.length;
            const updatedNullY = direction === 'Left'
                            ? valuedTilesQty + nullTiles.length
                            : nullTiles.length;
            if (tile.value) {
                valuedTiles.push({
                    ...tile,
                    y: updatedValueY,
                });

                comparisonCoord = updatedValueY;
            } else {
                nullTiles.push({
                    ...tile,
                    y: updatedNullY,
                });
                comparisonCoord = updatedNullY;
            }

            if (originalCoord !== comparisonCoord) didTilesUpdate = true;
        });

        if (direction === 'Right') valuedTiles.sort((a, b) => b.y - a.y);

        let prevTile: Tile | undefined = undefined;
        let currentTile: Tile | undefined = undefined;

        for (let i = 0; i < valuedTiles.length; i++) {
            currentTile = valuedTiles[i];

            if (prevTile) {
                const currVal = currentTile.value;
                const prevVal = prevTile.value;
                const prevMerged = prevTile.merged;
                const valuesMatch = currVal === prevVal;

                if (valuesMatch && !prevMerged) {
                    valuedTiles[i - 1] = {
                        ...prevTile,
                        value: prevTile!.value! * 2,
                        merged: true,
                        classes: 'animate-shrink'
                    };
                    valuedTiles[i] = {
                        ...currentTile,
                        value: undefined,
                        merged: false,
                        classes: ''
                    };

                    didTilesUpdate = true;
                } else if (!valuesMatch && !prevVal) {
                    valuedTiles[i - 1] = {
                        ...prevTile,
                        value: currentTile.value,
                        merged: true,
                        classes: 'animate-shrink'
                    };
                    valuedTiles[i] = {
                        ...currentTile,
                        value: undefined,
                        merged: false,
                        classes: ''
                    };

                    // didTilesUpdate = true;
                } else {
                    valuedTiles[i].classes = ''
                }
            }

            prevTile = valuedTiles[i];
        }

        if (direction === 'Right') valuedTiles.sort((a, b) => a.y - b.y);

        const conditionalGrid =
            direction === 'Left'
                ? [...valuedTiles, ...nullTiles]
                : [...nullTiles, ...valuedTiles];
        newTileGrid.push(...conditionalGrid);
        tilesRowIndex++;
    }

    newTileGrid.forEach((tile) => tile.merged = false);
    if (didTilesUpdate) generateNewTile(newTileGrid);
    return newTileGrid;
};

export const handleVertical = (tiles: Tile[], direction: Direction): Tile[] => {
    let tilesColumnIndex = 0;

    const newTileGrid: Tile[] = [];
    let nullTileTotalQty = 0;
    let didTilesUpdate = false;

    while (tilesColumnIndex <= 3) {
        const processColumn = tiles.filter(
            (tile) => tile.y === tilesColumnIndex,
        );

        const valuedTilesQty = processColumn.filter(
            (tile) => tile.value,
        ).length;
        const nullTilesQty = processColumn.filter((tile) => !tile.value).length;
        nullTileTotalQty += nullTilesQty;
        const valuedTiles: Tile[] = [];
        const nullTiles: Tile[] = [];

        processColumn.forEach((tile) => {
            const originalCoord = tile.x;
            let comparisonCoord;
            const updatedValueX = direction === 'Up'
                        ? valuedTiles.length
                        : nullTilesQty + valuedTiles.length;
            const updatedNullX = direction === 'Up'
                            ? valuedTilesQty + nullTiles.length
                            : nullTiles.length;
            if (tile.value) {
                valuedTiles.push({
                    ...tile,
                    x: updatedValueX,
                });

                comparisonCoord = updatedValueX;
            } else {
                nullTiles.push({
                    ...tile,
                    x: updatedNullX,
                });

                comparisonCoord = updatedNullX;
            }

            if (originalCoord !== comparisonCoord) didTilesUpdate = true;
        });

        if (direction === 'Down') valuedTiles.sort((a, b) => b.x - a.x);

        let prevTile: Tile | undefined = undefined;
        let currentTile: Tile | undefined = undefined;

        for (let i = 0; i < valuedTiles.length; i++) {
            currentTile = valuedTiles[i];

            if (prevTile) {
                const currVal = currentTile.value;
                const prevVal = prevTile.value;
                const prevMerged = prevTile.merged;
                const valuesMatch = currVal === prevVal;

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

                    didTilesUpdate = true;
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

                    // didTilesUpdate = true;
                }
            }

            prevTile = valuedTiles[i];
        }

        if (direction === 'Down') valuedTiles.sort((a, b) => b.x - a.x);

        const conditionalGrid = direction === 'Up'
                ? [...valuedTiles, ...nullTiles]
                : [...nullTiles, ...valuedTiles];

        newTileGrid.push(...conditionalGrid);

        tilesColumnIndex++;
    }

    newTileGrid.sort((a,b) => a.x - b.x || a.y - b.y);
    newTileGrid.forEach((tile) => tile.merged = false);
    if (didTilesUpdate) generateNewTile(newTileGrid);
    return newTileGrid;
};
