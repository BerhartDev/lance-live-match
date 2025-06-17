'use client';

import { useMatchStore } from '@/app/store/matchStore';
{/* import Image from 'next/image'; */}

export default function MatchInfo() {
  const match = useMatchStore((state) => state.match);

  if (!match) return <div> Carregando informações da partida...</div>;

  return (
    <div className="flex align-center text-center dark:text-white">
      <div className="text-sm text-gray-700 dark:text-white">
        <div>{match.championship.name}</div>
        <div>{match.stadium.name} - {match.stadium.city}</div>
        <div>{new Date(match.start_in).toLocaleString('pt-BR')}</div>
      </div>
    </div>
  );
}
