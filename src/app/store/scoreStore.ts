import { create } from 'zustand';
import type { ScoreStore } from '@/types/score';

export const useScoreStore = create<ScoreStore>((set) => ({
  homeGoals: 0,
  awayGoals: 0,

  addGoal: (team) =>
    set((state) => ({
      homeGoals: team === 'home' ? state.homeGoals + 1 : state.homeGoals,
      awayGoals: team === 'away' ? state.awayGoals + 1 : state.awayGoals,
    })),

  resetScore: () => set({ homeGoals: 0, awayGoals: 0 }),
}));
