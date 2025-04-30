'use client';

import React, { useState, useMemo } from 'react';
import {
  SearchHistoryItem,
  SearchHistoryTabs,
  ManufacturerSelect,
  SearchInput,
  TabType,
} from '@/components/Profile';
import {
  SearchHistoryItem as SearchHistoryItemType,
  SearchHistoryFilters,
} from '@/shared/types/search-history';

// Временные данные для демонстрации
const mockData: SearchHistoryItemType[] = Array(15)
  .fill(null)
  .map((_, index) => ({
    id: `id-${index}`,
    date: '15.04.2025 16:39',
    manufacturer: 'VAG',
    articleNumber: '6RU807421BGRU',
    name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
  }));

// Получаем уникальные производители из данных
const uniqueManufacturers = [
  ...new Set(mockData.map((item) => item.manufacturer)),
];

export default function SearchHistoryPage() {
  // Состояние фильтров
  const [filters, setFilters] = useState<SearchHistoryFilters>({
    period: 'today',
    manufacturer: null,
    search: '',
  });

  // Обработчик смены периода
  const handlePeriodChange = (period: TabType) => {
    setFilters((prev) => ({ ...prev, period }));
  };

  // Обработчик выбора производителя
  const handleManufacturerChange = (manufacturer: string | null) => {
    setFilters((prev) => ({ ...prev, manufacturer }));
  };

  // Обработчик поиска
  const handleSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  // Отфильтрованные данные на основе текущих фильтров
  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      // Фильтр по производителю
      if (filters.manufacturer && item.manufacturer !== filters.manufacturer) {
        return false;
      }

      // Фильтр по поиску
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.articleNumber.toLowerCase().includes(searchLower) ||
          item.manufacturer.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [filters]);

  // Обработчик клика по элементу истории
  const handleItemClick = (item: SearchHistoryItemType) => {
    console.log('Выбран элемент:', item);
    // Здесь можно добавить перенаправление на страницу поиска с параметрами
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-[20px] w-full">
        {/* Поиск */}
        <SearchInput onSearch={handleSearch} initialValue={filters.search} />

        {/* Фильтры */}
        <div className="flex flex-row w-full justify-between items-center">
          <SearchHistoryTabs
            activeTab={filters.period}
            onTabChange={handlePeriodChange}
          />

          <div className="w-[200px]">
            <ManufacturerSelect
              manufacturers={uniqueManufacturers}
              selectedManufacturer={filters.manufacturer}
              onSelect={handleManufacturerChange}
            />
          </div>
        </div>

        {/* Список истории поиска */}
        <div className="bg-white rounded-[12px] w-full shadow-sm overflow-hidden">
          {/* Заголовок таблицы */}
          <div className="py-[8px] px-[18px] flex items-center border-b border-[#E9E9E9]">
            <div className="flex w-full py-[8px] px-[20px]">
              <div className="w-[160px] flex items-center gap-[5px]">
                <span className="text-[14px] text-[#8893A1]">Дата и время</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1.5V10.5M6 1.5L10.5 6M6 1.5L1.5 6"
                    stroke="#8893A1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-[160px] flex items-center gap-[5px]">
                <span className="text-[14px] text-[#8893A1]">
                  Производитель
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1.5V10.5M6 1.5L10.5 6M6 1.5L1.5 6"
                    stroke="#8893A1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-[180px]">
                <span className="text-[14px] text-[#8893A1]">Артикул</span>
              </div>
              <div className="flex-1 flex items-center gap-[5px]">
                <span className="text-[14px] text-[#8893A1]">Наименование</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1.5V10.5M6 1.5L10.5 6M6 1.5L1.5 6"
                    stroke="#8893A1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Элементы истории */}
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <React.Fragment key={item.id}>
                <SearchHistoryItem
                  date={item.date}
                  manufacturer={item.manufacturer}
                  articleNumber={item.articleNumber}
                  name={item.name}
                  onClick={() => handleItemClick(item)}
                />
                {index < filteredData.length - 1 && (
                  <div className="border-b border-[#E9E9E9]" />
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="py-[20px] text-center text-[#8893A1]">
              История поиска не найдена
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
