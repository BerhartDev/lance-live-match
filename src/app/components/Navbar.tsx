'use client';

import Link from 'next/link';
import ThemeToggle from '@/theme/ThemeToggle';

export function Navbar() {
    return (
        <nav className="w-full h-16 flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900">
            <Link href="/">
                <div className="relative h-10 w-32">
                    {/* Logo modo claro */}
                    <img
                        src="/logo-dark.svg"
                        alt="Logo Light"
                        className="block dark:hidden h-full w-auto"
                    />
                    {/* Logo modo escuro */}
                    <img
                        src="/logo-white.svg"
                        alt="Logo Dark"
                        className="hidden dark:block h-full w-auto"
                    />
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggle />
            </div>
        </nav>
    );
}
