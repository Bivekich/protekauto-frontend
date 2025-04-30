'use client';

import { useState } from 'react';

type Car = {
  id: string;
  name: string;
  vin: string;
  comment?: string;
  releaseDate?: string;
  year?: string;
  productionPeriod?: string;
  market?: string;
  engine?: string;
  engineNumber?: string;
  transmission?: string;
  bodyColor?: string;
  interiorColor?: string;
};

type GarageAddCarFormProps = {
  onAdd: (car: Omit<Car, 'id'>) => void;
  onCancel: () => void;
};

const GarageAddCarForm = ({ onAdd, onCancel }: GarageAddCarFormProps) => {
  const [formData, setFormData] = useState({
    vin: '',
    comment: '',
    // Дополнительные поля
    releaseDate: '',
    year: '',
    productionPeriod: '',
    market: '',
    engine: '',
    engineNumber: '',
    transmission: '',
    bodyColor: '',
    interiorColor: '',
    // Флаг для показа/скрытия расширенной формы
    showExtended: false,
  });

  const [errors, setErrors] = useState({
    vin: '',
  });

  const validateVin = (vin: string): boolean => {
    // Базовая валидация: VIN должен быть 17 символов и содержать только буквы и цифры
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    return vinRegex.test(vin);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Очищаем ошибки при вводе
    if (name === 'vin' && errors.vin) {
      setErrors({
        ...errors,
        vin: '',
      });
    }
  };

  const toggleExtendedForm = () => {
    setFormData({
      ...formData,
      showExtended: !formData.showExtended,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация формы
    const newErrors = {
      vin: '',
    };

    let isValid = true;

    if (!formData.vin.trim()) {
      newErrors.vin = 'Введите VIN номер';
      isValid = false;
    } else if (!validateVin(formData.vin)) {
      newErrors.vin = 'Некорректный VIN номер (должен содержать 17 символов)';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Имя будет определено на основе VIN при реальном использовании
    // Здесь для демонстрации используем заглушку
    onAdd({
      name: `Lexus RX330/350`,
      vin: formData.vin,
      comment: formData.comment,
      releaseDate: formData.releaseDate,
      year: formData.year,
      productionPeriod: formData.productionPeriod,
      market: formData.market,
      engine: formData.engine,
      engineNumber: formData.engineNumber,
      transmission: formData.transmission,
      bodyColor: formData.bodyColor,
      interiorColor: formData.interiorColor,
    });
  };

  return (
    <div className="bg-white rounded-[20px] p-[24px] mt-[10px]">
      <div className="mb-[24px]">
        <h2 className="text-[36px] font-bold text-[#000814]">
          Добавить авто в гараж
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
          <div>
            <label
              htmlFor="vinNumber"
              className="block text-[16px] font-medium text-[#000814] mb-[12px]"
            >
              VIN
            </label>
            <input
              type="text"
              id="vinNumber"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              placeholder="VIN"
              className={`w-full p-[12px] border ${
                errors.vin ? 'border-[#EF4444]' : 'border-[#E9EDF5]'
              } rounded-[8px] text-[16px] outline-none focus:border-[#EC1C24] transition-colors`}
              maxLength={17}
            />
            {errors.vin && (
              <p className="text-[14px] text-[#EF4444] mt-[4px]">
                {errors.vin}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-[16px] font-medium text-[#000814] mb-[12px]"
            >
              Комментарий
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Комментарий"
              className="w-full p-[12px] border border-[#E9EDF5] rounded-[8px] text-[16px] outline-none focus:border-[#EC1C24] transition-colors"
            />
          </div>
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={toggleExtendedForm}
            className="text-[#EC1C24] flex items-center gap-2 font-medium"
          >
            {formData.showExtended
              ? 'Скрыть расширенную информацию'
              : 'Добавить расширенную информацию'}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${
                formData.showExtended ? 'rotate-180' : ''
              }`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {formData.showExtended && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                Дата выпуска
              </label>
              <input
                type="text"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                placeholder="23.05.2013"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                Выпущено
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2014"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                Период производства
              </label>
              <input
                type="text"
                name="productionPeriod"
                value={formData.productionPeriod}
                onChange={handleChange}
                placeholder="2011-2015"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                Рынок
              </label>
              <input
                type="text"
                name="market"
                value={formData.market}
                onChange={handleChange}
                placeholder="Европа"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                Двигатель
              </label>
              <input
                type="text"
                name="engine"
                value={formData.engine}
                onChange={handleChange}
                placeholder="CFNA"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                Номер двигателя
              </label>
              <input
                type="text"
                name="engineNumber"
                value={formData.engineNumber}
                onChange={handleChange}
                placeholder="476054"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                КПП
              </label>
              <input
                type="text"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                placeholder="NVS (5S)"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                Цвет кузова
              </label>
              <input
                type="text"
                name="bodyColor"
                value={formData.bodyColor}
                onChange={handleChange}
                placeholder="B4B4"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                Цвет салона
              </label>
              <input
                type="text"
                name="interiorColor"
                value={formData.interiorColor}
                onChange={handleChange}
                placeholder="BY"
                className="w-full p-[10px] border border-[#E9EDF5] rounded-[8px] text-[14px]"
              />
            </div>
          </div>
        )}

        <div className="flex gap-[16px]">
          <button
            type="submit"
            className="py-[10px] px-[16px] rounded-[12px] bg-[#EC1C24] text-white text-[16px] font-medium hover:bg-[#D81B22] transition-colors"
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="py-[10px] px-[16px] rounded-[12px] border border-[#E9EDF5] text-[#4B5563] text-[16px] font-medium hover:bg-[#F9FAFB] transition-colors"
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default GarageAddCarForm;
