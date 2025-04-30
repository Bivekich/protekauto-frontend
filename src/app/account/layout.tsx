'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs, AccountSidebar } from '@/components/Layout';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const activeLink = pathSegments[pathSegments.length - 1];

  // Определяем хлебные крошки в зависимости от пути
  const getBreadcrumbItems = () => {
    const items = [
      { label: 'Главная', href: '/' },
      { label: 'Личный кабинет', href: '/account' },
    ];

    // Добавляем текущий элемент в хлебные крошки
    if (pathSegments.length > 2) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      const titles: Record<string, string> = {
        settings: 'Настройки аккаунта',
        orders: 'Заказы',
        balance: 'Баланс',
        notifications: 'Уведомления',
        alerts: 'Оповещения',
        addresses: 'Адреса доставки',
        'search-history': 'История запросов',
        reconciliation: 'Акты сверки',
        requisites: 'Реквизиты',
      };

      items.push({
        label:
          titles[lastSegment] ||
          lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1),
        href: pathname,
      });
    }

    return items;
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      settings: 'Настройки аккаунта',
      orders: 'Заказы',
      balance: 'Баланс',
      notifications: 'Уведомления',
      alerts: 'Оповещения',
      addresses: 'Адреса доставки',
      'search-history': 'История запросов',
      reconciliation: 'Акты сверки',
      requisites: 'Реквизиты',
    };

    if (pathSegments.length > 2) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      return (
        titles[lastSegment] ||
        lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
      );
    }

    return 'Личный кабинет';
  };

  return (
    <div className="bg-[#F5F8FB]">
      {/* Хлебные крошки и заголовок */}
      <div className="bg-white py-[30px] px-[130px]">
        <Breadcrumbs items={getBreadcrumbItems()} />
        <h1 className="text-[36px] font-extrabold text-[#000814] mt-[14px]">
          {getPageTitle()}
        </h1>
      </div>

      {/* Основной контент с сайдбаром */}
      <div className="px-[130px] py-[40px] pb-[60px] flex gap-[30px]">
        {/* Меню личного кабинета */}
        <AccountSidebar activeLink={activeLink} />

        {/* Основной контент */}
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
