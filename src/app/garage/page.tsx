'use client';

import { useEffect, useState } from 'react';
import { GaragePage } from '@/components/Garage';

export default function Garage() {
  // Имитация проверки авторизации на клиенте
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Имитация загрузки данных авторизации
  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API для проверки авторизации
    setIsAuthorized(true);
  }, []);

  return <GaragePage isAuthorized={isAuthorized} />;
}
