'use client';

import { useState, useRef, useImperativeHandle, forwardRef } from 'react';

interface LegalEntityFormProps {
  clientId: string;
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: LegalEntity;
  isEditing?: boolean;
}

// Добавляем хэндлы для внешнего доступа к функциям формы
export interface LegalEntityFormHandles {
  submit: () => void;
}

// Интерфейс юридического лица
interface LegalEntity {
  id?: string;
  inn: string;
  form: string;
  ogrn: string;
  kpp: string;
  legalAddress: string;
  shortName: string;
  fullName: string;
  actualAddress: string;
  taxSystem: string;
  vat: string;
  vatPercent: string;
  accountant: string;
  responsibleName: string;
  responsiblePosition: string;
  responsiblePhone: string;
  signatory: string;
}

export const LegalEntityForm = forwardRef<
  LegalEntityFormHandles,
  LegalEntityFormProps
>(({ clientId, onSuccess, onCancel, initialData, isEditing = false }, ref) => {
  const [formData, setFormData] = useState<LegalEntity>(
    initialData || {
      inn: '',
      form: '',
      ogrn: '',
      kpp: '',
      legalAddress: '',
      shortName: '',
      fullName: '',
      actualAddress: '',
      taxSystem: '',
      vat: '',
      vatPercent: '20',
      accountant: '',
      responsibleName: '',
      responsiblePosition: '',
      responsiblePhone: '',
      signatory: '',
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Экспортируем методы компонента для родительских компонентов
  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    },
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Простая валидация
    if (!formData.inn || !formData.shortName) {
      setError('ИНН и краткое наименование обязательны для заполнения');
      return;
    }

    if (
      formData.inn &&
      formData.inn.length !== 10 &&
      formData.inn.length !== 12
    ) {
      setError('ИНН должен содержать 10 или 12 цифр');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        throw new Error('Необходима авторизация');
      }

      // Модифицируем данные для соответствия структуре API
      const apiData = {
        ...formData,
        // Добавляем обязательное поле name, дублируя shortName
        name: formData.shortName,
        // Добавляем поле address, дублируя legalAddress
        address: formData.legalAddress,
        // Конвертируем vatPercent в число
        vatPercent: parseInt(formData.vatPercent, 10) || 20,
      };

      console.log('Отправляемые данные:', apiData);

      // Определяем метод и URL в зависимости от режима (создание или редактирование)
      const method = isEditing ? 'PUT' : 'POST';
      const url =
        isEditing && formData.id
          ? `${
              process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'
            }/api/clients/${clientId}/legal-entity/${formData.id}`
          : `${
              process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'
            }/api/clients/${clientId}/legal-entity`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(
          `Юридическое лицо успешно ${isEditing ? 'обновлено' : 'создано'}:`,
          responseData
        );
        onSuccess();
      } else {
        const errorData = await response.json();
        console.error('Ошибка от сервера:', errorData);
        throw new Error(
          errorData.error ||
            `Произошла ошибка при ${
              isEditing ? 'обновлении' : 'создании'
            } юридического лица`
        );
      }
    } catch (error) {
      console.error(
        `Ошибка при ${
          isEditing ? 'обновлении' : 'создании'
        } юридического лица:`,
        error
      );
      setError(
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
      );

      // В демо режиме: имитируем успешное создание/обновление
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Демо режим: имитируем успешное ${
            isEditing ? 'обновление' : 'создание'
          } юр. лица`
        );
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {error && (
        <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
          {error}
        </div>
      )}

      <form
        ref={formRef}
        id="legal-entity-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        {/* Первый блок с основными данными и названиями */}
        <div className="grid grid-cols-4 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">ИНН*</label>
            <input
              type="text"
              name="inn"
              value={formData.inn}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="ИНН"
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">Форма*</label>
            <select
              name="form"
              value={formData.form}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60] appearance-none"
              disabled={isLoading}
              required
            >
              <option value="">Выбрать</option>
              <option value="ООО">ООО</option>
              <option value="ИП">ИП</option>
              <option value="АО">АО</option>
              <option value="ПАО">ПАО</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">ОГРН</label>
            <input
              type="text"
              name="ogrn"
              value={formData.ogrn}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="ОГРН"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">КПП</label>
            <input
              type="text"
              name="kpp"
              value={formData.kpp}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="КПП"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">
              Краткое наименование*
            </label>
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="Краткое наименование"
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">
              Полное наименование
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="Полное наименование"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">Юридический адрес</label>
            <input
              type="text"
              name="legalAddress"
              value={formData.legalAddress}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="Юридический адрес"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">Фактический адрес</label>
            <input
              type="text"
              name="actualAddress"
              value={formData.actualAddress}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="Фактический адрес"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Второй блок с финансовыми данными */}
        <div className="grid grid-cols-4 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">
              Система налогообложения
            </label>
            <select
              name="taxSystem"
              value={formData.taxSystem}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60] appearance-none"
              disabled={isLoading}
            >
              <option value="">Выбрать</option>
              <option value="ОСН">ОСН</option>
              <option value="УСН">УСН</option>
              <option value="ЕНВД">ЕНВД</option>
              <option value="ПСН">ПСН</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">НДС</label>
            <select
              name="vat"
              value={formData.vat}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60] appearance-none"
              disabled={isLoading}
            >
              <option value="">Выбрать</option>
              <option value="Является плательщиком">
                Является плательщиком
              </option>
              <option value="Не является плательщиком">
                Не является плательщиком
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">Ставка НДС (%)</label>
            <select
              name="vatPercent"
              value={formData.vatPercent}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60] appearance-none"
              disabled={isLoading || formData.vat !== 'Является плательщиком'}
            >
              <option value="20">20%</option>
              <option value="10">10%</option>
              <option value="0">0%</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">Главный бухгалтер</label>
            <input
              type="text"
              name="accountant"
              value={formData.accountant}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="ФИО главного бухгалтера"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Третий блок с ответственными лицами */}
        <div className="grid grid-cols-4 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">
              ФИО ответственного лица
            </label>
            <input
              type="text"
              name="responsibleName"
              value={formData.responsibleName}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="ФИО"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">Должность</label>
            <input
              type="text"
              name="responsiblePosition"
              value={formData.responsiblePosition}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="Должность"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">Телефон</label>
            <input
              type="tel"
              name="responsiblePhone"
              value={formData.responsiblePhone}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="+7XXXXXXXXXX"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#000814]">Подписант</label>
            <input
              type="text"
              name="signatory"
              value={formData.signatory}
              onChange={handleChange}
              className="border border-[#D0D0D0] rounded px-6 py-4 text-sm text-[#424F60]"
              placeholder="ФИО подписанта"
              disabled={isLoading}
            />
          </div>
        </div>
      </form>

      {/* Кнопки для формы */}
      <div className="flex justify-end mt-6 gap-4">
        {!isEditing && (
          <button
            type="button"
            onClick={() => onCancel()}
            className="py-[10px] px-6 rounded-xl border border-[#D0D0D0] text-[#424F60] font-medium"
            disabled={isLoading}
          >
            Отмена
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            if (formRef.current) {
              formRef.current.dispatchEvent(
                new Event('submit', { bubbles: true })
              );
            }
          }}
          className="py-[10px] px-6 rounded-xl bg-[#EC1C24] text-white font-medium hover:bg-[#d41920] transition-colors"
          disabled={isLoading}
        >
          {isLoading
            ? isEditing
              ? 'Сохранение...'
              : 'Добавление...'
            : isEditing
            ? 'Сохранить изменения'
            : 'Добавить юр. лицо'}
        </button>
      </div>
    </div>
  );
});

// Добавляем displayName для компонента
LegalEntityForm.displayName = 'LegalEntityForm';
