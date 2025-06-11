import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LaximoFulltextSearchResult, LaximoFulltextDetail, LaximoOEMResult } from '@/types/laximo';
import { SEARCH_LAXIMO_FULLTEXT, SEARCH_LAXIMO_OEM } from '@/lib/graphql';

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
              Результаты поиска: "{searchResults.searchQuery}"
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Найдено {searchResults.details.length} деталей
            </p>
          </div>

          {searchResults.details.length > 0 ? (
            <div>
              <div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
                <p className="text-sm text-blue-700">
                  💡 Кликните на любую деталь, чтобы увидеть где она используется в автомобиле
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {searchResults.details.map((detail, index) => (
                  <DetailCard key={`${detail.oem}-${index}`} detail={detail} catalogCode={catalogCode} vehicleId={vehicleId} ssd={ssd} />
                ))}
              </div>
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600">
                По запросу "{searchResults.searchQuery}" ничего не найдено
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

// Компонент карточки детали
interface DetailCardProps {
  detail: LaximoFulltextDetail;
  catalogCode: string;
  vehicleId: string;
  ssd: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ detail, catalogCode, vehicleId, ssd }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDetailClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
      <div 
        className="flex items-start justify-between"
        onClick={handleDetailClick}
      >
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {detail.name}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">OEM номер:</span>
              <span className="ml-2 font-mono font-medium text-red-600">{detail.oem}</span>
            </div>
            
            {detail.brand && (
              <div>
                <span className="text-gray-500">Бренд:</span>
                <span className="ml-2 font-medium">{detail.brand}</span>
              </div>
            )}
          </div>

          {detail.description && (
            <div className="mt-3">
              <span className="text-gray-500">Описание:</span>
              <p className="text-gray-700 mt-1">{detail.description}</p>
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-shrink-0">
          <button
            className={`transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Расширенная информация - поиск по OEM */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-900 mb-3">
            Где используется эта деталь в автомобиле:
          </h5>
          <OEMSearchResultSection
            catalogCode={catalogCode}
            vehicleId={vehicleId}
            ssd={ssd}
            oemNumber={detail.oem}
          />
        </div>
      )}
    </div>
  );
};

// Компонент для отображения результатов поиска по OEM номеру
interface OEMSearchResultSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd: string;
  oemNumber: string;
}

const OEMSearchResultSection: React.FC<OEMSearchResultSectionProps> = ({
  catalogCode,
  vehicleId,
  ssd,
  oemNumber
}) => {
  const [executeOEMSearch, { data, loading, error }] = useLazyQuery(SEARCH_LAXIMO_OEM, {
    errorPolicy: 'all',
    variables: { catalogCode, vehicleId, oemNumber, ssd }
  });

  React.useEffect(() => {
    if (oemNumber && catalogCode && vehicleId && ssd) {
      executeOEMSearch();
    }
  }, [oemNumber, catalogCode, vehicleId, ssd, executeOEMSearch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
        <span className="ml-2 text-sm text-gray-600">Загружаем информацию...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Ошибка загрузки: {error.message}
      </div>
    );
  }

  const oemResult: LaximoOEMResult | null = data?.laximoOEMSearch || null;

  if (!oemResult) {
    return (
      <div className="text-sm text-gray-500">
        Информация о применимости не найдена
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {oemResult.categories.map((category) => (
        <div key={category.categoryid} className="bg-gray-50 rounded-lg p-3">
          <h6 className="text-sm font-medium text-gray-900 mb-2">
            📂 {category.name}
          </h6>
          
          {category.units.map((unit) => (
            <div key={unit.unitid} className="ml-4 space-y-1">
              <div className="text-sm font-medium text-gray-800">
                🔧 {unit.name}
              </div>
              
              {unit.details.map((detail, index) => (
                <div key={`${detail.detailid}-${index}`} className="ml-4 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span>📄</span>
                    <span>{detail.name}</span>
                    {detail.amount && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                        Кол-во: {detail.amount}
                      </span>
                    )}
                  </div>
                  
                  {detail.attributes && detail.attributes.length > 0 && (
                    <div className="ml-6 mt-1 space-y-0.5">
                      {detail.attributes.map((attr, attrIndex) => (
                        <div key={attrIndex} className="text-xs text-gray-500">
                          <span className="font-medium">{attr.name}:</span> {attr.value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FulltextSearchSection; 