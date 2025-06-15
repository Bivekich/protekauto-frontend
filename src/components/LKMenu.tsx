  import * as React from "react";
  import Link from 'next/link';
  import { useRouter } from 'next/router';
  import { useIsClient } from '@/lib/useIsomorphicLayoutEffect';

  const menuItems = [
    { label: 'Заказы', href: '/profile-orders', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/22ecd7e6251abe04521d03f0ac09f73018a8c2c8?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'История поиска', href: '/profile-history', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e7688217cca08e8c080ec07f80bf1142429d899c?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'Уведомления', href: '/profile-announcement', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7505ecbdf10660110c88e1641f43b4618fef292d?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'Оповещения', href: '/profile-notification', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f7a4dd35c3365eb1f1e7292f9b6194b8a3083c4f?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'Адреса доставки', href: '/profile-addresses', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1faca7190a7dd71a66fd3cf0127a8c6e45eac5e6?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'Гараж', href: '/profile-gar', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/783501855b4cb8be4ac47a0733e298c3f3ccfc5e?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'Настройки аккаунта', href: '/profile-set', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b39907028aa6baf08adc313aed84d1294f2be013?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
  ];

  const financeItems = [
    { label: 'Баланс', href: '/profile-balance', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/135ee20623aaa1f29816106bd0ca1a627976969d?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'Реквизиты', href: '/profile-req', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0890fb36a7fb89b3942f93be72ac0e79d93bc530?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'Взаиморасчеты', href: '/profile-settlements', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/74b08742b16c7daefb4d895173a6d749eb61fd94?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
    { label: 'Акты сверки', href: '/profile-acts', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/22ecd7e6251abe04521d03f0ac09f73018a8c2c8?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920' },
  ];

  function normalizePath(path: string) {
    return path.replace(/\/+$/, '');
  }

  const LKMenu = () => {
    const router = useRouter();
    const isClient = useIsClient();

    const handleLogout = () => {
      if (isClient) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/';
      }
    };

    return (
      <div className="flex flex-col max-w-xs text-xl font-semibold leading-none text-gray-950">
        <div className="flex flex-col px-4 pt-4 pb-6 w-full bg-white rounded-3xl">
          <div className="gap-2.5 self-start px-2.5 pt-2.5 text-gray-950">
            Личный кабинет
          </div>
          <div className="flex flex-col mt-3 w-full text-base leading-snug text-gray-600">
            {menuItems.map((item) => {
              const isActive = normalizePath(router.asPath) === normalizePath(item.href);
              return (
                <Link href={item.href} key={item.href}>
                  <div
                    className={`flex gap-2.5 items-center px-2.5 py-2 w-full whitespace-nowrap rounded-lg ${
                      isActive ? 'bg-slate-200' : 'bg-white'
                    }`}
                  >
                    <img
                      loading="lazy"
                      src={item.icon}
                      className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                      alt={item.label}
                    />
                    <div className="self-stretch my-auto text-gray-600">{item.label}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="gap-2.5 self-start px-2.5 pt-2.5 mt-3 whitespace-nowrap text-gray-950">
            Финансы
          </div>
          <div className="flex flex-col mt-3 w-full text-base leading-snug text-gray-600">
            {financeItems.map((item) => {
              const isActive = normalizePath(router.asPath) === normalizePath(item.href);
              return (
                <Link href={item.href} key={item.href}>
                  <div
                    className={`flex gap-2.5 items-center px-2.5 py-2 w-full whitespace-nowrap rounded-lg ${
                      isActive ? 'bg-slate-200' : 'bg-white'
                    }`}
                  >
                    <img
                      loading="lazy"
                      src={item.icon}
                      className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                      alt={item.label}
                    />
                    <div className="self-stretch my-auto text-gray-600">{item.label}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Кнопка выхода */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex gap-2.5 items-center px-2.5 py-2 w-full text-base leading-snug text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              tabIndex={0}
              aria-label="Выйти из аккаунта"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
              >
                <path 
                  d="M7 17L3 17C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15L1 5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3L7 3" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M14 13L19 10L14 7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M19 10L7 10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <div className="self-stretch my-auto">Выйти</div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default LKMenu; 