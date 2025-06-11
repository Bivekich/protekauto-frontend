import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_LAXIMO_APPLICABLE_VEHICLES } from '@/lib/graphql';
import { LaximoVehicleSearchResult } from '@/types/laximo';

interface PartSearchFormProps {
  catalogCode: string;
  onVehiclesFound: (vehicles: LaximoVehicleSearchResult[]) => void;
  onSearchStart?: () => void;
  isLoading: boolean;
  placeholder?: string;
}

const PartSearchForm: React.FC<PartSearchFormProps> = ({
  catalogCode,
  onVehiclesFound,
  onSearchStart,
  isLoading,
  placeholder = '1J0853665BB41'
}) => {
  const [partNumber, setPartNumber] = useState('');

  // Запрос для поиска автомобилей по артикулу в каталоге
  const [findApplicableVehicles, { loading: searchLoading }] = useLazyQuery(FIND_LAXIMO_APPLICABLE_VEHICLES, {
    onCompleted: (data) => {
      const vehicles = data.laximoFindApplicableVehicles || [];
      console.log('✅ Найдено автомобилей по артикулу:', vehicles.length);
      onVehiclesFound(vehicles);
    },
    onError: (error) => {
      console.error('❌ Ошибка поиска автомобилей по артикулу:', error);
      onVehiclesFound([]);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partNumber.trim()) {
      console.log('🔍 Поиск автомобилей по артикулу:', partNumber, 'в каталоге:', catalogCode);
      onSearchStart?.();
      findApplicableVehicles({
        variables: { 
          catalogCode, 
          partNumber: partNumber.trim().toUpperCase() 
        }
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setPartNumber(value);
  };

  const loading = isLoading || searchLoading;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={partNumber}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg font-mono"
              disabled={loading}
            />
            <p className="mt-2 text-sm text-gray-500">
              Введите артикул (OEM номер) детали для поиска применимых автомобилей в каталоге
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Например: {placeholder}
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading || !partNumber.trim()}
            className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Поиск...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Найти
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartSearchForm; 