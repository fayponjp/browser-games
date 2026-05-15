import { useEffect, useState } from 'react';
import { useKeyhandler } from '../utils/shared';
import NumberCard from './NumberCard';
import { valid2048InputsArr } from '../utils/types-interfaces';
export default function Game2048() {
    const generateInitialCoords = () => {
        function getRandomTile() {
            return Math.floor(Math.random() * 4)
        }

        const x = getRandomTile();
        const y = getRandomTile();

        const firstCoordSet = [x, y]

        console.log(x);
    }
    const initGrid = Array.from(Array(4).keys()).map((rowId) => {
        const columns = Array.from(Array(4).keys()).map((colId) => (
            <div
                className='h-full text-center flex text-3xl rounded font-bold bg-amber-200'
                key={colId}
            >
                <div className='m-auto'></div>
            </div>
        ));

        return (
            <div className='grid grid-cols-4 w-full' key={rowId}>
                {columns}
            </div>
        );
    });
    const [gameBoard, setGameBoard] = useState<React.JSX.Element[]>(initGrid);


    // action logic - direction is up/down, then handle y +/-. x +/-
    // if up/down and y is 0/3 respectively, don't do anything. if left/right and x is 0/3 respectively, don't do anything. 

    const inputHandler = (directionInput: string): void => {
        if (valid2048InputsArr.includes(directionInput)) {
            console.log(directionInput);
        }
    };
    // useKeyhandler([], inputHandler);

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => inputHandler(e.key))
    }, [])
    return (
        <div className='h-full w-full flex items-center justify-center bg-gray-800'>
            <div className='grid grid-rows-4 rounded max-h-700 h-[60%] max-w-lg w-[95%]  bg-gray-500/50'>
                {gameBoard}
            </div>
        </div>
    );
}
