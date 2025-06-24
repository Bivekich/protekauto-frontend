import React, { useState } from 'react';
import { LaximoCatalogInfo } from '@/types/laximo';
import QuickGroupsSection from './QuickGroupsSection';
import CategoriesSection from './CategoriesSection';
import FulltextSearchSection from './FulltextSearchSection';

interface LaximoVehicleInfo {
  vehicleid: string;
  name: string;
  ssd: string;
  brand: string;
  catalog: string;
  attributes: Array<{
    key: string;
    name: string;
    value: string;
  }>;
}

interface VehiclePartsSearchSectionProps {
  catalogInfo: LaximoCatalogInfo;
  vehicleInfo: LaximoVehicleInfo;
  searchType: 'quickgroups' | 'categories' | 'fulltext';
  onSearchTypeChange: (type: 'quickgroups' | 'categories' | 'fulltext') => void;
}

const VehiclePartsSearchSection: React.FC<VehiclePartsSearchSectionProps> = ({
  catalogInfo,
  vehicleInfo,
  searchType,
  onSearchTypeChange
}) => {
  // Проверяем поддержку функций согласно документации Laximo
  const supportsQuickGroups = catalogInfo.features.some(f => f.name === 'quickgroups');
  const supportsFullTextSearch = catalogInfo.features.some(f => f.name === 'fulltextsearch');
  
  console.log('🔧 VehiclePartsSearchSection - Поддерживаемые функции:');
  console.log('📋 Все features:', catalogInfo.features.map(f => f.name));
  console.log('🚀 quickgroups поддерживается:', supportsQuickGroups);
  console.log('🔍 fulltextsearch поддерживается:', supportsFullTextSearch);

  const searchOptions = [
    {
      id: 'quickgroups' as const,
      name: 'Группы быстрого поиска',
      description: 'Поиск запчастей по группам быстрого поиска Laximo (ListQuickGroup)',
      enabled: supportsQuickGroups,
      requiresSSD: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'categories' as const,
      name: 'Категории узлов каталога',
      description: 'Поиск через структуру оригинального каталога (ListCategories)',
      enabled: true, // Always available according to documentation
      requiresSSD: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'fulltext' as const,
      name: 'Поиск деталей по названию',
      description: 'Введите часть названия детали (SearchVehicleDetails)',
      enabled: supportsFullTextSearch,
      requiresSSD: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    }
  ];

  // Если текущий тип поиска не поддерживается, переключаемся на поддерживаемый
  React.useEffect(() => {
    const currentOption = searchOptions.find(option => option.id === searchType);
    if (!currentOption?.enabled) {
      // Приоритет: quickgroups -> categories -> fulltext
      if (supportsQuickGroups && vehicleInfo.ssd) {
        onSearchTypeChange('quickgroups');
      } else {
        onSearchTypeChange('categories'); // categories всегда доступны
      }
    }
  }, [catalogInfo, vehicleInfo, searchType, onSearchTypeChange, supportsQuickGroups]);

  const handleSearchTypeChange = (type: 'quickgroups' | 'categories' | 'fulltext') => {
    const option = searchOptions.find(opt => opt.id === type);
    
    if (!option?.enabled) {
      console.warn(`Тип поиска ${type} не поддерживается каталогом ${catalogInfo.code}`);
      return;
    }

    if (option.requiresSSD && (!vehicleInfo.ssd || vehicleInfo.ssd.trim() === '')) {
      alert(`Для использования "${option.name}" необходимы данные автомобиля (SSD). Пожалуйста, выберите автомобиль заново.`);
      return;
    }

    console.log(`🔄 Переключение на тип поиска: ${type}`);
    onSearchTypeChange(type);
  };

  return (
    <div className="space-y-6">
      {/* Заголовок с информацией о каталоге */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Способы поиска запчастей
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Выберите предпочтительный способ поиска для каталога {catalogInfo.name}
            </p>
          </div>
          
          {/* Индикатор поддерживаемых функций */}
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Поддерживаемые функции:</div>
            <div className="flex space-x-2">
              {supportsQuickGroups && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  QuickGroups
                </span>
              )}
              {supportsFullTextSearch && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  FullText
                </span>
              )}
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                Categories
              </span>
            </div>
          </div>
        </div>

        {/* Селектор типов поиска */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {searchOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSearchTypeChange(option.id)}
              disabled={!option.enabled}
              className={`
                relative p-4 border rounded-lg text-left transition-all duration-200
                ${searchType === option.id && option.enabled
                  ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                  : option.enabled
                    ? 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${option.enabled ? 'text-gray-600' : 'text-gray-400'}`}>
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium ${option.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                    {option.name}
                  </h3>
                  <p className={`text-xs mt-1 ${option.enabled ? 'text-gray-600' : 'text-gray-400'}`}>
                    {option.description}
                  </p>
                  
                  {/* Индикаторы требований */}
                  <div className="mt-2 flex items-center space-x-2">
                    {option.requiresSSD && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        vehicleInfo.ssd 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {vehicleInfo.ssd ? '✓ SSD доступен' : '⚠ Требует SSD'}
                      </span>
                    )}
                    
                    {!option.enabled && (
                      <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">
                        Не поддерживается
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Индикатор выбранного состояния */}
              {searchType === option.id && option.enabled && (
                <div className="absolute top-2 right-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Отображение выбранного компонента поиска */}
      <div className="min-h-[400px]">
        {searchType === 'quickgroups' && supportsQuickGroups && (
          <QuickGroupsSection
            catalogCode={vehicleInfo.catalog}
            vehicleId={vehicleInfo.vehicleid}
            ssd={vehicleInfo.ssd}
          />
        )}

        {searchType === 'categories' && (
          <CategoriesSection
            catalogCode={vehicleInfo.catalog}
            vehicleId={vehicleInfo.vehicleid}
            ssd={vehicleInfo.ssd}
          />
        )}

        {searchType === 'fulltext' && supportsFullTextSearch && (
          <FulltextSearchSection
            catalogCode={vehicleInfo.catalog}
            vehicleId={vehicleInfo.vehicleid}
            ssd={vehicleInfo.ssd}
          />
        )}
      </div>

      {/* Информационная панель */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Информация о способах поиска
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Группы быстрого поиска</strong> - используют функцию Laximo ListQuickGroup для быстрого доступа к категориям</li>
                <li><strong>Категории узлов каталога</strong> - навигация по структуре оригинального каталога производителя</li>
                <li><strong>Поиск по названию</strong> - полнотекстовый поиск деталей по их наименованию</li>
              </ul>
              {vehicleInfo.ssd ? (
                <p className="mt-2 text-green-700">
                  ✓ Данные автомобиля (SSD) доступны - все функции активны
                </p>
              ) : (
                <p className="mt-2 text-yellow-700">
                  ⚠ Некоторые функции требуют данных автомобиля (SSD)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePartsSearchSection; 