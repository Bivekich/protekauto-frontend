'use client';

import { Input, InputProps } from '@/shared';
import { FC } from 'react';
import { useMask } from '@react-input/mask';

export const PhoneInput: FC<InputProps> = (props) => {
  const phoneMaskRef = useMask({
    mask: '+7 (___) ___-__-__',
    replacement: { _: /\d/ },
  });
  return <Input {...props} ref={phoneMaskRef} />;
};
