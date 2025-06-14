import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FIND_LAXIMO_VEHICLES_BY_PART_NUMBER } from '@/lib/graphql';
import { LaximoVehiclesByPartResult, LaximoVehicleSearchResult } from '@/types/laximo';

const VehiclesByPartPage = () => {
  const router = useRouter();
  const { partNumber, catalogCode } = router.query;
  const [selectedCatalog, setSelectedCatalog] = useState<string>('all');

  // Отладочная информация
  console.log('🔍 VehiclesByPartPage - URL параметры:', { partNumber, catalogCode });
  console.log('🔍 VehiclesByPartPage - Тип partNumber:', typeof partNumber, 'Значение:', partNumber);

  // Очищаем артикул от лишних символов
  const cleanPartNumber = partNumber ? (partNumber as string).trim() : '';
  console.log('🔍 VehiclesByPartPage - Очищенный артикул:', cleanPartNumber);

  // Запрос для поиска автомобилей по артикулу
  const { data, loading, error } = useQuery<{ laximoFindVehiclesByPartNumber: LaximoVehiclesByPartResult }>(
    FIND_LAXIMO_VEHICLES_BY_PART_NUMBER,
    {
      variables: { partNumber: cleanPartNumber },
      skip: !cleanPartNumber,
      errorPolicy: 'all'
    }
  );

  const handleVehicleSelect = (vehicle: LaximoVehicleSearchResult) => {
    // Переходим на страницу автомобиля
    const catalogCode = (vehicle as any).catalog || vehicle.brand.toLowerCase();
    console.log('🚗 Переход на страницу автомобиля:', { catalogCode, vehicleId: vehicle.vehicleid, ssd: vehicle.ssd });
    
    // Передаем артикул для автоматического поиска
    const url = `/vehicle-search/${catalogCode}/${vehicle.vehicleid}?ssd=${vehicle.ssd || ''}${cleanPartNumber ? `&oemNumber=${encodeURIComponent(cleanPartNumber)}` : ''}`;
    router.push(url);
  };

  const handleBackToSearch = () => {
    router.back();
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Поиск автомобилей по артикулу {cleanPartNumber} - Protek</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Поиск автомобилей...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !data?.laximoFindVehiclesByPartNumber) {
    return (
      <>
        <Head>
          <title>Ошибка поиска - Protek</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ошибка поиска</h1>
            <p className="text-gray-600 mb-8">Не удалось найти автомобили по артикулу {cleanPartNumber}</p>
            <button
              onClick={handleBackToSearch}
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

  const result = data.laximoFindVehiclesByPartNumber;
  
  // Фильтруем каталоги по выбранному
  const filteredCatalogs = selectedCatalog === 'all' 
    ? result.catalogs 
    : result.catalogs.filter(catalog => catalog.catalogCode === selectedCatalog);

  return (
    <>
      <Head>
        <title>Автомобили по артикулу {cleanPartNumber} - Protek</title>
        <meta name="description" content={`Найдено ${result.totalVehicles} автомобилей по артикулу ${cleanPartNumber} в ${result.catalogs.length} каталогах`} />
      </Head>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Навигация */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToSearch}
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
                  <span>Поиск</span>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 font-medium">Автомобили по артикулу {cleanPartNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Заголовок и статистика */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Автомобили по артикулу {cleanPartNumber}
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Найдено {result.totalVehicles} автомобилей в {result.catalogs.length} каталогах
                </p>
              </div>
              
              {/* Фильтр по каталогам */}
              {result.catalogs.length > 1 && (
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Каталог:</label>
                  <select
                    value={selectedCatalog}
                    onChange={(e) => setSelectedCatalog(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">Все каталоги ({result.totalVehicles})</option>
                    {result.catalogs.map((catalog) => (
                      <option key={catalog.catalogCode} value={catalog.catalogCode}>
                        {catalog.brand} ({catalog.vehicleCount})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Список автомобилей */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {filteredCatalogs.map((catalog) => (
              <div key={catalog.catalogCode} className="bg-white rounded-lg shadow-sm border">
                {/* Заголовок каталога */}
                <div className="px-6 py-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {catalog.brand}
                    </h2>
                    <span className="text-sm text-gray-600">
                      {catalog.vehicleCount} автомобилей
                    </span>
                  </div>
                </div>

                {/* Список автомобилей в каталоге */}
                <div className="divide-y divide-gray-200">
                  {catalog.vehicles.map((vehicle, index) => (
                    <div
                      key={`${vehicle.vehicleid}-${index}`}
                      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleVehicleSelect(vehicle)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {vehicle.name || `${vehicle.brand} ${vehicle.model || 'Vehicle'}`}
                            </h3>
                            {vehicle.year && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {vehicle.year}
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            {vehicle.modification && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Модификация:</span> {vehicle.modification}
                              </p>
                            )}
                            {vehicle.engine && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Двигатель:</span> {vehicle.engine}
                              </p>
                            )}
                            {vehicle.bodytype && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Кузов:</span> {vehicle.bodytype}
                              </p>
                            )}
                            {(vehicle as any).transmission && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">КПП:</span> {(vehicle as any).transmission}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                              Выбрать автомобиль
                            </button>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Пустое состояние */}
          {filteredCatalogs.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V3a1 1 0 00-1-1H8a1 1 0 00-1 1v3.306" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Автомобили не найдены
              </h3>
              <p className="text-gray-600">
                В выбранном каталоге нет автомобилей с артикулом {partNumber}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default VehiclesByPartPage; 