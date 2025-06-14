import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GET_LAXIMO_CATALOG_INFO, SEARCH_LAXIMO_OEM } from '@/lib/graphql';
import { LaximoCatalogInfo, LaximoOEMResult } from '@/types/laximo';

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
  const { data: catalogData } = useQuery<{ laximoCatalogInfo: LaximoCatalogInfo }>(
    GET_LAXIMO_CATALOG_INFO,
    {
      variables: { catalogCode: brand },
      skip: !brand
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

  if (oemLoading) {
    return (
      <>
        <Head>
          <title>Загрузка детали {oemNumber}...</title>
        </Head>
        <Header />
        <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ 
                animation: 'spin 1s linear infinite',
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
                borderBottom: '2px solid #dc2626',
                margin: '0 auto 1rem'
              }}></div>
              <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
                Загружаем информацию о детали {oemNumber}...
              </p>
            </div>
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
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Head>
      <Header />
      
      <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Навигация */}
        <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
          <div className="w-layout-blockcontainer container2 w-container">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              height: '4rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => router.back()}
                  style={{
                    color: '#6b7280',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Назад к поиску</span>
                </button>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <span>Главная</span>
                  <span style={{ margin: '0 0.5rem' }}>/</span>
                  <span>Каталог</span>
                  <span style={{ margin: '0 0.5rem' }}>/</span>
                  <span>{catalogInfo?.name}</span>
                  <span style={{ margin: '0 0.5rem' }}>/</span>
                  <span style={{ color: '#1f2937', fontWeight: 500 }}>Деталь {oemNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Заголовок страницы */}
        <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
          <div className="w-layout-blockcontainer container2 w-container">
            <div style={{ padding: '2rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                {catalogInfo?.icon && (
                  <img 
                    src={`/images/brands/${catalogInfo.icon}`} 
                    alt={catalogInfo.name}
                    style={{ width: '3rem', height: '3rem', objectFit: 'contain' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div>
                  <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                    Деталь {oemNumber}
                  </h1>
                  <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                    {catalogInfo?.name} | ID автомобиля: {vehicleId}
                  </p>
                </div>
              </div>

              {oemResult && (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem',
                  backgroundColor: '#f3f4f6',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280' }}>OEM номер</div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', fontFamily: 'monospace' }}>
                      {oemResult.oemNumber}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280' }}>Категорий</div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                      {oemResult.categories.length}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280' }}>Узлов</div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                      {totalUnits}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280' }}>Позиций</div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                      {totalDetails}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Основное содержимое */}
        <div className="w-layout-blockcontainer container2 w-container">
          <div style={{ padding: '2rem 0' }}>
            {oemError && (
              <div style={{ 
                backgroundColor: '#fef2f2', 
                border: '1px solid #fecaca', 
                borderRadius: '0.5rem', 
                padding: '1rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ color: '#b91c1c', fontWeight: 500, margin: '0 0 0.5rem 0' }}>
                  Ошибка загрузки
                </h3>
                <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: 0 }}>
                  Не удалось загрузить информацию о детали: {oemError.message}
                </p>
              </div>
            )}

            {oemResult && oemResult.categories.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 1rem 0' }}>
                    Применимость в автомобиле
                  </h2>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Показывает, в каких узлах и категориях используется данная деталь
                  </p>
                </div>

                {oemResult.categories.map((category) => (
                  <div 
                    key={category.categoryid} 
                    style={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '0.5rem',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ 
                      backgroundColor: '#f9fafb', 
                      borderBottom: '1px solid #d1d5db', 
                      padding: '1rem' 
                    }}>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 600, 
                        color: '#1f2937', 
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        📂 {category.name}
                        <span style={{ 
                          backgroundColor: '#e5e7eb', 
                          color: '#6b7280', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '0.25rem', 
                          fontSize: '0.75rem' 
                        }}>
                          {category.units.length} узл{category.units.length === 1 ? '' : category.units.length < 5 ? 'а' : 'ов'}
                        </span>
                      </h3>
                    </div>
                    
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {category.units.map((unit) => (
                          <div 
                            key={unit.unitid} 
                            style={{ 
                              backgroundColor: '#f9fafb', 
                              border: '1px solid #e5e7eb', 
                              borderRadius: '0.5rem', 
                              padding: '1rem' 
                            }}
                          >
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                              {unit.imageurl && (
                                <img 
                                  src={unit.imageurl.replace('%size%', '100')} 
                                  alt={unit.name}
                                  style={{ 
                                    width: '4rem', 
                                    height: '4rem', 
                                    objectFit: 'contain', 
                                    border: '1px solid #d1d5db', 
                                    borderRadius: '0.25rem',
                                    backgroundColor: 'white'
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              )}
                              <div>
                                <h4 style={{ 
                                  fontSize: '1.125rem', 
                                  fontWeight: 600, 
                                  color: '#1f2937', 
                                  margin: '0 0 0.25rem 0' 
                                }}>
                                  🔧 {unit.name}
                                </h4>
                                {unit.code && (
                                  <p style={{ 
                                    fontSize: '0.875rem', 
                                    color: '#6b7280', 
                                    margin: 0,
                                    fontFamily: 'monospace'
                                  }}>
                                    Код: {unit.code}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              {unit.details.map((detail, index) => (
                                <div 
                                  key={`${detail.detailid}-${index}`} 
                                  style={{ 
                                    backgroundColor: 'white', 
                                    border: '1px solid #d1d5db', 
                                    borderRadius: '0.5rem', 
                                    padding: '1rem' 
                                  }}
                                >
                                  <h5 style={{ 
                                    fontSize: '1rem', 
                                    fontWeight: 500, 
                                    color: '#1f2937', 
                                    margin: '0 0 0.75rem 0' 
                                  }}>
                                    📄 {detail.name}
                                  </h5>
                                  
                                  <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                                    gap: '0.75rem',
                                    fontSize: '0.875rem'
                                  }}>
                                    <div>
                                      <span style={{ fontWeight: 500, color: '#6b7280' }}>OEM номер:</span>
                                      <span style={{ 
                                        marginLeft: '0.5rem', 
                                        fontFamily: 'monospace', 
                                        fontWeight: 600, 
                                        color: '#dc2626' 
                                      }}>
                                        {detail.oem}
                                      </span>
                                    </div>
                                    
                                    {detail.brand && (
                                      <div>
                                        <span style={{ fontWeight: 500, color: '#6b7280' }}>Бренд:</span>
                                        <span style={{ marginLeft: '0.5rem', fontWeight: 500, color: '#2563eb' }}>
                                          {detail.brand}
                                        </span>
                                      </div>
                                    )}
                                    
                                    {detail.amount && (
                                      <div>
                                        <span style={{ fontWeight: 500, color: '#6b7280' }}>Количество:</span>
                                        <span style={{ 
                                          marginLeft: '0.5rem', 
                                          backgroundColor: '#dbeafe', 
                                          color: '#1e40af', 
                                          padding: '0.125rem 0.5rem', 
                                          borderRadius: '0.25rem', 
                                          fontWeight: 500 
                                        }}>
                                          {detail.amount}
                                        </span>
                                      </div>
                                    )}
                                    
                                    {detail.range && (
                                      <div>
                                        <span style={{ fontWeight: 500, color: '#6b7280' }}>Период:</span>
                                        <span style={{ marginLeft: '0.5rem', color: '#059669' }}>
                                          {detail.range}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {detail.attributes && detail.attributes.length > 0 && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280' }}>
                                        Характеристики:
                                      </span>
                                      <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        {detail.attributes.map((attr, attrIndex) => (
                                          <div key={attrIndex} style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                            <span style={{ fontWeight: 500 }}>{attr.name || attr.key}:</span>{' '}
                                            <span>{attr.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button style={{
                                      backgroundColor: '#dc2626',
                                      color: 'white',
                                      border: 'none',
                                      padding: '0.5rem 1rem',
                                      borderRadius: '0.375rem',
                                      fontSize: '0.875rem',
                                      fontWeight: 500,
                                      cursor: 'pointer'
                                    }}>
                                      В корзину
                                    </button>
                                    <button style={{
                                      backgroundColor: 'white',
                                      color: '#374151',
                                      border: '1px solid #d1d5db',
                                      padding: '0.5rem 1rem',
                                      borderRadius: '0.375rem',
                                      fontSize: '0.875rem',
                                      fontWeight: 500,
                                      cursor: 'pointer'
                                    }}>
                                      Найти аналоги
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !oemLoading && (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem 1rem', 
                backgroundColor: '#fef3c7', 
                border: '1px solid #fcd34d', 
                borderRadius: '0.5rem' 
              }}>
                <svg style={{ 
                  width: '3rem', 
                  height: '3rem', 
                  margin: '0 auto 1rem', 
                  color: '#f59e0b' 
                }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#92400e', margin: '0 0 0.5rem 0' }}>
                  Деталь не найдена
                </h3>
                <p style={{ color: '#b45309', fontSize: '0.875rem' }}>
                  По номеру "{oemNumber}" ничего не найдено в данном автомобиле. 
                  Проверьте правильность номера или вернитесь к поиску.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PartDetailPage; 