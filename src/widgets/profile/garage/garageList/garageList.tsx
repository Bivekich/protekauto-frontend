'use client';

import { useState } from 'react';
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SegmentedControl,
} from '@/shared';

const mock = [
  {
    name: 'Lexus',
    model: 'LEXUS RX330/350',
    VIN: 'JTJHK31U802039999',
    comment:
      'Клиент: сервис с Багратионна, нужно будет упоковать по особенномму, а также приложить документы бла бла',
  },
];

export const GarageList = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [editingElement, setEditingElement] = useState<number | null>(null);

  const [VIN, setVIN] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={'table-wrapper gap-5'}>
      {mock.map((item, index) => (
        <div
          key={item.VIN}
          className={'card-wrapper flex w-full justify-between h-full'}
        >
          <div className={'flex w-full flex-col gap-6 max-w-[1000px] h-full'}>
            <h5 className={'font-golos font-semibold text-[22px]'}>
              {item.name} {item.model}{' '}
              <span className={'ml-2 text-[#8893A1] font-normal'}>
                {item.VIN}
              </span>
            </h5>
            <InputGroup>
              <Input
                variant={'inline_edit'}
                inputSize={'xl'}
                disabled={editingElement !== index}
                value={
                  'Клиент: сервис с Багратионна, нужно будет упоковать по особенномму, а также приложить документы бла бла'
                }
              />
              <InputRightElement className={'bg-[#71A6F626]'}>
                <Icon
                  name={'pencil'}
                  onClick={() => setEditingElement(index)}
                />
              </InputRightElement>
            </InputGroup>
          </div>

          <div className={'flex flex-col items-end justify-between h-[100px]'}>
            <Icon name={'trash'} />

            <div className={'flex items-center gap-2'}>
              <p className={'text-sm font-golos'}>Характеристики</p>
              <Icon name={'arrow_down'} />
            </div>
          </div>
        </div>
      ))}
      {!isEditing ? (
        <div
          className={
            'card-wrapper flex items-center justify-center cursor-pointer bg-[#E6EDF6] h-[162px]'
          }
          onClick={handleEdit}
        >
          <p className={'font-golos font-semibold text-[22px]'}>
            + Добавить авто в гараж
          </p>
        </div>
      ) : (
        <div
          className={'card-wrapper text-title-secondary flex flex-col gap-8'}
        >
          <div className={'flex flex-col gap-5'}>
            <h5 className={'text-paragraph font-semibold'}>
              Добавление автомобиля
            </h5>
            <SegmentedControl
              options={[
                { label: 'VIN-/FRAME-номер', value: 'VIN' },
                { label: 'Без номера', value: 'empty' },
              ]}
              variant={'secondary'}
              onChange={setVIN}
            />
          </div>

          <div className={'space-y-4'}>
            <div className={'flex gap-5'}>
              {VIN !== 'empty' && (
                <Input
                  placeholder={'Введите VIN'}
                  className={'!max-w-[476px]'}
                />
              )}
              <Button>Добавить</Button>
            </div>

            {VIN !== 'empty' && (
              <p className={'variant-caption max-w-[476px]'}>
                Идентификационный номер (VIN) или номер рамы (FRAME) указан в
                свидетельстве о регистрации (СТС) и паспорте (ПТС) транспортного
                средства.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
