import { create } from 'zustand';
import type { ProcessedEventsStore } from '@/types/processedEvents';

export const useProcessedEventsStore = create<ProcessedEventsStore>((set) => ({
  processedIds: [],
  markAsProcessed: (id) =>
    set((state) => ({
      processedIds: [...state.processedIds, id],
    })),
  resetProcessed: () => set({ processedIds: [] }),
}));
