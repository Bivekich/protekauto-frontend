'use client';

import { useState } from 'react';

// Определение типа для элемента истории поиска
export type SearchHistory = {
  id: string;
  name: string;
  vin: string;
  date: string;
};

type GarageAddFromHistoryProps = {
  item: SearchHistory;
  onAdd: (item: SearchHistory) => void;
  onCancel: () => void;
};

const GarageAddFromHistory = ({
  item,
  onAdd,
  onCancel,
}: GarageAddFromHistoryProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Добавляем комментарий к автомобилю из истории и добавляем в гараж
    const enrichedItem = {
      ...item,
      comment,
    };

    onAdd(enrichedItem);
  };

  return (
    <div className="bg-white rounded-[20px] p-[24px]">
      <div className="flex items-center justify-between mb-[24px]">
        <h2 className="text-[24px] font-medium text-[#000814]">
          Добавить в гараж
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-[20px]">
          <div className="p-[16px] bg-[#F9FAFB] rounded-[12px] mb-[16px]">
            <div className="mb-[8px]">
              <span className="text-[14px] text-[#697586]">Автомобиль:</span>
              <span className="text-[16px] text-[#000814] font-medium ml-[8px]">
                {item.name}
              </span>
            </div>
            <div>
              <span className="text-[14px] text-[#697586]">VIN:</span>
              <span className="text-[16px] text-[#000814] font-mono ml-[8px]">
                {item.vin}
              </span>
            </div>
          </div>

          <div className="mb-[24px]">
            <label
              htmlFor="comment"
              className="block text-[14px] text-[#4B5563] mb-[8px]"
            >
              Комментарий (необязательно)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Дополнительная информация об автомобиле"
              className="w-full p-[12px] border border-[#E9EDF5] rounded-[8px] text-[16px] outline-none focus:border-[#0D336C] transition-colors min-h-[100px] resize-y"
            />
          </div>
        </div>

        <div className="flex justify-end gap-[16px]">
          <button
            type="button"
            onClick={onCancel}
            className="py-[10px] px-[16px] rounded-[12px] border border-[#E9EDF5] text-[#4B5563] text-[16px] font-medium hover:bg-[#F9FAFB] transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="py-[10px] px-[16px] rounded-[12px] bg-[#2264D1] text-white text-[16px] font-medium hover:bg-[#1A4FAA] transition-colors"
          >
            Добавить в гараж
          </button>
        </div>
      </form>
    </div>
  );
};

export default GarageAddFromHistory;
