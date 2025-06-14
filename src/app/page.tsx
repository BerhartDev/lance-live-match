'use client'

import Navbar  from '@/app/components/Navbar'
import MatchInfo from '@/app/components/MatchInfo'
import EventList from '@/app/components/EventList'
import Clock from '@/app/components/Clock'
import ReplayControls from '@/app/components/ReplayControls';
import { useFetchMatch } from '@/app/hooks/useFetchMatch';
import { useFetchNarrations } from './hooks/useFetchNarrations';
import { useMatchClock } from '@/app/hooks/useMatchClock'

export default function HomePage() {
  useFetchMatch()
  useFetchNarrations()
  useMatchClock();

  return (  
    <main className="min-h-screen flex flex-col items-center gap-4 bg-white dark:bg-zinc-900">
      <Navbar />
      <Clock />
      <ReplayControls />
      <MatchInfo />
      <EventList />
    </main>
  )
}