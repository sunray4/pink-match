import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: 'pinkmatch.sunray4.hackclub.app', pathname: '/**' },
    ],
    domains: ['m.media-amazon.com'],
  },
  // For deployment
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://pinkmatch-backend.sunray4.hackclub.app/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;
