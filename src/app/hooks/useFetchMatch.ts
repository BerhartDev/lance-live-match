'use client';

import { useEffect } from 'react';
import { useMatchStore } from '@/app/store/matchStore';
import type { MatchData } from '@/types/match';

export const useFetchMatch = () => {
  const setMatch = useMatchStore((state) => state.setMatch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/match.json');
        const data = await res.json();

        const matchInfo: MatchData = {
          id: data.match.id,
          team_a: {
            id: data.match.team_a.id,
            name: data.match.team_a.name,
            logo: data.match.team_a.logo,
            coach: data.match.team_a.coach,
          },
          team_b: {
            id: data.match.team_b.id,
            name: data.match.team_b.name,
            logo: data.match.team_b.logo,
            coach: data.match.team_b.coach,
          },
          start_in: data.match.start_in,
          championship: {
            id: data.match.championship.id,
            name: data.match.championship.name,
          },
          stadium: {
            id: data.match.stadium.id,
            name: data.match.stadium.name,
            city: data.match.stadium.city,
          },
        };

        setMatch(matchInfo);
      } catch (error) {
        console.error('Erro ao carregar match.json', error);
      }
    };

    fetchData();
  }, [setMatch]);
};
