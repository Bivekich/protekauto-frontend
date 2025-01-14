import { Button, Icon, Input, InputGroup, InputRightElement } from '@/shared';

export const HeaderMiddle = () => {
  return (
    <div className={'bg-main-blue w-full flex justify-center'}>
      <div className={'max-w-pc w-full py-8 grid grid-cols-header gap-6'}>
        <Button variant={'secondary'} className={'w-fit'}>
          Каталог
        </Button>
        <InputGroup>
          <Input
            placeholder={'Введите код запчасти или VIN номер автомобиля'}
          />
          <InputRightElement>
            <Icon name={'search'} />
          </InputRightElement>
        </InputGroup>
        <Button variant={'ghost'}>
          <Icon name={'garage'} />
          Добавить в гараж
        </Button>
        <Button variant={'ghost'}>
          <Icon name={'profile'} />
          Вход
        </Button>
        <Button variant={'ghost'} className={'relative'}>
          <p
            className={
              'bg-red-900 text-white absolute text-[8px] px-1 leading-[12px] rounded top-1 left-6 h-fit'
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
