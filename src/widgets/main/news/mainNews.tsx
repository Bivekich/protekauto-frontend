import { Button, WidgetContainer } from '@/shared';
import { NewsCard } from '@/widgets';
import CardCar from '@img/main/CardCar.jpg';
import Business from '@img/main/Business.png';

export const MainNews = () => {
  return (
    <WidgetContainer
      innerContainerProps={{
        className: 'flex flex-col gap-10 pb-20',
      }}
    >
      <div className={'w-full flex justify-between items-center'}>
        <h3 className={'text-title-third'}>Новости</h3>
        <Button variant={'arrow'}>Ко всем новостям</Button>
      </div>

      <div className={'w-full grid grid-cols-4 gap-5'}>
        <NewsCard imageSrc={CardCar} imageAlt={'Машина'} />
        <NewsCard imageSrc={Business} imageAlt={'Машина'} />
        <NewsCard imageSrc={CardCar} imageAlt={'Машина'} />
        <NewsCard imageSrc={Business} imageAlt={'Машина'} />
      </div>
    </WidgetContainer>
  );
};
