import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Combobox } from '@headlessui/react';
import { GET_LAXIMO_BRANDS, GET_LAXIMO_CATALOG_INFO } from '@/lib/graphql';
import { LaximoBrand, LaximoVehicleSearchResult } from '@/types/laximo';
import WizardSearchForm from './WizardSearchForm';
import VehicleSearchResults from './VehicleSearchResults';
import { useRouter } from 'next/router';

const BrandWizardSearchSection: React.FC = () => {
  const router = useRouter();
  const { data: brandsData, loading: brandsLoading, error: brandsError } = useQuery<{ laximoBrands: LaximoBrand[] }>(GET_LAXIMO_BRANDS, { errorPolicy: 'all' });
  const [selectedBrand, setSelectedBrand] = useState<LaximoBrand | null>(null);
  const [vehicles, setVehicles] = useState<LaximoVehicleSearchResult[] | null>(null);
  const [brandQuery, setBrandQuery] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Получение информации о каталоге через useQuery
  const {
    data: catalogData,
    loading: catalogLoading,
    error: catalogError
  } = useQuery(
    GET_LAXIMO_CATALOG_INFO,
    {
      variables: { catalogCode: selectedBrand?.code },
      skip: !selectedBrand,
      errorPolicy: 'all',
    }
  );

  // Мемоизация брендов для селекта
  const brands = useMemo(() => {
    if (brandsData?.laximoBrands?.length) {
      return [...brandsData.laximoBrands].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [];
  }, [brandsData]);

  // Фильтрация брендов по поисковому запросу
  const filteredBrands = useMemo(() => {
    if (!brandQuery) return brands;
    return brands.filter(b => b.name.toLowerCase().includes(brandQuery.toLowerCase()));
  }, [brands, brandQuery]);

  // Автоматически выбираем бренд из query, если есть selected
  useEffect(() => {
    if (!brandsData?.laximoBrands) return;
    const selected = router.query.selected;
    if (selected && !selectedBrand) {
      const found = brandsData.laximoBrands.find(b => b.name.toLowerCase() === String(selected).toLowerCase() || b.code.toLowerCase() === String(selected).toLowerCase());
      if (found) setSelectedBrand(found);
    }
  }, [brandsData, router.query.selected, selectedBrand]);

  // Обработчик выбора бренда
  const handleBrandChange = (brand: LaximoBrand | null) => {
    setSelectedBrand(brand);
    setVehicles(null);
  };

  // Обработчик найденных авто
  const handleVehicleFound = (vehicles: LaximoVehicleSearchResult[]) => {
    setVehicles(vehicles);
  };

  // Каталожная информация
  const catalogInfo = catalogData?.laximoCatalogInfo;

  return (
    <section className="max-w-[1580px] min-h-[700px] mx-auto bg-white rounded-2xl shadow p-6 md:p-10 my-8">
      <div className="text-2xl font-bold text-gray-900 mb-6 mt-6 text-center" style={{ fontSize: '28px' }}>Подбор автомобиля по параметрам</div>
      {/* Combobox бренда */}
      <div className="mb-8 w-full">
        <div className="w-full max-w-[450px]">
        <div className="flex items-center justify-between mb-[12px]" >
            <div className="flex items-center space-x-3">
                <h4  className="text-lg font-medium text-gray-900">
                    Марка автомобиля
                </h4>
            </div>
        </div>
          <Combobox value={selectedBrand} onChange={handleBrandChange} nullable>
            <div className="relative">
              <Combobox.Input
                id="brand-combobox"
                className="w-full px-6 py-4 bg-white rounded border border-stone-300 text-sm text-gray-950 placeholder:text-neutral-500 outline-none focus:shadow-none focus:border-stone-300 transition-colors"
                displayValue={(brand: LaximoBrand | null) => brand?.name || ''}
                onChange={e => setBrandQuery(e.target.value)}
                placeholder="Начните вводить бренд..."
                autoComplete="off"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none w-12">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </Combobox.Button>
              <Combobox.Options
                className="absolute left-0 top-full z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg w-full max-h-60 overflow-auto scrollbar-none"
                style={{ scrollbarWidth: 'none' }}
                data-hide-scrollbar
              >
                {brandsLoading && (
                  <div className="px-6 py-4 text-gray-500">Загрузка брендов...</div>
                )}
                {brandsError && (
                  <div className="px-6 py-4 text-red-500">Ошибка загрузки брендов</div>
                )}
                {filteredBrands.length === 0 && !brandsLoading && !brandsError && (
                  <div className="px-6 py-4 text-gray-500">Бренды не найдены</div>
                )}
                {filteredBrands.map(brand => (
                  <Combobox.Option
                    key={brand.code}
                    value={brand}
                    className={({ active, selected }) =>
                      `px-6 py-4 cursor-pointer hover:!bg-[rgb(236,28,36)] hover:!text-white text-sm transition-colors ${selected ? 'bg-red-50 font-semibold text-gray-950' : 'text-neutral-500'}`
                    }
                  >
                    {brand.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>
      </div>

      {/* Каталог и wizard */}
      {catalogLoading && selectedBrand && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span className="ml-3 text-gray-600">Загружаем каталог...</span>
        </div>
      )}
      {catalogError && selectedBrand && (
        <div className="text-red-600 text-center py-4">Ошибка загрузки каталога</div>
      )}
      {catalogInfo && catalogInfo.supportparameteridentification2 && !vehicles && (
        <div className="mt-6">
          <WizardSearchForm
            catalogCode={catalogInfo.code}
            onVehicleFound={handleVehicleFound}
          />
        </div>
      )}
      {catalogInfo && !catalogInfo.supportparameteridentification2 && (
        <div className="text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6 text-center">
          Для выбранного бренда подбор по параметрам недоступен.
        </div>
      )}
      {/* Результаты поиска */}
      {vehicles && catalogInfo && (
        <div className="mt-8">
          <VehicleSearchResults results={vehicles} catalogInfo={catalogInfo} />
        </div>
      )}
    </section>
  );
};

export default BrandWizardSearchSection; 