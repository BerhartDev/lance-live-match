import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'temporeal.lance.com.br',
        pathname: '/storage/images/**',
      },
    ],
  },
};

export default nextConfig;
