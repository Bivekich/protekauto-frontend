'use client';
import {
  Button,
  Icon,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  PhoneInput,
  WidgetContainer,
} from '@/shared';
import { FC, useState } from 'react';

interface IProps {
  onRegister: () => void;
}

export const LoginContent: FC<IProps> = ({ onRegister }) => {
  const [isMessageSent, setIsMessageSent] = useState(false);
  return (
    <WidgetContainer innerContainerProps={{ className: 'space-y-10' }}>
      <h3 className={'text-title'}>ВХОД</h3>
      <div className={'space-y-5 font-golos w-full'}>
        <span className={'text-paragraph'}>
          {isMessageSent ? 'Введите код из СМС' : 'Введите номер телефона'}
        </span>
        <div className={'flex justify-between w-full'}>
          <div className={'flex gap-5 w-full'}>
            {!isMessageSent ? (
              <>
                <PhoneInput
                  className={'max-w-[360px] w-full'}
                  placeholder={'+7 (999) 999-99-99'}
                />
                <Button onClick={() => setIsMessageSent(true)}>
                  Получить код
                </Button>
              </>
            ) : (
              <>
                <InputOTP maxLength={5}>
                  <InputOTPGroup className={'gap-3'}>
                    {new Array(5).fill(0).map((_, index) => (
                      <InputOTPSlot index={index} key={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button>Войти</Button>
              </>
            )}
          </div>
          <Button
            variant={'outlined'}
            className={'group flex items-center gap-4'}
            onClick={onRegister}
          >
            Зарегистрироваться
            <Icon
              name={'arrow_long'}
              className={'group-hover:translate-x-2 transition'}
            />
          </Button>
        </div>
        {isMessageSent && (
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
        )}
      </div>
    </WidgetContainer>
  );
};
