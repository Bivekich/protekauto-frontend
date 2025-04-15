'use client';
import { Button, Icon, InputOTP, PhoneInput, WidgetContainer } from '@/shared';
import { FC, useState } from 'react';
import { saveAuth } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';

interface IProps {
  onRegister: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const LoginContent: FC<IProps> = ({ onRegister }) => {
  const router = useRouter();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverCode, setServerCode] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (phoneValue.length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/public/auth/sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneValue }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      // Если код вернулся с сервера, сохраняем его для отладки
      if (data.code) {
        setServerCode(data.code);
      }

      setIsMessageSent(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка при отправке SMS';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (otpValue.length !== 4) {
      setError('Введите 4 цифры кода');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/public/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneValue, code: otpValue }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.success) {
        // Сохраняем данные авторизации
        saveAuth(data.token, data.client);

        setSuccess(true);

        // Если нужна регистрация, переходим на страницу регистрации
        if (data.needsRegistration) {
          onRegister();
          return;
        }

        // Иначе перенаправляем в личный кабинет
        router.push('/profile');
        window.location.reload(); // Обновляем страницу, чтобы применить авторизацию
      } else {
        setError('Ошибка при проверке кода');
      }
    } catch (err) {
      setError('Ошибка при проверке кода');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WidgetContainer innerContainerProps={{ className: 'space-y-10' }}>
      <h3 className={'text-title'}>ВХОД</h3>
      <div className={'space-y-5 font-golos w-full'}>
        <span className={'text-paragraph'}>
          {isMessageSent ? 'Введите код из СМС' : 'Введите номер телефона'}
        </span>
        <div className={'flex justify-between w-full'}>
          <div className={'flex gap-5 w-full'}>
            {!isMessageSent ? (
              <>
                <PhoneInput
                  className={'max-w-[360px] w-full'}
                  placeholder={'+7 (999) 999-99-99'}
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                />
                <Button onClick={handleSendCode} disabled={isLoading}>
                  {isLoading ? 'Отправка...' : 'Получить код'}
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2 max-w-[360px] w-full">
                  <InputOTP
                    maxLength={4}
                    value={otpValue}
                    onChange={setOtpValue}
                    containerClassName="w-full"
                  />

                  {serverCode && (
                    <p className="text-sm text-gray-500">
                      Код для тестирования: <strong>{serverCode}</strong>
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleVerifyCode}
                  disabled={isLoading || otpValue.length !== 4}
                >
                  {isLoading ? 'Проверка...' : 'Войти'}
                </Button>
              </>
            )}
          </div>
          <Button
            variant={'outlined'}
            className={'group flex items-center gap-4'}
            onClick={onRegister}
          >
            Зарегистрироваться
            <Icon
              name={'arrow_long'}
              className={'group-hover:translate-x-2 transition'}
            />
          </Button>
        </div>
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-sm font-medium">
            Код успешно подтвержден!
          </div>
        )}
        {isMessageSent && (
          <div
            className={
              'w-fit flex items-center gap-4 text-gray-600 text-paragraph-sm group cursor-pointer'
            }
            onClick={() => setIsMessageSent(false)}
          >
            <Icon
              name={'arrow_long'}
              className={
                'rotate-180 *:*:fill-gray-600 transition group-hover:-translate-x-2'
              }
            />
            Ввести другой номер
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};
