import React, { useState } from 'react';
import { LaximoCatalogInfo } from '@/types/laximo';
import CatalogGroupsSection from './CatalogGroupsSection';
import OEMSearchSection from './OEMSearchSection';
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
  searchType: 'quickgroups' | 'categories' | 'oem' | 'fulltext';
  onSearchTypeChange: (type: 'quickgroups' | 'categories' | 'oem' | 'fulltext') => void;
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
      id: 'oem' as const,
      name: 'Поиск деталей по OEM номеру',
      description: 'Введите артикул детали для поиска',
      enabled: catalogInfo.features.some(f => f.name === 'detailapplicability'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSearchTypeChange(option.id)}
            className={`
              relative rounded-lg border-2 p-4 text-left hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors
              ${searchType === option.id
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-white'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${searchType === option.id ? 'text-red-600' : 'text-gray-400'}`}>
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-medium ${searchType === option.id ? 'text-red-900' : 'text-gray-900'}`}>
                  {option.name}
                </h3>
                <p className={`text-sm mt-1 ${searchType === option.id ? 'text-red-700' : 'text-gray-500'}`}>
                  {option.description}
                </p>
              </div>
            </div>
            {searchType === option.id && (
              <div className="absolute top-2 right-2">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Содержимое поиска */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {searchType === 'quickgroups' && (
          <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Каталог запчастей</h3>
            <CatalogGroupsSection
              catalogCode={vehicleInfo.catalog}
              vehicleId={vehicleInfo.vehicleid}
              ssd={vehicleInfo.ssd}
            />
          </div>
        )}

        {searchType === 'categories' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Категории узлов оригинального каталога</h3>
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p>Загружаем категории каталога...</p>
              <p className="text-sm mt-1">Здесь будет отображена структура оригинального каталога</p>
            </div>
          </div>
        )}

        {searchType === 'oem' && (
          <OEMSearchSection
            catalogCode={vehicleInfo.catalog}
            vehicleId={vehicleInfo.vehicleid}
            ssd={vehicleInfo.ssd}
          />
        )}

        {searchType === 'fulltext' && (
          <FulltextSearchSection
            catalogCode={vehicleInfo.catalog}
            vehicleId={vehicleInfo.vehicleid}
            ssd={vehicleInfo.ssd}
          />
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