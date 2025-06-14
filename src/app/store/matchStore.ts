import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MatchData } from '@/types/match';

type MatchStore = {
  match: MatchData | null;
  setMatch: (matchData: MatchData) => void;
  resetMatch: () => void;
};

export const useMatchStore = create<MatchStore>()(
  persist(
    (set) => ({
      match: null,

      setMatch: (matchData) => set({ match: matchData }),

      resetMatch: () => set({ match: null }),
    }),
    {
      name: 'match-storage',
      partialize: (state) => ({
        match: state.match,
      }),
    }
  )
);
