'use client';

import { useClockStore } from '@/app/store/clockStore';

export default function Clock() {
  const currentMinute = useClockStore((state) => state.currentMinute);
  const status = useClockStore((state) => state.status);
  const currentPeriod = useClockStore((state) => state.currentPeriod);

  const formatMatchTime = (minutes: number) => {
    const min = minutes.toString().padStart(2, '0');
    const sec = '00'; // Se quiser no futuro podemos controlar segundos também
    return `${min}:${sec}`;
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

  return (
    <div className="p-3 bg-gray-5 flex flex-col gap-1 w-fit dark:bg-zinc-900">
      <div className="text-sm text-gray-700 font-semibold dark:text-white">
        Período: {getPeriodLabel(currentPeriod)}
      </div>
      <div className="text-xl font-bold text-black dark:text-white">
        {formatMatchTime(currentMinute)}
      </div>
      <div className={`text-xs font-medium ${status === 'running' ? 'text-green-600' : 'text-gray-500'}`}>
        Status: {status}
      </div>
    </div>
  );
}
