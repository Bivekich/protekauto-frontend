import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import { GET_LAXIMO_BRANDS } from "@/lib/graphql";
import { LaximoBrand } from "@/types/laximo";

const BrandsPage = () => {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  
  const { data, loading, error } = useQuery<{ laximoBrands: LaximoBrand[] }>(GET_LAXIMO_BRANDS, {
    errorPolicy: 'all'
  });

  // Статические данные как fallback
  const staticBrands = [
    { name: "Audi", code: "audi" },
    { name: "BMW", code: "bmw" },
    { name: "Cadillac", code: "cadillac" },
    { name: "Chevrolet", code: "chevrolet" },
    { name: "Citroen", code: "citroen" },
    { name: "Fiat", code: "fiat" },
    { name: "Mazda", code: "mazda" },
    { name: "Mercedes-Benz", code: "mercedes" },
    { name: "Nissan", code: "nissan" },
    { name: "Opel", code: "opel" },
    { name: "Peugeot", code: "peugeot" },
    { name: "Renault", code: "renault" },
    { name: "Toyota", code: "toyota" },
    { name: "Volkswagen", code: "volkswagen" },
    { name: "Volvo", code: "volvo" }
  ];

  // Определяем какие данные использовать
  let brands = staticBrands;
  
  if (data?.laximoBrands && data.laximoBrands.length > 0) {
    brands = data.laximoBrands.map(brand => ({
      name: brand.name,
      code: brand.code
    }));
  } else if (error) {
    console.warn('Laximo API недоступен, используются статические данные:', error.message);
  }

  // Группируем бренды по первой букве
  const brandsByLetter = useMemo(() => {
    const grouped: { [key: string]: typeof brands } = {};
    
    brands.forEach(brand => {
      const firstLetter = brand.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(brand);
    });

    // Сортируем бренды внутри каждой группы
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }, [brands]);

  // Получаем отсортированные буквы
  const letters = Object.keys(brandsByLetter).sort();

  const handleBrandClick = (brand: { name: string; code?: string }) => {
    if (brand.code) {
      router.push(`/vehicle-search/${brand.code}`);
    } else {
      console.warn('Brand code not available for', brand.name);
    }
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? '' : letter);
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Все марки автомобилей - Protek</title>
        </Head>
        <Header />
        <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              animation: 'spin 1s linear infinite',
              borderRadius: '50%',
              width: '128px',
              height: '128px',
              borderBottom: '2px solid #dc2626',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '16px', fontSize: '18px', color: '#6b7280' }}>Загружаем бренды...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Все марки автомобилей - Protek</title>
        <meta name="description" content="Полный каталог автомобильных брендов для поиска запчастей" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
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
            <div className="w-layout-hflex" style={{ alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
              <div className="w-layout-hflex" style={{ alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => router.back()}
                  className="link-block w-inline-block"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}
                >
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Назад</span>
                </button>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  <span>Главная</span>
                  <span style={{ margin: '0 8px' }}>/</span>
                  <span style={{ color: '#111827', fontWeight: '500' }}>Все марки</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Заголовок */}
        <section style={{ backgroundColor: 'white' }}>
          <div className="w-layout-blockcontainer container2 w-container">
            <div className="w-layout-vflex flex-block-5" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
              <h1 className="heading-4" style={{ marginBottom: '16px' }}>Все марки автомобилей</h1>
              <div className="text-block-5" style={{ marginBottom: '24px' }}>
                Выберите марку автомобиля для поиска запчастей. Всего доступно {brands.length} брендов.
              </div>
              
              {/* Алфавитный указатель */}
              <div className="w-layout-hflex" style={{ flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {letters.map(letter => (
                  <button
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    className={selectedLetter === letter ? "tab_card-activ" : "tab_card"}
                    style={{ 
                      minWidth: '40px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {letter}
                  </button>
                ))}
                {selectedLetter && (
                  <button
                    onClick={() => setSelectedLetter('')}
                    className="tab_card"
                    style={{ 
                      fontSize: '14px',
                      fontWeight: '500',
                      backgroundColor: '#d1d5db',
                      color: '#374151'
                    }}
                  >
                    Показать все
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Список брендов */}
        <section>
          <div className="w-layout-blockcontainer container2 w-container">
            <div style={{ paddingBottom: '32px' }}>
              {selectedLetter ? (
                // Показываем только выбранную букву
                <div style={{ marginBottom: '32px' }}>
                  <h2 className="heading-5" style={{ marginBottom: '16px' }}>{selectedLetter}</h2>
                  <div className="w-layout-hflex flex-block-27" style={{ flexWrap: 'wrap', gap: '16px' }}>
                    {brandsByLetter[selectedLetter]?.map((brand, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleBrandClick(brand)}
                        className="link-block-6 w-inline-block"
                        style={{ 
                          padding: '16px',
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          minWidth: '150px',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#ef4444';
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ fontWeight: '500', color: '#111827' }}>{brand.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Показываем все бренды по группам
                letters.map(letter => (
                  <div key={letter} style={{ marginBottom: '32px' }}>
                    <h2 className="heading-5" style={{ marginBottom: '16px' }}>{letter}</h2>
                    <div className="w-layout-hflex flex-block-27" style={{ flexWrap: 'wrap', gap: '16px' }}>
                      {brandsByLetter[letter]?.map((brand, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleBrandClick(brand)}
                          className="link-block-6 w-inline-block"
                          style={{ 
                            padding: '16px',
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            minWidth: '150px',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#ef4444';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div style={{ fontWeight: '500', color: '#111827' }}>{brand.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileMenuBottomSection />
    </>
  );
};

export default BrandsPage; 