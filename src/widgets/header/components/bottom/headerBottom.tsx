'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  getBreadcrumbByPath,
  Icon,
  WidgetContainer,
} from '@/shared';
import { usePathname } from 'next/navigation';

export const HeaderBottom = () => {
  const pathname = usePathname();

  const breadcrumbs = getBreadcrumbByPath(pathname);
  const bgColor = breadcrumbs.at(-1)?.bgColor;

  if (breadcrumbs.length < 2) {
    return;
  }

  return (
    <WidgetContainer
      outerContainerProps={{
        className: `pt-[30px] pb-5 bg-${bgColor}`,
      }}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <div
              key={item.name}
              className={'flex items-center gap-5 font-golos'}
            >
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
    </WidgetContainer>
  );
};
