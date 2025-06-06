import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListCard from "@/components/ProductListCard";
import Filters from "@/components/Filters";
import CatalogProductCard from "@/components/CatalogProductCard";
import CatalogTabs from "@/components/CatalogTabs";
import CatalogPagination from "@/components/CatalogPagination";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import CatalogSortDropdown from "@/components/CatalogSortDropdown";
import CatalogInfoHeader from "@/components/CatalogInfoHeader";
import React, { useState } from "react";
import FiltersPanelMobile from '@/components/FiltersPanelMobile';
import MobileMenuBottomSection from '../components/MobileMenuBottomSection';

const mockData = Array(12).fill({
  image: "/images/image-10.png",
  discount: "-35%",
  price: "от 17 087 ₽",
  oldPrice: "22 347 ₽",
  title: 'Аккумуляторная батарея TYUMEN BATTERY "STANDARD", 6CT-60L, 60',
  brand: "Borsehung",
});

export default function Catalog() {
  const [sortActive, setSortActive] = useState(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showSortMobile, setShowSortMobile] = useState(false);

  return (
    <>
      <Head>
        <title>Catalog</title>
        <meta name="description" content="Catalog" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <Header />
      <CatalogInfoHeader
        title="Аккумуляторы"
        count={3587}
        productName="аккумулятор"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Каталог" }
        ]}
        showCount={true}
        showProductHelp={true}
      />
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-hflex flex-block-13">
            <div className="w-layout-hflex flex-block-84">
              <CatalogSortDropdown active={sortActive} onChange={setSortActive} />
              <div className="w-layout-hflex flex-block-85" onClick={() => setShowFiltersMobile((v) => !v)}>
                <span className="code-embed-9 w-embed">
                  <svg width="currentwidth" height="currentheight" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 4H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div>Фильтры</div>
              </div>
            </div>
            {/* Фильтры для десктопа */}
            <div className="filters-desktop">
              <Filters />
            </div>
            {showFiltersMobile && (
              <>
                <div className="filters-overlay" onClick={() => setShowFiltersMobile(false)}></div>
                <div className="filters-sidebar-mobile"> 
                  <div className="w-layout-hflex flex-block-84">
                    <h3>Фильтры</h3>
                    <button className="filters-close" onClick={() => setShowFiltersMobile(false)} type="button">×</button>
                  </div>
                  <FiltersPanelMobile />
                </div>
              </>
            )}
            <div className="w-layout-vflex flex-block-14-copy">
              <CatalogTabs />
              {mockData.map((item, idx) => (
                <CatalogProductCard
                  key={idx}
                  image={item.image}
                  discount={item.discount}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  title={item.title}
                  brand={item.brand}
                />
              ))}
              <CatalogPagination />
            </div>
          </div>
        </div>
      </section>
      <section className="section-3">
        <CatalogSubscribe />
      </section>
      <Footer />
      <MobileMenuBottomSection />
    </>
  );
} 