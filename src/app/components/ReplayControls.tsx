'use client';

import { useClockStore } from '@/app/store/clockStore';

export default function ReplayControls() {
  const status = useClockStore((state) => state.status);
  const startFirstHalf = useClockStore((state) => state.startFirstHalf);
  const stopClock = useClockStore((state) => state.stopClock);
  const resetClock = useClockStore((state) => state.resetClock);

  return (
    <div className="flex gap-2">
      {status !== 'running' && (
        <button
          onClick={startFirstHalf}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          ▶️ Iniciar
        </button>
      )}

      {status === 'running' && (
        <button
          onClick={stopClock}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          ⏸️ Pausar
        </button>
      )}

      <button
        onClick={resetClock}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        🔄 Resetar
      </button>
    </div>
  );
}
