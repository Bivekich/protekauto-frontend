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
  const searchOptions = [
    {
      id: 'quickgroups' as const,
      name: 'Группы быстрого поиска',
      description: 'Поиск запчастей по категориям быстрого поиска',
      enabled: catalogInfo.features.some(f => f.name === 'quickgroups'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'categories' as const,
      name: 'Категории узлов оригинального каталога',
      description: 'Поиск через структуру оригинального каталога',
      enabled: true, // Always available
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },

    {
      id: 'fulltext' as const,
      name: 'Поиск деталей по названию',
      description: 'Введите часть названия детали',
      enabled: catalogInfo.features.some(f => f.name === 'fulltextsearch'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )
    }
  ];

  const availableOptions = searchOptions.filter(option => option.enabled);

  return (
    <div className="space-y-6">
      {/* Варианты поиска */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Способы поиска запчастей</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSearchTypeChange(option.id)}
              className={`
                relative rounded-lg border-2 p-6 text-left hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105
                ${searchType === option.id
                  ? 'border-red-500 bg-red-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:shadow-md'
                }
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-2 rounded-lg ${searchType === option.id ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-base font-semibold mb-2 ${searchType === option.id ? 'text-red-900' : 'text-gray-900'}`}>
                    {option.name}
                  </h4>
                  <p className={`text-sm ${searchType === option.id ? 'text-red-700' : 'text-gray-600'}`}>
                    {option.description}
                  </p>
                  {!option.enabled && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                      Недоступно для данного каталога
                    </span>
                  )}
                </div>
              </div>
              {searchType === option.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Содержимое поиска */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {searchType === 'quickgroups' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Группы быстрого поиска</h3>
              <p className="text-sm text-gray-600">
                Выберите группу запчастей для быстрого поиска нужных деталей
              </p>
            </div>
            <QuickGroupsSection
              catalogCode={vehicleInfo.catalog}
              vehicleId={vehicleInfo.vehicleid}
              ssd={vehicleInfo.ssd}
            />
          </div>
        )}

        {searchType === 'categories' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Категории узлов оригинального каталога</h3>
              <p className="text-sm text-gray-600">
                Навигация по структуре оригинального каталога производителя
              </p>
            </div>
            <CategoriesSection
              catalogCode={vehicleInfo.catalog}
              vehicleId={vehicleInfo.vehicleid}
              ssd={vehicleInfo.ssd}
            />
          </div>
        )}



        {searchType === 'fulltext' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Поиск деталей по названию</h3>
              <p className="text-sm text-gray-600">
                Введите часть названия детали для поиска в каталоге
              </p>
            </div>
            <FulltextSearchSection
              catalogCode={vehicleInfo.catalog}
              vehicleId={vehicleInfo.vehicleid}
              ssd={vehicleInfo.ssd}
            />
          </div>
        )}
      </div>

      {/* Информация о текущем автомобиле */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Выбранный автомобиль: {vehicleInfo.name}
        </h4>
        <p className="text-blue-700 text-sm">
          ID автомобиля: {vehicleInfo.vehicleid} | Каталог: {vehicleInfo.brand}
        </p>
        <p className="text-blue-700 text-sm mt-1">
          SSD: {vehicleInfo.ssd && vehicleInfo.ssd.trim() !== '' 
            ? `${vehicleInfo.ssd.substring(0, 50)}...` 
            : 'отсутствует'
          } 
          {vehicleInfo.ssd && ` (длина: ${vehicleInfo.ssd.length})`}
        </p>
      </div>
    </div>
  );
};

export default VehiclePartsSearchSection; 