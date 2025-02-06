'use client';

import { Button } from '@/shared';
import { useForm } from 'react-hook-form';
import { ControlledSelect, TSelectionByCar } from '@/features';

export const SelectionByCar = () => {
  const { control, handleSubmit } = useForm<TSelectionByCar>();

  const onSubmit = (data: TSelectionByCar) => {
    console.log(data);
  };

  return (
    <form
      className={
        'w-full max-w-[500px] p-10 rounded-2xl bg-white h-full space-y-8'
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className={'text-title-secondary'}>Подбор по автомобилю</h4>

      <div className={'space-y-4'}>
        <ControlledSelect
          options={[
            { label: '2025', value: '2025' },
            { label: '2024', value: '2024' },
          ]}
          placeholder={'Год выпуска'}
          control={control}
          name={'year'}
        />

        <ControlledSelect
          options={[
            { label: 'Mercedes-Benz', value: '1' },
            { label: 'Лада', value: '2' },
          ]}
          name={'mark'}
          control={control}
          placeholder={'Марка'}
        />

        <ControlledSelect
          options={[]}
          name={'model'}
          control={control}
          placeholder={'Модель'}
        />

        <ControlledSelect
          options={[]}
          name={'modification'}
          control={control}
          placeholder={'Модификация'}
        />
      </div>

      <Button size={'lg'}>Подобрать автозапчасть</Button>
    </form>
  );
};
