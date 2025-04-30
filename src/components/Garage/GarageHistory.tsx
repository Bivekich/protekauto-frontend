'use client';

import React from 'react';
import GarageHistoryItem from './GarageHistoryItem';

// Определение типа для элемента истории поиска
export type SearchHistory = {
  id: string;
  name: string;
  vin: string;
  date: string;
};

type GarageHistoryProps = {
  historyItems: SearchHistory[];
  onRemove: (id: string) => void;
  onAddToGarage: (item: SearchHistory) => void;
};

const GarageHistory = ({
  historyItems,
  onRemove,
  onAddToGarage,
}: GarageHistoryProps) => {
  return (
    <div className="bg-white rounded-[20px] p-[24px] mt-[20px]">
      <div className="mb-[24px]">
        <h2 className="text-[24px] font-medium text-[#000814]">
          Ранее вы искали
        </h2>
      </div>

      {historyItems.length > 0 ? (
        <div className="flex flex-col gap-[16px]">
          {historyItems.map((item) => (
            <GarageHistoryItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onAddToGarage={onAddToGarage}
            />
          ))}
        </div>
      ) : (
        <div className="text-[16px] text-[#697586] py-[24px] text-center">
          История поиска пуста
        </div>
      )}
    </div>
  );
};

export default GarageHistory;
