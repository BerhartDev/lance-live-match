export type ProcessedEventsStore = {
    processedIds: number[];
    markAsProcessed: (id: number) => void;
    resetProcessed: () => void;
  };
  