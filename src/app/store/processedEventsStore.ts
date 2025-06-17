import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProcessedEventsStore } from '@/types/processedEvents';

export const useProcessedEventsStore = create<ProcessedEventsStore>()(
  persist(
    (set) => ({
      processedIds: [],
      markAsProcessed: (id) =>
        set((state) => ({
          processedIds: [...state.processedIds, id],
        })),
      resetProcessed: () => set({ processedIds: [] }),
    }),
    {
      name: 'processed-events-storage',
      partialize: (state) => ({
        processedIds: state.processedIds,
      }),
    }
  )
);
