import { useEffect, useRef } from 'react';
import type { Direction } from '../2048/types-2048';

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

export const useTouchHandler = (dependency: React.RefObject<null | HTMLElement>, callback: (e:any) => void) => {
    const handleTouchEvent = (event: any) => {
        console.log(event)
    }

    useEffect(() => {
        if (dependency.current) {
            dependency.current.addEventListener('touchmove', handleTouchEvent)
        }
        console.log(dependency)
    }, [dependency])
}