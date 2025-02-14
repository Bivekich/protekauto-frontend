import { Icon, WidgetContainer } from '@/shared';
import { cards, services } from './cards';

export const WholesaleMiddle = () => {
  return (
    <WidgetContainer
      outerContainerProps={{ className: 'bg-sky-blue pt-20' }}
      innerContainerProps={{ className: 'space-y-10' }}
    >
      <h2 className={'text-title-secondary text-[42px]'}>
        Почему оптовые покупатели выбирают PROTEK
      </h2>
      <div className={'grid grid-cols-4 gap-4'}>
        {cards.map(({ icon, description, title }) => (
          <div
            key={title}
            className={'p-10 h-[266px] w-full bg-white rounded-xl space-y-3'}
          >
            <Icon name={icon} />
            <p className={'text-paragraph font-bold'}>{title}</p>
            <p className={'text-paragraph-sm'}>{description}</p>
          </div>
        ))}
      </div>

      <div className={'space-y-4'}>
        <h5 className={'text-title-fourth font-golos text-[26px]'}>
          Сервисы для удобной работы с нами
        </h5>
        <div className={'flex gap-5'}>
          {services.map((service, index) => (
            <p key={index} className={'text-paragraph text-[22px]'}>
              {service}
            </p>
          ))}
        </div>
      </div>
    </WidgetContainer>
  );
};
