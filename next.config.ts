import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  
  // Настройки для изображений
  images: {
    domains: [
      'localhost',
      'images.partsapi.ru',
      'media.partsapi.ru',
      'static.partsapi.ru'
    ],
    unoptimized: true
  },
  
  // Настройка CORS для API
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },

  // Переписка запросов для разработки
  async rewrites() {
    return [
      {
        source: '/api/cms/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
