'use client';

import { useState } from 'react';
import { useFilteredEvents, MatchPeriodFilter, ActionTypeFilter } from '@/app/hooks/useFilteredEvents';

export default function EventList() {
  const [selectedPeriod, setSelectedPeriod] = useState<MatchPeriodFilter>('all');
  const [selectedAction, setSelectedAction] = useState<ActionTypeFilter>('all');

  const filteredEvents = useFilteredEvents(selectedPeriod, selectedAction);

  // Função para agrupar eventos por período
  const groupEventsByPeriod = (events: typeof filteredEvents) => {
    const groups = events.reduce((acc, event) => {
      const period = event.match_period_id;
      if (!acc[period]) {
        acc[period] = [];
      }
      acc[period].push(event);
      return acc;
    }, {} as Record<number, typeof filteredEvents>);

    return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a));
  };

  const getPeriodLabel = (period: number) => {
    switch (period) {
      case 1:
        return '🟡 Pré-jogo';
      case 2:
        return '🔴 Primeiro Tempo';
      case 3:
        return '⚪ Intervalo';
      case 4:
        return '🔵 Segundo Tempo';
      default:
        return '🏁 Encerrado';
    }
  };

  // Função para obter o emoji e label da ação importante
  const getActionLabel = (action: string | null | undefined) => {
    if (!action) return null;
    const actionLower = action.toLowerCase();
    
    if (actionLower.includes('gol')) {
      return { emoji: '⚽', label: 'Gol' };
    }
    if (actionLower.includes('cartão') || actionLower.includes('cartao')) {
      if (actionLower.includes('vermelho')) {
        return { emoji: '🟥', label: 'Cartão Vermelho' };
      }
      return { emoji: '🟨', label: 'Cartão Amarelo' };
    }
    if (actionLower.includes('impedimento')) {
      return { emoji: '🚫', label: 'Impedimento' };
    }
    if (actionLower.includes('pênalti') || actionLower.includes('penalti')) {
      return { emoji: '🎯', label: 'Pênalti' };
    }
    if (actionLower.includes('fim de jogo')) {
      return { emoji: '🏁', label: 'Fim de Jogo' };
    }
    if (actionLower.includes('início')) {
      return { emoji: '▶️', label: 'Início' };
    }
    if (actionLower.includes('intervalo')) {
      return { emoji: '⏸️', label: 'Intervalo' };
    }
    return null;
  };

  const periodFilters: { id: MatchPeriodFilter; label: string }[] = [
    { id: 'all', label: 'Todos os Períodos' },
    { id: 'pre_jogo', label: 'Pré-Jogo' },
    { id: 'primeiro_tempo', label: '1º Tempo' },
    { id: 'intervalo', label: 'Intervalo' },
    { id: 'segundo_tempo', label: '2º Tempo' },
  ];

  const actionFilters: { id: ActionTypeFilter; label: string; emoji: string }[] = [
    { id: 'all', label: 'Todas Ações', emoji: '📋' },
    { id: 'gol', label: 'Gols', emoji: '⚽' },
    { id: 'cartao', label: 'Cartões', emoji: '🟨' },
    { id: 'impedimento', label: 'Impedimentos', emoji: '🚫' },
    { id: 'penalti', label: 'Pênaltis', emoji: '🎯' },
  ];

  return (
    <div className="p-4 bg-white dark:bg-zinc-900">
      <h2 className="text-lg font-bold mb-2 dark:text-white">📰 Eventos Filtrados</h2>

      {/* Filtros de Período */}
      <div className="mb-2 flex flex-wrap gap-2">
        {periodFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedPeriod(filter.id)}
            className={`px-3 py-1 rounded text-sm ${
              selectedPeriod === filter.id ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Filtros de Ação */}
      <div className="mb-4 flex flex-wrap gap-2">
        {actionFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedAction(filter.id)}
            className={`px-3 py-1 rounded text-sm ${
              selectedAction === filter.id ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
            }`}
          >
            {filter.emoji} {filter.label}
          </button>
        ))}
      </div>

      {/* Lista de Eventos Agrupados */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-6">
          {groupEventsByPeriod(filteredEvents).map(([period, events]) => (
            <div key={period} className="space-y-2">
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 border-b pb-1">
                {getPeriodLabel(Number(period))}
              </h3>
              <ul className="space-y-2">
                {events.map((event) => {
                  const actionInfo = event.important_action ? getActionLabel(event.important_action) : null;
                  return (
                    <li 
                      key={event.id} 
                      className={`border-b pb-1 dark:text-white ${
                        actionInfo 
                          ? 'bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.moment}&apos;</span>
                        {actionInfo && (
                          <span className="px-2 py-0.5 text-xs rounded bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-200">
                            {actionInfo.emoji} {actionInfo.label}
                          </span>
                        )}
                      </div>
                      <span className={`block ${actionInfo ? 'mt-1' : ''}`}>{event.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-400">Nenhum evento encontrado para este filtro.</div>
      )}
    </div>
  );
}
