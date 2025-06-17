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

export const metadata: Metadata = {
  title: "Live Match MVP",
  description: "Cobertura ao vivo de futebol",
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