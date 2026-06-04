import { create } from 'zustand';
import type { AnimatingTiles, Tile } from '../shared-utils/types-interfaces';
import { genInitialTiles } from './2048.util';
import { useEffect, useRef } from 'react';
import type { Direction } from './types-2048';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Game2048State {
    tiles: Tile[];
    score: number;
    topScore: number;
    gameOver: boolean;
    currentDirection: Direction | undefined;
    animatingTiles: AnimatingTiles;
    updateTiles: (tilesOrFn: Tile[] | ((prev: Tile[]) => Tile[])) => void;
    updateAnimatingTiles: (animatingTiles: AnimatingTiles) => void;
    updateDirection: (direction: Direction) => void;
    updateScore: (scoreOrFn: number | ((prev: number) => number)) => void;
    updateTopScore: (newScore: number | ((prev: number) => number)) => void;
    resetGame: () => void;
    setGameOver: (gameState: boolean) => void;
}

const initialState = {
    tiles: genInitialTiles(),
    score: 0,
    gameOver: false,
};

export const use2048 = create<Game2048State>()(
    persist(
        (set) => ({
            ...initialState,
            topScore: 0,
            animatingTiles: { removed: new Set(), appearing: new Set() },
            currentDirection: undefined,
            updateTiles: (tilesOrFn) =>
                set((state) => ({
                    tiles:
                        typeof tilesOrFn === 'function'
                            ? tilesOrFn(state.tiles)
                            : tilesOrFn,
                })),
            updateAnimatingTiles: (animatingTiles) => set({ animatingTiles }),
            updateScore: (scoreOrFn) =>
                set((state) => ({
                    score:
                        typeof scoreOrFn === 'function'
                            ? scoreOrFn(state.score)
                            : scoreOrFn,
                })),
            updateDirection: (direction) =>
                set(() => ({ currentDirection: direction })),
            updateTopScore: (topScore) =>
                set((state) => ({
                    topScore:
                        typeof topScore === 'function'
                            ? topScore(state.topScore)
                            : topScore,
                })),
            resetGame: () => set(initialState),
            setGameOver: (gameStatus) => set(() => ({ gameOver: gameStatus })),
        }),
        {
            name: 'game-2048-storage',
            partialize: (state: Game2048State) => ({
                tiles: state.tiles,
                score: state.score,
                topScore: state.topScore,
                gameOver: state.gameOver,
            }),
        },
    ),
);

export const useGroupAnimatingTiles = () => {
    const { tiles, updateAnimatingTiles } = use2048();
    const prevTilesRef = useRef<Tile[]>(tiles);
    useEffect(() => {
        const prevTileValueMap = new Map(
            prevTilesRef.current.map((t) => [t.id, t.value]),
        );
        const currentTileValueMap = new Map(tiles.map((t) => [t.id, t.value]));

        const removedTiles = new Set<string>();
        const appearingTiles = new Set<string>();

        prevTilesRef.current.forEach((tile) => {
            if (tile.value !== undefined && tile.value !== null) {
                const currentValue = currentTileValueMap.get(tile.id);
                if (currentValue === undefined || currentValue === null) {
                    removedTiles.add(tile.id);
                }
            }
        });

        tiles.forEach((tile) => {
            if (tile.value !== undefined && tile.value !== null) {
                const prevValue = prevTileValueMap.get(tile.id);
                if (prevValue === undefined || prevValue === null) {
                    appearingTiles.add(tile.id);
                } else if (prevValue !== tile.value) {
                    appearingTiles.add(tile.id);
                }
            }
        });

        if (removedTiles.size > 0 || appearingTiles.size > 0) {
            updateAnimatingTiles({
                removed: removedTiles,
                appearing: appearingTiles,
            });
        }

        prevTilesRef.current = tiles;
    }, [tiles]);
};

export const useClearAnimatingTiles = () => {
    const { animatingTiles, updateAnimatingTiles } = use2048();

    useEffect(() => {
        if (
            animatingTiles.removed.size > 0 ||
            animatingTiles.appearing.size > 0
        ) {
            const timer = setTimeout(
                () =>
                    updateAnimatingTiles({
                        removed: new Set(),
                        appearing: new Set(),
                    }),
                150,
            );
            return () => clearTimeout(timer);
        }
    }, [animatingTiles]);
};

export const useCheckForValidMoves = () => {
    const { tiles, setGameOver } = use2048();

    const checkForValid = (collection: Tile[]) => {
        let currentTileValue = 0;
        let prevTileValue = 0;

        let hasValidMove = false;

        for (let i = 0; i < collection.length; i++) {
            currentTileValue = collection[i].value!;

            if (currentTileValue === prevTileValue) {
                hasValidMove = true;
                break;
            }

            prevTileValue = currentTileValue;
        }

        return hasValidMove;
    };

    useEffect(() => {
        let hasValidMove = false;

        const hasNull = tiles.filter((tile) => !tile.value).length;
        if (hasNull === 0) {
            let currentIndex = 0;

            while (currentIndex <= 3) {
                const processRow = tiles.filter(
                    (tile) => tile.x === currentIndex,
                );

                hasValidMove = checkForValid(processRow);
                if (hasValidMove) break;

                currentIndex++;
            }

            if (!hasValidMove) {
                currentIndex = 0;

                while (currentIndex <= 3) {
                    const processColumn = tiles.filter(
                        (tile) => tile.y === currentIndex,
                    );

                    hasValidMove = checkForValid(processColumn);

                    if (hasValidMove) break;
                    currentIndex++;
                }

                if (!hasValidMove) {
                    setGameOver(true);
                }
            }
        }
    }, [tiles]);
};

export const useSwipe = (
    elementRef: React.RefObject<null | HTMLElement>,
    inputHandler: (direction: Direction) => void,
    threshold: number = 50,
) => {
    const touchStartRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            touchStartRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
        };

        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            const touchEnd = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            };

            const deltaX = touchEnd.x - touchStartRef.current.x;
            const deltaY = touchEnd.y - touchStartRef.current.y;
            const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

            if (isHorizontal && Math.abs(deltaX) > threshold) {
                inputHandler(deltaX > 0 ? 'Right' : 'Left');
            } else if (!isHorizontal && Math.abs(deltaY) > threshold) {
                inputHandler(deltaY > 0 ? 'Down' : 'Up');
            }
        };

        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove);
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [elementRef, inputHandler, threshold]);
};
