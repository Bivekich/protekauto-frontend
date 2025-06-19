import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenuBottomSection from '@/components/MobileMenuBottomSection';
import { DOC_FIND_OEM, FIND_LAXIMO_VEHICLES_BY_PART_NUMBER } from '@/lib/graphql';
import { LaximoDocFindOEMResult, LaximoVehiclesByPartResult, LaximoVehicleSearchResult } from '@/types/laximo';

type SearchMode = 'parts' | 'vehicles';

const SearchPage = () => {
  const router = useRouter();
  const { q, mode } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchMode, setSearchMode] = useState<SearchMode>('parts');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (q && typeof q === 'string') {
      setSearchQuery(q.trim().toUpperCase());
    }
    if (mode && typeof mode === 'string' && (mode === 'parts' || mode === 'vehicles')) {
      setSearchMode(mode);
    }
  }, [q, mode]);

  // Запрос для поиска деталей по артикулу
  const { data: partsData, loading: partsLoading, error: partsError } = useQuery(DOC_FIND_OEM, {
    variables: { oemNumber: searchQuery },
    skip: !searchQuery || searchMode !== 'parts',
    errorPolicy: 'all'
  });

  // Запрос для поиска автомобилей по артикулу
  const { data: vehiclesData, loading: vehiclesLoading, error: vehiclesError } = useQuery(FIND_LAXIMO_VEHICLES_BY_PART_NUMBER, {
    variables: { partNumber: searchQuery },
    skip: !searchQuery || searchMode !== 'vehicles',
    errorPolicy: 'all'
  });

  const handleSearchModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&mode=${mode}`, undefined, { shallow: true });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim().toUpperCase())}&mode=${searchMode}`);
  };

  const handlePartDetail = (detail: any) => {
    router.push(`/search-result?article=${encodeURIComponent(detail.formattedoem)}&brand=${encodeURIComponent(detail.manufacturer)}`);
  };

  const handleVehicleSelect = (vehicle: LaximoVehicleSearchResult) => {
    // Переходим сразу на страницу поиска результатов с артикулом
    console.log('🔍 Переход на поиск результатов с артикулом:', { partNumber: searchQuery, vehicle: vehicle.name });
    
    // Определяем бренд для поиска
    const vehicleBrand = vehicle.brand || vehicle.name?.split(' ')[0] || 'UNKNOWN';
    
    // Переходим на search-result с артикулом
    const url = `/search-result?article=${encodeURIComponent(searchQuery)}&brand=${encodeURIComponent(vehicleBrand)}`;
    router.push(url);
  };

  const handleShowAllVehicles = (catalogCode?: string) => {
    const url = catalogCode 
      ? `/vehicles-by-part?partNumber=${encodeURIComponent(searchQuery)}&catalogCode=${catalogCode}`
      : `/vehicles-by-part?partNumber=${encodeURIComponent(searchQuery)}`;
    router.push(url);
  };

  const isLoading = (searchMode === 'parts' && partsLoading) || (searchMode === 'vehicles' && vehiclesLoading);
  const hasError = (searchMode === 'parts' && partsError) || (searchMode === 'vehicles' && vehiclesError);

  const partsResult: LaximoDocFindOEMResult | null = partsData?.laximoDocFindOEM || null;
  const vehiclesResult: LaximoVehiclesByPartResult | null = vehiclesData?.laximoFindVehiclesByPartNumber || null;

  const hasPartsResults = partsResult && partsResult.details && partsResult.details.length > 0;
  const hasVehiclesResults = vehiclesResult && vehiclesResult.totalVehicles > 0;

  return (
    <>
      <Head>
        <title>Поиск по артикулу {searchQuery} - Protek</title>
        <meta name="description" content={`Результаты поиска по артикулу ${searchQuery}`} />
      </Head>
      <Header />
      
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Навигация */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <div className="text-sm text-gray-500">
                <a href="/" className="text-gray-500 hover:text-gray-700">Главная</a>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Поиск по артикулу</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Переключатель режима поиска */}
          {searchQuery && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleSearchModeChange('parts')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    searchMode === 'parts'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🔧 Найти запчасти
                </button>
                <button
                  onClick={() => handleSearchModeChange('vehicles')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    searchMode === 'vehicles'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🚗 Найти автомобили
                </button>
              </div>
            </div>
          )}

                    {/* Обработка ошибок */}
          {searchQuery && hasError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-red-800">Ошибка поиска</h3>
                  <p className="text-red-700 mt-1">Произошла ошибка при поиске. Попробуйте еще раз.</p>
                </div>
              </div>
            </div>
          )}

          {/* Результаты поиска */}
          {searchQuery && !isLoading && !hasError && (
            <div className="space-y-6">
              {/* Результаты поиска запчастей */}
              {searchMode === 'parts' && (
                <>
                  {!hasPartsResults && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                      <svg className="w-16 h-16 text-yellow-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-yellow-800 mb-2">Детали не найдены</h3>
                      <p className="text-yellow-700 mb-4">
                        По артикулу <span className="font-mono font-semibold">{searchQuery}</span> детали не найдены.
                      </p>
                      <p className="text-sm text-yellow-600">
                        Попробуйте изменить запрос или проверьте правильность написания артикула.
                      </p>
                    </div>
                  )}

                  {hasPartsResults && (
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Поиск деталей по артикулу: {searchQuery}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Выберите нужную деталь
                        </p>
                      </div>
                      
                      <div className="divide-y divide-gray-200">
                        {partsResult!.details.map((detail, index) => (
                          <div key={detail.detailid || index}>
                            <button
                              onClick={() => handlePartDetail(detail)}
                              className="w-full text-left p-4 hover:bg-gray-50 transition-colors block"
                            >
                              <div className="text-blue-600 hover:text-blue-800 font-medium">
                                {detail.manufacturer}: {detail.formattedoem || detail.oem} {detail.name}
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Результаты поиска автомобилей */}
              {searchMode === 'vehicles' && (
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="px-6 py-4 border-b bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Поиск автомобилей по артикулу: {searchQuery}
                      </h2>
                      {hasVehiclesResults && (
                        <span className="text-sm text-gray-600">
                          Найдено {vehiclesResult!.totalVehicles} автомобилей в {vehiclesResult!.catalogs.length} каталогах
                        </span>
                      )}
                    </div>
                  </div>

                  {hasVehiclesResults ? (
                    <>
                      {/* Таблица брендов */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Бренд
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Артикул
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Наименование
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Рынок
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {vehiclesResult!.catalogs.map((catalog) => (
                              <tr 
                                key={catalog.catalogCode}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() => {
                                  // Переходим сразу на search-result с артикулом и брендом
                                  router.push(`/search-result?article=${encodeURIComponent(searchQuery)}&brand=${encodeURIComponent(catalog.brand)}`);
                                }}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="text-sm font-medium text-gray-900">
                                      {catalog.brand}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{searchQuery}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    ГАЕЧНЫЙ КЛЮЧ
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                  {catalog.catalogCode}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Кнопка показать все */}
                      <div className="px-6 py-4 border-t bg-gray-50">
                        <button
                          onClick={() => handleShowAllVehicles()}
                          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Показать все {vehiclesResult!.totalVehicles} автомобилей
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="text-yellow-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Автомобили не найдены</h3>
                      <p className="text-gray-600">
                        Автомобили с артикулом {searchQuery} не найдены в каталогах
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <MobileMenuBottomSection />
      <Footer />
    </>
  );
};

export default SearchPage; 