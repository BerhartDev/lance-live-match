'use client';

import { useClockStore } from '@/app/store/clockStore';
import { useScoreStore } from '../store/scoreStore';
import { useProcessedEventsStore } from '../store/processedEventsStore';

export default function ReplayControls() {
  const status = useClockStore((state) => state.status);
  const currentPeriod = useClockStore((state) => state.currentPeriod);
  const startFirstHalf = useClockStore((state) => state.startFirstHalf);
  const startClock = useClockStore((state) => state.startClock);
  const stopClock = useClockStore((state) => state.stopClock);
  const resetClock = useClockStore((state) => state.resetClock);
  const resetScore = useScoreStore((state) => state.resetScore);
  const resetProcessed = useProcessedEventsStore((state) => state.resetProcessed);

  const handlePlay = () => {
    if (currentPeriod === 5) {
      resetClock();
      resetScore();
      resetProcessed();
      startFirstHalf();
      return;
    }
    if (currentPeriod === 1) {
      startFirstHalf(); // Inicia o primeiro tempo se estiver no pré-jogo
    } else {
      startClock(); // Continua do minuto atual se já estiver em algum período
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center p-4  dark:bg-zinc-900 shadow-lg">
      {status !== 'running' && (
        <button
          onClick={handlePlay}
          className="w-1/2 px-2 py-2 bg-green-600 text-white  hover:bg-green-700 transition-colors"
        >
          ▶️ Iniciar
        </button>
      )}

      {status === 'running' && (
        <button
          onClick={stopClock}
          className="w-1/2 py-2 bg-yellow-500 text-white  hover:bg-yellow-600 transition-colors"
        >
          ⏸️ Pausar
        </button>
      )}

      <button
        onClick={() => { resetClock(); resetScore(); resetProcessed();}}
        className="w-1/2 px-4 py-2 bg-red-600 text-white  hover:bg-red-700 transition-colors"
      >
        🔄 Resetar
      </button>
    </div>
  );
}
