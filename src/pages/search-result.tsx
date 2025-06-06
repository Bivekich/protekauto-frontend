import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import Filters, { FilterConfig } from "@/components/Filters";
import BestPriceCard from "@/components/BestPriceCard";
import CoreProductCard from "@/components/CoreProductCard";
import AnalogueBlock from "@/components/AnalogueBlock";
import CatalogInfoHeader from "@/components/CatalogInfoHeader";
import FiltersPanelMobile from "@/components/FiltersPanelMobile";
import CatalogSortDropdown from "@/components/CatalogSortDropdown";
import MobileMenuBottomSection from '../components/MobileMenuBottomSection';
import React, { useState } from "react";

const sortOptions = [
  "По цене",
  "По рейтингу",
  "По количеству"
];

const searchResultFilters: FilterConfig[] = [
  {
    type: "dropdown",
    title: "Производитель",
    options: ["Bosch", "Varta", "Mutlu", "Exide", "Topla", "TAB", "Rocket", "Akom", "Medalist", "Tyumen", "FB", "Delkor"],
    multi: true,
    showAll: true,
  },
  {
    type: "dropdown",
    title: "Полярность",
    options: ["Обратная", "Прямая", "Универсальная"],
    multi: false,
  },
  {
    type: "range",
    title: "Емкость (А/ч)",
    min: 1,
    max: 20000,
  },
];

export default function SearchResult() {
  const [sortActive, setSortActive] = useState(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showSortMobile, setShowSortMobile] = useState(false);

  return (
    <>
      <Head>
        <title>Search result</title>
        <meta content="Search result" property="og:title" />
        <meta content="Search result" property="twitter:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />

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
          { label: "Каталог", href: "/catalog" },
          { label: "Результаты поиска" }
        ]}
        showCount={true}
        showProductHelp={true}
      />
      <div className="w-layout-blockcontainer container w-container">
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
        {showFiltersMobile && (
                <>
                  <div className="filters-overlay" onClick={() => setShowFiltersMobile(false)}></div>
                  <div className="filters-sidebar-mobile"> 
                  <div className="w-layout-hflex flex-block-84">
                    <h3>Фильтры</h3>
                    <button className="filters-close" onClick={() => setShowFiltersMobile(false)} type="button">×</button>
                  </div>
                  <FiltersPanelMobile filters={searchResultFilters} />
                </div>
                </>
              )}
      </div>
      <section>
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex flex-block-36">
            <BestPriceCard
              rating="4,8"
              title="INA 530059210"
              description="Комплект роликов"
              price="3 796 ₽"
              delivery="41 день"
              stock="100 шт."
            />
            <BestPriceCard
              rating="4,8"
              title="INA 530059210"
              description="Комплект роликов"
              price="3 796 ₽"
              delivery="41 день"
              stock="100 шт."
            />
            <BestPriceCard
              rating="4,8"
              title="INA 530059210"
              description="Комплект роликов"
              price="3 796 ₽"
              delivery="41 день"
              stock="100 шт."
            />
          </div>
        </div>
      </section>
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-hflex flex-block-13">
            {/* Фильтры для десктопа */}
            <div className="filters-desktop">
              <Filters filters={searchResultFilters} />
            </div>

            {/* --- Остальной JSX страницы --- */}
            <div className="w-layout-vflex flex-block-14">
              
              <div className="w-layout-hflex core-product-search">
                <CoreProductCard
                  brand="STELLOX"
                  article="1023245SX"
                  name="Комплект ГРМ"
                  image="/images/image-10.png"
                />
              </div>
              {/* --- Аналоги от других производителей --- */}
              <AnalogueBlock />
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
