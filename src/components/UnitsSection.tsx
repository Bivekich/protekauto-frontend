import React, { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_LAXIMO_UNITS } from '@/lib/graphql/laximo';
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
  largeimageurl?: string;
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
  const apolloClient = useApolloClient();
  const [selectedUnit, setSelectedUnit] = useState<{ unitId: string; unitName: string } | null>(null);

  // Функция для правильного формирования URL изображения
  const getImageUrl = (baseUrl: string, size: string = '250') => {
    if (!baseUrl) return '';
    
    // Декодируем HTML-сущности и заменяем размер
    const decodedUrl = baseUrl
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace('%size%', size);
    
    return decodedUrl;
  };

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
      errorPolicy: 'all',
      fetchPolicy: 'no-cache', // Полностью отключаем кэширование для гарантии свежих данных
      notifyOnNetworkStatusChange: true
    }
  );

  const handleUnitSelect = (unitId: string, unitName: string) => {
    console.log('Выбран узел:', { unitId, unitName });
    setSelectedUnit({ unitId, unitName });
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
  };

  const handleClearCache = async () => {
    console.log('🧹 Очищаем кэш Apollo Client...');
    try {
      await apolloClient.clearStore();
      console.log('✅ Кэш очищен успешно');
      // Принудительный refetch данных
      window.location.reload();
    } catch (error) {
      console.error('❌ Ошибка очистки кэша:', error);
    }
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

  // Отладочная информация
  console.log('🔍 UnitsSection: RAW данные от Apollo:', unitsData);
  console.log('🔍 UnitsSection: полученные данные узлов:', {
    categoryId,
    categoryName,
    unitsCount: units.length,
    units: units.map(unit => ({
      id: unit.quickgroupid,
      name: unit.name,
      code: unit.code,
      hasImageUrl: !!unit.imageurl,
      imageUrl: unit.imageurl || 'отсутствует'
    }))
  });
  
  // Дополнительная отладка первого узла
  if (units.length > 0) {
    console.log('🔍 Первый узел (полные данные):', units[0]);
    console.log('🔍 Все поля первого узла:', Object.keys(units[0]));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
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
        
        {/* Кнопка отладки - очистка кэша */}
        <button
          onClick={handleClearCache}
          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          title="Очистить кэш Apollo и перезагрузить"
        >
          🧹 Очистить кэш
        </button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <button
                key={unit.quickgroupid}
                onClick={() => handleUnitSelect(unit.quickgroupid, unit.name)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden text-left hover:border-red-300 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 group"
              >
                {/* Изображение узла */}
                {unit.imageurl ? (
                  <div className="relative h-48 bg-gray-50 border-b border-gray-200">
                    <img
                      src={getImageUrl(unit.imageurl || '', '250')}
                      alt={unit.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        console.log('❌ Ошибка загрузки изображения:', {
                          originalUrl: unit.imageurl || 'отсутствует',
                          processedUrl: getImageUrl(unit.imageurl || '', '250'),
                          unitName: unit.name
                        });
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.classList.add('hidden');
                          // Показываем заглушку
                          const nextSibling = parent.nextElementSibling;
                          if (nextSibling && nextSibling.classList.contains('hidden')) {
                            nextSibling.classList.remove('hidden');
                          }
                        }
                      }}
                      onLoad={(e) => {
                        console.log('✅ Изображение успешно загружено:', {
                          src: e.currentTarget.src,
                          unitName: unit.name
                        });
                      }}
                    />
                    {/* Индикатор увеличения */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                ) : null}
                
                {/* Заглушка для отсутствующего изображения */}
                <div className={`${unit.imageurl ? 'hidden' : ''} h-48 bg-gray-100 border-b border-gray-200 flex items-center justify-center`}>
                  <div className="text-center text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-sm">Изображение недоступно</p>
                  </div>
                </div>

                {/* Информация об узле */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-2 overflow-hidden text-ellipsis group-hover:text-red-600 transition-colors" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                        {unit.name}
                      </h4>
                      {unit.code && (
                        <p className="text-sm text-gray-500 mb-2 font-mono bg-gray-50 px-2 py-1 rounded">
                          Код: {unit.code}
                        </p>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Нажмите для просмотра деталей
                      </div>
                    </div>
                    <div className="ml-3 text-gray-400 group-hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
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