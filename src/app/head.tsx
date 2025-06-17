export default function Head() {
  return (
    <>
      <title>Tempo Real - Partidas LANCE! a LANCE!</title>
      <meta name="description" content="Veja o replay lance a lance de partidas de futebol no Tempo Real LANCE!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content="Tempo Real - Partidas LANCE! a LANCE!" />
      <meta property="og:description" content="Veja o replay lance a lance de partidas de futebol no Tempo Real LANCE!" />
      <meta property="og:image" content="/logo-white.svg" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lance-live-match.vercel.app/" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Tempo Real - Partidas LANCE! a LANCE!" />
      <meta name="twitter:description" content="Veja o replay lance a lance de partidas de futebol no Tempo Real LANCE!" />
      <meta name="twitter:image" content="/logo-white.svg" />
    </>
  );
} 