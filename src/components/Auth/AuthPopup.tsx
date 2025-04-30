'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneInput, CodeInput, NameInput } from './';
import { useRouter } from 'next/navigation';
import {
  sendAuthCode,
  loginWithCode,
  registerUser,
} from '../../shared/lib/auth';
import { useAuth } from '../../shared/providers/AuthProvider';

type AuthPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type AuthStep = 'phone' | 'code' | 'profile';

const AuthPopup = ({ isOpen, onClose }: AuthPopupProps) => {
  const { login } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setError] = useState('');
  const [step, setStep] = useState<AuthStep>('phone');
  const [isLoading, setIsLoading] = useState(false);

  // Очищаем состояния при закрытии попапа
  const handleClose = () => {
    onClose();
    // Сбрасываем состояние формы с небольшой задержкой после закрытия
    setTimeout(() => {
      setStep('phone');
      setError('');
      setCode('');
    }, 300);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (errorMessage) setError('');
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    if (errorMessage) setError('');
  };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    if (errorMessage) setError('');
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    if (errorMessage) setError('');
  };

  const isPhoneValid = (phone: string): boolean => {
    return phone.length === 18; // +7 (XXX) XXX-XX-XX
  };

  const formatPhoneForApi = (phone: string): string => {
    return phone.replace(/\D/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPhoneValid(phone)) {
      setError('Введите корректный номер телефона');
      return;
    }

    try {
      setIsLoading(true);
      const formattedPhone = formatPhoneForApi(phone);
      await sendAuthCode(formattedPhone);
      setStep('code');
    } catch {
      setError('Ошибка при отправке кода. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 5) {
      setError('Введите полный код из СМС');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formattedPhone = formatPhoneForApi(phone);
      const response = await loginWithCode(formattedPhone, code);

      if (response.needsRegistration) {
        setStep('profile');
      } else {
        login(response.client);
        handleClose();
        router.push('/profile');
      }
    } catch {
      console.error('Ошибка при проверке кода');
      setError('Неверный код. Пожалуйста, проверьте и попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim()) {
      setError('Введите имя');
      return;
    }

    if (!lastName.trim()) {
      setError('Введите фамилию');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formattedPhone = formatPhoneForApi(phone);
      const response = await registerUser({
        phone: formattedPhone,
        firstName,
        lastName,
      });

      login(response.client);
      handleClose();
      router.push('/profile');
    } catch {
      console.error('Ошибка при регистрации');
      setError('Не удалось сохранить данные. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setError('');
    setCode('');
  };

  const handleCodeComplete = (completeCode: string) => {
    if (completeCode.length === 5) {
      setCode(completeCode);
      setTimeout(() => {
        const formEvent = new Event('submit') as unknown as React.FormEvent;
        handleSubmitCode(formEvent);
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-0 left-0 right-0 z-40 bg-white overflow-hidden origin-top"
          style={{
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid #E5E7EB',
            position: 'absolute',
            transformOrigin: 'top',
            top: '100%',
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
            opacity: { duration: 0.2 },
          }}
        >
          <div className="px-[130px] py-[50px]">
            <div className="flex flex-col gap-[40px]">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[#000814] text-[52px] font-extrabold leading-[1.2]">
                  Вход или регистрация
                </h1>
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="#000814"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="#000814"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {step === 'phone' ? (
                  <motion.div
                    key="phone-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-[15px]"
                  >
                    <p className="text-[#000814] text-[22px] font-normal leading-[1.4]">
                      Введите номер телефона
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-[15px]"
                    >
                      <div className="flex gap-[13px] items-center">
                        <PhoneInput
                          value={phone}
                          onChange={handlePhoneChange}
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`bg-[#EC1C24] hover:bg-[#C60000] text-white px-[30px] py-[15px] rounded-xl text-lg font-medium transition-colors whitespace-nowrap h-[62px] ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? 'Отправка...' : 'Получить код'}
                        </button>
                      </div>
                      {errorMessage && (
                        <div className="text-[#EC1C24] text-sm">
                          {errorMessage}
                        </div>
                      )}
                    </form>
                  </motion.div>
                ) : step === 'code' ? (
                  <motion.div
                    key="code-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-[15px]"
                  >
                    <p className="text-[#000814] text-[22px] font-normal leading-[1.4]">
                      Введите код из СМС
                    </p>
                    <div className="flex items-center gap-[30px]">
                      <button
                        onClick={handleBackToPhone}
                        className="flex items-center gap-[18px] text-[#424F60] hover:text-[#000814] transition-colors"
                      >
                        <svg
                          width="20"
                          height="8"
                          viewBox="0 0 20 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.646447 3.64645C0.451185 3.84171 0.451185 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM20 3.5L1 3.5V4.5L20 4.5V3.5Z"
                            fill="#424F60"
                          />
                        </svg>
                        <span>Изменить номер</span>
                      </button>
                    </div>
                    <form onSubmit={handleSubmitCode}>
                      <div className="flex flex-col gap-[15px]">
                        <CodeInput
                          value={code}
                          onChange={handleCodeChange}
                          onComplete={handleCodeComplete}
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`bg-[#EC1C24] hover:bg-[#C60000] text-white px-[30px] py-[15px] rounded-xl text-lg font-medium transition-colors w-fit ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? 'Проверка...' : 'Продолжить'}
                        </button>
                        {errorMessage && (
                          <div className="text-[#EC1C24] text-sm">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="profile-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-[15px]"
                  >
                    <p className="text-[#000814] text-[22px] font-normal leading-[1.4]">
                      Заполните профиль
                    </p>
                    <form onSubmit={handleSubmitProfile}>
                      <div className="flex flex-col gap-[15px]">
                        <div className="grid grid-cols-2 gap-[15px]">
                          <NameInput
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder="Имя"
                          />
                          <NameInput
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder="Фамилия"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`bg-[#EC1C24] hover:bg-[#C60000] text-white px-[30px] py-[15px] rounded-xl text-lg font-medium transition-colors w-fit ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                        {errorMessage && (
                          <div className="text-[#EC1C24] text-sm">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthPopup;
