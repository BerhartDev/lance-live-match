'use client';

import { useNarrationStore } from '@/app/store/narrationStore';
import type { Narration } from '@/types/narration';

export default function EventList() {
  const narrations = useNarrationStore((state) => state.narrations || []);

  if (!narrations.length) {
    return <div> Nenhum evento disponível no momento.</div>;
  }

  return (
    <div className="p-4 dark:text-white">
      <h2 className="text-lg font-bold mb-2">📰 Lista de Eventos</h2>

      <ul className="space-y-2">
        {narrations.map((event: Narration) => (
          <li key={event.id} className="border-b pb-2">
            <div className="text-sm text-gray-500">{event.moment}&apos; - Período: {event.match_period_id}</div>
            <div className={event.important_action ? 'font-bold text-red-600' : ''}>
              {event.important_action && (
                <span className="mr-2 bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">
                  {event.important_action}
                </span>
              )}
              {event.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
