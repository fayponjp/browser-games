import { create } from 'zustand';
import type { AnimatingTiles, Tile } from '../shared-utils/types-interfaces';
import { genInitialTiles } from './2048.util';
import { useEffect, useRef } from 'react';
import type { Direction } from './types-2048';

interface Game2048State {
    tiles: Tile[];
    score: number;
    animatingTiles: AnimatingTiles;
    updateTiles: (tilesOrFn: Tile[] | ((prev: Tile[]) => Tile[])) => void;
    updateAnimatingTiles: (animatingTiles: AnimatingTiles) => void;
    updateScore: (scoreOrFn: number | ((prev: number) => number)) => void;
    resetGame: () => void;
    gameOver: boolean;
    setGameOver: (gameState: boolean) => void;
}

export const use2048 = create<Game2048State>((set) => ({
    tiles: genInitialTiles(),
    score: 0,
    animatingTiles: { removed: new Set(), appearing: new Set() },
    updateTiles: (tilesOrFn) => 
        set((state) => ({ 
            tiles: typeof tilesOrFn === 'function' ? tilesOrFn(state.tiles) : tilesOrFn 
        })),
    updateAnimatingTiles: (animatingTiles) => set({ animatingTiles }),
    updateScore: (scoreOrFn) => 
        set((state) => ({ 
            score: typeof scoreOrFn === 'function' ? scoreOrFn(state.score) : scoreOrFn
        })),
    resetGame: () => set({ tiles: [], score: 0, animatingTiles: { removed: new Set(), appearing: new Set() } }),
    gameOver: false,
    setGameOver: (gameStatus) => set(() => ({gameOver: gameStatus})),
}));

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
    const {animatingTiles, updateAnimatingTiles} = use2048();

    useEffect(() => {
        if (animatingTiles.removed.size > 0 || animatingTiles.appearing.size > 0) {
            const timer = setTimeout(
                () => updateAnimatingTiles({ removed: new Set(), appearing: new Set() }),
                150
            );
            return () => clearTimeout(timer);
        }
    }, [animatingTiles]);
}

export const useCheckForValidMoves = () => {
    const {tiles, setGameOver} = use2048();

    useEffect(() => {
        let prevTile: Tile | undefined = undefined;
        let currentTile: Tile = tiles[0];
    
        let currentIndex = 0;
        let hasValidMove = true;
    
        const hasNull = tiles.filter((tile) => !tile.value).length;
        if (hasNull === 0) {
            console.log(hasNull)
            setGameOver(true)
        }
    }, [tiles])
}

export const useSwipe = (
    elementRef: React.RefObject<null | HTMLElement>,
    inputHandler: (direction: Direction) => void,
    threshold: number = 50
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