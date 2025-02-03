import { Button, Icon, WidgetContainer } from '@/shared';
import { gridItems } from './gridItems';
import Wheels from '@public/img/aboutUs/Wheels.jpg';
import Image from 'next/image';

export const MainInfo = () => {
  return (
    <WidgetContainer
      outerContainerProps={{ className: 'bg-sky-blue' }}
      innerContainerProps={{
        className: 'pt-20 flex flex-col gap-10 pb-[60px] font-golos',
      }}
    >
      <h2 className={'text-title-third'}>ПРОТЕК Автозапчасти – это</h2>

      <div className={'flex w-full justify-between gap-5'}>
        <p className={'w-full'}>
          Электронные каталоги для подбора. Подбор конкретной автозапчасти с
          помощью электронных каталогов. Кроссировка по оригинальным номерам и
          возможность выбора артикула от разных производителей по разным ценам и
          уровню качества.
        </p>
        <p className={'w-full'}>
          Сотрудничаем только с известными поставщиками и брендами, что страхует
          наших партнёров от приобретения контрафакта, что очень важно, с нами
          вы застрахованы от подделок
        </p>
      </div>

      <div className={'w-full grid grid-cols-3 gap-5'}>
        {gridItems.map((item) => (
          <div
            key={item.title}
            className={
              'rounded-xl p-8 border-gray-label border flex flex-col gap-6 w-full'
            }
          >
            <h5
              className={
                'text-title-third font-golos flex gap-4 text-xl leading-5 items-center'
              }
            >
              <Icon name={item.icon} />
              {item.title}
            </h5>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className={'relative rounded-xl overflow-hidden p-[60px]'}>
        <div
          className={
            'absolute inset-0 bg-gradient-to-r from-secondary-blue to-secondary-blue-80 z-10 opacity-80'
          }
        />

        <Image
          src={Wheels}
          alt={'Фон'}
          fill
          className={'absolute object-cover z-0'}
        />

        <div
          className={
            'relative z-20 w-full h-full flex items-center justify-between'
          }
        >
          <div className={'w-full flex flex-col max-w-[760px] gap-9'}>
            <h3 className={'text-title-third relative text-white'}>
              Мы всегда рады помочь
            </h3>
            <p className={'text-gray-label'}>
              Если вам нужна помощь с подбором автозапчастей, то воспользуйтесь
              формой VIN-запроса. Введите идентификационный номер (VIN) вашего
              автомобиля — и мы найдём нужную деталь.
            </p>
          </div>

          <Button size={'lg'}>Отправить VIN-запрос</Button>
        </div>
      </div>
    </WidgetContainer>
  );
};
