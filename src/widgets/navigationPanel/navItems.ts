import { TIconMap } from '@/shared';

interface NavItem {
  icon: TIconMap;
  title: string;
  href: string;
}

export const navItems: NavItem[] = [
  { icon: 'nav_orders', title: 'Заказы', href: '/profile/orders' },
  { icon: 'nav_alerts', title: 'Оповещения', href: '/profile/alerts' },
  { icon: 'nav_balance', title: 'Баланс', href: '/profile/balance' },
  { icon: 'nav_messages', title: 'Сообщения', href: '/profile/messages' },
  {
    icon: 'nav_addresses',
    title: 'Адреса доставки',
    href: '/profile/addresses',
  },
  { icon: 'nav_favorites', title: 'Избранное', href: '/profile/favorites' },
  { icon: 'nav_garage', title: 'Гараж', href: '/profile/garage' },
  {
    icon: 'nav_settings',
    title: 'Настройки аккаунта',
    href: '/profile/settings',
  },
];
