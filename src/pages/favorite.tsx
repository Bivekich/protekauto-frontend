import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import MobileMenuBottomSection from "../components/MobileMenuBottomSection";
import FavoriteInfo from "@/components/FavoriteInfo";
import Filters, { FilterConfig } from "@/components/Filters";
import FiltersPanelMobile from "@/components/FiltersPanelMobile";
import React, { useState, useMemo } from "react";
import CartRecommended from "../components/CartRecommended";
import FavoriteList from "../components/FavoriteList";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Favorite() {
  const { favorites } = useFavorites();
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<{[key: string]: any}>({});
  const [sortBy, setSortBy] = useState<'name' | 'brand' | 'price' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Создаем динамические фильтры на основе данных избранного
  const dynamicFilters: FilterConfig[] = useMemo(() => {
    const filters: FilterConfig[] = [];

    if (favorites.length === 0) {
      return filters;
    }

    // Фильтр по производителю
    const brands = [...new Set(favorites.map(item => item.brand).filter(Boolean))].sort();
    if (brands.length > 1) {
      filters.push({
        type: "dropdown",
        title: "Производитель",
        options: brands,
        multi: true,
        showAll: true,
      });
    }

    // Фильтр по цене
    const prices = favorites
      .map(item => item.price)
      .filter((price): price is number => typeof price === 'number' && price > 0);
    
    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      if (maxPrice > minPrice) {
        filters.push({
          type: "range",
          title: "Цена (₽)",
          min: Math.floor(minPrice),
          max: Math.ceil(maxPrice),
        });
      }
    }

    return filters;
  }, [favorites]);

  const handleFilterChange = (type: string, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleApplyFilters = () => {
    setShowFiltersMobile(false);
  };

  const handleClearFilters = () => {
    setFilterValues({});
    setSearchQuery('');
  };

  // Подсчитываем количество активных фильтров
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    
    Object.entries(filterValues).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) count++;
      else if (value && !Array.isArray(value)) count++;
    });
    
    return count;
  }, [searchQuery, filterValues]);
  
  return (
    <>
      <Head>
        <title>Избранное - Protek Auto</title>
        <meta name="description" content="Ваши избранные товары" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <FavoriteInfo />
      <section className="main">
      
      <div className="w-layout-blockcontainer container w-container">
        <div className="w-layout-hflex flex-block-84">
          <div className="w-layout-hflex flex-block-85" onClick={() => setShowFiltersMobile((v) => !v)}>
            <div className="code-embed-9 w-embed">
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
            </div>
            <div>Фильтры</div>
            {activeFiltersCount > 0 && (
              <div className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {activeFiltersCount}
              </div>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button 
              onClick={handleClearFilters}
              className="text-red-600 hover:text-red-800 text-sm underline ml-4"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
        <FiltersPanelMobile
          filters={dynamicFilters}
          open={showFiltersMobile}
          onClose={() => setShowFiltersMobile(false)}
          onApply={handleApplyFilters}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
        />
      </div>
      </section>
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex cart-list">
            <FavoriteList 
              filters={dynamicFilters}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={setSortBy}
              onSortOrderChange={setSortOrder}
            />
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