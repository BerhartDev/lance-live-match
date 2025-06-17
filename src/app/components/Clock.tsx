'use client';

import LiveIndicator from './ui/LiveIndicator';
import { useClockStore } from '@/app/store/clockStore';

export default function Clock() {
  const currentMinute = useClockStore((state) => state.currentMinute);
  const status = useClockStore((state) => state.status);
  const currentPeriod = useClockStore((state) => state.currentPeriod);

  const formatMatchTime = (minutes: number) => {
    const min = minutes.toString().padStart(2, '0');
    return `${min}"`;
  };

  const getPeriodLabel = (period: number) => {
    switch (period) {
      case 1:
        return 'Em breve';
      case 2:
        return '1º Tempo';
      case 3:
        return 'Intervalo';
      case 4:
        return '2º Tempo';
      case 5:
        return 'Partida encerrada';
      default: 
        return 'Desconhecido';
    }
  };

  const getPeriodBgClass = (period: number) => {
    switch (period) {
      case 1:
        return 'bg-green-700';
      case 2:
        return 'bg-green-700';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-700';
      case 5:
        return 'bg-black';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="pt-20 px-3 bg-gray-50 flex flex-col items-center gap-1 w-fit dark:bg-zinc-900">
      {currentPeriod !== 5 && status === 'running' && (
        <div className="text-md font-medium text-white">
          <LiveIndicator />
        </div>
      )}
      {currentPeriod !== 5 && (
        <div className="p-2 text-4xl text-black dark:text-white">
          {formatMatchTime(currentMinute)}
        </div>
      )}
      <div className={`px-4 py-1 text-sm rounded-full ${getPeriodBgClass(currentPeriod)} text-white font-semibold flex items-center justify-center`}>
        {getPeriodLabel(currentPeriod)}
      </div>
    </div>
  );
}
