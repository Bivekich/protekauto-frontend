'use client';

import { useEffect, useState } from 'react';
import { NotificationsList } from '@/components/Alerts/NotificationsList';

export default function Notifications() {
  // Имитация проверки авторизации на клиенте
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Имитация загрузки данных авторизации
  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API для проверки авторизации
    setIsAuthorized(true);
  }, []);

  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-lg">
          Для доступа к уведомлениям необходимо авторизоваться
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold text-[#000814]">Уведомления</h1>
      </div>
      <NotificationsList />
    </div>
  );
}
