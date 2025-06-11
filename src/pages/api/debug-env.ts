import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Проверяем только публичные переменные для безопасности
  const envVars = {
    NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
    NEXT_PUBLIC_CMS_GRAPHQL_URL: process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  res.status(200).json({
    message: 'Environment Variables Debug',
    env: envVars,
    timestamp: new Date().toISOString(),
  });
} 