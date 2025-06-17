import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScoreStore } from '@/types/score';

export const useScoreStore = create<ScoreStore>()(
  persist(
    (set) => ({
      homeGoals: 0,
      awayGoals: 0,

      addGoal: (team) =>
        set((state) => ({
          homeGoals: team === 'home' ? state.homeGoals + 1 : state.homeGoals,
          awayGoals: team === 'away' ? state.awayGoals + 1 : state.awayGoals,
        })),

      resetScore: () => set({ homeGoals: 0, awayGoals: 0 }),
    }),
    {
      name: 'score-storage',
      partialize: (state) => ({
        homeGoals: state.homeGoals,
        awayGoals: state.awayGoals,
      }),
    }
  )
);
