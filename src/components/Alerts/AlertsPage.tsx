'use client';

import { AlertsSettings } from './AlertsSettings';
import { NotificationsList } from './NotificationsList';

interface AlertsPageProps {
  isAuthorized: boolean;
}

export function AlertsPage({ isAuthorized }: AlertsPageProps) {
  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-lg">
          Для доступа к оповещениям необходимо авторизоваться
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold text-[#000814]">Уведомления</h1>
      </div>

      <div className="flex flex-col space-y-8">
        <AlertsSettings />
        <NotificationsList />
      </div>
    </div>
  );
}
