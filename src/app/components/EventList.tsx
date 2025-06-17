'use client';

import { useState } from 'react';
import { useFilteredEvents, MatchPeriodFilter, ActionTypeFilter } from '@/app/hooks/useFilteredEvents';
import Image from 'next/image';

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

  // Função para obter o emoji e label da ação importante
  const getActionLabel = (action: string | null | undefined) => {
    if (!action) return null;
    const actionLower = action.toLowerCase();

    switch (true) {
      case actionLower===('gol'):
        return { iconPath: '/icons/Gol.svg', label: 'Gol' };
      case actionLower.includes('cartão vermelho') || actionLower.includes('cartao vermelho'):
        return { emoji: '🟥', label: 'Cartão Vermelho' };
      case actionLower.includes('cartão') || actionLower.includes('cartao'):
        return { iconPath: '/icons/Cartao_amarelo.svg', label: 'Cartão Amarelo' };
      case actionLower.includes('impedimento'):
        return { emoji: '🚫', label: 'Impedimento' };
      case actionLower.includes('pênalti') || actionLower.includes('penalti'):
        return { emoji: '🎯', label: 'Pênalti' };
      case actionLower.includes('fim de jogo'):
        return { iconPath: '/icons/Apito.svg', label: 'Fim de Jogo' };
      case actionLower.includes('intervalo'):
        return { iconPath: '/icons/Intervalo.svg', label: 'Intervalo' };
      case actionLower.includes('começo de jogo') || actionLower.includes('começo do segundo tempo') || actionLower.includes('início'):
        return { iconPath: '/icons/Apito.svg', label: 'Início' };
      case actionLower.includes('substituição'):
        return { iconPath: '/icons/Substituicao.svg', label: 'Substituição' };
      case actionLower.includes('atendimento médico'):
        return { iconPath: '/icons/Atendimento_medico.svg', label: 'Atendimento Médico' };
      case actionLower.includes('defesa do goleiro'):
        return { iconPath: '/icons/Defesa_do_goleiro.svg', label: 'Defesa do Goleiro' };
      default:
        return null;
    }
  };

  const periodFilters: { id: MatchPeriodFilter; label: string }[] = [
    { id: 'all', label: 'Todos os Períodos' },
    { id: 'pre_jogo', label: 'Pré-Jogo' },
    { id: 'primeiro_tempo', label: '1º Tempo' },
    { id: 'intervalo', label: 'Intervalo' },
    { id: 'segundo_tempo', label: '2º Tempo' },
  ];

  const actionFilters: { id: ActionTypeFilter; label: string;}[] = [
    { id: 'all', label: 'Todas Ações' },
    { id: 'gol', label: 'Gols'},
    { id: 'cartao', label: 'Cartões' },
    { id: 'impedimento', label: 'Impedimentos' },
    { id: 'penalti', label: 'Pênaltis' },
  ];

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 dark:text-white w-full max-w-screen-lg">
      <h2 className="text-lg font-bold mb-3 dark:text-white">LANCE! A LANCE!</h2>

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
            {filter.label}
          </button>
        ))}
      </div>

      {/* Lista de Eventos Agrupados */}
      {filteredEvents.length > 0 ? (
        <div className="font-arquiba space-y-6">
          {groupEventsByPeriod(filteredEvents).map(([period, events]) => (
            <div key={period} className="space-y-2">
              <ul className="space-y-2">
                {events.map((event) => {
                  const actionInfo = event.important_action ? getActionLabel(event.important_action) : null;
                  return (
                    <li 
                      key={event.id} 
                      className="flex items-start gap-4 py-2 last:border-b-0"
                    >
                      <div className="flex flex-col items-center text-center pt-1 w-16">

                        <span className="text-xl text-black dark:text-white">{event.moment}&apos;&apos;</span>
                      </div>
                      <div className={`flex-1 p-3 rounded-lg ${actionInfo ? 'bg-gray-100 dark:bg-zinc-800' : ''}`}>
                        {actionInfo && (
                          <div className="font-bold mb-1 dark:text-white flex items-center">
                            {actionInfo.iconPath ? (
                              <Image src={actionInfo.iconPath} alt={actionInfo.label} width={20} height={20} className="mr-2" />
                            ) : actionInfo.emoji ? (
                              <span className="text-xl mr-2">{actionInfo.emoji}</span>
                            ) : null}
                            {actionInfo.label.toUpperCase()}
                          </div>
                        )}
                        <span className="block text-sm dark:text-white">{event.text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
                <hr/>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-400">Nenhum evento encontrado para este filtro.</div>
      )}
    </div>
  );
}
