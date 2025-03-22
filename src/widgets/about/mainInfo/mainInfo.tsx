import { Banner, Icon, WidgetContainer } from '@/shared';
import { gridItems } from './gridItems';

export const MainInfo = () => {
  return (
    <WidgetContainer
      outerContainerProps={{ className: 'bg-sky-blue' }}
      innerContainerProps={{
        className: 'pt-20 flex flex-col gap-10 pb-[60px] font-golos',
      }}
    >
      <h2 className={'text-title-fourth'}>ПРОТЕК Автозапчасти – это</h2>

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
                'text-title-fourth font-golos flex gap-4 text-xl leading-5 items-center'
              }
            >
              <Icon name={item.icon} />
              {item.title}
            </h5>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <Banner />
    </WidgetContainer>
  );
};
