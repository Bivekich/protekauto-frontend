import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_LAXIMO_OEM } from '@/lib/graphql';
import { LaximoOEMResult, LaximoOEMCategory, LaximoOEMUnit, LaximoOEMDetail } from '@/types/laximo';

interface OEMSearchSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd: string;
  initialOEMNumber?: string;
}

interface OEMDetailCardProps {
  detail: LaximoOEMDetail;
  categoryName: string;
  unitName: string;
}

const OEMDetailCard: React.FC<OEMDetailCardProps> = ({ detail, categoryName, unitName }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-1">{detail.name}</h4>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">OEM:</span> 
            <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-2">{detail.oem}</span>
          </div>
        </div>
        <div className="flex flex-col items-end ml-4">
          {detail.brand && (
            <span className="text-sm font-medium text-blue-600 mb-1">{detail.brand}</span>
          )}
          {detail.amount && (
            <span className="text-xs text-gray-500">Кол-во: {detail.amount}</span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium text-gray-700">Категория:</span>
          <p className="text-gray-600">{categoryName}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Узел:</span>
          <p className="text-gray-600">{unitName}</p>
        </div>
      </div>

      {detail.range && (
        <div className="mt-3 text-sm">
          <span className="font-medium text-gray-700">Период применения:</span>
          <p className="text-gray-600">{detail.range}</p>
        </div>
      )}

      {detail.attributes && detail.attributes.length > 0 && (
        <div className="mt-3">
          <span className="font-medium text-gray-700 text-sm">Характеристики:</span>
          <div className="mt-1 space-y-1">
            {detail.attributes.map((attr, index) => (
              <div key={index} className="text-xs text-gray-600">
                <span className="font-medium">{attr.name || attr.key}:</span> {attr.value}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
          Добавить в корзину
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors">
          Найти аналоги
        </button>
      </div>
    </div>
  );
};

interface UnitSectionProps {
  unit: LaximoOEMUnit;
  categoryName: string;
}

const UnitSection: React.FC<UnitSectionProps> = ({ unit, categoryName }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        {unit.imageurl && (
          <img 
            src={unit.imageurl.replace('%size%', '100')} 
            alt={unit.name}
            className="w-16 h-16 object-contain border rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{unit.name}</h3>
          {unit.code && (
            <p className="text-sm text-gray-600">Код: {unit.code}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {unit.details.map((detail, index) => (
          <OEMDetailCard 
            key={`${detail.detailid}-${index}`}
            detail={detail}
            categoryName={categoryName}
            unitName={unit.name}
          />
        ))}
      </div>
    </div>
  );
};

const OEMSearchSection: React.FC<OEMSearchSectionProps> = ({ 
  catalogCode, 
  vehicleId, 
  ssd,
  initialOEMNumber 
}) => {
  const [oemNumber, setOemNumber] = useState(initialOEMNumber || '');
  const [searchOEMNumber, setSearchOEMNumber] = useState(initialOEMNumber || '');

  const [executeSearch, { data, loading, error }] = useLazyQuery(SEARCH_LAXIMO_OEM, {
    errorPolicy: 'all'
  });

  const handleSearch = () => {
    if (oemNumber.trim()) {
      console.log('🔍 Начинаем поиск OEM:', {
        catalogCode,
        vehicleId,
        oemNumber: oemNumber.trim(),
        ssd: ssd ? `${ssd.substring(0, 30)}...` : 'отсутствует'
      });
      setSearchOEMNumber(oemNumber.trim());
      
      // Попробуем прямой fetch запрос для диагностики
      const testFetch = async () => {
        try {
          console.log('🚀 Выполняем прямой fetch запрос...');
          const response = await fetch('http://localhost:3000/api/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                query TestOEM($catalogCode: String!, $vehicleId: String!, $oemNumber: String!, $ssd: String!) {
                  laximoOEMSearch(catalogCode: $catalogCode, vehicleId: $vehicleId, oemNumber: $oemNumber, ssd: $ssd) {
                    oemNumber
                  }
                }
              `,
              variables: {
                catalogCode,
                vehicleId,
                oemNumber: oemNumber.trim(),
                ssd
              }
            })
          });
          
          const result = await response.json();
          console.log('✅ Прямой fetch результат:', result);
          
          if (result.errors) {
            console.error('❌ GraphQL ошибки:', result.errors);
          }
        } catch (err) {
          console.error('❌ Fetch ошибка:', err);
        }
      };
      
      testFetch();
      
      executeSearch({
        variables: { 
          catalogCode, 
          vehicleId, 
          oemNumber: oemNumber.trim(), 
          ssd 
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Автоматически выполняем поиск при наличии initialOEMNumber
  useEffect(() => {
    if (initialOEMNumber && initialOEMNumber.trim() && catalogCode && vehicleId && ssd) {
      const cleanOEM = initialOEMNumber.trim();
      console.log('🔍 Автоматический поиск OEM при загрузке:', cleanOEM);
      setOemNumber(cleanOEM);
      handleSearch();
    }
  }, [initialOEMNumber]);

  const searchResults: LaximoOEMResult | null = data?.laximoOEMSearch || null;

  return (
    <div className="space-y-6">
      {/* Форма поиска */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Поиск деталей по артикулу (OEM номеру)
        </h2>
        
        {initialOEMNumber && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              🔍 Автоматический поиск по артикулу <span className="font-mono font-semibold">{initialOEMNumber}</span> из результатов поиска автомобилей
            </p>
          </div>
        )}
        
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={oemNumber}
              onChange={(e) => setOemNumber(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите OEM номер (например: 14G857507)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!oemNumber.trim() || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Поиск...' : 'Найти'}
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mt-2">
          Поиск покажет, где в указанном автомобиле используется данная деталь
        </p>
      </div>

      {/* Результаты поиска */}
      {loading && searchOEMNumber && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Поиск детали по номеру {searchOEMNumber}...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium mb-2">Ошибка поиска</h3>
          <p className="text-red-700 text-sm">
            Не удалось выполнить поиск по номеру "{searchOEMNumber}": {error.message}
          </p>
          {(() => { console.log('❌ GraphQL Error:', error); return null; })()}
        </div>
      )}

      {searchResults && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Результаты поиска: {searchResults.oemNumber}
            </h2>
            <p className="text-gray-600">
              Найдено {searchResults.categories.length} категорий с {
                searchResults.categories.reduce((total, cat) => total + cat.units.length, 0)
              } узлами
            </p>
          </div>

          {searchResults.categories.map((category) => (
            <div key={category.categoryid} className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                📂 {category.name}
              </h2>
              
              {category.units.map((unit) => (
                <UnitSection 
                  key={unit.unitid} 
                  unit={unit} 
                  categoryName={category.name}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {searchOEMNumber && !loading && !searchResults && !error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-yellow-800 font-medium mb-2">Детали не найдены</h3>
          <p className="text-yellow-700 text-sm">
            По номеру "{searchOEMNumber}" ничего не найдено в данном автомобиле. 
            Проверьте правильность номера или попробуйте использовать группы быстрого поиска.
          </p>
        </div>
      )}
    </div>
  );
};

export default OEMSearchSection; 