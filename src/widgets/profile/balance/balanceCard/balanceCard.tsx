import { FC } from 'react';
import { Button, Input, InputGroup, InputRightElement } from '@/shared';

interface IProps {
  balance: string;
  limit: string;
  ordered: string;
  to_payment: string;
  name: string;
}

export const BalanceCard: FC<IProps> = ({
  balance,
  name,
  ordered,
  to_payment,
  limit,
}) => {
  return (
    <div className={'card-wrapper'}>
      <h6 className={'text-paragraph font-semibold'}>{name}</h6>
      <div
        className={
          'mt-5 flex flex-col w-full gap-[14px] *:flex *:justify-between *:text-paragraph-sm *:text-[#424F60]'
        }
      >
        <div>
          <p>Баланс</p>
          <p>{balance} ₽</p>
        </div>

        <div>
          <p>Лимит заказов</p>
          <p>{limit} ₽</p>
        </div>

        <div>
          <p>Заказано</p>
          <p>{ordered} ₽</p>
        </div>

        <div>
          <p>К оплате</p>
          <p className={'text-primary-red'}>{to_payment} ₽</p>
        </div>
      </div>

      <div className={'flex flex-col gap-5 mt-10'}>
        <p className={'text-paragraph font-semibold text-[22px]'}>
          Пополнить баланс
        </p>

        <InputGroup>
          <Input placeholder={'Введите сумму'} />
          <InputRightElement>
            <p className={'font-golos font-semibold text-[#747474] text-lg'}>
              ₽
            </p>
          </InputRightElement>
        </InputGroup>

        <Button
          disabled
          className={'disabled:bg-sky-blue disabled:text-[#8893A1]'}
        >
          Пополнить
        </Button>
      </div>
    </div>
  );
};
