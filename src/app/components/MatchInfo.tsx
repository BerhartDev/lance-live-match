'use client';

import { useMatchStore } from '@/app/store/matchStore';

export default function MatchInfo() {
  const match = useMatchStore((state) => state.match);
  
  console.log('Match data:', match);

  if (!match) return <div> Carregando informações da partida...</div>;

  return (
    <div className="p-4 dark:text-white">
      <h2 className="text-xl font-bold mb-2">Informações da Partida</h2>

      <div className="flex items-center gap-4 mb-2">
        <div className="flex flex-col items-center">
          <img src={match.team_a.logo} alt={match.team_a.name} className="w-12 h-12" />
          <span className="text-sm">{match.team_a.name}</span>
        </div>

        <span className="text-lg font-semibold">vs</span>

        <div className="flex flex-col items-center">
          <img src={match.team_b.logo} alt={match.team_b.name} className="w-12 h-12" />
          <span className="text-sm">{match.team_b.name}</span>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-white">
        <div><strong>Campeonato:</strong> {match.championship.name}</div>
        <div><strong>Estádio:</strong> {match.stadium.name} - {match.stadium.city}</div>
        <div><strong>Início:</strong> {new Date(match.start_in).toLocaleString('pt-BR')}</div>
      </div>
    </div>
  );
}
