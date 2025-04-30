'use client';

import { useEffect, useRef } from 'react';
import { IMaskInput } from 'react-imask';

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const PhoneInput = ({ value, onChange }: PhoneInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Инициализация значения при первоначальном монтировании
  useEffect(() => {
    if (!value) {
      onChange('+7');
    }
  }, [value, onChange]);

  return (
    <div className="relative w-[360px] flex items-center bg-white rounded-lg border border-[#D0D0D0] hover:border-[#0D336C] focus-within:border-[#EC1C24] transition-all">
      <IMaskInput
        mask="+7 (000) 000-00-00"
        unmask={false}
        lazy={false}
        ref={inputRef}
        type="tel"
        className="w-full h-[62px] px-6 py-[15px] rounded-lg bg-transparent outline-none text-[#747474] text-lg"
        placeholder="+7 (___) ___-__-__"
        required
        autoFocus={!value} // Автофокус только если поле пустое
        value={value}
        onAccept={(value) => {
          onChange(value as string);
        }}
      />
    </div>
  );
};

export default PhoneInput;
