'use client';
import { Button, Input, LabelWrapper, PhoneInput, Switch } from '@/shared';
import { useAuth } from '@/shared/hooks/useAuth';
import { useState, useEffect } from 'react';

// Получаем базовый URL API из переменных среды
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const SettingsForm = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    receiveNotifications: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });

  // Загружаем данные пользователя при инициализации
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        receiveNotifications: user.settings?.receiveNotifications || false,
      });
    }
  }, [user]);

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Обработчик отправки формы
  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    setStatusMessage({ type: null, text: '' });

    try {
      const response = await fetch(`${API_URL}/clients/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          settings: {
            receiveNotifications: formData.receiveNotifications,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении профиля');
      }

      // Получаем обновленные данные клиента
      await response.json();

      // Обновляем данные пользователя в localStorage
      login({
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        settings: {
          ...user.settings,
          receiveNotifications: formData.receiveNotifications,
        },
      });

      setStatusMessage({
        type: 'success',
        text: 'Данные успешно обновлены',
      });
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setStatusMessage({
        type: 'error',
        text: 'Ошибка при обновлении данных',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={'card-wrapper flex flex-col gap-8'}>
      <form
        className={
          'flex flex-col gap-8 pb-8 border-b border-[rgba(0, 0, 0, 0.05)]'
        }
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className={'flex justify-between w-full'}>
          <div className={'flex gap-5'}>
            <LabelWrapper label={'Имя'} containerClassName={'w-[360px]'}>
              <Input
                placeholder={'Иван'}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </LabelWrapper>

            <LabelWrapper label={'Фамилия'} containerClassName={'w-[360px]'}>
              <Input
                placeholder={'Иванов'}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </LabelWrapper>
          </div>

          <Button
            variant={'third'}
            size={'md'}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>

        <LabelWrapper label={'Номер телефона'} containerClassName={'w-[360px]'}>
          <PhoneInput
            placeholder={'+7 (999) 999-99-99'}
            value={formData.phone}
            disabled={true} // Телефон менять нельзя, так как он основной идентификатор
          />
        </LabelWrapper>

        <div className={'flex w-full justify-between items-end'}>
          <div className={'flex gap-5 items-end'}>
            <LabelWrapper label={'Email'} containerClassName={'w-[360px]'}>
              <Input
                placeholder={'example@example.com'}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </LabelWrapper>
            <Button>Получить код</Button>
          </div>

          <div className={'flex items-center gap-12'}>
            <p className={'text-paragraph-sm text-placeholder'}>
              Получать уведомления об <br /> акциях и новостях компании
            </p>
            <Switch
              checked={formData.receiveNotifications}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  receiveNotifications: checked,
                }))
              }
            />
          </div>
        </div>

        {statusMessage.type && (
          <div
            className={`text-${statusMessage.type === 'success' ? 'green-600' : 'red-600'} mt-4 text-center`}
          >
            {statusMessage.text}
          </div>
        )}
      </form>

      {user?.profileType !== 'LEGAL_ENTITY' && (
        <Button className={'w-fit'}>Стать Юридическим лицом</Button>
      )}
    </div>
  );
};
