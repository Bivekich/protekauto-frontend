import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import { GET_LAXIMO_BRANDS } from "@/lib/graphql";
import { LaximoBrand } from "@/types/laximo";

const InfoBrands = () => (
  <section className="section-info">
    <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        <div className="w-layout-hflex flex-block-7">
          <a href="/" className="link-block w-inline-block">
            <div>Главная</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="#" className="link-block-2 w-inline-block">
            <div>Все марки</div>
          </a>
        </div>
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">Все марки автомобилей</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BrandsPage = () => {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const { data, loading, error } = useQuery<{ laximoBrands: LaximoBrand[] }>(GET_LAXIMO_BRANDS, { errorPolicy: 'all' });

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

  let brands = staticBrands;
  if (data?.laximoBrands && data.laximoBrands.length > 0) {
    brands = data.laximoBrands.map(brand => ({ name: brand.name, code: brand.code }));
  } else if (error) {
    console.warn('Laximo API недоступен, используются статические данные:', error.message);
  }

  const brandsByLetter = useMemo(() => {
    const grouped: { [key: string]: typeof brands } = {};
    brands.forEach(brand => {
      const firstLetter = brand.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) grouped[firstLetter] = [];
      grouped[firstLetter].push(brand);
    });
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
    });
    return grouped;
  }, [brands]);

  const letters = Object.keys(brandsByLetter).sort();

  const handleBrandClick = (brand: { name: string; code?: string }) => {
    if (brand.code) router.push(`/vehicle-search/${brand.code}`);
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? '' : letter);
  };

  return (
    <>
      <Head>
        <title>Все марки автомобилей - Protek</title>
        <meta name="description" content="Полный каталог автомобильных брендов для поиска запчастей" />
      </Head>
      <InfoBrands />
      <main className="min-h-screen bg-[#F5F8FB] py-8 px-2">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-2xl shadow p-6 md:p-10 mb-8">
            <div className="text-gray-600 mb-6">
              Выберите марку автомобиля для поиска запчастей. Всего доступно <b>{brands.length}</b> брендов.
            </div>
            {/* Алфавитный указатель */}
            <div className="flex flex-wrap gap-2 mb-6">
              {letters.map(letter => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold border transition-all duration-200
                    ${selectedLetter === letter
                      ? 'bg-[#EC1C24] border-[#EC1C24]'
                      : 'bg-white text-[#000814] border-gray-300 hover:bыg-[#F5F8FB] hover:border-[#EC1C24]'}
                  `}
                  style={selectedLetter === letter ? { color: '#fff' } : {}}
                >
                  {letter}
                </button>
              ))}
              {selectedLetter && (
                <button
                  onClick={() => setSelectedLetter('')}
                  className="rounded-full px-4 py-2 text-sm font-semibold border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Показать все
                </button>
              )}
            </div>
            {/* Список брендов */}
            <div>
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EC1C24]"></div>
                  <span className="ml-4 text-lg text-gray-500">Загружаем бренды...</span>
                </div>
              ) : (
                <div>
                  {selectedLetter ? (
                    <BrandGrid brands={brandsByLetter[selectedLetter] || []} onBrandClick={handleBrandClick} />
                  ) : (
                    letters.map(letter => (
                      <div key={letter} className="mb-8">
                        <h2 className="text-xl font-bold text-[#000814] mb-4">{letter}</h2>
                        <BrandGrid brands={brandsByLetter[letter] || []} onBrandClick={handleBrandClick} />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileMenuBottomSection />
    </>
  );
};

const BrandGrid = ({ brands, onBrandClick }: { brands: { name: string; code?: string }[]; onBrandClick: (brand: { name: string; code?: string }) => void }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {brands.map((brand, idx) => (
      <button
        key={idx}
        onClick={() => onBrandClick(brand)}
        className="bg-[#F5F8FB] hover:bg-white border border-gray-200 hover:border-[#EC1C24] rounded-xl p-4 text-left font-medium text-[#000814] shadow-sm transition-all duration-200"
      >
        {brand.name}
      </button>
    ))}
  </div>
);

export default BrandsPage; 