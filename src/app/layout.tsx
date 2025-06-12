import "./globals.css";

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
      {children}
    </body>
  </html>;
}