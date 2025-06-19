import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FIND_LAXIMO_VEHICLE, FIND_LAXIMO_VEHICLE_BY_PLATE_GLOBAL } from '@/lib/graphql';
import { LaximoVehicleSearchResult } from '@/types/laximo';
import Link from 'next/link';

interface VehicleSearchResultsPageProps {}

const VehicleSearchResultsPage: React.FC<VehicleSearchResultsPageProps> = () => {
  const router = useRouter();
  const { query: routerQuery } = router;
  const [vehicles, setVehicles] = useState<LaximoVehicleSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'vin' | 'plate' | ''>('');

  // Query для поиска по VIN
  const [findVehicleByVin] = useLazyQuery(FIND_LAXIMO_VEHICLE, {
    onCompleted: (data) => {
      const results = data.laximoFindVehicle || [];
      setVehicles(results);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('❌ Ошибка поиска по VIN:', error);
      setVehicles([]);
      setIsLoading(false);
    }
  });

  // Query для поиска по госномеру
  const [findVehicleByPlate] = useLazyQuery(FIND_LAXIMO_VEHICLE_BY_PLATE_GLOBAL, {
    onCompleted: (data) => {
      const results = data.laximoFindVehicleByPlateGlobal || [];
      setVehicles(results);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('❌ Ошибка поиска по госномеру:', error);
      setVehicles([]);
      setIsLoading(false);
    }
  });

  // Проверяем тип поиска
  const isVinNumber = (query: string): boolean => {
    const cleanQuery = query.trim().toUpperCase();
    return /^[A-HJ-NPR-Z0-9]{17}$/.test(cleanQuery);
  };

  const isPlateNumber = (query: string): boolean => {
    const cleanQuery = query.trim().toUpperCase().replace(/\s+/g, '');
    const platePatterns = [
      /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/,
      /^[АВЕКМНОРСТУХ]{2}\d{3}[АВЕКМНОРСТУХ]\d{2,3}$/,
      /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/,
    ];
    return platePatterns.some(pattern => pattern.test(cleanQuery));
  };

  // Выполняем поиск при загрузке страницы
  useEffect(() => {
    if (routerQuery.q && typeof routerQuery.q === 'string') {
      const query = routerQuery.q.trim();
      setSearchQuery(query);
      setIsLoading(true);

      if (isVinNumber(query)) {
        setSearchType('vin');
        findVehicleByVin({
          variables: {
            catalogCode: '', // Глобальный поиск
            vin: query.toUpperCase()
          }
        });
      } else if (isPlateNumber(query)) {
        setSearchType('plate');
        findVehicleByPlate({
          variables: {
            plateNumber: query.toUpperCase().replace(/\s+/g, '')
          }
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [routerQuery.q, findVehicleByVin, findVehicleByPlate]);

  const handleVehicleSelect = (vehicle: LaximoVehicleSearchResult) => {
    console.log('🚗 handleVehicleSelect вызвана для автомобиля:', vehicle);
    
    // Переходим к выбору групп запчастей для найденного автомобиля
    const catalogCode = vehicle.catalog || vehicle.brand?.toLowerCase() || '';
    const vehicleId = vehicle.vehicleid || '';
    const ssd = vehicle.ssd || '';
    
    console.log('🔧 Выбранные параметры:', {
      catalogCode,
      vehicleId, 
      ssd: ssd ? `${ssd.substring(0, 50)}...` : 'отсутствует',
      ssdLength: ssd.length
    });
    
    // Если есть SSD, сохраняем его в localStorage для безопасной передачи
    if (ssd && ssd.trim() !== '') {
      const vehicleKey = `vehicle_ssd_${catalogCode}_${vehicleId}`;
      console.log('💾 Сохраняем SSD в localStorage, ключ:', vehicleKey);
      
      // Очищаем все предыдущие SSD для других автомобилей
      const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith('vehicle_ssd_'));
      keysToRemove.forEach(key => {
        if (key !== vehicleKey) {
          console.log('🗑️ Удаляем старый SSD ключ:', key);
          localStorage.removeItem(key);
        }
      });
      
      localStorage.setItem(vehicleKey, ssd);
      
      const url = `/vehicle-search/${catalogCode}/${vehicleId}?use_storage=1&ssd_length=${ssd.length}`;
      console.log('🔗 Переходим на URL с localStorage:', url);
      router.push(url);
    } else {
      const url = `/vehicle-search/${catalogCode}/${vehicleId}`;
      console.log('🔗 Переходим на URL без SSD:', url);
      router.push(url);
    }
  };

  return (
    <>
      <Header />
      
      <main className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-gray-500">
                    Главная
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <span className="ml-4 text-sm font-medium text-red-600">
                      {searchType === 'vin' ? 'Найденные автомобили' : 'Найденные автомобили'}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Search Results Header */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {searchType === 'vin' ? 'Поиск по VIN номеру' : 'Поиск по государственному номеру'}
              </h1>
              <p className="text-lg text-gray-600">
                Запрос: <span className="font-mono font-bold">{searchQuery}</span>
              </p>
              {!isLoading && vehicles.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Найдено {vehicles.length} автомобилей
                </p>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-lg text-gray-600">Поиск автомобилей...</span>
                </div>
              </div>
            )}

            {/* Results Table */}
            {!isLoading && vehicles.length > 0 && (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Бренд
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Название
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Модель  
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Год
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Двигатель
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          КПП
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Рынок
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Дата выпуска
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Период производства
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Дополнительно
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vehicles.map((vehicle, index) => {
                        console.log('🔍 Отображаем автомобиль в таблице:', {
                          index,
                          vehicleid: vehicle.vehicleid,
                          name: vehicle.name,
                          brand: vehicle.brand,
                          catalog: vehicle.catalog,
                          model: vehicle.model,
                          year: vehicle.year,
                          engine: vehicle.engine,
                          ssd: vehicle.ssd ? vehicle.ssd.substring(0, 30) + '...' : 'отсутствует'
                        });
                        
                        return (
                        <tr 
                          key={vehicle.vehicleid || index}
                          onClick={() => handleVehicleSelect(vehicle)}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {vehicle.brand}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vehicle.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {vehicle.model}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(() => {
                              const year = vehicle.year || vehicle.manufactured || (vehicle.date ? vehicle.date.split('.').pop() : '') || '';
                              console.log(`🗓️ Год для автомобиля ${vehicle.vehicleid}:`, { year, original_year: vehicle.year, manufactured: vehicle.manufactured, date: vehicle.date });
                              return year || '-';
                            })()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(() => {
                              const engine = vehicle.engine || vehicle.engine_info || vehicle.engineno || '';
                              console.log(`🔧 Двигатель для автомобиля ${vehicle.vehicleid}:`, { engine, original_engine: vehicle.engine, engine_info: vehicle.engine_info, engineno: vehicle.engineno });
                              return engine || '-';
                            })()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(() => {
                              const transmission = vehicle.transmission || vehicle.bodytype || '';
                              console.log(`⚙️ КПП для автомобиля ${vehicle.vehicleid}:`, { transmission, original_transmission: vehicle.transmission, bodytype: vehicle.bodytype });
                              return transmission || '-';
                            })()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(() => {
                              const market = vehicle.market || vehicle.destinationregion || vehicle.creationregion || '';
                              console.log(`🌍 Рынок для автомобиля ${vehicle.vehicleid}:`, { market, original_market: vehicle.market, destinationregion: vehicle.destinationregion, creationregion: vehicle.creationregion });
                              return market || '-';
                            })()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(() => {
                              const releaseDate = vehicle.date || vehicle.manufactured || '';
                              console.log(`📅 Дата выпуска для автомобиля ${vehicle.vehicleid}:`, { releaseDate, date: vehicle.date, manufactured: vehicle.manufactured });
                              return releaseDate || '-';
                            })()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(() => {
                              let prodPeriod = '';
                              if (vehicle.prodRange) {
                                prodPeriod = vehicle.prodRange;
                              } else if (vehicle.prodPeriod) {
                                prodPeriod = vehicle.prodPeriod;
                              } else if (vehicle.datefrom && vehicle.dateto) {
                                prodPeriod = `${vehicle.datefrom} - ${vehicle.dateto}`;
                              } else if (vehicle.modelyearfrom && vehicle.modelyearto) {
                                prodPeriod = `${vehicle.modelyearfrom} - ${vehicle.modelyearto}`;
                              }
                              console.log(`📈 Период производства для автомобиля ${vehicle.vehicleid}:`, { 
                                prodPeriod, 
                                prodRange: vehicle.prodRange, 
                                original_prodPeriod: vehicle.prodPeriod, 
                                datefrom: vehicle.datefrom, 
                                dateto: vehicle.dateto,
                                modelyearfrom: vehicle.modelyearfrom,
                                modelyearto: vehicle.modelyearto
                              });
                              return prodPeriod || '-';
                            })()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="space-y-1">
                              {vehicle.framecolor && (
                                <div className="text-xs">
                                  <span className="font-medium">Цвет кузова:</span> {vehicle.framecolor}
                                </div>
                              )}
                              {vehicle.trimcolor && (
                                <div className="text-xs">
                                  <span className="font-medium">Цвет салона:</span> {vehicle.trimcolor}
                                </div>
                              )}
                              {vehicle.engineno && (
                                <div className="text-xs">
                                  <span className="font-medium">Номер двигателя:</span> {vehicle.engineno}
                                </div>
                              )}
                              {vehicle.engine_info && (
                                <div className="text-xs max-w-xs truncate" title={vehicle.engine_info}>
                                  <span className="font-medium">Двигатель:</span> {vehicle.engine_info}
                                </div>
                              )}
                              {vehicle.options && (
                                <div className="text-xs max-w-xs truncate" title={vehicle.options}>
                                  <span className="font-medium">Опции:</span> {vehicle.options}
                                </div>
                              )}
                              {vehicle.description && (
                                <div className="text-xs max-w-xs truncate" title={vehicle.description}>
                                  <span className="font-medium">Описание:</span> {vehicle.description}
                                </div>
                              )}
                              {vehicle.modification && (
                                <div className="text-xs max-w-xs truncate" title={vehicle.modification}>
                                  <span className="font-medium">Модификация:</span> {vehicle.modification}
                                </div>
                              )}
                              {vehicle.grade && (
                                <div className="text-xs">
                                  <span className="font-medium">Класс:</span> {vehicle.grade}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && vehicles.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="text-yellow-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchType === 'vin' ? 'VIN не найден' : 'Госномер не найден'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchType === 'vin' 
                    ? `Автомобиль с VIN номером ${searchQuery} не найден в доступных каталогах`
                    : `Автомобиль с государственным номером ${searchQuery} не найден в базе данных`
                  }
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Вернуться на главную
                </Link>
              </div>
            )}

            {/* Invalid Search Query */}
            {!isLoading && !searchQuery && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Введите поисковый запрос
                </h3>
                <p className="text-gray-600 mb-6">
                  Используйте поле поиска в шапке сайта для поиска автомобилей по VIN номеру или государственному номеру
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Вернуться на главную
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default VehicleSearchResultsPage; 