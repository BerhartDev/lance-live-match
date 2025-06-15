import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MatchStatus = 'not_started' | 'running' | 'paused' | 'finished';

type ClockStore = {
  currentMinute: number;
  currentPeriod: number;
  status: MatchStatus;
  startClock: () => void;
  startFirstHalf: () => void;
  startSecondHalf: () => void;
  stopClock: () => void;
  resetClock: () => void;
  advanceMinute: () => void;
  setPeriod: (period: number) => void;
  setStatus: (status: MatchStatus) => void;
};

export const useClockStore = create<ClockStore>()(
  persist(
    (set, get) => ({
      currentMinute: 0,
      currentPeriod: 1, // Começa direto no Primeiro Tempo
      status: 'not_started',

      startFirstHalf: () => {
        set({
          currentPeriod: 2, // Primeiro Tempo
          currentMinute: 0,
          status: 'running',
        });
      },

      startSecondHalf: () => {
        set({
          currentPeriod: 4, // Segundo Tempo
          currentMinute: 0,
          status: 'running',
        });
      },

      startClock: () => set({ status: 'running' }),

      stopClock: () => set({ status: 'paused' }),

      resetClock: () => set({ status: 'paused', currentMinute: 0, currentPeriod: 1 }),

      advanceMinute: () => {
        if (get().status === 'running') {
          set((state) => ({ currentMinute: state.currentMinute + 1 }));
        }
      },

      setPeriod: (period) => set({ currentPeriod: period }),

      setStatus: (status) => set({ status }),
    }),
    {
      name: 'clock-storage',
      partialize: (state) => ({
        currentMinute: state.currentMinute,
        currentPeriod: state.currentPeriod,
        status: state.status,
      }),
    }
  )
);
