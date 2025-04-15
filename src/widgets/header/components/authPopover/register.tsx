'use client';
import {
  Button,
  Icon,
  Input,
  InputOTP,
  PhoneInput,
  WidgetContainer,
} from '@/shared';
import { useState } from 'react';
import { saveAuth } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const RegisterContent = () => {
  const router = useRouter();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverCode, setServerCode] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGetCode = async () => {
    if (phoneValue.length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }
    if (!firstName.trim()) {
      setError('Введите имя');
      return;
    }
    if (!lastName.trim()) {
      setError('Введите фамилию');
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при отправке SMS');
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      // Если код вернулся напрямую (для отладки или разработки)
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

      // Проверяем код
      const verifyResponse = await fetch(`${API_URL}/public/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneValue, code: otpValue }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.error) {
        setError(verifyData.error);
        return;
      }

      // Регистрируем пользователя
      const registerResponse = await fetch(`${API_URL}/public/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${verifyData.token}`,
        },
        body: JSON.stringify({
          phone: phoneValue,
          firstName,
          lastName,
          email,
        }),
      });

      const registerData = await registerResponse.json();

      if (registerData.error) {
        setError(registerData.error);
        return;
      }

      // Сохраняем данные авторизации
      saveAuth(registerData.token, registerData.client);

      setSuccess(true);

      // Перенаправляем в личный кабинет
      setTimeout(() => {
        router.push('/profile');
        window.location.reload(); // Обновляем страницу, чтобы применить авторизацию
      }, 1500);
    } catch (err) {
      setError('Ошибка при регистрации');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WidgetContainer innerContainerProps={{ className: 'space-y-10' }}>
      <h3 className={'text-title'}>РЕГИСТРАЦИЯ</h3>
      {!isMessageSent ? (
        <div className={'flex flex-col space-y-5'}>
          <div className="space-y-2">
            <span className="text-paragraph">Имя</span>
            <Input
              placeholder={'Иван'}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <span className="text-paragraph">Фамилия</span>
            <Input
              placeholder={'Иванов'}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <span className="text-paragraph">Email</span>
            <Input
              placeholder={'email@example.com'}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <span className="text-paragraph">Номер телефона</span>
            <PhoneInput
              placeholder={'+7 (999) 999-99-99'}
              value={phoneValue}
              onChange={(e) => setPhoneValue(e.target.value)}
            />
          </div>

          <Button onClick={handleGetCode} disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Получить код'}
          </Button>
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
        </div>
      ) : (
        <div className={'flex flex-col space-y-5'}>
          <span className="text-gray-700">Введите код из СМС</span>
          <div className="flex flex-col gap-2">
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
          <div className="flex gap-4">
            <Button
              onClick={handleVerifyCode}
              disabled={isLoading || otpValue.length !== 4}
            >
              {isLoading ? 'Проверка...' : 'Зарегистрироваться'}
            </Button>
            <Button
              onClick={handleGetCode}
              variant="outlined"
              disabled={isLoading}
            >
              Получить код снова
            </Button>
          </div>
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm font-medium">
              Регистрация успешна!
            </div>
          )}
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
            Изменить данные
          </div>
        </div>
      )}
    </WidgetContainer>
  );
};
