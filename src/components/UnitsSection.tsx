import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LAXIMO_UNITS } from '@/lib/graphql';
import { useRouter } from 'next/router';
import UnitDetailsSection from './UnitDetailsSection';

interface UnitsSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd?: string;
  categoryId: string;
  categoryName: string;
  onBack: () => void;
}

interface LaximoUnit {
  quickgroupid: string; // unitid в API
  name: string;
  link: boolean;
  code?: string;
  imageurl?: string;
}

const UnitsSection: React.FC<UnitsSectionProps> = ({
  catalogCode,
  vehicleId,
  ssd,
  categoryId,
  categoryName,
  onBack
}) => {
  const router = useRouter();
  const [selectedUnit, setSelectedUnit] = useState<{ unitId: string; unitName: string } | null>(null);

  // Получаем список узлов для выбранной категории
  const { data: unitsData, loading: unitsLoading, error: unitsError } = useQuery<{ laximoUnits: LaximoUnit[] }>(
    GET_LAXIMO_UNITS,
    {
      variables: { 
        catalogCode,
        vehicleId,
        categoryId,
        ...(ssd && ssd.trim() !== '' && { ssd })
      },
      skip: !catalogCode || !vehicleId || !categoryId,
      errorPolicy: 'all'
    }
  );

  const handleUnitSelect = (unitId: string, unitName: string) => {
    console.log('Выбран узел:', { unitId, unitName });
    setSelectedUnit({ unitId, unitName });
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
  };

  // Если выбран узел, показываем детали узла
  if (selectedUnit) {
    return (
      <UnitDetailsSection
        catalogCode={catalogCode}
        vehicleId={vehicleId}
        ssd={ssd}
        unitId={selectedUnit.unitId}
        unitName={selectedUnit.unitName}
        onBack={handleBackToUnits}
      />
    );
  }

  if (unitsLoading) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад к категориям
          </button>
          <h3 className="text-lg font-medium text-gray-900">
            {categoryName}
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загружаем узлы категории...</p>
        </div>
      </div>
    );
  }

  if (unitsError) {
    console.error('Ошибка загрузки узлов:', unitsError);
    return (
      <div>
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад к категориям
          </button>
          <h3 className="text-lg font-medium text-gray-900">
            {categoryName}
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки узлов</h3>
          <p className="text-gray-600 mb-4">Не удалось загрузить узлы категории</p>
          <p className="text-sm text-gray-500">
            {unitsError.message}
          </p>
        </div>
      </div>
    );
  }

  const units = unitsData?.laximoUnits || [];

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к категориям
        </button>
        <h3 className="text-lg font-medium text-gray-900">
          {categoryName}
        </h3>
      </div>

      {units.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Узлы не найдены</h3>
          <p className="text-gray-600">
            В данной категории узлы недоступны
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6">
            Найдено узлов: {units.length}. Выберите узел для просмотра деталей.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit) => (
              <button
                key={unit.quickgroupid}
                onClick={() => handleUnitSelect(unit.quickgroupid, unit.name)}
                className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-red-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {unit.name}
                    </h4>
                    {unit.code && (
                      <p className="text-sm text-gray-500 mb-2">
                        Код: {unit.code}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Нажмите для просмотра деталей
                    </p>
                  </div>
                  <div className="ml-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {unit.imageurl && (
                  <div className="mt-3">
                    <img
                      src={unit.imageurl.replace('%size%', '150')}
                      alt={unit.name}
                      className="w-full h-32 object-contain bg-gray-50 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-900">
                  Готово к использованию
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Нажмите на любой узел, чтобы просмотреть его детали с изображениями и схемами. 
                  Функция полностью реализована согласно API Laximo.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UnitsSection; 