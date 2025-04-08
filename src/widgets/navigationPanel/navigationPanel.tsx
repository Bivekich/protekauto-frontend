'use client';
import { navItems } from './navItems';
import { Icon } from '@/shared';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavigationPanel = () => {
  const pathname = usePathname();
  return (
    <div
      className={
        'bg-white p-8 rounded-[20px] space-y-5 w-full max-w-[305px] h-fit'
      }
    >
      <h4 className={'text-paragraph font-semibold text-black'}>
        Личный кабинет
      </h4>
      <div>
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`flex items-center gap-5 py-3 px-4 rounded-md cursor-pointer ${pathname === item.href ? '!*:text-black *:*:fill-black bg-sky-blue' : 'hover:bg-blue-50'} transition`}
          >
            <Icon name={item.icon} />
            <p className={'text-paragraph-sm text-gray-600'}>{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
