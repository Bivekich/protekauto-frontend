import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GET_LAXIMO_CATALOG_INFO, SEARCH_LAXIMO_OEM } from '@/lib/graphql';
import { LaximoCatalogInfo, LaximoOEMResult } from '@/types/laximo';

const InfoPartDetail = ({ brandName, oemNumber }: { brandName: string; oemNumber: string }) => (
  <section className="section-info">
    <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        <div className="w-layout-hflex flex-block-7">
          <a href="/" className="link-block w-inline-block text-[#000814] hover:text-[#EC1C24] transition-colors">
            <div>Главная</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="#" className="link-block-2 w-inline-block text-[#000814] hover:text-[#EC1C24] transition-colors">
            <div>Каталог</div>
          </a>
          <div className="text-block-3">→</div>
          <div className="font-semibold text-gray-900">{brandName}</div>
          <div className="text-block-3">→</div>
          <div className="font-semibold text-gray-900">Деталь {oemNumber}</div>
        </div>
        <div className="w-layout-hflex flex-block-8 mt-4">
          <div className="w-layout-hflex flex-block-10 items-center gap-4">
            <h1 className="heading text-2xl font-bold text-gray-900">Деталь {oemNumber}</h1>
          </div>
        </div>
        <div className="text-lg text-gray-600 mt-2">
          Подробная информация о детали {oemNumber}
        </div>
      </div>
    </div>
  </section>
);

