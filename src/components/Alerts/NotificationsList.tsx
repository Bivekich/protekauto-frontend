'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  content: string;
  important: boolean;
}

export function NotificationsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Скидка на все товары Hett Automotive',
      content:
        'Только до 31 апреля успейте приобрести качественные товары со скидкой до 50% от Hett Automotive',
      important: true,
    },
    {
      id: '2',
      title: 'Скидка на все товары Hett Automotive',
      content:
        'Только до 31 апреля успейте приобрести качественные товары со скидкой до 50% от Hett Automotive',
      important: false,
    },
    {
      id: '3',
      title: 'Скидка на все товары Hett Automotive',
      content:
        'Только до 31 апреля успейте приобрести качественные товары со скидкой до 50% от Hett Automotive',
      important: false,
    },
    {
      id: '4',
      title: 'Скидка на все товары Hett Automotive',
      content:
        'Только до 31 апреля успейте приобрести качественные товары со скидкой до 50% от Hett Automotive',
      important: false,
    },
  ]);

  const importantNotifications = notifications.filter((n) => n.important);
  const allNotifications = notifications;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleImportant = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, important: !notification.important }
          : notification
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const NotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => (
    <div className="flex flex-col p-3 md:p-5 bg-[#F5F8FB] rounded-lg">
      <div className="flex justify-between">
        <div className="flex flex-1 gap-5">
          <button
            onClick={() => handleToggleImportant(notification.id)}
            className="flex items-center gap-[5px] h-5 text-sm text-[#424F60]"
          >
            {notification.important ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.66683 14V4.66667C2.66683 3.95942 2.94778 3.28115 3.44788 2.78105C3.94798 2.28095 4.62625 2 5.3335 2H10.6668C11.3741 2 12.0524 2.28095 12.5525 2.78105C13.0526 3.28115 13.3335 3.95942 13.3335 4.66667V14L8.00016 11.3333L2.66683 14Z"
                    fill="#EC1C24"
                  />
                </svg>
                <span>Больше не важно</span>
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.66683 14V4.66667C2.66683 3.95942 2.94778 3.28115 3.44788 2.78105C3.94798 2.28095 4.62625 2 5.3335 2H10.6668C11.3741 2 12.0524 2.28095 12.5525 2.78105C13.0526 3.28115 13.3335 3.95942 13.3335 4.66667V14L8.00016 11.3333L2.66683 14Z"
                    stroke="#D9D9D9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Пометить как важное</span>
              </>
            )}
          </button>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-[#000814]">
              {notification.title}
            </h3>
            <p className="text-sm text-[#424F60]">{notification.content}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-5 mt-3">
        <button className="flex items-center gap-1 text-sm text-[#424F60]">
          <span>Развернуть</span>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="#000814"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => handleDelete(notification.id)}
          className="flex items-center gap-[5px] text-sm text-[#424F60]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H3.33333H14"
              stroke="#D0D0D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33325 4.00065V2.66732C5.33325 2.31369 5.47373 1.97456 5.72378 1.72451C5.97382 1.47446 6.31296 1.33398 6.66658 1.33398H9.33325C9.68687 1.33398 10.026 1.47446 10.276 1.72451C10.5261 1.97456 10.6666 2.31369 10.6666 2.66732V4.00065M12.6666 4.00065V13.334C12.6666 13.6876 12.5261 14.0267 12.276 14.2768C12.026 14.5268 11.6869 14.6673 11.3333 14.6673H4.66658C4.31296 14.6673 3.97382 14.5268 3.72378 14.2768C3.47373 14.0267 3.33325 13.6876 3.33325 13.334V4.00065H12.6666Z"
              stroke="#D0D0D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.66675 7.33398V11.334"
              stroke="#D0D0D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33325 7.33398V11.334"
              stroke="#D0D0D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Удалить</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Поиск уведомлений"
          className="w-full py-3 px-8 border border-gray-300 rounded-lg text-base placeholder-[#8893A1]"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
            stroke="#8893A1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.0001 14.0001L11.1001 11.1001"
            stroke="#8893A1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {importantNotifications.length > 0 && (
        <div className="p-6 md:p-8 bg-white rounded-2xl">
          <h2 className="text-[30px] font-bold text-[#000814] mb-8">Важное</h2>
          <div className="flex flex-col gap-2.5">
            {importantNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </div>
      )}

      <div className="p-6 md:p-8 bg-white rounded-2xl">
        <h2 className="text-[30px] font-bold text-[#000814] mb-8">
          Все уведомления
        </h2>
        <div className="flex flex-col gap-2.5">
          {allNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
