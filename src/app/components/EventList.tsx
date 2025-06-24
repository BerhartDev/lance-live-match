"use client";

import { useState } from "react";
import {
  useFilteredEvents,
  MatchPeriodFilter,
  ActionTypeFilter,
} from "@/app/hooks/useFilteredEvents";
import Image from "next/image";
import Dropdown from "./ui/Dropdown";
import { getActionLabel } from "@/app/utils/actionUtils";

export default function EventList() {
  const [selectedPeriod, setSelectedPeriod] = useState<MatchPeriodFilter>("all");
  const [selectedAction, setSelectedAction] = useState<ActionTypeFilter>("all");

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

  const periodFilters = [
    { id: "all", label: "Todos os Períodos" },
    { id: "pre_jogo", label: "Pré-Jogo" },
    { id: "primeiro_tempo", label: "1º Tempo" },
    { id: "intervalo", label: "Intervalo" },
    { id: "segundo_tempo", label: "2º Tempo" },
  ];

  const actionFilters = [
    { id: "all", label: "Todas Ações" },
    { id: "gol", label: "Gols" },
    { id: "cartao", label: "Cartões" },
    { id: "impedimento", label: "Impedimentos" },
    { id: "penalti", label: "Pênaltis" },
  ];

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 dark:text-white w-full max-w-screen-lg">
      <h2 className="text-lg font-bold mb-3 dark:text-white">
        LANCE! A LANCE!
      </h2>

      {/* Filtros */}
      <div className="mb-4 flex flex-col md:flex-row md:gap-4">
        {/* Filtros de Período */}
        <div className="mb-4 md:mb-0 md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtrar por Período
          </label>
          <Dropdown
            options={periodFilters}
            selectedValue={selectedPeriod}
            onSelect={(value) => setSelectedPeriod(value as MatchPeriodFilter)}
            placeholder="Selecione um período"
          />
        </div>

        {/* Filtros de Ação */}
        <div className="md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtrar por Ação
          </label>
          <Dropdown
            options={actionFilters}
            selectedValue={selectedAction}
            onSelect={(value) => setSelectedAction(value as ActionTypeFilter)}
            placeholder="Selecione uma ação"
          />
        </div>
      </div>

      {/* Lista de Eventos Agrupados */}
      {filteredEvents.length > 0 ? (
        <div className="font-arquiba space-y-6">
          {groupEventsByPeriod(filteredEvents).map(([period, events]) => (
            <div key={period} className="space-y-2">
              <ul className="space-y-2">
                {events.map((event) => {
                  const actionInfo = event.important_action
                    ? getActionLabel(event.important_action)
                    : null;
                  return (
                    <li
                      key={event.id}
                      className="flex items-start gap-4 py-2 last:border-b-0"
                    >
                      <div className="flex flex-col items-center text-center pt-1 w-16">
                        <span className="text-xl text-black dark:text-white">
                          {event.moment}&apos;&apos;
                        </span>
                      </div>
                      <div
                        className={`flex-1 p-3 rounded-lg ${
                          actionInfo ? "bg-gray-100 dark:bg-zinc-800" : ""
                        }`}
                      >
                        {actionInfo && (
                          <div className="font-bold mb-1 dark:text-white flex items-center">
                            {actionInfo.iconPath ? (
                              <Image
                                src={actionInfo.iconPath}
                                alt={actionInfo.label}
                                width={20}
                                height={20}
                                className="mr-2"
                              />
                            ) : actionInfo.emoji ? (
                              <span className="text-xl mr-2">
                                {actionInfo.emoji}
                              </span>
                            ) : null}
                            {actionInfo.label.toUpperCase()}
                          </div>
                        )}
                        <span className="block text-sm dark:text-white">
                          {event.text}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Nenhum evento encontrado para este filtro.
        </div>
      )}
    </div>
  );
}
