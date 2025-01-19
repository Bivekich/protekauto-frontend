import { routes } from '@/shared';

export const getBreadcrumbByPath = (pathname: string) => {
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [{ name: 'Главная', path: '/', bgColor: '#FFF' }];

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
        bgColor: matchedRoute.bgColor,
      });
    }

    return currentPath;
  }, '');

  return breadcrumbs;
};
