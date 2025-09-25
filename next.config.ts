import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com'
      },
      // Opcionais futuros (comentados) – ativar se precisar
      // {
      //   protocol: 'https',
      //   hostname: 'raw.githubusercontent.com'
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'avatars.githubusercontent.com'
      // }
    ]
  }
};

export default nextConfig;
