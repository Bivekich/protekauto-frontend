import { Button, Icon, Input, InputGroup, InputRightElement } from '@/shared';
import { burgerLines } from '@/widgets/header/components/middle/burgerLines';

export const HeaderMiddle = () => {
  return (
    <div className={'bg-main-blue w-full flex justify-center'}>
      <div className={'max-w-pc w-full py-8 grid grid-cols-header gap-10'}>
        <Button variant={'burger'} className={'w-fit'}>
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
            'bg-secondary-blue w-fit px-7 rounded-xl hover:bg-blue-950'
          }
        >
          <Icon name={'garage'} />
          Добавить в гараж
        </Button>
        <Button variant={'ghost'}>
          <Icon name={'profile'} />
          Личный кабинет
        </Button>
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
  );
};
