import { Navbar } from '@/app/components/Navbar'

export default function HomePage() {
  return (  
    <main className="min-h-screen flex flex-col items-center gap-4 bg-white dark:bg-zinc-900">
      <Navbar />
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white transition-colors">
        Hello World
      </h1>
    </main>
  )
}