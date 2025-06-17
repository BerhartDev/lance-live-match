'use client';

import { useScoreStore } from '@/app/store/scoreStore';
import { useMatchStore } from '../store/matchStore';
import Image from 'next/image';

export default function ScoreBoard() {
  const { homeGoals, awayGoals } = useScoreStore();
  const match = useMatchStore((state) => state.match);

  if (!match) {
    return null;
  }

  return (
    <div className="p-4 bg-white text-center dark:bg-zinc-900 dark:text-white">
      <div className="flex items-center gap-4 mb-2 justify-center">
        <div className="flex items-center">
          <span className="font-bold w-16 h-16 flex items-center justify-center text-3xl">{match.team_a.initials}</span>
          <Image src={match.team_a.logo} alt={match.team_a.name} width={50} height={50} className="w-12 h-12" />
        </div>
        <div className="text-4xl font-semibold">
           {homeGoals} x {awayGoals} 
        </div>
        <div className="flex items-center ">
          <Image src={match.team_b.logo} alt={match.team_b.name} width={50} height={50} className="w-12 h-12" />
          <span className="font-bold w-16 h-16 flex items-center justify-center text-3xl">{match.team_b.initials}</span>
        </div>
      </div>
    </div>
  );
}
