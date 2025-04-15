'use client';

import * as React from 'react';
import VerificationInput from 'react-verification-input';

import { cn } from '@/shared/lib/css';

// Импортируем стили для верификации
import './verification-input-styles.css';

interface InputOTPProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ value, onChange, maxLength = 4, className, containerClassName }, ref) => {
    const customRenderer = {
      character: ({
        char,
        index,
        isActive,
      }: {
        char: string;
        index: number;
        isActive: boolean;
      }) => (
        <div
          key={index}
          data-value={char || ''}
          className={cn(
            'verification-input-character',
            isActive && 'verification-input-character-selected',
            char && 'verification-input-character-filled'
          )}
        >
          <input
            style={{
              color: '#000 !important',
              fontWeight: 'bold !important',
              fontSize: '30px !important',
              opacity: '1 !important',
              WebkitTextFillColor: '#000',
            }}
            readOnly
            value={char || ''}
          />
        </div>
      ),
    };

    return (
      <div ref={ref} className={cn('w-full', containerClassName)}>
        <VerificationInput
          value={value}
          onChange={onChange}
          length={maxLength}
          placeholder=""
          validChars="0-9"
          autoFocus
          inputProps={{
            inputMode: 'numeric',
            style: {
              opacity: 1,
              color: '#000',
              WebkitTextFillColor: '#000',
            },
          }}
          classNames={{
            container: cn('verification-input-container', className),
            character: 'verification-input-character',
            characterInactive: 'verification-input-character-inactive',
            characterSelected: 'verification-input-character-selected',
            characterFilled: 'verification-input-character-filled',
          }}
          // @ts-expect-error Типы из библиотеки react-verification-input не соответствуют передаваемым значениям
          renderCharacter={customRenderer.character}
        />
      </div>
    );
  }
);
InputOTP.displayName = 'InputOTP';

// Поддержка существующего API для обратной совместимости
const InputOTPGroup: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return <div className={cn('hidden', className)}>{children}</div>;
};
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot: React.FC<{ index: number; className?: string }> = () =>
  null;
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator: React.FC = () => null;
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
