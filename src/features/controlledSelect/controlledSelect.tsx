'use client';

import { IOption, Select } from '@/shared';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

interface IProps<TFormValues extends FieldValues> {
  options: IOption[];
  placeholder?: string;
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
}

export function ControlledSelect<TFormValues extends FieldValues>({
  options,
  placeholder,
  name,
  control,
}: IProps<TFormValues>) {
  return (
    <Controller
      render={({ field }) => (
        <Select
          options={options}
          onChange={field.onChange}
          placeholder={placeholder}
          value={field.value}
        />
      )}
      name={name}
      control={control}
    />
  );
}
