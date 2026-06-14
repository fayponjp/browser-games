import { create } from 'zustand';

interface LandingState {
    activeGame: string,
    setActiveGame: (setActiveGame: string) => void
}

export const useLanding = create<LandingState>()(
    (set) => ({
        activeGame: 'Not Wordle',
        setActiveGame: (activeGame: string) => set(() => ({activeGame}))
    })
)