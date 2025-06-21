import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehiclePartsSearchSection from '@/components/VehiclePartsSearchSection';
import { GET_LAXIMO_VEHICLE_INFO, GET_LAXIMO_CATALOG_INFO } from '@/lib/graphql';
import { LaximoCatalogInfo } from '@/types/laximo';

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

const VehicleDetailsPage = () => {
  const router = useRouter();
  const { brand, vehicleId, oemNumber } = router.query;
  
  // Устанавливаем тип поиска по умолчанию
  const [searchType, setSearchType] = useState<'quickgroups' | 'categories' | 'fulltext'>('quickgroups');

  // Получаем информацию о каталоге
  const { data: catalogData } = useQuery<{ laximoCatalogInfo: LaximoCatalogInfo }>(
    GET_LAXIMO_CATALOG_INFO,
    {
      variables: { catalogCode: brand },
      skip: !brand
    }
  );

  // Получаем информацию о выбранном автомобиле
  const ssdFromQuery = Array.isArray(router.query.ssd) ? router.query.ssd[0] : router.query.ssd;
  const useStorage = router.query.use_storage === '1';
  const ssdLengthFromUrl = router.query.ssd_length ? parseInt(router.query.ssd_length as string) : 0;
  
  // Если указано use_storage, пытаемся получить SSD из localStorage
  let finalSsd = '';
  if (useStorage && typeof window !== 'undefined') {
    const vehicleKey = `vehicle_ssd_${brand}_${vehicleId}`;
    const storedSsd = localStorage.getItem(vehicleKey);
    if (storedSsd) {
      finalSsd = storedSsd;
      console.log('🔧 SSD получен из localStorage, длина:', storedSsd.length);
      // НЕ ОЧИЩАЕМ SSD сразу, оставляем на случай перезагрузки страницы
      // localStorage.removeItem(vehicleKey);
    } else {
      console.log('⚠️ SSD не найден в localStorage, ключ:', vehicleKey);
      console.log('🔍 Все ключи localStorage:', Object.keys(localStorage));
    }
  } else if (ssdFromQuery && ssdFromQuery.trim() !== '') {
    finalSsd = ssdFromQuery;
    console.log('🔧 SSD получен из URL');
  }
  
  console.log('🔍 Vehicle page params:', { 
    brand, 
    vehicleId, 
    useStorage,
    ssdLengthFromUrl,
    ssdFromQuery: ssdFromQuery ? `${ssdFromQuery.substring(0, 50)}...` : 'отсутствует',
    finalSsd: finalSsd ? `${finalSsd.substring(0, 50)}...` : 'отсутствует',
    ssdLength: finalSsd.length
  });
  
  const { data: vehicleData, loading: vehicleLoading, error: vehicleError } = useQuery<{ laximoVehicleInfo: LaximoVehicleInfo }>(
    GET_LAXIMO_VEHICLE_INFO,
    {
      variables: { 
        catalogCode: brand,
        vehicleId: vehicleId,
        ...(finalSsd && { ssd: finalSsd }),
        localized: true
      },
      skip: !brand || !vehicleId,
      errorPolicy: 'all'
    }
  );
  
  // Логируем ошибки
  if (vehicleError) {
    console.error('Vehicle GraphQL error:', vehicleError);
  }

  if (vehicleLoading) {
    return (
      <>
        <Head>
          <title>Загрузка автомобиля...</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Загружаем информацию об автомобиле...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Если информация о каталоге недоступна, показываем ошибку
  if (!catalogData?.laximoCatalogInfo) {
    return (
      <>
        <Head>
          <title>Каталог не найден</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Каталог не найден</h1>
            <p className="text-gray-600 mb-8">Информация о каталоге недоступна</p>
            <button
              onClick={() => router.back()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Назад к поиску
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Если информация об автомобиле недоступна, создаем заглушку
  const vehicleInfo = vehicleData?.laximoVehicleInfo || {
    vehicleid: vehicleId as string,
    name: `Автомобиль ${catalogData.laximoCatalogInfo.name}`,
    ssd: finalSsd,
    brand: catalogData.laximoCatalogInfo.brand,
    catalog: catalogData.laximoCatalogInfo.code,
    attributes: []
  };

  // Если нет данных автомобиля и есть ошибка, показываем предупреждение
  const hasError = vehicleError && !vehicleData?.laximoVehicleInfo;
  const catalogInfo = catalogData.laximoCatalogInfo;

  return (
    <>
      <Head>
        <title>{vehicleInfo.name} - Поиск запчастей</title>
        <meta name="description" content={`Поиск запчастей для ${vehicleInfo.name} в каталоге ${catalogInfo.name}`} />
      </Head>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Навигация */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="text-gray-500 hover:text-gray-700 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Назад</span>
                </button>
                <div className="text-sm text-gray-500">
                  <span>Главная</span>
                  <span className="mx-2">/</span>
                  <span>Каталог</span>
                  <span className="mx-2">/</span>
                  <span>{catalogInfo.name}</span>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 font-medium">{vehicleInfo.name}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Информация об автомобиле */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4 mb-6">
              {catalogInfo.icon && (
                <img 
                  src={`/images/brands/${catalogInfo.icon}`} 
                  alt={catalogInfo.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{vehicleInfo.name}</h1>
                <p className="text-lg text-gray-600">{catalogInfo.name}</p>
              </div>
            </div>

            {/* Предупреждение об ошибке */}
            {hasError && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Предупреждение
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Не удалось загрузить полную информацию об автомобиле. Отображается базовая информация.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Отладочная информация */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                🔧 Отладочная информация
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Использовать localStorage:</span>
                  <span className="ml-2 font-medium">{useStorage ? 'Да' : 'Нет'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Длина SSD из URL:</span>
                  <span className="ml-2 font-medium">{ssdLengthFromUrl || 'не указана'}</span>
                </div>
                <div>
                  <span className="text-gray-500">SSD получен:</span>
                  <span className="ml-2 font-medium">{finalSsd ? 'Да' : 'Нет'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Длина SSD:</span>
                  <span className="ml-2 font-medium">{finalSsd.length}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-500">SSD (первые 100 символов):</span>
                  <span className="ml-2 font-mono text-xs break-all">
                    {finalSsd ? finalSsd.substring(0, 100) + '...' : 'отсутствует'}
                  </span>
                </div>
              </div>
            </div>

            {/* Характеристики автомобиля */}
            {vehicleInfo.attributes && vehicleInfo.attributes.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicleInfo.attributes.map((attr, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <dt className="text-sm font-medium text-gray-500">{attr.name}</dt>
                    <dd className="text-sm text-gray-900 mt-1">{attr.value}</dd>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Способы поиска запчастей */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Поиск запчастей</h2>
            <p className="text-gray-600">
              Выберите способ поиска запчастей для вашего автомобиля
            </p>
          </div>

          <VehiclePartsSearchSection
            catalogInfo={catalogInfo}
            vehicleInfo={vehicleInfo}
            searchType={searchType}
            onSearchTypeChange={setSearchType}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default VehicleDetailsPage; 