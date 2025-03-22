import Image from 'next/image';
import Wheels from '@img/aboutUs/Wheels.jpg';
import { Button, WidgetContainer } from '@/shared';

export const Banner = () => {
  return (
    <WidgetContainer>
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
            <h3 className={'text-title-fourth text-3xl relative text-white'}>
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
