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

  const periodFilters: { id: MatchPeriodFilter; label: string }[] = [
    { id: 'all', label: 'Todos os Períodos' },
    { id: 'pre_jogo', label: 'Pré-Jogo' },
    { id: 'primeiro_tempo', label: '1º Tempo' },
    { id: 'intervalo', label: 'Intervalo' },
    { id: 'segundo_tempo', label: '2º Tempo' },
  ];

  const actionFilters: { id: ActionTypeFilter; label: string }[] = [
    { id: 'all', label: 'Todas Ações' },
    { id: 'gol', label: 'Gols' },
    { id: 'cartao', label: 'Cartões' },
    { id: 'impedimento', label: 'Impedimentos' },
    { id: 'penalti', label: 'Pênaltis' },
  ];

  return (
    <div className="p-4 border rounded bg-white dark:bg-zinc-900">
      <h2 className="text-lg font-bold mb-2 dark:text-white">📰 Eventos Filtrados</h2>

      {/* Filtros de Período */}
      <div className="mb-2 flex flex-wrap gap-2">
        {periodFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedPeriod(filter.id)}
            className={`px-3 py-1 rounded text-sm ${
              selectedPeriod === filter.id ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
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
              selectedAction === filter.id ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {filter.label}
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
                {events.map((event) => (
                  <li key={event.id} className="border-b pb-1 dark:text-white">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{event.moment}' </span>
                    <span>{event.text}</span>
                  </li>
                ))}
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
