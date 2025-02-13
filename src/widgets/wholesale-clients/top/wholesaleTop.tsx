import { Button, Icon, WidgetContainer } from '@/shared';
import { wholesalePoints } from './points';
import Image from 'next/image';

import Banner from '@img/wholesale/Banner.png';

export const WholesaleTop = () => {
  return (
    <WidgetContainer
      innerContainerProps={{
        className: 'flex justify-between h-[469px] mb-10',
      }}
    >
      <div className={'h-full flex flex-col gap-8 justify-between'}>
        <h1 className={'text-title'}>ОПТОВИКАМ</h1>
        <div className={'space-y-4'}>
          {wholesalePoints.map((point) => (
            <div key={point} className={'flex items-center gap-4'}>
              <Icon name={'verify_red'} />
              <p className={'text-paragraph'}>{point}</p>
            </div>
          ))}
        </div>
        <Button className={'w-fit px-8'}>
          Получить доступ к оптовым ценам
        </Button>
      </div>
      <Image
        src={Banner}
        alt={'Более 10 млн запчастей по минимальным ценам'}
        width={820}
        height={469}
      />
    </WidgetContainer>
  );
};
