'use client';

import Garage from '@img/shipping/Garage.png';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { Button, PhoneInput } from '@/shared';

export const ShippingBottom = () => {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPhone(value);
  };

  const handlePhoneSubmit = () => {
    console.log(phone);
  };

  const isButtonDisabled = phone.length !== 18;

  return (
    <div className={'relative p-[60px] overflow-hidden rounded-2xl font-golos'}>
      <div
        className={
          'absolute inset-0 bg-gradient-to-r from-secondary-blue to-secondary-blue-80 opacity-80 z-10'
        }
      />
      <Image
        src={Garage}
        alt={'Фон'}
        fill
        className={'object-cover z-0 absolute'}
      />

      <div
        className={
          'relative z-20 w-full h-fit flex items-center justify-between gap-[60px]'
        }
      >
        <div className={'w-full flex flex-col gap-9 h-full'}>
          <h3 className={'text-title-fourth relative text-white text-3xl'}>
            Мы будем рады помочь вам с оформлением заказа!
          </h3>
          <p className={'text-gray-label'}>
            Если у вас возникли вопросы, пожалуйста, оставьте свой номер
            телефона. Наш менеджер свяжется с вами и поможет оформить заказ, или
            решить любой интересующий вас вопрос!
          </p>
        </div>

        <div className={'w-full h-full gap-5 flex flex-col justify-between'}>
          <PhoneInput
            inputSize={'xl'}
            onChange={handlePhoneChange}
            placeholder={'+7 (800) 000-80-80'}
          />
          <div className={'w-full flex gap-4 items-center'}>
            <Button
              size={'lg'}
              onClick={handlePhoneSubmit}
              disabled={isButtonDisabled}
            >
              Отправить номер
            </Button>
            <ul
              className={
                'space-y-2 [&>li]:text-ice-grey [&>li]:variant-caption-secondary'
              }
            >
              <li>• Точная стоимость доставки рассчитывается индивидуально </li>
              <li>
                • Срок доставки зависит от выбранного способа доставки и региона{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
