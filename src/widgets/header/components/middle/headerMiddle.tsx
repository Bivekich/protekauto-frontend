'use client';
import { Button, Icon, Input, InputGroup, InputRightElement } from '@/shared';
import { burgerLines } from './burgerLines';
import { useState } from 'react';
import { AuthPopover } from '../authPopover';

export const HeaderMiddle = () => {
  const [isAriaChecked, setIsAriaChecked] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    const main = document.getElementById('main');
    if (main) {
      main.style.filter = isOpen ? 'blur(10px)' : '';
    }
    setIsAriaChecked(isOpen);
  };

  return (
    <div className={'bg-main-blue w-full z-30 relative'}>
      <div className={'relative w-full flex justify-center'}>
        <div className={'bg-main-blue w-full h-full absolute'} />
        <div className={'max-w-pc w-full py-8 grid grid-cols-header gap-10 '}>
          <Button variant={'burger'} className={'w-fit z-10'}>
            <div className={'flex flex-col gap-1.5'}>
              {burgerLines.map((line, index) => (
                <div key={index} style={line} />
              ))}
            </div>
          </Button>
          <InputGroup>
            <Input
              placeholder={'Введите код запчасти или VIN номер автомобиля'}
            />
            <InputRightElement>
              <Icon name={'search'} />
            </InputRightElement>
          </InputGroup>
          <Button
            variant={'ghost'}
            className={
              'bg-secondary-blue w-fit px-7 rounded-xl hover:bg-blue-950 z-10'
            }
          >
            <Icon name={'garage'} />
            Добавить в гараж
          </Button>
          <AuthPopover
            onOpenChange={onOpenChange}
            isAriaChecked={isAriaChecked}
            setIsAriaChecked={setIsAriaChecked}
            isLoggedIn={false}
          />
          <Button variant={'ghost'} className={'relative'}>
            <p
              className={
                'bg-red-900 text-white absolute text-[8px] px-1 leading-[12px] rounded top-4 left-12 h-fit'
              }
            >
              12
            </p>
            <Icon name={'cart'} />
            0.00 Р
          </Button>
        </div>
      </div>
    </div>
  );
};
