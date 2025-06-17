import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next'
import "./globals.css";
import { ThemeProvider } from '@/theme/ThemeProvider'

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
    <body>
      <ThemeProvider>
        {children}
        <SpeedInsights />
      </ThemeProvider>
    </body>
  </html>;
}