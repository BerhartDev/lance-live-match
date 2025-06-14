'use client';

import { useState } from 'react';
import { useFilteredEvents, MatchPeriodFilter, ActionTypeFilter } from '@/app/hooks/useFilteredEvents';

export default function EventList() {
  const [selectedPeriod, setSelectedPeriod] = useState<MatchPeriodFilter>('all');
  const [selectedAction, setSelectedAction] = useState<ActionTypeFilter>('all');

  const filteredEvents = useFilteredEvents(selectedPeriod, selectedAction);

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
    <div className="p-4 border rounded bg-white">
      <h2 className="text-lg font-bold mb-2">📰 Eventos Filtrados</h2>

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

      {/* Lista de Eventos */}
      {filteredEvents.length > 0 ? (
        <ul className="space-y-2">
          {filteredEvents.map((event) => (
            <li key={event.id} className="border-b pb-1">
              <span className="text-sm text-gray-500">{event.moment}' </span>
              <span>{event.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-gray-500">Nenhum evento encontrado para este filtro.</div>
      )}
    </div>
  );
}
