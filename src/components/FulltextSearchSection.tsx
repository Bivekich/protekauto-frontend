import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LaximoFulltextSearchResult, LaximoFulltextDetail, LaximoOEMResult } from '@/types/laximo';
import { SEARCH_LAXIMO_FULLTEXT, SEARCH_LAXIMO_OEM } from '@/lib/graphql';
import PartDetailCard from './PartDetailCard';

interface FulltextSearchSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd: string;
}

const FulltextSearchSection: React.FC<FulltextSearchSectionProps> = ({
  catalogCode,
  vehicleId,
  ssd
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [executeSearch, { data, loading, error }] = useLazyQuery(SEARCH_LAXIMO_FULLTEXT, {
    errorPolicy: 'all'
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }

    if (!ssd || ssd.trim() === '') {
      console.error('SSD обязателен для поиска по названию');
      return;
    }

    executeSearch({
      variables: { 
        catalogCode, 
        vehicleId, 
        searchQuery: searchQuery.trim(), 
        ssd 
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const searchResults: LaximoFulltextSearchResult | null = data?.laximoFulltextSearch || null;

  return (
    <div className="space-y-6">
      {/* Форма поиска */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Поиск деталей по названию
        </h3>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите название детали (например: фильтр масляный)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || loading || !ssd || ssd.trim() === ''}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Поиск...' : 'Найти'}
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mt-2">
          Введите название детали для поиска в каталоге. 
          Попробуйте русские термины: "фильтр", "тормозной", "амортизатор" 
          или английские: "filter", "brake", "shock"
        </p>
        
        {(!ssd || ssd.trim() === '') && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <svg className="h-5 w-5 text-yellow-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Полнотекстовый поиск недоступен
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Для поиска по названию деталей необходимо сначала выбрать конкретный автомобиль через поиск по VIN или мастер подбора.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ошибка */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Ошибка поиска
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Результаты поиска */}
      {searchResults && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Результаты поиска: "{searchQuery}"
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Найдено {searchResults.details.length} деталей
            </p>
          </div>

          {searchResults.details.length > 0 ? (
            <div className="space-y-4 p-6">
              <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
                💡 Каждая карточка показывает деталь. Нажмите "Показать применимость" чтобы увидеть где она используется в автомобиле
              </div>
              
                {searchResults.details.map((detail, index) => (
                <PartDetailCard
                  key={`${detail.oem}-${index}`}
                  oem={detail.oem}
                  name={detail.name}
                  brand={detail.brand}
                  description={detail.description}
                  catalogCode={catalogCode}
                  vehicleId={vehicleId}
                  ssd={ssd}
                />
                ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600">
                По запросу "{searchQuery}" ничего не найдено
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Попробуйте изменить поисковый запрос
              </p>
            </div>
          )}
        </div>
      )}

      {/* Подсказки */}
      {!searchResults && !loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Советы по поиску
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Используйте ключевые слова: "фильтр", "масляный", "воздушный", "тормозной"</li>
                  <li>Попробуйте английские термины: "filter", "oil", "air", "brake", "shock"</li>
                  <li>Можно использовать частичные названия: "амортизатор", "сцепление"</li>
                  <li>Поиск ведется по названиям деталей в оригинальном каталоге</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default FulltextSearchSection; 