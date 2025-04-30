import React from 'react';

interface SearchHistoryItemProps {
  date: string;
  manufacturer: string;
  articleNumber: string;
  name: string;
  onClick?: () => void;
}

export const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({
  date,
  manufacturer,
  articleNumber,
  name,
  onClick,
}) => {
  return (
    <div
      className="py-[6px] px-[18px] pb-[8px] hover:bg-[#E6EDF6] cursor-pointer transition-colors duration-150"
      onClick={onClick}
    >
      <div className="flex items-center w-full">
        <div className="w-[160px]">
          <p className="text-[16px] text-[#8893A1] font-normal">{date}</p>
        </div>
        <div className="w-[160px]">
          <p className="text-[16px] text-[#000814] font-bold">{manufacturer}</p>
        </div>
        <div className="w-[180px]">
          <p className="text-[16px] text-[#000814] font-bold">
            {articleNumber}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-[16px] text-[#8893A1] font-normal">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryItem;
