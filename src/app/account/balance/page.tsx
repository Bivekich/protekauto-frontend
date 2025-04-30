'use client';

import React, { useState } from 'react';

interface BalanceCard {
  id: string;
  companyName: string;
  contractNumber: string;
  contractDate: string;
  balance: number;
  delayLimit: number;
  delayLimitRemaining: number;
  ordersAmount: number;
  delayDays: number;
  delayDaysRemaining: number;
  paidAmount: number;
}

export default function BalancePage() {
  const [balanceCards] = useState<BalanceCard[]>([
    {
      id: '1',
      companyName: 'ООО «Рога и копыта»',
      contractNumber: '241ГМ02',
      contractDate: '23.04.2025',
      balance: -124567,
      delayLimit: 130000,
      delayLimitRemaining: 5433,
      ordersAmount: 14224567,
      delayDays: 30,
      delayDaysRemaining: 5,
      paidAmount: 14100000,
    },
    {
      id: '2',
      companyName: 'ООО «Рога и копыта»',
      contractNumber: '542ГМ02',
      contractDate: '05.02.2025',
      balance: 0,
      delayLimit: 10000,
      delayLimitRemaining: 10000,
      ordersAmount: 34567,
      delayDays: 10,
      delayDaysRemaining: 10,
      paidAmount: 34567,
    },
    {
      id: '3',
      companyName: 'ИП Иванов Иван Иванович',
      contractNumber: '241ГМ02',
      contractDate: '23.04.2025',
      balance: 4320,
      delayLimit: 100000,
      delayLimitRemaining: 100000,
      ordersAmount: 4104345,
      delayDays: 30,
      delayDaysRemaining: 30,
      paidAmount: 4108665,
    },
  ]);

  const [topUpAmounts, setTopUpAmounts] = useState<{ [key: string]: string }>({
    '1': '124567',
    '2': '0',
    '3': '124567',
  });

  const handleTopUpAmountChange = (cardId: string, value: string) => {
    // Только цифры
    const numericValue = value.replace(/\D/g, '');
    setTopUpAmounts({ ...topUpAmounts, [cardId]: numericValue });
  };

  const handleTopUp = (cardId: string) => {
    const amount = Number(topUpAmounts[cardId] || 0);
    console.log(`Пополнение баланса на сумму ${amount} ₽ для карты ${cardId}`);
    // Здесь будет логика для пополнения баланса
  };

  // Форматирование числа в формат Х ХХХ ХХХ ₽
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  };

  return (
    <div className="flex flex-col w-full gap-[20px]">
      {/* Блок с картами баланса */}
      <div className="bg-white rounded-[16px] p-[30px] flex flex-col gap-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {balanceCards.map((card) => (
            <div
              key={card.id}
              className="border border-[#D0D0D0] rounded-[8px] p-[20px] flex flex-col gap-[20px] h-full"
            >
              {/* Шапка карты */}
              <div className="flex flex-col gap-[5px]">
                <h2 className="text-[18px] font-bold text-[#000814]">
                  {card.companyName}
                </h2>
                <p className="text-[14px] text-[#000814]">
                  Договор № {card.contractNumber} от {card.contractDate}
                </p>
              </div>

              {/* Детали баланса */}
              <div className="flex flex-col gap-[20px] flex-1">
                <div className="flex flex-col gap-[15px]">
                  {/* Общий баланс */}
                  <div className="flex flex-col gap-[6px]">
                    <span className="text-[14px] text-[#424F60]">Баланс</span>
                    <span className={`text-[20px] font-bold text-[#000814]`}>
                      {formatCurrency(card.balance)}
                    </span>
                  </div>

                  {/* Две строки с информацией */}
                  <div className="flex justify-between gap-[15px]">
                    {/* Левая колонка */}
                    <div className="flex flex-col gap-[15px] flex-1">
                      {/* Лимит отсрочки */}
                      <div className="flex flex-col gap-[6px]">
                        <span className="text-[14px] text-[#424F60]">
                          Лимит отсрочки
                        </span>
                        <div className="flex flex-col gap-[2px]">
                          <span className="text-[16px] font-medium text-[#000814]">
                            {formatCurrency(card.delayLimit)}
                          </span>
                          <span className="text-[12px] text-[#424F60]">
                            Осталось {formatCurrency(card.delayLimitRemaining)}
                          </span>
                        </div>
                      </div>

                      {/* Сумма заказов */}
                      <div className="flex flex-col gap-[6px]">
                        <span className="text-[14px] text-[#424F60]">
                          Сумма заказов
                        </span>
                        <span className="text-[16px] font-medium text-[#000814]">
                          {formatCurrency(card.ordersAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Правая колонка */}
                    <div className="flex flex-col gap-[15px] flex-1">
                      {/* Количество дней отсрочки */}
                      <div className="flex flex-col gap-[2px]">
                        <span className="text-[16px] font-medium text-[#000814]">
                          {card.delayDays} дней
                        </span>
                        <span
                          className={`text-[12px] ${
                            card.delayDaysRemaining <= 5
                              ? 'text-[#EC1C24]'
                              : 'text-[#424F60]'
                          }`}
                        >
                          Осталось {card.delayDaysRemaining} дней
                        </span>
                      </div>

                      {/* Оплачено */}
                      <div className="flex flex-col gap-[6px]">
                        <span className="text-[14px] text-[#424F60]">
                          Оплачено
                        </span>
                        <span className="text-[16px] font-medium text-[#000814]">
                          {formatCurrency(card.paidAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Форма пополнения */}
                <div className="flex flex-col gap-[10px] mt-auto">
                  <div className="flex items-center gap-[10px]">
                    <input
                      type="text"
                      value={topUpAmounts[card.id] || ''}
                      onChange={(e) =>
                        handleTopUpAmountChange(card.id, e.target.value)
                      }
                      className="border border-[#D0D0D0] rounded-[4px] py-[12px] px-[16px] text-[14px] text-[#747474] w-full"
                      placeholder="Введите сумму"
                    />
                    <button
                      onClick={() => handleTopUp(card.id)}
                      className="bg-[#EC1C24] text-white py-[12px] px-[16px] rounded-[12px] text-[14px] font-medium whitespace-nowrap"
                    >
                      Пополнить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
