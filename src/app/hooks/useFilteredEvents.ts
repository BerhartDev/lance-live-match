import { useNarrationStore } from '@/app/store/narrationStore';
import { useClockStore } from '@/app/store/clockStore';
import type { Narration } from '@/types/narration';

export type MatchPeriodFilter = 'all' | 'pre_jogo' | 'primeiro_tempo' | 'intervalo' | 'segundo_tempo';
export type ActionTypeFilter = 'all' | 'gol' | 'cartao' | 'impedimento' | 'penalti';

export const useFilteredEvents = (
  selectedPeriod: MatchPeriodFilter,
  selectedAction: ActionTypeFilter
): Narration[] => {
  const narrations = useNarrationStore((state) => state.narrations || []);
  const currentMinute = useClockStore((state) => state.currentMinute);
  const currentPeriod = useClockStore((state) => state.currentPeriod);

  let filtered = narrations;

  console.log('File: useFilteredEvents', 'minute: ', currentMinute, 'period: ', currentPeriod )
  filtered = filtered.filter((event) => event.match_period_id === currentPeriod);

  // Filtro por tempo (somente eventos até o minuto atual)
  filtered = filtered.filter((event) => event.moment <= currentMinute);

  // Filtro por período manual (se o usuário quiser filtrar por período específico)
  if (selectedPeriod !== 'all') {
    const periodMap: Record<MatchPeriodFilter, number> = {
      all: 0,
      pre_jogo: 1,
      primeiro_tempo: 2,
      intervalo: 3,
      segundo_tempo: 4,
    };
    filtered = filtered.filter((event) => event.match_period_id === periodMap[selectedPeriod]);
  }

  // Filtro por tipo de ação
  if (selectedAction !== 'all') {
    filtered = filtered.filter((event) => {
      if (!event.important_action) return false;
      const action = event.important_action.toLowerCase();
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
