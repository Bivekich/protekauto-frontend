import React from 'react';
import { useRouter } from 'next/router';
import { LaximoVehicleSearchResult, LaximoCatalogInfo } from '@/types/laximo';

interface VehicleSearchResultsProps {
  results: LaximoVehicleSearchResult[];
  catalogInfo: LaximoCatalogInfo;
}

const VehicleSearchResults: React.FC<VehicleSearchResultsProps> = ({
  results,
  catalogInfo
}) => {
  const router = useRouter();

  const handleSelectVehicle = (vehicle: LaximoVehicleSearchResult) => {
    console.log('🚗 handleSelectVehicle вызвана для:', vehicle);
    
    // Формируем SSD из данных vehicle или берем из router query
    const routerSsd = Array.isArray(router.query.ssd) ? router.query.ssd[0] : router.query.ssd;
    const ssd = vehicle.ssd || routerSsd || '';
    const brand = router.query.brand || catalogInfo.code;
    
    console.log('🚗 Selected vehicle:', vehicle);
    console.log('🔧 Vehicle SSD:', vehicle.ssd ? `${vehicle.ssd.substring(0, 50)}...` : 'отсутствует');
    console.log('🔧 Router SSD:', routerSsd ? `${routerSsd.substring(0, 50)}...` : 'отсутствует');
    console.log('🔧 Final SSD to pass:', ssd ? `${ssd.substring(0, 50)}...` : 'отсутствует');
    console.log('🔧 SSD length:', ssd.length);
    console.log('🔧 Brand для навигации:', brand);
    console.log('🔧 Vehicle ID:', vehicle.vehicleid);
    
    // Переходим на страницу автомобиля с SSD
    if (ssd && ssd.trim() !== '') {
      // Всегда используем localStorage для SSD, так как VW SSD очень длинные
      console.log('💾 Сохраняем SSD в localStorage для безопасной передачи');
      const vehicleKey = `vehicle_ssd_${brand}_${vehicle.vehicleid}`;
      console.log('💾 Ключ localStorage:', vehicleKey);
      localStorage.setItem(vehicleKey, ssd);
      console.log('💾 SSD сохранен в localStorage');
      
      const targetUrl = `/vehicle-search/${brand}/${vehicle.vehicleid}?use_storage=1&ssd_length=${ssd.length}`;
      console.log('🔗 Переходим по URL:', targetUrl);
      router.push(targetUrl);
    } else {
      console.log('⚠️ SSD отсутствует, переходим без него');
      router.push(`/vehicle-search/${brand}/${vehicle.vehicleid}`);
    }
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl  md:my-8">
      <div className="mb-2">
        <h4 className="text-lg font-medium text-gray-900">
          Найденные автомобили ({results.length})
        </h4>
      </div>

      <div className="flex flex-col gap-4">
        {results.map((vehicle, index) => (
          <div
            key={vehicle.vehicleid || index}
            className="pt-3 pb-3 bg-white border-b border-gray-200 hover:bg-neutral-50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4"
            onClick={() => handleSelectVehicle(vehicle)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900 truncate">
                  {vehicle.name || `${vehicle.brand || 'Unknown'} ${vehicle.model || 'Vehicle'}`}
                </h4>
                {vehicle.year && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                    {vehicle.year}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-2">
                {vehicle.modification && (
                  <div>
                    <span className="text-gray-500">Модификация:</span>
                    <span className="ml-2 font-medium text-gray-900">{vehicle.modification}</span>
                  </div>
                )}
                {vehicle.bodytype && (
                  <div>
                    <span className="text-gray-500">Тип кузова:</span>
                    <span className="ml-2 font-medium text-gray-900">{vehicle.bodytype}</span>
                  </div>
                )}
                {vehicle.engine && (
                  <div>
                    <span className="text-gray-500">Двигатель:</span>
                    <span className="ml-2 font-medium text-gray-900">{vehicle.engine}</span>
                  </div>
                )}
              </div>

              {vehicle.notes && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800">
                        <span className="font-medium">Примечание:</span> {vehicle.notes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex items-center justify-end">
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleSelectVehicle(vehicle);
                }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow transition"
                style={{ color: '#fff' }}
              >
                Выбрать
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl pt-4 pb-4 mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
        <span>Показано {results.length} результат{results.length === 1 ? '' : results.length < 5 ? 'а' : 'ов'}</span>
        <span>Кликните на автомобиль для подбора запчастей</span>
      </div>
    </div>
  );
};

export default VehicleSearchResults; 