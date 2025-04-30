'use client';

import { useEffect, useRef, useState } from 'react';

type CodeInputProps = {
  length?: number;
  value?: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
};

const CodeInput = ({
  length = 5,
  value = '',
  onChange,
  onComplete,
}: CodeInputProps) => {
  const [code, setCode] = useState<string[]>(() => {
    // Инициализация из входящего value или пустые строки
    if (value) {
      const chars = value.split('');
      return Array(length)
        .fill('')
        .map((_, i) => chars[i] || '');
    }
    return Array(length).fill('');
  });

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Обновляем внутренний код при изменении внешнего value
  useEffect(() => {
    if (value && value !== code.join('')) {
      const chars = value.split('');
      setCode(
        Array(length)
          .fill('')
          .map((_, i) => chars[i] || '')
      );
    }
  }, [value, length]);

  // Инициализация массива refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
    while (inputRefs.current.length < length) {
      inputRefs.current.push(null);
    }
  }, [length]);

  // Автофокус на первом инпуте при монтировании
  useEffect(() => {
    if (inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, []);

  // Обновляем родительский компонент при изменении кода
  // Убираем code из зависимостей, т.к. он является состоянием,
  // а при изменении code этот эффект и так вызовется

  useEffect(() => {
    const fullCode = code.join('');
    onChange(fullCode);

    if (fullCode.length === length && onComplete && !fullCode.includes('')) {
      onComplete(fullCode);
    }
  }, [code, length, onChange, onComplete]);

  // Обрабатываем ввод цифр
  const handleChange = (index: number, value: string) => {
    // Разрешаем только цифры
    const digit = value.replace(/\D/g, '').slice(-1);

    // Обновляем состояние
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Если ввели цифру и есть следующее поле, переходим к нему
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Обрабатываем нажатия клавиш (для поддержки Backspace)
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Если нажат Backspace
    if (e.key === 'Backspace') {
      if (!code[index]) {
        // Если текущее поле пустое, перемещаемся к предыдущему
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          // Очищаем предыдущее поле
          const newCode = [...code];
          newCode[index - 1] = '';
          setCode(newCode);
        }
      } else {
        // Если в текущем поле есть символ, очищаем его
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }

    // Если нажаты стрелки
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Обработка вставки из буфера обмена
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, length);

    if (digits) {
      const newCode = [...code];
      for (let i = 0; i < digits.length; i++) {
        if (i < length) {
          newCode[i] = digits[i];
        }
      }
      setCode(newCode);

      // Фокус на последнем заполненном поле
      const lastIndex = Math.min(digits.length - 1, length - 1);
      if (lastIndex >= 0) {
        inputRefs.current[lastIndex]?.focus();
      }
    }
  };

  // Функция для установки ref
  const setRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  return (
    <div className="flex gap-[12px]">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="relative w-[62px] flex items-center justify-center bg-white rounded-lg border border-[#D0D0D0] hover:border-[#0D336C] focus-within:border-[#EC1C24] transition-all"
        >
          <input
            ref={setRef(index)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={code[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-full h-[62px] text-center bg-transparent outline-none text-[#747474] text-lg"
            required
          />
        </div>
      ))}
    </div>
  );
};

export default CodeInput;
