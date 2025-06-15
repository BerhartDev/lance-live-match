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

  // Filtro por período e tempo
  filtered = filtered.filter((event) => {
    // Se o evento é de um período anterior ao atual, mostra todos os eventos
    if (event.match_period_id < currentPeriod) {
      return true;
    }
    // Se o evento é do período atual, filtra pelo minuto atual
    if (event.match_period_id === currentPeriod) {
      return event.moment <= currentMinute;
    }
    // Não mostra eventos de períodos futuros
    return false;
  });

  // Ordena os eventos por período e momento
  filtered.sort((a, b) => {
    // Primeiro ordena por período (invertido)
    if (a.match_period_id !== b.match_period_id) {
      return b.match_period_id - a.match_period_id;
    }
    // Se for o mesmo período, ordena por momento (invertido)
    return b.moment - a.moment;
  });

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
