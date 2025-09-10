import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "connect-src 'self' http://localhost:3333 https://api.mixmasterpvp.com.br;",
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.mixmasterpvp.com.br',
        pathname: '/uploads/**',
      }
    ],
  },
};

export default nextConfig;
