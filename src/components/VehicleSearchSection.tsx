import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_LAXIMO_VEHICLE, FIND_LAXIMO_VEHICLE_BY_PLATE_GLOBAL } from '@/lib/graphql';
import { LaximoCatalogInfo, LaximoWizardStep, LaximoVehicleSearchResult } from '@/types/laximo';
import VinSearchForm from './VinSearchForm';
import PlateSearchForm from './PlateSearchForm';
import PartSearchForm from './PartSearchForm';
import WizardSearchForm from './WizardSearchForm';
import VehicleSearchResults from './VehicleSearchResults';

interface VehicleSearchSectionProps {
  catalogInfo: LaximoCatalogInfo;
  searchType: 'vin' | 'wizard' | 'parts' | 'plate';
  onSearchTypeChange: (type: 'vin' | 'wizard' | 'parts' | 'plate') => void;
}

const VehicleSearchSection: React.FC<VehicleSearchSectionProps> = ({
  catalogInfo,
  searchType,
  onSearchTypeChange
}) => {
  const [searchResults, setSearchResults] = useState<LaximoVehicleSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Query для поиска по VIN
  const [findVehicle] = useLazyQuery(FIND_LAXIMO_VEHICLE, {
    onCompleted: (data) => {
      setSearchResults(data.laximoFindVehicle || []);
      setIsSearching(false);
      setHasSearched(true);
    },
    onError: (error) => {
      console.error('Ошибка поиска автомобиля:', error);
      setSearchResults([]);
      setIsSearching(false);
      setHasSearched(true);
    }
  });

  // Query для поиска по госномеру
  const [findVehicleByPlate] = useLazyQuery(FIND_LAXIMO_VEHICLE_BY_PLATE_GLOBAL, {
    onCompleted: (data) => {
      setSearchResults(data.laximoFindVehicleByPlateGlobal || []);
      setIsSearching(false);
      setHasSearched(true);
    },
    onError: (error) => {
      console.error('Ошибка поиска автомобиля по госномеру:', error);
      setSearchResults([]);
      setIsSearching(false);
      setHasSearched(true);
    }
  });

  const handleVinSearch = async (vin: string) => {
    if (!vin.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    setHasSearched(false);
    
    await findVehicle({
      variables: {
        catalogCode: '', // Пустой для глобального поиска
        vin: vin.trim()
      }
    });
  };

  const handlePlateSearch = async (plateNumber: string) => {
    if (!plateNumber.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    setHasSearched(false);
    
    await findVehicleByPlate({
      variables: {
        plateNumber: plateNumber.trim()
      }
    });
  };

  const handleWizardVehicleFound = (vehicles: LaximoVehicleSearchResult[]) => {
    setSearchResults(vehicles);
    setIsSearching(false);
    setHasSearched(true);
  };

  const handlePartsSearchStart = () => {
    setIsSearching(true);
    setSearchResults([]);
    setHasSearched(false);
  };

  const handlePartsVehicleFound = (vehicles: LaximoVehicleSearchResult[]) => {
    console.log('🔍 Найдено автомобилей по артикулу:', vehicles.length);
    setSearchResults(vehicles);
    setIsSearching(false);
    setHasSearched(true);
  };

  const searchTabs = [
    {
      id: 'vin' as const,
      name: 'Поиск по VIN/Frame',
      description: 'Введите VIN или номер кузова автомобиля',
      enabled: catalogInfo.supportvinsearch,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'wizard' as const,
      name: 'Поиск автомобиля по параметрам',
      description: 'Выберите серию и тип кузова',
      enabled: catalogInfo.supportparameteridentification2,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    },
    {
      id: 'parts' as const,
      name: 'Поиск автомобилей по детали',
      description: 'Введите артикул (OEM)',
      enabled: catalogInfo.supportdetailapplicability,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'plate' as const,
      name: 'Поиск по государственному номеру',
      description: 'Введите государственный номер автомобиля',
      enabled: catalogInfo.supportplateidentification ?? true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    }
  ];

  const availableTabs = searchTabs.filter(tab => tab.enabled);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onSearchTypeChange(tab.id);
                  setSearchResults([]);
                  setHasSearched(false);
                  setIsSearching(false);
                }}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${searchType === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {searchType === 'vin' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Поиск по VIN/Frame
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {catalogInfo.vinexample 
                  ? `Введите VIN или номер кузова автомобиля, например: ${catalogInfo.vinexample}`
                  : 'Введите VIN или номер кузова автомобиля'
                }
              </p>
              <VinSearchForm
                onSearch={handleVinSearch}
                isLoading={isSearching}
                placeholder={catalogInfo.vinexample || 'WBS21CS0709X59107'}
              />
            </div>
          )}

          {searchType === 'wizard' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Поиск автомобиля по параметрам
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Выберите серию и тип кузова для поиска автомобиля
              </p>
              <WizardSearchForm
                catalogCode={catalogInfo.code}
                onVehicleFound={handleWizardVehicleFound}
              />
            </div>
          )}

          {searchType === 'parts' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Поиск автомобилей по детали
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Введите артикул (OEM) для поиска применимых автомобилей
              </p>
              <PartSearchForm
                catalogCode={catalogInfo.code}
                onVehiclesFound={handlePartsVehicleFound}
                onSearchStart={handlePartsSearchStart}
                isLoading={isSearching}
              />
            </div>
          )}

          {searchType === 'plate' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Поиск по государственному номеру
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Введите государственный номер автомобиля
              </p>
              <PlateSearchForm
                onSearch={handlePlateSearch}
                isLoading={isSearching}
                placeholder={catalogInfo.plateexample || 'А123АА777'}
              />
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <VehicleSearchResults 
          results={searchResults}
          catalogInfo={catalogInfo}
        />
      )}

      {/* No Results */}
      {!isSearching && searchResults.length === 0 && !hasSearched && (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600">
            Выполните поиск, чтобы найти подходящий автомобиль для подбора запчастей
          </p>
        </div>
      )}

      {/* Search completed but no results */}
      {!isSearching && searchResults.length === 0 && hasSearched && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <div className="text-yellow-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Автомобили не найдены</h3>
          <p className="text-gray-600 mb-4">
            {searchType === 'vin' && 'По указанному VIN/Frame номеру не найдено автомобилей в данном каталоге.'}
            {searchType === 'parts' && 'По указанному артикулу не найдено применимых автомобилей в данном каталоге.'}
            {searchType === 'plate' && 'По указанному государственному номеру не найдено автомобилей в данном каталоге.'}
            {searchType === 'wizard' && 'По заданным параметрам не найдено автомобилей в данном каталоге.'}
          </p>
          <p className="text-sm text-gray-500">
            Попробуйте изменить параметры поиска или выберите другой каталог.
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleSearchSection; 