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
  },
  async headers() {
    return [
      {
        source: '/videos/background-video.mp4',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Ranges', value: 'bytes' }
        ]
      },
      {
        source: '/videos/background-poster.jpg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  }
};

export default nextConfig;
