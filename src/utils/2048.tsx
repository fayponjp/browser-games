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

const generateValue = () => {
    const rand = Math.random();
    return rand > 0.2 ? 2 : 4;
};


const initGrid = () => {
    const initCoords = initialCoords();
    const [firstSet, secondSet] = initCoords;
    const [firstSetX, firstSetY] = firstSet;
    const [secondSetX, secondSetY] = secondSet;

    const grid = Array.from(Array(4).keys()).map((rowId) => {
        const columns = Array.from(Array(4).keys()).map((colId) => {
            let initValue: number | undefined = undefined;
            let bgClass = 'bg-(--board-card-null)';
            if (
                (firstSetX === rowId && firstSetY === colId) ||
                (secondSetX === rowId && secondSetY === colId)
            ) {
                initValue = generateValue();
                bgClass = `bg-(--board-card-${initValue})`;
            }
            return (
                <div
                    className={`h-25 w-25 flex text-center rounded-xl font-bold ${bgClass}`}
                    key={colId}
                >
                    <div className={`m-auto text-5xl`}>{initValue}</div>
                </div>
            );
        });

        return (
            <div
                className='grid grid-cols-4 w-full gap-5 place-items-center'
                key={rowId}
            >
                {columns}
            </div>
        );
    });

    return grid;
};
