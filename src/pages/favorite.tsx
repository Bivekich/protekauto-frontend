import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import MobileMenuBottomSection from "../components/MobileMenuBottomSection";
import FavoriteInfo from "@/components/FavoriteInfo";
import Filters, { FilterConfig } from "@/components/Filters";
import FiltersPanelMobile from "@/components/FiltersPanelMobile";
import React, { useState } from "react";
import CartRecommended from "../components/CartRecommended";
import FavoriteList from "../components/FavoriteList";

const favoriteFilters: FilterConfig[] = [
  {
    type: "dropdown",
    title: "Категория",
    options: ["Фильтра", "Масла", "Шины и диски", "Запчасти для двигателя"],
    multi: true,
  },
  {
    type: "dropdown",
    title: "Производитель",
    options: ["Bosch", "Varta", "Mutlu", "Exide"],
    multi: true,
    showAll: true,
  },
  {
    type: "dropdown",
    title: "Применимость",
    options: ["Acura", "Audi", "BMW", "LADA (ВАЗ)"],
    multi: true,
  },
];


export default function Favorite() {
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  return (
    <>
      <Head>
        <title>Favorite</title>
        <meta name="description" content="Favorite" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <Header />
      <FavoriteInfo />
      <div className="w-layout-blockcontainer container w-container">
        <div className="w-layout-hflex flex-block-84">
          {/* <CatalogSortDropdown active={sortActive} onChange={setSortActive} /> */}
          <div className="w-layout-hflex flex-block-85" onClick={() => setShowFiltersMobile((v) => !v)}>
            <span className="code-embed-9 w-embed">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <FiltersPanelMobile
          filters={favoriteFilters}
          open={showFiltersMobile}
          onClose={() => setShowFiltersMobile(false)}
        />
      </div>
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex cart-list">
            <FavoriteList filters={favoriteFilters} />
            <CartRecommended />
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