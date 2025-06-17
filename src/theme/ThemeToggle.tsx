'use client'

import { useTheme } from './ThemeProvider'
import Image from 'next/image'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-zinc-800'}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Image src="/icons/sun.svg" alt="Light mode" width={24} height={24} />
      ) : (
        <Image src="/icons/moon.svg" alt="Dark mode" width={24} height={24} />
      )}
    </button>
  )
} 