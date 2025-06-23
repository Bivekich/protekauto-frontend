import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import { GET_LAXIMO_BRANDS } from "@/lib/graphql";
import { LaximoBrand } from "@/types/laximo";
import BrandWizardSearchSection from "@/components/BrandWizardSearchSection";

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
    if (brand.code) router.push(`/brands?selected=${brand.code}`);
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? '' : letter);
  };

  return (
    <>
      <Head>
        <title>Все марки автомобилей - Protek</title>
        <meta name="description" content="Полный каталог автомобильных брендов для поиска запчастей" />
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <InfoBrands />
      <BrandWizardSearchSection />
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