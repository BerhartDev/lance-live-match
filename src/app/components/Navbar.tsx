'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/theme/ThemeToggle';

export default function Navbar() {
    return (
        <nav className="fixed z-20 w-full h-16 flex items-center justify-between p-4 border-b bg-white dark:bg-zinc-900">
            <Link href="/">
                <div className="relative h-10 w-32">
                    <Image
                        src="/logo-dark.svg"
                        alt="Logo Light"
                        className="block dark:hidden h-full w-auto"
                        width={128}
                        height={40}
                        priority
                    />
                    <Image
                        src="/logo-white.svg"
                        alt="Logo Dark"
                        className="hidden dark:block h-full w-auto"
                        width={128}
                        height={40}
                        priority
                    />
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggle />
            </div>
        </nav>
    );
}
