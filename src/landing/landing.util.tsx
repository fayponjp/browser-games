import { create } from 'zustand';
import type { GameTitles } from './landing.types';
interface LandingState {
    activeGame: GameTitles,
    setActiveGame: (setActiveGame: GameTitles) => void
}

export const useLanding = create<LandingState>()(
    (set) => ({
        activeGame: 'Not Wordle',
        setActiveGame: (activeGame: GameTitles) => set(() => ({activeGame}))
    })
)