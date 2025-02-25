'use client';
import { Button, Input, WidgetContainer } from '@/shared';
import { ChangeEvent, useState } from 'react';

export const Distribution = () => {
  const [email, setEmail] = useState('');

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    console.log(email);
  };

  return (
    <WidgetContainer
      innerContainerProps={{
        className: 'py-16 grid grid-cols-3 gap-3 items-center',
      }}
    >
      <h4 className={'text-title-secondary text-white'}>
        Подпишись на новостную рассылку
      </h4>
      <p className={'text-paragraph text-ice-grey'}>
        Оставайтесь в курсе акций, новинок и специальных предложений
      </p>
      <div className={'flex items-center gap-4'}>
        <Input
          placeholder={'Введите E-mail'}
          value={email}
          onChange={handleChangeEmail}
        />
        <Button className={'px-8'} onClick={handleSubmit}>
          Подписаться
        </Button>
      </div>
    </WidgetContainer>
  );
};
