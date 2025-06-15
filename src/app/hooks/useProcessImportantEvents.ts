'use client';

import { useEffect } from 'react';
import { useClockStore } from '@/app/store/clockStore';
import { useNarrationStore } from '@/app/store/narrationStore';
import { useScoreStore } from '@/app/store/scoreStore';
import { useProcessedEventsStore } from '@/app/store/processedEventsStore';
import type { Narration } from '@/types/narration';

export const useProcessImportantEvents = () => {
  const currentMinute = useClockStore((state) => state.currentMinute);
  const currentPeriod = useClockStore((state) => state.currentPeriod);
  const narrations = useNarrationStore((state) => state.narrations || []);

  const addGoal = useScoreStore((state) => state.addGoal);
  const { processedIds, markAsProcessed } = useProcessedEventsStore();

  useEffect(() => {
    const visibleEvents = narrations.filter(
      (event: Narration) =>
        event.match_period_id === currentPeriod &&
        event.moment <= currentMinute &&
        !processedIds.includes(event.id)
    );

    visibleEvents.forEach((event) => {
      if (event.important_action?.toLowerCase() === 'gol') {
        const isHomeGoal = event.text.toLowerCase().includes('flamengo'); // Ajuste seu critério
        addGoal(isHomeGoal ? 'home' : 'away');
      }

      markAsProcessed(event.id);
    });
  }, [currentMinute, currentPeriod, narrations, addGoal, processedIds, markAsProcessed]);
};
