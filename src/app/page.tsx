'use client'

import MatchInfo from '@/app/components/MatchInfo'
import EventList from '@/app/components/EventList'
import Clock from '@/app/components/Clock'
import ReplayControls from '@/app/components/ReplayControls';
import ScoreBoard from '@/app/components/Scoreboard';
import { useFetchNarrations } from './hooks/useFetchNarrations';
import { useMatchClock } from '@/app/hooks/useMatchClock'
import { useProcessImportantEvents } from '@/app/hooks/useProcessImportantEvents';

export default function HomePage() {
  useFetchNarrations()
  useMatchClock();
  useProcessImportantEvents();

  return (  
    <main className="min-h-screen flex flex-col items-center  bg-white dark:bg-zinc-900 pb-24">
      <Clock />
      <ScoreBoard />
      <MatchInfo />
      <EventList />
      <ReplayControls />
    </main>
  )
}