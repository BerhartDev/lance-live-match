import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from 'next'
import { Krub, Poppins } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from '@/theme/ThemeProvider'

const krub = Krub({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-krub',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Tempo Real - Partidas LANCE! a LANCE!',
  description: 'Veja o replay lance a lance de partidas de futebol no Tempo Real LANCE!',
  openGraph: {
    title: 'Tempo Real - Partidas LANCE! a LANCE!',
    description: 'Veja o replay lance a lance de partidas de futebol no Tempo Real LANCE!',
    url: 'https://lance-live-match.vercel.app/',
    images: [
      {
        url: '/logo-white.svg',
        width: 1200,
        height: 630,
        alt: 'Logo LANCE!',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tempo Real - Partidas LANCE! a LANCE!',
    description: 'Veja o replay lance a lance de partidas de futebol no Tempo Real LANCE!',
    images: ['/logo-white.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="pt-BR">
    <body className={`${krub.variable} ${poppins.variable}`}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
      <SpeedInsights />
      <Analytics/>
    </body>
  </html>;
}