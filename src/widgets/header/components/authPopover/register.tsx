'use client';
import {
  Button,
  Icon,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  PhoneInput,
  WidgetContainer,
} from '@/shared';
import { useState } from 'react';

export const RegisterContent = () => {
  const [isMessageSent, setIsMessageSent] = useState(false);
  return (
    <WidgetContainer innerContainerProps={{ className: 'space-y-10' }}>
      <h3 className={'text-title'}>РЕГИСТРАЦИЯ</h3>
      {!isMessageSent ? (
        <div className={'flex justify-start gap-3 items-end'}>
          <div className={'space-y-5 font-golos'}>
            <span className={'text-paragraph'}>Введите номер телефона</span>
            <PhoneInput
              className={'w-[360px]'}
              placeholder={'+7 (999) 999-99-99'}
            />
          </div>
          <div className={'space-y-5 font-golos'}>
            <span className={'text-paragraph'}>Введите имя</span>
            <Input className={'w-[360px]'} placeholder={'Иван'} />
          </div>
          <div className={'space-y-5 font-golos'}>
            <span className={'text-paragraph'}>Введите фамилию</span>
            <Input className={'w-[360px]'} placeholder={'Иванов'} />
          </div>
          <Button onClick={() => setIsMessageSent(true)}>
            Получить код для регистрации
          </Button>
        </div>
      ) : (
        <div className={'space-y-5 font-golos w-full'}>
          <span className={'text-paragraph'}>Введите код из СМС</span>
          <div className={'flex justify-between w-full'}>
            <div className={'flex gap-5 w-full'}>
              <InputOTP maxLength={5}>
                <InputOTPGroup className={'gap-3'}>
                  {new Array(5).fill(0).map((_, index) => (
                    <InputOTPSlot index={index} key={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <Button>Зарегистрироваться</Button>
            </div>
          </div>

          <div
            className={
              'w-fit flex items-center gap-4 text-gray-600 text-paragraph-sm group cursor-pointer'
            }
            onClick={() => setIsMessageSent(false)}
          >
            <Icon
              name={'arrow_long'}
              className={
                'rotate-180 *:*:fill-gray-600 transition group-hover:-translate-x-2'
              }
            />
            Ввести другой номер
          </div>
        </div>
      )}
    </WidgetContainer>
  );
};
