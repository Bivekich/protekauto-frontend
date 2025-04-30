'use client';

import { ChangeEvent } from 'react';

type NameInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
};

const NameInput = ({
  value,
  onChange,
  placeholder = '',
  label,
}: NameInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex ${label ? 'flex-col gap-[20px]' : ''} w-full`}>
      {label && (
        <label className="text-[#000814] text-[22px] font-normal leading-[1.4]">
          {label}
        </label>
      )}
      <div className="relative w-full flex items-center bg-white rounded-lg border border-[#D0D0D0] hover:border-[#0D336C] focus-within:border-[#EC1C24] transition-all">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-[62px] px-6 py-[15px] rounded-lg bg-transparent outline-none text-[#747474] text-lg"
          required
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default NameInput;
