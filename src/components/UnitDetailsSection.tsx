import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_LAXIMO_UNIT_INFO, GET_LAXIMO_UNIT_DETAILS, GET_LAXIMO_UNIT_IMAGE_MAP } from '@/lib/graphql';
import { LaximoUnitInfo, LaximoUnitDetail, LaximoUnitImageMap, LaximoImageCoordinate } from '@/types/laximo';
import BrandSelectionModal from './BrandSelectionModal';

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
  const [imageScale, setImageScale] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const [imageLoadTimeout, setImageLoadTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<LaximoUnitDetail | null>(null);

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

  // Используем данные из API или показываем сообщение о загрузке
  const unitInfo = unitInfoData?.laximoUnitInfo;
  
  console.log('📊 Данные узла из GraphQL:', { unitInfoData, unitInfo });

  // Эффект для установки таймаута загрузки изображения
  useEffect(() => {
    if (unitInfo?.imageurl) {
      console.log('🔄 Начинаем загрузку изображения:', getImageUrl(unitInfo.imageurl, selectedImageSize));
      
      // Устанавливаем таймаут на 10 секунд
      const timeout = setTimeout(() => {
        console.warn('⚠️ Таймаут загрузки изображения (10 сек)');
        const placeholder = document.getElementById('image-placeholder');
        if (placeholder) {
          placeholder.style.display = 'block';
        }
      }, 10000);
      
      setImageLoadTimeout(timeout);
      
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [unitInfo?.imageurl, selectedImageSize]);

  const unitDetails = unitDetailsData?.laximoUnitDetails || [];
  const unitImageMap = unitImageMapData?.laximoUnitImageMap;

  const handleDetailClick = (detail: LaximoUnitDetail) => {
    console.log('🔍 Выбрана деталь для выбора бренда:', detail.name, 'OEM:', detail.oem);
    if (detail.oem) {
      setSelectedDetail(detail);
      setIsBrandModalOpen(true);
    }
  };

  const handleCloseBrandModal = () => {
    setIsBrandModalOpen(false);
    setSelectedDetail(null);
  };

  const handleCoordinateClick = (coord: LaximoImageCoordinate) => {
    console.log('🖱️ Клик по интерактивной области:', coord.codeonimage);
    
    // Сначала пытаемся найти деталь в списке
    const detail = unitDetails.find(d => 
      d.detailid === coord.detailid || 
      d.codeonimage === coord.codeonimage ||
      d.detailid === coord.codeonimage
    );
    
    if (detail && detail.oem) {
      console.log('✅ Найдена деталь для выбора бренда:', detail.name, 'OEM:', detail.oem);
      // Показываем модал выбора бренда
      setSelectedDetail(detail);
      setIsBrandModalOpen(true);
    } else {
      // Если деталь не найдена в списке, переходим к общему поиску по коду на изображении
      console.log('⚠️ Деталь не найдена в списке, переходим к поиску по коду:', coord.codeonimage);
      router.push(`/search-result?q=${coord.codeonimage}&catalog=${catalogCode}&vehicle=${vehicleId}`);
    }
  };

  const getImageUrl = (baseUrl: string, size: string) => {
    // Декодируем HTML-сущности и заменяем размер
    const decodedUrl = baseUrl
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace('%size%', size);
    
    console.log('🔗 Преобразование URL:', {
      original: baseUrl,
      decoded: decodedUrl,
      size: size
    });
    
    return decodedUrl;
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

  // Если данные об узле не загружены, показываем сообщение
  if (!unitInfo) {
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
          <div className="text-gray-400 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500">Информация об узле не найдена</p>
          <p className="text-sm text-gray-400 mt-1">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
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
                onChange={(e) => {
                  setSelectedImageSize(e.target.value);
                  // Сбрасываем масштаб при изменении размера
                  setImageScale({ x: 1, y: 1 });
                }}
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
                {/* Отладочная информация для изображения */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-left">
                    <p><strong>URL изображения:</strong></p>
                    <p>Базовый: {unitInfo.imageurl}</p>
                    <p>Итоговый: {getImageUrl(unitInfo.imageurl, selectedImageSize)}</p>
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => {
                          if (unitInfo.imageurl) {
                            window.open(getImageUrl(unitInfo.imageurl, selectedImageSize), '_blank');
                          }
                        }}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                      >
                        Открыть в новой вкладке
                      </button>
                      <button
                        onClick={() => {
                          const img = document.getElementById('unit-image') as HTMLImageElement;
                          if (img) {
                            console.log('🔄 Принудительная перезагрузка изображения');
                            img.src = img.src + '?t=' + Date.now();
                          }
                        }}
                        className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                      >
                        Перезагрузить
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="relative inline-block">
                  <img
                    id="unit-image"
                    src={getImageUrl(unitInfo.imageurl, selectedImageSize)}
                    alt={unitInfo.name}
                    className="max-w-full h-auto mx-auto rounded"

                    onLoad={(e) => {
                      // Очищаем таймаут если изображение загрузилось
                      if (imageLoadTimeout) {
                        clearTimeout(imageLoadTimeout);
                        setImageLoadTimeout(null);
                      }
                      
                      // Обновляем масштаб интерактивных областей при загрузке изображения
                      const img = e.currentTarget;
                      const naturalWidth = img.naturalWidth;
                      const naturalHeight = img.naturalHeight;
                      const displayWidth = img.offsetWidth;
                      const displayHeight = img.offsetHeight;
                      
                      const scaleX = displayWidth / naturalWidth;
                      const scaleY = displayHeight / naturalHeight;
                      
                      setImageScale({ x: scaleX, y: scaleY });
                      
                      console.log('✅ Изображение успешно загружено:', {
                        src: img.src,
                        natural: { width: naturalWidth, height: naturalHeight },
                        display: { width: displayWidth, height: displayHeight },
                        scale: { x: scaleX, y: scaleY }
                      });
                      
                      // Скрываем placeholder если он был показан
                      const placeholder = document.getElementById('image-placeholder');
                      if (placeholder) {
                        placeholder.style.display = 'none';
                      }
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      console.error('❌ Ошибка загрузки изображения:', {
                        src: target.src,
                        error: e,
                        naturalWidth: target.naturalWidth,
                        naturalHeight: target.naturalHeight
                      });
                      
                      target.style.display = 'none';
                      const placeholder = document.getElementById('image-placeholder');
                      if (placeholder) {
                        placeholder.style.display = 'block';
                      }
                    }}
                  />
                  
                  {/* Интерактивные области изображения */}
                  {unitImageMap?.coordinates && unitImageMap.coordinates.map((coord, index) => {
                    const detail = unitDetails.find(d => d.detailid === coord.detailid || d.codeonimage === coord.codeonimage);
                    
                    // Применяем масштаб к координатам
                    const scaledX = coord.x * imageScale.x;
                    const scaledY = coord.y * imageScale.y;
                    const scaledWidth = coord.width * imageScale.x;
                    const scaledHeight = coord.height * imageScale.y;
                    
                    // Создаем уникальный ключ для каждой области
                    const uniqueKey = `coord-${unitId}-${index}-${coord.x}-${coord.y}`;
                    
                    return (
                      <div
                        key={uniqueKey}
                        className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20 hover:bg-opacity-40 cursor-pointer transition-all duration-200"
                        style={{
                          left: `${scaledX}px`,
                          top: `${scaledY}px`,
                          width: `${scaledWidth}px`,
                          height: `${scaledHeight}px`,
                          borderRadius: coord.shape === 'circle' ? '50%' : '0'
                        }}
                        onClick={() => handleCoordinateClick(coord)}
                        title={detail ? `${coord.codeonimage}: ${detail.name}` : `Деталь ${coord.codeonimage}`}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                          {coord.codeonimage}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="hidden bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8" id="image-placeholder">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">Изображение недоступно</p>
                  {process.env.NODE_ENV === 'development' && (
                    <p className="text-xs text-gray-400 mt-2">
                      URL: {getImageUrl(unitInfo.imageurl, selectedImageSize)}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Схема узла с номерами деталей
                  {unitImageMap?.coordinates && unitImageMap.coordinates.length > 0 && (
                    <span className="text-green-600 ml-2">
                      • {unitImageMap.coordinates.length} интерактивных областей
                    </span>
                  )}
                  {(!unitImageMap?.coordinates || unitImageMap.coordinates.length === 0) && (
                    <span className="text-yellow-600 ml-2">
                      • Интерактивные области не найдены
                    </span>
                  )}
                </p>
                
                {/* Отладочная информация */}
                {process.env.NODE_ENV === 'development' && unitImageMap && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                    <p><strong>Отладка:</strong></p>
                    <p>Unit ID: {unitImageMap.unitid}</p>
                    <p>Координат: {unitImageMap.coordinates?.length || 0}</p>
                    <p>Масштаб: x={imageScale.x.toFixed(3)}, y={imageScale.y.toFixed(3)}</p>
                    {unitImageMap.coordinates?.map((coord, i) => (
                      <p key={`debug-coord-${unitId}-${i}`}>
                        Область {i+1}: код={coord.codeonimage}, x={coord.x}, y={coord.y}, w={coord.width}, h={coord.height}
                      </p>
                    ))}
                  </div>
                )}
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
            
            {/* Дополнительные атрибуты узла */}
            {unitInfo.attributes && unitInfo.attributes.length > 0 && (
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Дополнительная информация</h5>
                <dl className="space-y-2">
                  {unitInfo.attributes.map((attr, attrIndex) => (
                    <div key={`unit-attr-${unitId}-${attrIndex}-${attr.key}`} className="flex">
                      <dt className="text-sm text-gray-500 w-1/3">{attr.name || attr.key}:</dt>
                      <dd className="text-sm text-gray-900 w-2/3">{attr.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
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
            
            {/* Отладочная информация для деталей */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-left">
                <p><strong>Отладка деталей:</strong></p>
                <p>Ошибка загрузки: {unitDetailsError?.message || 'нет'}</p>
                <p>Загружается: {unitDetailsLoading ? 'да' : 'нет'}</p>
                <p>Количество деталей: {unitDetails.length}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {unitDetails.map((detail, index) => (
              <div
                key={`detail-${unitId}-${index}-${detail.detailid}`}
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
                    
                    {/* Дополнительные атрибуты детали */}
                    {detail.attributes && detail.attributes.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h6 className="text-xs font-medium text-gray-700 mb-2">Дополнительные характеристики:</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          {detail.attributes.map((attr, attrIndex) => (
                            <div key={`attr-${unitId}-${index}-${attrIndex}-${attr.key}`} className="flex">
                              <span className="text-gray-500 w-1/2">{attr.name || attr.key}:</span>
                              <span className="text-gray-700 w-1/2">{attr.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
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
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-green-900">
              Полная интеграция с Laximo API
            </h4>
            <p className="text-sm text-green-700 mt-1">
              Компонент использует официальные API Laximo: GetUnitInfo для информации об узле, 
              ListDetailByUnit для получения деталей и ListImageMapByUnit для интерактивной карты изображений. 
              Нажмите на номера деталей на схеме или в списке для подробной информации.
            </p>
          </div>
        </div>
      </div>

      {/* Модал выбора бренда */}
      {selectedDetail && (
        <BrandSelectionModal
          isOpen={isBrandModalOpen}
          onClose={handleCloseBrandModal}
          articleNumber={selectedDetail.oem || ''}
          detailName={selectedDetail.name}
        />
      )}
    </div>
  );
};

export default UnitDetailsSection; 