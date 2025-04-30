'use client';

import React, { useState } from 'react';

export default function ReconciliationPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('thisYear');
  const [customerSelectedValue, setCustomerSelectedValue] =
    useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('@');

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomerSelectedValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Отправка запроса на получение акта сверки', {
      период: selectedPeriod,
      покупатель: customerSelectedValue,
      email: emailValue,
    });
    // Здесь будет логика отправки запроса
  };

  return (
    <div className="flex flex-col w-full gap-[20px]">
      {/* Форма акта сверки */}
      <div className="bg-white rounded-[16px] p-[30px] flex flex-col gap-[30px]">
        {/* Селекторы периода */}
        <div className="flex flex-row gap-[20px] items-center">
          <button
            className={`py-[14px] px-[22px] rounded-[12px] text-[18px] font-medium ${
              selectedPeriod === 'thisYear'
                ? 'bg-[#EC1C24] text-white'
                : 'bg-[#E6EDF6] text-[#000814]'
            }`}
            onClick={() => handlePeriodChange('thisYear')}
          >
            Этот год
          </button>
          <button
            className={`py-[14px] px-[22px] rounded-[12px] text-[18px] font-medium ${
              selectedPeriod === 'lastQuarter'
                ? 'bg-[#EC1C24] text-white'
                : 'bg-[#E6EDF6] text-[#000814]'
            }`}
            onClick={() => handlePeriodChange('lastQuarter')}
          >
            Последний квартал
          </button>
          <button
            className={`py-[14px] px-[22px] rounded-[12px] text-[18px] font-medium ${
              selectedPeriod === 'lastYear'
                ? 'bg-[#EC1C24] text-white'
                : 'bg-[#E6EDF6] text-[#000814]'
            }`}
            onClick={() => handlePeriodChange('lastYear')}
          >
            Предыдущий год
          </button>

          <div className="ml-auto relative w-[250px]">
            <select
              className="border border-[#D0D0D0] rounded-[4px] py-[16px] px-[24px] text-[14px] text-[#747474] w-full appearance-none"
              value=""
            >
              <option value="" disabled>
                Выбрать период
              </option>
              <option value="custom1">Январь 2025</option>
              <option value="custom2">Февраль 2025</option>
              <option value="custom3">Март 2025</option>
            </select>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#747474"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Форма данных */}
        <div className="flex flex-row gap-[20px]">
          {/* Покупатель */}
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[14px] text-[#000814]">Покупатель</label>
            <div className="relative">
              <select
                className="border border-[#D0D0D0] rounded-[4px] py-[16px] px-[24px] text-[14px] text-[#747474] w-full appearance-none"
                value={customerSelectedValue}
                onChange={handleCustomerChange}
              >
                <option value="" disabled>
                  Выберите
                </option>
                <option value="customer1">ООО &quot;Рога и копыта&quot;</option>
                <option value="customer2">ИП Иванов И.И.</option>
                <option value="customer3">ЗАО &quot;Компания&quot;</option>
              </select>
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#747474"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Продавец */}
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[14px] text-[#000814]">Продавец</label>
            <div className="relative">
              <select
                className="border border-[#D0D0D0] rounded-[4px] py-[16px] px-[24px] text-[14px] text-[#747474] w-full appearance-none"
                value="protekauto"
                disabled
              >
                <option value="protekauto">ООО &quot;ПротекАвто&quot;</option>
              </select>
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#747474"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[14px] text-[#000814]">
              E-mail для получения акта сверки
            </label>
            <div className="relative">
              <input
                type="email"
                className="border border-[#D0D0D0] rounded-[4px] py-[16px] px-[24px] text-[14px] text-[#747474] w-full"
                value={emailValue}
                onChange={handleEmailChange}
                placeholder="@"
              />
            </div>
          </div>
        </div>

        {/* Кнопка отправки */}
        <div className="flex justify-end">
          <button
            className="bg-[#EC1C24] text-white py-[14px] px-[20px] rounded-[12px] text-[16px] font-medium"
            onClick={handleSubmit}
          >
            Получить акт сверки
          </button>
        </div>
      </div>
    </div>
  );
}
