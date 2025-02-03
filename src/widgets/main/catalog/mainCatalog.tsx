import { WidgetContainer } from '@/shared';
import { BrandsCatalog } from '@/features';

export const MainCatalog = () => {
  return (
    <WidgetContainer innerContainerProps={{ className: 'space-y-10' }}>
      <h3 className={'text-title-secondary'}>Каталоги автозапчастей</h3>
      <div className={'w-full flex gap-14 justify-between'}>
        <BrandsCatalog />
      </div>
    </WidgetContainer>
  );
};
