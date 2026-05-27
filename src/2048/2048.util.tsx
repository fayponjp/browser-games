import type { Tile } from '../shared-utils/types-interfaces';

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
            // if (
            //     (firstSetX === rowId && firstSetY === colId) ||
            //     (secondSetX === rowId && secondSetY === colId)
            // ) {
            //     initValue = generateTileValue();
            // }

            if (rowId === 0 && colId === 0) initValue = 2;
            if (rowId === 0 && colId === 1) initValue = 4;
            if (rowId === 1 && colId === 0) initValue = 8;
            if (rowId === 1 && colId === 1) initValue = 8;
            if (rowId === 1 && colId === 3) initValue = 16;
            if (rowId === 2 && colId === 2) initValue = 32;
            if (rowId === 2 && colId === 3) initValue = 64;
            if (rowId === 3 && colId === 3) initValue = 128;
            if (rowId === 3 && colId === 1) initValue = 256;
            if (rowId === 3 && colId === 0) initValue = 512;
            if (rowId === 0 && colId === 3) initValue = 1024;
            // if (rowId === 0 && colId === 3) initValue = 64

            initTileBoard.push({
                x: rowId,
                y: colId,
                merged: false,
                value: initValue,
            });
        }),
    );

    return initTileBoard;
};

export const handleHorizontal = (tiles: Tile[], direction: string): Tile[] => {
    let tilesRow = 0;

    const newTileGrid: Tile[] = [];

    while (tilesRow <= 3) {
        // THIS BLOCK COULD BE GROUPING / SPLITTING
        const processRow = tiles.filter((tile) => tile.x === tilesRow);
        
        const valuedTilesQty = processRow.filter((tile) => tile.value).length;
        const nullTilesQty = processRow.filter((tile) => !tile.value).length;
        const valuedTiles: Tile[] = [];
        const nullTiles: Tile[] = [];

        processRow.forEach((tile) => {
            if (tile.value) {
                valuedTiles.push({ ...tile, y: direction === 'Left' ? valuedTiles.length : nullTilesQty + valuedTiles.length});
            } else {
                nullTiles.push({ ...tile, y: direction === 'Left' ? valuedTilesQty + nullTiles.length : nullTiles.length});
            }
        });

        // THIS BLOCK IS PROCESSING / COMPARING

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

        if (direction === 'Right') valuedTiles.sort((a, b) => a.y - b.y);

        const conditionalGrid = (direction === 'Left') ? [...valuedTiles, ...nullTiles] : [...nullTiles, ...valuedTiles]
        newTileGrid.push(...conditionalGrid)
        tilesRow++;
    }
    return newTileGrid;
};
