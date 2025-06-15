'use client';

import { useScoreStore } from '@/app/store/scoreStore';

export default function ScoreBoard() {
  const { homeGoals, awayGoals } = useScoreStore();

  return (
    <div className="p-4 bg-white text-center dark:bg-zinc-900 dark:text-white">
      <div className="text-2xl font-semibold">
        Flamengo {homeGoals} x {awayGoals} Juventude
      </div>
    </div>
  );
}
