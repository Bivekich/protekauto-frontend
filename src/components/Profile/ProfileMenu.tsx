'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    title: 'Заказы',
    icon: 'order',
    href: '/account/orders',
  },
  {
    title: 'История поиска',
    icon: 'history',
    href: '/account/search-history',
  },
  {
    title: 'Уведомления',
    icon: 'bell',
    href: '/account/notifications',
  },
  {
    title: 'Оповещения',
    icon: 'message',
    href: '/account/alerts',
  },
  {
    title: 'Адреса доставки',
    icon: 'location',
    href: '/account/addresses',
  },
  {
    title: 'Гараж',
    icon: 'garage',
    href: '/garage',
  },
  {
    title: 'Настройки аккаунта',
    icon: 'settings',
    href: '/account/settings',
  },
];

const financeItems = [
  {
    title: 'Баланс',
    icon: 'wallet',
    href: '/account/balance',
  },
  {
    title: 'Реквизиты',
    icon: 'case',
    href: '/account/requisites',
  },
  {
    title: 'Взаиморасчеты',
    icon: 'finance',
    href: '/account/payments',
  },
  {
    title: 'Акты сверки',
    icon: 'order',
    href: '/account/acts',
  },
];

export function ProfileMenu() {
  const pathname = usePathname();

  return (
    <div className="w-[320px] bg-white rounded-2xl p-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold px-2 pt-2">Личный кабинет</h2>

        <div className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 ${
                pathname === item.href ? 'bg-[#E6EDF6]' : ''
              }`}
            >
              <span
                className={`text-base ${
                  pathname === item.href ? 'text-[#424F60]' : 'text-[#424F60]'
                }`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold px-2 pt-4">Финансы</h2>

        <div className="flex flex-col gap-1">
          {financeItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 ${
                pathname === item.href ? 'bg-[#E6EDF6]' : ''
              }`}
            >
              <span
                className={`text-base ${
                  pathname === item.href ? 'text-[#424F60]' : 'text-[#424F60]'
                }`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
