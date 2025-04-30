'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LegalEntityModalProps {
  clientId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

interface LegalEntityFormData {
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

export function LegalEntityModal({
  clientId,
  onClose,
  onSuccess,
}: LegalEntityModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<LegalEntityFormData>({
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) {
      setError('Ошибка: ID клиента не найден');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Пользователь не авторизован');
      }

      // URL для CMS API
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'
        }/api/clients/${clientId}/legal-entity`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            inn: formData.inn,
            form: formData.form,
            ogrn: formData.ogrn,
            kpp: formData.kpp,
            legalAddress: formData.legalAddress,
            shortName: formData.shortName,
            fullName: formData.fullName,
            actualAddress: formData.actualAddress,
            taxSystem: formData.taxSystem,
            vatPercent: formData.vatPercent,
            accountant: formData.accountant,
            responsibleName: formData.responsibleName,
            responsiblePosition: formData.responsiblePosition,
            responsiblePhone: formData.responsiblePhone,
            signatory: formData.signatory,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Юридическое лицо успешно создано:', data);
        onClose();
        router.refresh();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Ошибка при создании юридического лица'
        );
      }
    } catch (error) {
      console.error('Ошибка при создании юр. лица:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при создании юридического лица'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Добавление юридического лица</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Первый блок с основными данными */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">ИНН</label>
              <input
                type="text"
                name="inn"
                value={formData.inn}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="ИНН"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">Форма</label>
              <select
                name="form"
                value={formData.form}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm appearance-none"
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
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="ОГРН"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">КПП</label>
              <input
                type="text"
                name="kpp"
                value={formData.kpp}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="КПП"
              />
            </div>
          </div>

          {/* Второй блок с названиями и адресами */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">
                Юридический адрес
              </label>
              <input
                type="text"
                name="legalAddress"
                value={formData.legalAddress}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="Юридический адрес"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">
                Краткое наименование
              </label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="Краткое наименование"
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
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="Полное наименование"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">
                Фактический адрес
              </label>
              <input
                type="text"
                name="actualAddress"
                value={formData.actualAddress}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="Фактический адрес"
              />
            </div>
          </div>

          {/* Третий блок с налогами */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">
                Система налогообложения
              </label>
              <select
                name="taxSystem"
                value={formData.taxSystem}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm appearance-none"
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
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm appearance-none"
              >
                <option value="">Выбрать</option>
                <option value="Да">Да</option>
                <option value="Нет">Нет</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">НДС %</label>
              <input
                type="text"
                name="vatPercent"
                value={formData.vatPercent}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">Бухгалтер</label>
              <input
                type="text"
                name="accountant"
                value={formData.accountant}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="ФИО"
              />
            </div>
          </div>

          {/* Четвертый блок с ответственными лицами */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">Ответственный</label>
              <input
                type="text"
                name="responsibleName"
                value={formData.responsibleName}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="ФИО"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">
                Должность ответственного
              </label>
              <input
                type="text"
                name="responsiblePosition"
                value={formData.responsiblePosition}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="Должность"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">
                Телефон ответственного
              </label>
              <input
                type="tel"
                name="responsiblePhone"
                value={formData.responsiblePhone}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="+7"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#000814]">Подписант</label>
              <input
                type="text"
                name="signatory"
                value={formData.signatory}
                onChange={handleChange}
                className="border border-[#D0D0D0] rounded px-6 py-4 text-sm"
                placeholder="ФИО"
              />
            </div>
          </div>

          {/* Футер с кнопками */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 py-4 px-10 rounded-xl text-lg font-medium"
              disabled={isLoading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-[#EC1C24] text-white py-4 px-10 rounded-xl text-lg font-medium hover:bg-[#d41920] disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
