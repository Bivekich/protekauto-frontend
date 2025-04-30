'use client';

import {
  ShoppingCart,
  Clock,
  Bell,
  AlertTriangle,
  MapPin,
  Car,
  Settings,
  Wallet,
  Receipt,
  Building,
} from 'lucide-react';

type SidebarLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

type SidebarSectionProps = {
  title: string;
  links: SidebarLink[];
};

const SidebarSection = ({ title, links }: SidebarSectionProps) => {
  return (
    <>
      <div className="py-[10px] mt-[12px] first:mt-0">
        <h2 className="text-[20px] font-semibold text-[#000814]">{title}</h2>
      </div>
      <div className="flex flex-col gap-[3px]">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`flex items-center gap-[10px] py-[8px] px-[10px] rounded-lg ${
              link.isActive ? 'bg-[#E6EDF6]' : 'hover:bg-[#E6EDF6]'
            } text-[#424F60]`}
          >
            {link.icon}
            <span className="text-[16px]">{link.label}</span>
          </a>
        ))}
      </div>
    </>
  );
};

type AccountSidebarProps = {
  activeLink?: string;
};

const AccountSidebar = ({ activeLink = 'garage' }: AccountSidebarProps) => {
  const accountLinks = [
    {
      label: 'Заказы',
      href: '/account/orders',
      icon: <ShoppingCart size={20} />,
      isActive: activeLink === 'orders',
    },
    {
      label: 'История поиска',
      href: '/account/search-history',
      icon: <Clock size={20} />,
      isActive: activeLink === 'search-history',
    },
    {
      label: 'Уведомления',
      href: '/account/notifications',
      icon: <Bell size={20} />,
      isActive: activeLink === 'notifications',
    },
    {
      label: 'Оповещения',
      href: '/account/alerts',
      icon: <AlertTriangle size={20} />,
      isActive: activeLink === 'alerts',
    },
    {
      label: 'Адреса доставки',
      href: '/account/delivery-addresses',
      icon: <MapPin size={20} />,
      isActive: activeLink === 'delivery-addresses',
    },
    {
      label: 'Гараж',
      href: '/garage',
      icon: <Car size={20} />,
      isActive: activeLink === 'garage',
    },
    {
      label: 'Настройки аккаунта',
      href: '/account/settings',
      icon: <Settings size={20} />,
      isActive: activeLink === 'settings',
    },
  ];

  const financeLinks = [
    {
      label: 'Баланс',
      href: '/account/balance',
      icon: <Wallet size={20} />,
      isActive: activeLink === 'balance',
    },
    {
      label: 'Акты сверки',
      href: '/account/reconciliation',
      icon: <Receipt size={20} />,
      isActive: activeLink === 'reconciliation',
    },
    {
      label: 'Реквизиты',
      href: '/account/requisites',
      icon: <Building size={20} />,
      isActive: activeLink === 'requisites',
    },
  ];

  return (
    <div className="w-[320px]">
      <div className="bg-white rounded-[20px] p-[15px] pb-[25px]">
        <SidebarSection title="Личный кабинет" links={accountLinks} />
        <SidebarSection title="Финансы" links={financeLinks} />
      </div>
    </div>
  );
};

export default AccountSidebar;
