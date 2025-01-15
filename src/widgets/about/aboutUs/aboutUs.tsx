import Image from 'next/image';
import Banner from '@public/img/aboutUs/Banner.png';
import { Button, WidgetContainer } from '@/shared';

export const AboutUs = () => {
  return (
    <WidgetContainer
      innerContainerProps={{
        className: 'flex justify-between items-center gap-5 mb-10',
      }}
    >
      <div className={'flex flex-col gap-14'}>
        <div className={'flex flex-col'}>
          <h1 className={'text-title'}>О компании</h1>
          <p className={'text-paragraph'}>
            Мы рады приветствовать Вас! Протек автозапчасти — это
            интернет-магазин автозапчастей, предлагающий широкий выбор деталей
            для автомобилей различных марок, подбор по VIN, кроссировка,
            техническая поддержка и сопровождение.
          </p>
        </div>
        <Button size={'lg'} style={{ width: 'fit-content' }}>
          Перейти в каталог запчастей
        </Button>
      </div>
      <Image
        src={Banner}
        alt={'Protek - ваш надежный поставщик автозапчастей!'}
        width={820}
        height={469}
      />
    </WidgetContainer>
  );
};
