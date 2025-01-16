'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Icon,
  routes,
} from '@/shared';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const HeaderBottom = () => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbs = [{ name: 'Главная', path: '/' }];

    // Проход по сегментам пути
    pathSegments.reduce((prev, current) => {
      const currentPath = `${prev}/${current}`;

      // Поиск соответствующего маршрута
      const matchedRoute = routes[0].children.find(
        (route) => route.path === currentPath
      );

      if (matchedRoute) {
        breadcrumbs.push({
          name: matchedRoute.name,
          path: currentPath,
        });
      }

      return currentPath;
    }, '');

    return breadcrumbs;
  }, [pathname]);

  return (
    <div className={'w-full max-w-pc pt-[30px] pb-5'}>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <div key={item.name} className={'flex items-center gap-5'}>
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <Icon name={'arrow'} />
                </BreadcrumbSeparator>
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
