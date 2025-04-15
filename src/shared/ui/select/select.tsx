'use client';

import {
  SelectTrigger,
  SelectCore,
  SelectValue,
  SelectContent,
  SelectItem,
} from './selectCore';
import { FC } from 'react';
import { ISelectProps } from './select.types';

export const Select: FC<ISelectProps> = ({
  placeholder,
  options,
  onChange,
  value,
  defaultValue,
  className,
  optionClassName,
}) => {
  return (
    <SelectCore
      onValueChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      <SelectTrigger
        className={`font-golos font-normal text-base px-6 h-[66px] data-[placeholder]:text-placeholder ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem
            value={value}
            key={value}
            className={`font-golos font-normal text-base px-6 h-[66px] ${optionClassName}`}
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectCore>
  );
};
