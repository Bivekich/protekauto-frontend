import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { LaximoOEMResult } from '@/types/laximo';
import { SEARCH_LAXIMO_OEM } from '@/lib/graphql';

interface PartDetailCardProps {
  oem: string;
  name: string;
  brand?: string;
  description?: string;
  catalogCode: string;
  vehicleId: string;
  ssd: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const PartDetailCard: React.FC<PartDetailCardProps> = ({
  oem,
  name,
  brand,
  description,
  catalogCode,
  vehicleId,
  ssd,
  isExpanded = false,
  onToggleExpand
}) => {
  const router = useRouter();
  const [localExpanded, setLocalExpanded] = useState(false);
  
  // Используем локальное состояние если нет внешнего контроля
  const expanded = onToggleExpand ? isExpanded : localExpanded;
  const toggleExpand = onToggleExpand || (() => setLocalExpanded(!localExpanded));

  const [executeOEMSearch, { data, loading, error }] = useLazyQuery(SEARCH_LAXIMO_OEM, {
    errorPolicy: 'all'
  });

  const handleToggleExpand = () => {
    toggleExpand();
    
    // Загружаем данные только при первом раскрытии
    if (!expanded && !data && !loading) {
      executeOEMSearch({
        variables: { catalogCode, vehicleId, oemNumber: oem, ssd }
      });
    }
  };

  const handleOpenFullInfo = () => {
    // Переход на отдельную страницу с детальной информацией о детали
    const url = `/vehicle-search/${catalogCode}/${vehicleId}/part/${oem}?use_storage=1&ssd_length=${ssd.length}`;
    router.push(url);
  };

  const oemResult: LaximoOEMResult | null = data?.laximoOEMSearch || null;

  const totalUnits = oemResult?.categories.reduce((total, cat) => total + cat.units.length, 0) || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Основная информация */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">OEM:</span>
                <span className="font-mono text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                  {oem}
                </span>
              </div>
              
              {brand && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Бренд:</span>
                  <span className="text-sm font-medium text-blue-600">{brand}</span>
                </div>
              )}
            </div>

            {description && (
              <p className="text-sm text-gray-600 mb-3">{description}</p>
            )}

            {/* Краткая информация о применимости */}
            {oemResult && (
              <div className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Применимость:</span> 
                <span className="ml-1">
                  {oemResult.categories.length} категорий, {totalUnits} узлов
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleToggleExpand}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            <svg 
              className={`w-4 h-4 mr-2 transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {expanded ? 'Скрыть применимость' : 'Показать применимость'}
          </button>

          <button
            onClick={handleOpenFullInfo}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M7 7l10 10M17 7v4" />
            </svg>
            Подробная информация
          </button>

          <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            В корзину
          </button>

          <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Найти аналоги
          </button>
        </div>
      </div>

      {/* Развернутая информация */}
      {expanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Применимость в автомобиле:
            </h4>
            
            {loading && (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                <span className="ml-2 text-sm text-gray-600">Загружаем информацию...</span>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                Ошибка загрузки: {error.message}
              </div>
            )}

            {oemResult && (
              <div className="space-y-3">
                {oemResult.categories.map((category) => (
                  <div key={category.categoryid} className="bg-white rounded-lg border border-gray-200 p-3">
                    <h5 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {category.name}
                    </h5>
                    
                    <div className="space-y-2">
                      {category.units.map((unit) => (
                        <div key={unit.unitid} className="ml-4 border-l-2 border-gray-200 pl-3">
                          <div className="text-sm font-medium text-gray-800 flex items-center">
                            <svg className="w-3 h-3 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {unit.name}
                            {unit.code && (
                              <span className="ml-2 text-xs text-gray-500">({unit.code})</span>
                            )}
                          </div>
                          
                          {unit.details.map((detail, index) => (
                            <div key={`${detail.detailid}-${index}`} className="ml-4 mt-1">
                              <div className="text-xs text-gray-600 flex items-start">
                                <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div className="flex-1">
                                  <div>{detail.name}</div>
                                  {detail.amount && (
                                    <div className="mt-1">
                                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                        Количество: {detail.amount}
                                      </span>
                                    </div>
                                  )}
                                  {detail.range && (
                                    <div className="mt-1 text-xs text-gray-500">
                                      Период: {detail.range}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && !oemResult && (
              <div className="text-sm text-gray-500 text-center py-4">
                Информация о применимости не найдена
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartDetailCard; 