import { WidgetContainer } from '@/shared';
import { gridItems } from './gridItems';
import Image from 'next/image';

export const WeOffer = () => {
  return (
    <WidgetContainer
      outerContainerProps={{ className: 'bg-sky-blue' }}
      innerContainerProps={{ className: 'pt-10 flex flex-col gap-10' }}
    >
      <h2 className={'text-title-fourth text-2xl'}>Мы предлагаем</h2>
      <div className={'grid grid-cols-2 gap-5 font-golos'}>
        {gridItems.map((item) => (
          <div
            key={item.title}
            className={
              'bg-white p-10 rounded-2xl flex items-center justify-between w-full gap-7'
            }
          >
            <Image
              {...item.photo}
              alt={item.photo.alt || `Изображение для ${item.title}`}
            />
            <div className={'w-full flex flex-col gap-4'}>
              <h4 className={'text-title-fourth'}>{item.title}</h4>
              <p className={'leading-5'}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};
