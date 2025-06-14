import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MatchStatus = 'not_started' | 'running' | 'paused' | 'finished';

type ClockStore = {
  currentMinute: number;
  currentPeriod: number; // Ex: 1=Pré, 2=1ºT, 3=Intervalo, 4=2ºT, etc.
  status: MatchStatus;
  startClock: () => void;
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
      currentPeriod: 1,
      status: 'not_started',

      startClock: () => {
        set({ status: 'running' });
      },

      stopClock: () => {
        set({ status: 'paused' });
      },

      resetClock: () => {
        set({ currentMinute: 0, currentPeriod: 1, status: 'not_started' });
      },

      advanceMinute: () => {
        if (get().status === 'running') {
          set((state) => {
            console.log('Minuto avançado! Novo minuto:', state.currentMinute + 1);
            return { currentMinute: state.currentMinute + 1 };
          });
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
