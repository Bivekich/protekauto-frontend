import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ProfileLayout,
  Select,
} from '@/shared';
import { Checkbox } from '@/shared/ui/checkbox';
import { FC, PropsWithChildren } from 'react';

const navItems = [
  'Входящие',
  'Непрочитанные',
  'Отправленные',
  'Отмеченные',
  'С напоминанием',
  'Архив',
];

interface IProps extends PropsWithChildren {
  selectedMessage: string | null;
  setSelectedMessage: (message: string | null) => void;
}

export const MessagesLayout: FC<IProps> = ({
  children,
  setSelectedMessage,
  selectedMessage,
}) => {
  console.log(selectedMessage);
  return (
    <ProfileLayout title={'Сообщения'} className={'h-stack !font-golos'}>
      <div className={'w-full max-w-[260px] space-y-6 pr-5'}>
        {selectedMessage && (
          <Button
            variant={'outlined'}
            size={'md'}
            className={'bg-transparent w-full'}
          >
            Написать
          </Button>
        )}
        <div className={'w-full space-y-4'}>
          {navItems.map((item) => (
            <div
              key={item}
              className={`${item === 'Непрочитанные' && 'pl-8'} flex justify-between first:font-semibold first:border-l-4 border-primary-red pl-2 cursor-pointer`}
              onClick={() => setSelectedMessage('')}
            >
              <p>{item}</p>
              <p>0</p>
            </div>
          ))}
        </div>
      </div>

      <div className={'w-full h-full space-y-6'}>
        {!selectedMessage && (
          <div className={'flex justify-between gap-8 items-center'}>
            <Button
              variant={'outlined'}
              size={'md'}
              className={'bg-transparent'}
            >
              Написать
            </Button>

            <div className={'flex items-center gap-4'}>
              <Checkbox /> Входящие
            </div>

            <Select
              placeholder={'Все темы'}
              options={[{ label: 'asd', value: 'asd' }]}
              className={'h-12 bg-white'}
              optionClassName={'h-12'}
            />

            <InputGroup>
              <Input
                placeholder={'Поиск по ключевому слову'}
                inputSize={'xl'}
              />
              <InputRightElement>
                <Icon name={'search'} />
              </InputRightElement>
            </InputGroup>
          </div>
        )}

        <div
          className={`pl-4 ${selectedMessage ? 'flex gap-10' : 'grid'} gap-10`}
          style={{ gridTemplateColumns: '1fr repeat(5, auto)' }}
        >
          {!selectedMessage && (
            <div className={'flex gap-4 items-center'}>
              <Checkbox />
              <p>Выделить всё</p>
            </div>
          )}

          <div className={'flex gap-4 items-center group'}>
            <Icon
              name={'arrow_back'}
              className={'group-hover:*:*:fill-black'}
            />
            <p className={'group-hover:text-black text-ice-grey'}>Переслать</p>
          </div>

          <div className={'flex gap-4 items-center group'}>
            <Icon name={'trash'} className={'group-hover:*:*:fill-red-500'} />
            <p className={'group-hover:text-black text-ice-grey'}>Удалить</p>
          </div>

          <div className={'flex gap-4 items-center group'}>
            <Icon
              name={'mail_opened'}
              className={
                'group-hover:*:*:fill-green-500 group-hover:*:*:stroke-green-500'
              }
            />
            <p className={'group-hover:text-black text-ice-grey'}>Прочитано</p>
          </div>

          <div className={'flex gap-4 items-center group'}>
            <Icon
              name={'timer_pulse'}
              className={'group-hover:*:*:fill-gray-700'}
            />
            <p className={'group-hover:text-black text-ice-grey'}>
              Напомнить позже
            </p>
          </div>

          <div className={'flex gap-4 items-center group'}>
            <Icon name={'note'} className={'group-hover:*:*:fill-gray-700'} />
            <p className={'group-hover:text-black text-ice-grey'}>Метка</p>
          </div>
        </div>

        <div className={'w-full h-full'}>{children}</div>
      </div>
    </ProfileLayout>
  );
};
