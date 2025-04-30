import React from 'react';

export type TabType = 'today' | 'yesterday' | 'earlier' | 'archive';

interface SearchHistoryTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const SearchHistoryTabs: React.FC<SearchHistoryTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'today', label: 'Сегодня' },
    { id: 'yesterday', label: 'Вчера' },
    { id: 'earlier', label: 'Ранее' },
    { id: 'archive', label: 'Архив' },
  ] as const;

  return (
    <div className="flex gap-[20px] mb-[20px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`py-[14px] px-[22px] rounded-[12px] font-medium text-[18px] transition-colors duration-150 ${
            activeTab === tab.id
              ? 'bg-[#EC1C24] text-white'
              : 'bg-[#E6EDF6] text-[#000814] hover:bg-[#d0dbe9]'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SearchHistoryTabs;
