import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_LAXIMO_UNIT_INFO, GET_LAXIMO_UNIT_DETAILS, GET_LAXIMO_UNIT_IMAGE_MAP } from '@/lib/graphql';
import { LaximoUnitInfo, LaximoUnitDetail, LaximoUnitImageMap } from '@/types/laximo';

interface UnitDetailsSectionProps {
  catalogCode: string;
  vehicleId: string;
  ssd?: string;
  unitId: string;
  unitName: string;
  onBack: () => void;
}

const UnitDetailsSection: React.FC<UnitDetailsSectionProps> = ({
  catalogCode,
  vehicleId,
  ssd,
  unitId,
  unitName,
  onBack
}) => {
  const router = useRouter();
  const [selectedImageSize, setSelectedImageSize] = useState<string>('250');

  // Получаем информацию об узле
  const { data: unitInfoData, loading: unitInfoLoading, error: unitInfoError } = useQuery<{ laximoUnitInfo: LaximoUnitInfo }>(
    GET_LAXIMO_UNIT_INFO,
    {
      variables: {
        catalogCode,
        vehicleId,
        unitId,
        ssd: ssd || ''
      },
      skip: !catalogCode || !vehicleId || !unitId,
      errorPolicy: 'all'
    }
  );

  // Получаем детали узла
  const { data: unitDetailsData, loading: unitDetailsLoading, error: unitDetailsError } = useQuery<{ laximoUnitDetails: LaximoUnitDetail[] }>(
    GET_LAXIMO_UNIT_DETAILS,
    {
      variables: {
        catalogCode,
        vehicleId,
        unitId,
        ssd: ssd || ''
      },
      skip: !catalogCode || !vehicleId || !unitId,
      errorPolicy: 'all'
    }
  );

  // Получаем карту изображений узла
  const { data: unitImageMapData, loading: unitImageMapLoading, error: unitImageMapError } = useQuery<{ laximoUnitImageMap: LaximoUnitImageMap }>(
    GET_LAXIMO_UNIT_IMAGE_MAP,
    {
      variables: {
        catalogCode,
        vehicleId,
        unitId,
        ssd: ssd || ''
      },
      skip: !catalogCode || !vehicleId || !unitId,
      errorPolicy: 'all'
    }
  );

  const unitInfo = unitInfoData?.laximoUnitInfo || {
    unitid: unitId,
    name: unitName,
    code: `UNIT_${unitId}`,
    description: `Описание узла ${unitName}`,
    imageurl: `http://img.laximo.net/${catalogCode}/%size%/unit_${unitId}.gif`,
    largeimageurl: `http://img.laximo.net/${catalogCode}/%size%/unit_${unitId}_large.gif`
  };

  const unitDetails = unitDetailsData?.laximoUnitDetails || [];

  const handleDetailClick = (detail: LaximoUnitDetail) => {
    console.log('🔍 Выбрана деталь:', detail.name, 'OEM:', detail.oem);
    // Можно добавить переход к карточке детали
    if (detail.oem) {
      router.push(`/vehicle-search/${catalogCode}/${vehicleId}/part/${detail.oem}`);
    }
  };

  const getImageUrl = (baseUrl: string, size: string) => {
    return baseUrl.replace('%size%', size);
  };

  const imageSizes = [
    { value: '150', label: 'Маленькое' },
    { value: '200', label: 'Среднее' },
    { value: '250', label: 'Большое' },
    { value: 'source', label: 'Оригинал' }
  ];

  // Показываем загрузку если загружаются основные данные
  if (unitInfoLoading || unitDetailsLoading) {
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
            Назад к узлам
          </button>
          <h3 className="text-lg font-medium text-gray-900">
            {unitName}
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загружаем детали узла...</p>
        </div>
      </div>
    );
  }

  // Показываем ошибку если есть критические ошибки
  if (unitInfoError && unitDetailsError) {
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
            Назад к узлам
          </button>
          <h3 className="text-lg font-medium text-gray-900">
            {unitName}
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки деталей узла</h3>
          <p className="text-gray-600 mb-4">Не удалось загрузить информацию об узле</p>
          <p className="text-sm text-gray-500">
            {unitInfoError?.message || unitDetailsError?.message}
          </p>
        </div>
      </div>
    );
  }

  // Показываем заглушку если детали не загружены (временное решение)
  if (!unitDetailsLoading && unitDetails.length === 0) {
    console.log('⚠️ Детали узла не загружены - показываем заглушку')
  }

  return (
    <div>
      {/* Навигация */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к узлам
        </button>
        <h3 className="text-lg font-medium text-gray-900">
          {unitInfo.name}
        </h3>
      </div>

      {/* Информация об узле */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Изображение узла */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Размер изображения:
              </label>
              <select
                value={selectedImageSize}
                onChange={(e) => setSelectedImageSize(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              >
                {imageSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
            
            {unitInfo.imageurl && (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <img
                  src={getImageUrl(unitInfo.imageurl, selectedImageSize)}
                  alt={unitInfo.name}
                  className="max-w-full h-auto mx-auto rounded"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'block';
                  }}
                />
                <div className="hidden bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">Изображение недоступно</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Схема узла с номерами деталей
                </p>
              </div>
            )}
          </div>

          {/* Информация об узле */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Информация об узле
            </h4>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">ID узла:</dt>
                <dd className="text-sm text-gray-900">{unitInfo.unitid}</dd>
              </div>
              {unitInfo.code && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Код:</dt>
                  <dd className="text-sm text-gray-900">{unitInfo.code}</dd>
                </div>
              )}
              {unitInfo.description && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Описание:</dt>
                  <dd className="text-sm text-gray-900">{unitInfo.description}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Каталог:</dt>
                <dd className="text-sm text-gray-900">{catalogCode}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Автомобиль:</dt>
                <dd className="text-sm text-gray-900">ID: {vehicleId}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Список деталей */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Детали узла ({unitDetails.length})
          </h4>
          {unitDetailsLoading && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
              Загружаем детали...
            </div>
          )}
        </div>

        {unitDetailsError && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Ошибка загрузки деталей: {unitDetailsError.message}
            </p>
          </div>
        )}

        {unitDetails.length === 0 && !unitDetailsLoading ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-500">Детали узла не найдены</p>
          </div>
        ) : (
          <div className="space-y-4">
            {unitDetails.map((detail) => (
              <div
                key={detail.detailid}
                className="border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleDetailClick(detail)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {detail.codeonimage && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full">
                          {detail.codeonimage}
                        </span>
                      )}
                      <h5 className="font-medium text-gray-900">{detail.name}</h5>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      {detail.oem && (
                        <div>
                          <span className="text-gray-500">OEM:</span>
                          <span className="ml-1 font-medium text-gray-900">{detail.oem}</span>
                        </div>
                      )}
                      {detail.brand && (
                        <div>
                          <span className="text-gray-500">Бренд:</span>
                          <span className="ml-1 font-medium text-gray-900">{detail.brand}</span>
                        </div>
                      )}
                      {detail.price && (
                        <div>
                          <span className="text-gray-500">Цена:</span>
                          <span className="ml-1 font-medium text-green-600">{detail.price} ₽</span>
                        </div>
                      )}
                      {detail.availability && (
                        <div>
                          <span className="text-gray-500">Наличие:</span>
                          <span className={`ml-1 font-medium ${detail.availability === 'В наличии' ? 'text-green-600' : 'text-orange-600'}`}>
                            {detail.availability}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {detail.note && (
                      <p className="text-sm text-gray-600 mt-2">{detail.note}</p>
                    )}
                  </div>
                  
                  <div className="ml-4 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Информационное сообщение */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-yellow-900">
              Временные заглушки API
            </h4>
            <p className="text-sm text-yellow-700 mt-1">
              Компонент использует GraphQL запросы к API Laximo, но методы getUnitDetails и getUnitImageMap временно заменены заглушками. 
              Информация об узле загружается из реального API ListUnits. 
              Для полной функциональности необходимо определить правильные команды Laximo API для получения деталей узлов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetailsSection; 