const PartDetailPage = () => {
  const router = useRouter();
  const { brand, vehicleId, oemNumber } = router.query;

  // Получаем SSD из localStorage или URL
  const useStorage = router.query.use_storage === '1';
  const ssdLengthFromUrl = router.query.ssd_length ? parseInt(router.query.ssd_length as string) : 0;
  let finalSsd = '';
  
  if (useStorage && typeof window !== 'undefined') {
    const vehicleKey = `vehicle_ssd_${brand}_${vehicleId}`;
    const storedSsd = localStorage.getItem(vehicleKey);
    if (storedSsd) {
      finalSsd = storedSsd;
    }
  }

  // Получаем информацию о каталоге
  const { data: catalogData, loading: catalogLoading } = useQuery<{ laximoCatalogInfo: LaximoCatalogInfo }>(
    GET_LAXIMO_CATALOG_INFO,
    {
      variables: { catalogCode: brand },
      skip: !brand,
      errorPolicy: 'all',
    }
  );

  // Получаем информацию о детали
  const { data: oemData, loading: oemLoading, error: oemError } = useQuery<{ laximoOEMSearch: LaximoOEMResult }>(
    SEARCH_LAXIMO_OEM,
    {
      variables: { 
        catalogCode: brand,
        vehicleId: vehicleId,
        oemNumber: oemNumber,
        ssd: finalSsd
      },
      skip: !brand || !vehicleId || !oemNumber || !finalSsd,
      errorPolicy: 'all'
    }
  );

  if (!brand || !vehicleId || !oemNumber) {
    return (
      <>
        <Head>
          <title>Деталь не найдена</title>
        </Head>
        <Header />
        <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              Деталь не найдена
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Неверные параметры для отображения детали
            </p>
            <button
              onClick={() => router.back()}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Назад
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const catalogInfo = catalogData?.laximoCatalogInfo;
  const oemResult = oemData?.laximoOEMSearch;

  const totalUnits = oemResult?.categories.reduce((total, cat) => total + cat.units.length, 0) || 0;
  const totalDetails = oemResult?.categories.reduce((total, cat) => 
    total + cat.units.reduce((unitTotal, unit) => unitTotal + unit.details.length, 0), 0) || 0;

  return (
    <>
      <Head>
        <title>Деталь {oemNumber} - {catalogInfo?.name || 'Каталог запчастей'}</title>
        <meta name="description" content={`Подробная информация о детали ${oemNumber} в каталоге ${catalogInfo?.name}`} />
      </Head>
      <Header />
      <div className="bg-[#F5F8FB] min-h-screen w-full">
        <InfoPartDetail brandName={catalogInfo?.name || String(brand)} oemNumber={String(oemNumber)} />
        <div className="flex flex-col px-32 pt-10 pb-16 max-md:px-5">
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[1200px]">
              {(catalogLoading || oemLoading) && (
                <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center justify-center min-h-[300px]">
                  <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-red-600 mb-6"></div>
                  <p className="text-lg text-gray-600">Загружаем информацию о детали {oemNumber}...</p>
                </div>
              )}
              {oemError && !oemLoading && (
                <div className="bg-red-50 border border-red-200 rounded-2xl shadow p-10 mb-6">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-medium text-red-800">Ошибка загрузки</h3>
                      <p className="text-red-700 mt-1">Не удалось загрузить информацию о детали: {oemError.message}</p>
                    </div>
                  </div>
                </div>
              )}
              {oemResult && oemResult.categories.length > 0 ? (
                <div className="bg-white rounded-2xl shadow p-10 flex flex-col gap-8">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Применимость в автомобиле</h2>
                    <p className="text-sm text-gray-600 mt-1">Показывает, в каких узлах и категориях используется данная деталь</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">OEM номер</div>
                        <div className="text-lg font-mono font-semibold text-gray-900">{oemResult.oemNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Категорий</div>
                        <div className="text-lg font-semibold text-gray-900">{oemResult.categories.length}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Узлов</div>
                        <div className="text-lg font-semibold text-gray-900">{totalUnits}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Позиций</div>
                        <div className="text-lg font-semibold text-gray-900">{totalDetails}</div>
                      </div>
                    </div>
                  </div>
                  {oemResult.categories.map((category) => (
                    <div key={category.categoryid} className="bg-gray-50 border border-gray-200 rounded-lg mb-6">
                      <div className="bg-gray-100 border-b border-gray-200 p-4 rounded-t-lg">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          📂 {category.name}
                          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                            {category.units.length} узл{category.units.length === 1 ? '' : category.units.length < 5 ? 'а' : 'ов'}
                          </span>
                        </h3>
                      </div>
                      <div className="p-6 flex flex-col gap-6">
                        {category.units.map((unit) => (
                          <div key={unit.unitid} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex gap-4 mb-4">
                              {unit.imageurl && (
                                <img
                                  src={unit.imageurl.replace('%size%', '100')}
                                  alt={unit.name}
                                  className="w-16 h-16 object-contain border border-gray-200 rounded bg-white"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              )}
                              <div>
                                <h4 className="text-base font-semibold text-gray-900 mb-1">🔧 {unit.name}</h4>
                                {unit.code && (
                                  <p className="text-xs text-gray-500 font-mono">Код: {unit.code}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-4">
                              {unit.details.map((detail, index) => (
                                <div key={`${detail.detailid}-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                  <h5 className="text-base font-medium text-gray-900 mb-3">📄 {detail.name}</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <span className="font-medium text-gray-500">OEM номер:</span>
                                      <span className="ml-2 font-mono font-semibold text-[#EC1C24]">{detail.oem}</span>
                                    </div>
                                    {detail.brand && (
                                      <div>
                                        <span className="font-medium text-gray-500">Бренд:</span>
                                        <span className="ml-2 font-semibold text-blue-700">{detail.brand}</span>
                                      </div>
                                    )}
                                    {detail.amount && (
                                      <div>
                                        <span className="font-medium text-gray-500">Количество:</span>
                                        <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{detail.amount}</span>
                                      </div>
                                    )}
                                    {detail.range && (
                                      <div>
                                        <span className="font-medium text-gray-500">Период:</span>
                                        <span className="ml-2 text-green-700">{detail.range}</span>
                                      </div>
                                    )}
                                  </div>
                                  {detail.attributes && detail.attributes.length > 0 && (
                                    <div className="mt-3">
                                      <span className="text-xs font-medium text-gray-500">Характеристики:</span>
                                      <div className="mt-1 flex flex-col gap-1">
                                        {detail.attributes.map((attr, attrIndex) => (
                                          <div key={attrIndex} className="text-xs text-gray-500">
                                            <span className="font-medium">{attr.name || attr.key}:</span> <span>{attr.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  <div className="mt-4 flex gap-2">
                                    <button className="bg-[#EC1C24] text-white px-4 py-2 rounded font-medium text-sm hover:bg-[#b91c1c] transition-colors">В корзину</button>
                                    <button className="bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors">Найти аналоги</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : !oemLoading && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow p-10 text-center">
                  <svg className="w-16 h-16 text-yellow-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">Деталь не найдена</h3>
                  <p className="text-yellow-700 mb-4">По номеру "{oemNumber}" ничего не найдено в данном автомобиле. Проверьте правильность номера или вернитесь к поиску.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PartDetailPage; 