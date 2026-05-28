import { useEffect } from 'react';

export const useTouchHandler = (dependency: React.RefObject<null | HTMLElement>) => {
    const handleTouchEvent = (event: any) => {
        console.log(event)
    }
    
    // useeffect here, accept a ref for the element where you want the touch events to live
    useEffect(() => {
        if (dependency.current) {
            dependency.current.addEventListener('touchmove', handleTouchEvent)
        }
        console.log(dependency)
    }, [dependency])
}