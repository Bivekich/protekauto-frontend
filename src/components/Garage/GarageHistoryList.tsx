'use client';

import GarageHistoryItem from './GarageHistoryItem';

// Определение типа для элемента истории поиска
export type SearchHistory = {
  id: string;
  name: string;
  vin: string;
  date: string;
};

type GarageHistoryListProps = {
  historyItems: SearchHistory[];
  onRemove: (id: string) => void;
  onAddToGarage: (item: SearchHistory) => void;
  onClearAll?: () => void;
};

const GarageHistoryList = ({
  historyItems,
  onRemove,
  onAddToGarage,
}: GarageHistoryListProps) => {
  return (
    <div className="bg-white rounded-[20px] p-[24px] mt-[10px]">
      <div className="mb-[24px]">
        <h2 className="text-[36px] font-bold text-[#000814]">
          Ранее вы искали
        </h2>
      </div>

      {historyItems.length > 0 ? (
        <div>
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

export default GarageHistoryList;
