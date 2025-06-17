import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"
import { Krub, Poppins } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from '@/theme/ThemeProvider'
import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://lance-live-match.vercel.app'),
  title: 'Partidas LANCE! a LANCE!',
  description: 'Assista partidas de futebol em tempo real LANCE!',
  openGraph: {
    title: 'Partidas LANCE! a LANCE!',
    description: 'Assista partidas de futebol em tempo real LANCE!',
    url: 'https://lance-live-match.vercel.app/',
    images: [
      {
        url: '/logo-og.png',
        width: 1200,
        height: 630,
        alt: 'Logo LANCE!',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partidas LANCE! a LANCE!',
    description: 'Assista partidas de futebol em tempo real LANCE!',
    images: ['/logo-og.png'],
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