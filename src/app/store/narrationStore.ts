import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Narration } from '@/types/narration';

type NarrationStore = {
  narrations: Narration[];
  setNarrations: (narrations: Narration[]) => void;
  resetNarrations: () => void;
};

export const useNarrationStore = create<NarrationStore>()(
  persist(
    (set) => ({
      narrations: [],

      setNarrations: (narrations) => set({ narrations }),

      resetNarrations: () => set({ narrations: [] }),
    }),
    {
      name: 'narration-storage',
      partialize: (state) => ({
        narrations: state.narrations,
      }),
    }
  )
);
