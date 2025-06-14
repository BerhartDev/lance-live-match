'use client'

import Navbar  from '@/app/components/Navbar'
import MatchInfo from '@/app/components/MatchInfo'
import EventList from '@/app/components/EventList'
import { useFetchMatch } from '@/app/hooks/useFetchMatch';
import { useFetchNarrations } from './hooks/useFetchNarrations';

export default function HomePage() {
  useFetchMatch()
  useFetchNarrations()

  return (  
    <main className="min-h-screen flex flex-col items-center gap-4 bg-white dark:bg-zinc-900">
      <Navbar />
      <MatchInfo />
      <EventList />
    </main>
  )
}