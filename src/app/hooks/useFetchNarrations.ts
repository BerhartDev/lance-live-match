'use client';

import { useEffect } from 'react';
import { useNarrationStore } from '@/app/store/narrationStore';
import type { Narration } from '@/types/narration';

export const useFetchNarrations = () => {
  const setNarrations = useNarrationStore((state) => state.setNarrations);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/match.json');
        const data = await res.json();

        const narrations: Narration[] = data.match.narrations;
        setNarrations(narrations);
      } catch (error) {
        console.error('Erro ao carregar narrations do match.json', error);
      }
    };

    fetchData();
  }, [setNarrations]);
};
