import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import ProfileHistoryItem from "./ProfileHistoryItem";
import SearchInput from "./SearchInput";
import ProfileHistoryTabs from "./ProfileHistoryTabs";
import { 
  GET_PARTS_SEARCH_HISTORY, 
  DELETE_SEARCH_HISTORY_ITEM,
  CLEAR_SEARCH_HISTORY,
  CREATE_SEARCH_HISTORY_ITEM,
  PartsSearchHistoryItem,
  PartsSearchHistoryResponse 
} from '@/lib/graphql/search-history';

const ProfileHistoryMain = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Все");
  const [sortField, setSortField] = useState<"date" | "manufacturer" | "name" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filteredItems, setFilteredItems] = useState<PartsSearchHistoryItem[]>([]);

  const tabOptions = ["Все", "Сегодня", "Вчера", "Эта неделя", "Этот месяц"];

  // GraphQL запросы
  const { data, loading, error, refetch } = useQuery<{ partsSearchHistory: PartsSearchHistoryResponse }>(
    GET_PARTS_SEARCH_HISTORY,
    {
      variables: { limit: 100, offset: 0 },
      fetchPolicy: 'cache-and-network',
      onCompleted: (data) => {
        console.log('История поиска загружена:', data);
      },
      onError: (error) => {
        console.error('Ошибка загрузки истории поиска:', error);
      }
    }
  );

  const [deleteItem] = useMutation(DELETE_SEARCH_HISTORY_ITEM, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Ошибка удаления элемента истории:', error);
    }
  });

  const [clearHistory] = useMutation(CLEAR_SEARCH_HISTORY, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Ошибка очистки истории:', error);
    }
  });

  const [createHistoryItem] = useMutation(CREATE_SEARCH_HISTORY_ITEM, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Ошибка создания записи истории:', error);
    }
  });

  const historyItems = data?.partsSearchHistory?.items || [];

  // Отладочная информация
  console.log('ProfileHistoryMain состояние:', {
    loading,
    error: error?.message,
    data,
    historyItemsCount: historyItems.length
  });

  // Фильтрация по времени
  const getFilteredByTime = (items: PartsSearchHistoryItem[], timeFilter: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    switch (timeFilter) {
      case "Сегодня":
        return items.filter(item => new Date(item.createdAt) >= today);
      case "Вчера":
        return items.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= yesterday && itemDate < today;
        });
      case "Эта неделя":
        return items.filter(item => new Date(item.createdAt) >= weekAgo);
      case "Этот месяц":
        return items.filter(item => new Date(item.createdAt) >= monthAgo);
      default:
        return items;
    }
  };

  // Фильтрация и сортировка
  useEffect(() => {
    let filtered = getFilteredByTime(historyItems, activeTab);

    // Поиск
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(item =>
        item.searchQuery.toLowerCase().includes(searchLower) ||
        item.brand?.toLowerCase().includes(searchLower) ||
        item.articleNumber?.toLowerCase().includes(searchLower) ||
        item.vehicleInfo?.brand?.toLowerCase().includes(searchLower) ||
        item.vehicleInfo?.model?.toLowerCase().includes(searchLower)
      );
    }

    // Сортировка
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue: string | number = '';
        let bValue: string | number = '';

        switch (sortField) {
          case 'date':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case 'manufacturer':
            aValue = a.brand || a.vehicleInfo?.brand || '';
            bValue = b.brand || b.vehicleInfo?.brand || '';
            break;
          case 'name':
            aValue = a.searchQuery;
            bValue = b.searchQuery;
            break;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortOrder === 'asc' ? comparison : -comparison;
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    setFilteredItems(filtered);
  }, [historyItems, search, activeTab, sortField, sortOrder]);

  const handleSort = (field: "date" | "manufacturer" | "name") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc"); // По умолчанию сначала новые
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Удалить этот элемент из истории?')) {
      try {
        await deleteItem({ variables: { id } });
      } catch (error) {
        console.error('Ошибка удаления:', error);
      }
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Очистить всю историю поиска? Это действие нельзя отменить.')) {
      try {
        await clearHistory();
      } catch (error) {
        console.error('Ошибка очистки истории:', error);
      }
    }
  };

  const handleCreateTestData = async () => {
    const testItems = [
      {
        searchQuery: "тормозные колодки",
        searchType: "TEXT" as const,
        brand: "BREMBO",
        resultCount: 15,
        vehicleBrand: "BMW",
        vehicleModel: "X5",
        vehicleYear: 2020
      },
      {
        searchQuery: "0986424781",
        searchType: "ARTICLE" as const,
        brand: "BOSCH",
        articleNumber: "0986424781",
        resultCount: 3
      },
      {
        searchQuery: "масляный фильтр",
        searchType: "TEXT" as const,
        brand: "MANN",
        resultCount: 22,
        vehicleBrand: "AUDI",
        vehicleModel: "A4",
        vehicleYear: 2018
      },
      {
        searchQuery: "34116858652",
        searchType: "OEM" as const,
        brand: "BMW",
        articleNumber: "34116858652",
        resultCount: 8,
        vehicleBrand: "BMW",
        vehicleModel: "3 Series",
        vehicleYear: 2019
      },
      {
        searchQuery: "свечи зажигания",
        searchType: "TEXT" as const,
        brand: "NGK",
        resultCount: 45
      }
    ];

    try {
      for (const item of testItems) {
        await createHistoryItem({
          variables: { input: item }
        });
        // Небольшая задержка между запросами
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error('Ошибка создания тестовых данных:', error);
    }
  };

  if (loading && historyItems.length === 0) {
    return (
      <div className="flex flex-col justify-center text-base">
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-500">Загрузка истории поиска...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center text-base">
        <div className="flex justify-center items-center h-40">
          <div className="text-red-500">Ошибка загрузки истории поиска</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center text-base">
      <div className="flex flex-wrap gap-5 items-center px-8 py-3 w-full leading-snug text-gray-400 whitespace-nowrap bg-white rounded-lg max-md:px-5 max-md:max-w-full max-md:flex-col">
        <div className="flex-1 shrink self-stretch my-auto text-gray-400 basis-0 text-ellipsis max-md:max-w-full max-md:w-full">
          <SearchInput 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск в истории..."
          />
        </div>
        <div className="flex gap-2">
          {historyItems.length === 0 && (
            <button
              onClick={handleCreateTestData}
              className="px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Создать тестовые данные
            </button>
          )}
          {historyItems.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Очистить историю
            </button>
          )}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/02c9461c587bf477e8ee3187cb5faa1bccaf0900?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
          className="object-contain shrink-0 self-stretch my-auto w-5 rounded-sm aspect-square max-md:mt-2"
        />
      </div>

      <div className="flex flex-col mt-5 w-full text-lg font-medium leading-tight whitespace-nowrap text-gray-950 max-md:max-w-full">
        <ProfileHistoryTabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="flex flex-col mt-5 w-full text-gray-400 max-md:max-w-full">
        <div className="flex flex-col justify-center p-2 w-full bg-white rounded-xl max-md:max-w-full">
          <div className="flex gap-10 items-center px-5 py-2 w-full text-sm max-md:max-w-full max-md:flex-col max-md:gap-2 max-md:px-2">
            <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch pr-5 my-auto w-full basis-0 min-w-[240px] max-md:max-w-full max-md:flex-col max-md:gap-2 max-md:p-0 max-md:min-w-0">
              <div className="flex gap-1.5 items-center self-stretch my-auto w-40 max-md:w-full">
                <div 
                  className="self-stretch my-auto cursor-pointer select-none hover:text-gray-600 transition-colors" 
                  onClick={() => handleSort('date')}
                >
                  Дата и время
                </div>
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="transition-transform duration-200"
                  style={{ 
                    transform: sortField === 'date' && sortOrder === 'asc' ? 'rotate(180deg)' : 'none',
                    opacity: sortField === 'date' ? 1 : 0.5
                  }}
                >
                  <path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex gap-1.5 items-center self-stretch my-auto w-40 whitespace-nowrap max-md:w-full">
                <div 
                  className="self-stretch my-auto cursor-pointer select-none hover:text-gray-600 transition-colors" 
                  onClick={() => handleSort('manufacturer')}
                >
                  Бренд/Производитель
                </div>
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="transition-transform duration-200"
                  style={{ 
                    transform: sortField === 'manufacturer' && sortOrder === 'asc' ? 'rotate(180deg)' : 'none',
                    opacity: sortField === 'manufacturer' ? 1 : 0.5
                  }}
                >
                  <path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="gap-1.5 self-stretch my-auto whitespace-nowrap w-[180px] max-md:w-full">
                Артикул/Тип
              </div>
              <div className="flex flex-wrap flex-1 shrink gap-1.5 items-center self-stretch my-auto whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full max-md:w-full">
                <div 
                  className="self-stretch my-auto cursor-pointer select-none hover:text-gray-600 transition-colors" 
                  onClick={() => handleSort('name')}
                >
                  Поисковый запрос
                </div>
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="transition-transform duration-200"
                  style={{ 
                    transform: sortField === 'name' && sortOrder === 'asc' ? 'rotate(180deg)' : 'none',
                    opacity: sortField === 'name' ? 1 : 0.5
                  }}
                >
                  <path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="w-16 text-center max-md:w-full">
                Действия
              </div>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center text-gray-500">
                {historyItems.length === 0 ? (
                  <>
                    <div className="text-lg mb-2">История поиска пуста</div>
                    <div className="text-sm">Ваши поисковые запросы будут отображаться здесь</div>
                  </>
                ) : (
                  <>
                    <div className="text-lg mb-2">Ничего не найдено</div>
                    <div className="text-sm">Попробуйте изменить фильтры или поисковый запрос</div>
                  </>
                )}
              </div>
            </div>
          ) : (
            filteredItems.map((item) => (
              <ProfileHistoryItem
                key={item.id}
                id={item.id}
                date={new Date(item.createdAt).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                manufacturer={item.brand || item.vehicleInfo?.brand || 'Не указан'}
                article={item.articleNumber || `${item.searchType} поиск`}
                name={item.searchQuery}
                vehicleInfo={item.vehicleInfo}
                resultCount={item.resultCount}
                onDelete={handleDeleteItem}
              />
            ))
          )}
        </div>

        {filteredItems.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Показано {filteredItems.length} из {historyItems.length} записей
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHistoryMain;


