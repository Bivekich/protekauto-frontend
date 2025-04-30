'use client';

import { useState } from 'react';

interface AlertType {
  id: string;
  title: string;
  checked: boolean;
}

export function AlertsSettings() {
  const [email, setEmail] = useState('voronin.p.e@gmail.com');
  const [division] = useState('Все');
  const [deliveryAddress] = useState('Все');
  const [alertTypes, setAlertTypes] = useState<AlertType[]>([
    { id: 'all', title: 'Все оповещения', checked: false },
    { id: 'delivery', title: 'Доставка товара', checked: false },
    { id: 'payment', title: 'Поступление оплаты', checked: false },
    { id: 'unreserved', title: 'Снято с резерва', checked: false },
    { id: 'declined', title: 'Отказ в поставке', checked: false },
    { id: 'return', title: 'Возврат товара', checked: false },
    { id: 'invoice', title: 'УПД или чек', checked: false },
  ]);

  const handleAlertTypeChange = (id: string) => {
    if (id === 'all') {
      // Если выбрано "Все оповещения", то устанавливаем все чекбоксы
      const allChecked = !alertTypes.find((type) => type.id === 'all')?.checked;
      setAlertTypes(
        alertTypes.map((type) => ({ ...type, checked: allChecked }))
      );
    } else {
      // Иначе изменяем только выбранный чекбокс
      setAlertTypes(
        alertTypes.map((type) =>
          type.id === id ? { ...type, checked: !type.checked } : type
        )
      );

      // Проверяем, должен ли быть выбран чекбокс "Все оповещения"
      const allExceptFirst = alertTypes.filter((type) => type.id !== 'all');
      const allOthersChecked = allExceptFirst.every((type) => type.checked);

      if (allOthersChecked) {
        setAlertTypes(
          alertTypes.map((type) =>
            type.id === 'all' ? { ...type, checked: true } : type
          )
        );
      } else {
        setAlertTypes(
          alertTypes.map((type) =>
            type.id === 'all' ? { ...type, checked: false } : type
          )
        );
      }
    }
  };

  const handleEmailDelete = () => {
    // В реальном приложении здесь был бы запрос к API
    setEmail('');
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#000814]">{email}</h2>
          <button
            onClick={handleEmailDelete}
            className="flex items-center gap-[5px] hover:opacity-80 transition-opacity"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4H3.33333H14"
                stroke="#D0D0D0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33325 4.00065V2.66732C5.33325 2.31369 5.47373 1.97456 5.72378 1.72451C5.97382 1.47446 6.31296 1.33398 6.66658 1.33398H9.33325C9.68687 1.33398 10.026 1.47446 10.276 1.72451C10.5261 1.97456 10.6666 2.31369 10.6666 2.66732V4.00065M12.6666 4.00065V13.334C12.6666 13.6876 12.5261 14.0267 12.276 14.2768C12.026 14.5268 11.6869 14.6673 11.3333 14.6673H4.66658C4.31296 14.6673 3.97382 14.5268 3.72378 14.2768C3.47373 14.0267 3.33325 13.6876 3.33325 13.334V4.00065H12.6666Z"
                stroke="#D0D0D0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66675 7.33398V11.334"
                stroke="#D0D0D0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33325 7.33398V11.334"
                stroke="#D0D0D0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm text-[#424F60]">Удалить</span>
          </button>
        </div>

        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-[#000814]">Подразделение</label>
            <div className="flex justify-between items-center border border-[#D0D0D0] rounded py-4 px-6">
              <span className="text-sm text-[#747474]">{division}</span>
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

          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-[#000814]">Адрес доставки</label>
            <div className="flex justify-between items-center border border-[#D0D0D0] rounded py-4 px-6">
              <span className="text-sm text-[#747474]">{deliveryAddress}</span>
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

        <div className="flex flex-wrap gap-x-7 gap-y-4 mt-2">
          {alertTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 border border-[#D0D0D0] rounded relative flex items-center justify-center cursor-pointer"
                onClick={() => handleAlertTypeChange(type.id)}
              >
                {type.checked && (
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L4.5 7.5L11 1"
                      stroke="#424F60"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#181D23]">{type.title}</span>
            </div>
          ))}
        </div>

        <hr className="border-t border-[#D0D0D0] my-2" />

        <button className="bg-[#EC1C24] text-white rounded-xl py-3.5 px-5 text-base font-medium self-end hover:bg-[#d61920] transition-colors">
          Добавить почту для уведомлений
        </button>
      </div>
    </div>
  );
}
