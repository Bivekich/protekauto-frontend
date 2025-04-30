'use client';

import { useState } from 'react';

type SearchHistory = {
  id: string;
  name: string;
  vin: string;
  date: string;
};

type GarageHistoryItemProps = {
  item: SearchHistory;
  onRemove: (id: string) => void;
  onAddToGarage: (item: SearchHistory) => void;
};

const GarageHistoryItem = ({
  item,
  onRemove,
  onAddToGarage,
}: GarageHistoryItemProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const confirmAddToGarage = () => {
    onAddToGarage(item);
    setShowConfirmModal(false);
  };

  return (
    <div className="bg-[#F8F9FA] rounded-[12px] p-[15px] mb-[5px]">
      <div className="flex items-center">
        <div className="w-[200px] mr-[15px]">
          <h3 className="text-[20px] font-semibold text-[#000814]">
            {item.name}
          </h3>
        </div>

        <div className="w-[200px] mr-[15px] text-[16px] text-[#8E9AAC]">
          {item.vin}
        </div>

        <div className="text-[14px] text-[#424F60] mr-[15px]">{item.date}</div>

        <div className="flex-grow"></div>

        <button
          onClick={openConfirmModal}
          className="flex items-center gap-[5px] text-[14px] text-[#424F60] hover:text-[#EC1C24] mr-[15px]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3.33334V12.6667"
              stroke="#424F60"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.33325 8H12.6666"
              stroke="#424F60"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Добавить в гараж</span>
        </button>

        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-[5px] text-[14px] text-[#424F60] hover:text-[#EC1C24]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H14"
              stroke="#424F60"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4"
              stroke="#424F60"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33333 4.00001V2.66668C5.33333 2.00001 6 1.33334 6.66667 1.33334H9.33333C10 1.33334 10.6667 2.00001 10.6667 2.66668V4.00001"
              stroke="#424F60"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Удалить</span>
        </button>
      </div>

      {/* Модальное окно подтверждения добавления */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-[24px] w-[500px] max-w-[90%] shadow-lg border border-[#E6EDF6]">
            <h3 className="text-[24px] font-bold mb-[20px]">Подтверждение</h3>
            <p className="mb-[20px] text-[16px] text-[#4B5563]">
              Вы действительно хотите добавить автомобиль &ldquo;{item.name}
              &rdquo; в гараж?
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmAddToGarage}
                className="py-[10px] px-[16px] rounded-[12px] bg-[#EC1C24] text-white text-[16px] font-medium"
              >
                Добавить
              </button>
              <button
                onClick={closeConfirmModal}
                className="py-[10px] px-[16px] rounded-[12px] bg-white border border-[#D0D0D0] text-[#000814] text-[16px] font-medium"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GarageHistoryItem;
