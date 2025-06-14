import { useNarrationStore } from '@/app/store/narrationStore';
import type { Narration } from '@/types/narration';

export type MatchPeriodFilter = 'all' | 'pre_jogo' | 'primeiro_tempo' | 'intervalo' | 'segundo_tempo';
export type ActionTypeFilter = 'all' | 'gol' | 'cartao' | 'impedimento' | 'penalti';

export const useFilteredEvents = (selectedPeriod: MatchPeriodFilter, selectedAction: ActionTypeFilter): Narration[] => {
  const narrations = useNarrationStore((state) => state.narrations || []);

  let filtered = narrations;

  if (selectedPeriod !== 'all') {
    const periodMap: Record<MatchPeriodFilter, number> = {
      all: 0,
      pre_jogo: 1,
      primeiro_tempo: 2,
      intervalo: 3,
      segundo_tempo: 4,
    };
    filtered = filtered.filter((n) => n.match_period_id === periodMap[selectedPeriod]);
  }

  if (selectedAction !== 'all') {
    filtered = filtered.filter((n) => {
      if (!n.important_action) return false;
      const action = n.important_action.toLowerCase();
      switch (selectedAction) {
        case 'gol':
          return action.includes('gol');
        case 'cartao':
          return action.includes('cartão') || action.includes('cartao');
        case 'impedimento':
          return action.includes('impedimento');
        case 'penalti':
          return action.includes('pênalti') || action.includes('penalti');
        default:
          return false;
      }
    });
  }

  return filtered;
};
