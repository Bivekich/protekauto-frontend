import { WidgetContainer } from '@/shared';
import { circles, plotData } from './pageContent';
import Image from 'next/image';

import Car from '@img/main/Car.png';

export const MainBanner = () => {
  return (
    <WidgetContainer
      outerContainerProps={{ className: 'bg-main-blue' }}
      innerContainerProps={{
        className: 'relative text-white flex flex-col gap-16 pb-8',
      }}
    >
      <div className={'flex flex-col gap-8 max-w-[45%] z-10'}>
        <h1 className={'text-title'}>Широкий выбор автозапчастей</h1>
        <p className={'text-paragraph'}>
          Сотрудничаем только с проверенными поставщиками. <br />
          Постоянно обновляем ассортимент, чтобы предложить <br />
          самые лучшие и актуальные детали.
        </p>
      </div>
      <div className={'flex w-full justify-between items-center'}>
        {plotData.map((data) => (
          <div key={data.text} className={'flex gap-4 items-center'}>
            <Image
              {...data.image}
              alt={data.image.alt || `Изображение ${data.text}`}
            />
            <p className={'text-paragraph-sm'}>{data.text}</p>
          </div>
        ))}
      </div>
      <div className={'absolute w-[1197px] h-[380px] -right-28'}>
        <Image
          src={Car}
          alt={'Машина'}
          width={2000}
          height={659}
          className={'w-[1197px] h-[380px]'}
        />
        {circles.data.map((circle) => (
          <div className={`${circles.styles} ${circle}`} key={circle}>
            1200 чего-то
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};
