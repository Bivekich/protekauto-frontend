import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListCard from "@/components/ProductListCard";
import Filters, { FilterConfig } from "@/components/Filters";
import FiltersWithSearch from "@/components/FiltersWithSearch";
import CatalogProductCard from "@/components/CatalogProductCard";
import CatalogPagination from "@/components/CatalogPagination";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import CatalogInfoHeader from "@/components/CatalogInfoHeader";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import FiltersPanelMobile from '@/components/FiltersPanelMobile';
import MobileMenuBottomSection from '../components/MobileMenuBottomSection';
import { GET_PARTSAPI_ARTICLES, GET_PARTSAPI_MAIN_IMAGE, SEARCH_PRODUCT_OFFERS } from '@/lib/graphql';
import { PartsAPIArticlesData, PartsAPIArticlesVariables, PartsAPIArticle, PartsAPIMainImageData, PartsAPIMainImageVariables } from '@/types/partsapi';
import LoadingSpinner from '@/components/LoadingSpinner';
import ArticleCard from '@/components/ArticleCard';

const mockData = Array(12).fill({
  image: "/images/image-10.png",
  discount: "-35%",
  price: "от 17 087 ₽",
  oldPrice: "22 347 ₽",
  title: 'Аккумуляторная батарея TYUMEN BATTERY "STANDARD", 6CT-60L, 60',
  brand: "Borsehung",
});

const ITEMS_PER_PAGE = 20;
const MAX_BRANDS_DISPLAY = 10; // Сколько брендов показывать изначально

export default function Catalog() {
  const router = useRouter();
  const { partsApiCategory: strId, categoryName } = router.query;
  
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showSortMobile, setShowSortMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({});
  const [visibleArticles, setVisibleArticles] = useState<PartsAPIArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [catalogFilters, setCatalogFilters] = useState<FilterConfig[]>([]);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [sortActive, setSortActive] = useState(0);

  // Определяем режим работы
  const isPartsAPIMode = Boolean(strId && categoryName);

  // Загружаем артикулы PartsAPI
  const { data: articlesData, loading: articlesLoading, error: articlesError } = useQuery<PartsAPIArticlesData, PartsAPIArticlesVariables>(
    GET_PARTSAPI_ARTICLES,
    {
      variables: {
        strId: parseInt(strId as string),
        carId: 9877,
        carType: 'PC'
      },
      skip: !isPartsAPIMode,
      fetchPolicy: 'cache-first'
    }
  );

  const allArticles = articlesData?.partsAPIArticles || [];

  useEffect(() => {
    if (articlesData?.partsAPIArticles) {
      setVisibleArticles(articlesData.partsAPIArticles.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
  }, [articlesData]);

  useEffect(() => {
    fetch("/api/catalog-filters")
      .then((res) => res.json())
      .then((data) => {
        setCatalogFilters(data.filters);
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  }, []);

  // Генерируем динамические фильтры для PartsAPI
  const generatePartsAPIFilters = useCallback((): FilterConfig[] => {
    if (!allArticles.length) return [];

    const brandCounts = new Map<string, number>();
    const productGroups = new Set<string>();

    // Подсчитываем количество товаров для каждого бренда
    allArticles.forEach(article => {
      if (article.artSupBrand) {
        brandCounts.set(article.artSupBrand, (brandCounts.get(article.artSupBrand) || 0) + 1);
      }
      if (article.productGroup) productGroups.add(article.productGroup);
    });

    const filters: FilterConfig[] = [];

    if (brandCounts.size > 1) {
      // Сортируем бренды по количеству товаров (по убыванию)
      const sortedBrands = Array.from(brandCounts.entries())
        .sort((a, b) => b[1] - a[1]) // Сортируем по количеству товаров
        .map(([brand]) => brand);

      // Показываем либо первые N брендов, либо все (если нажата кнопка "Показать еще")
      const brandsToShow = showAllBrands ? sortedBrands : sortedBrands.slice(0, MAX_BRANDS_DISPLAY);

              filters.push({
          type: "dropdown",
          title: "Производитель",
          options: brandsToShow.sort(), // Сортируем по алфавиту для удобства
          multi: true,
          showAll: true,
          hasMore: !showAllBrands && sortedBrands.length > MAX_BRANDS_DISPLAY,
          onShowMore: () => setShowAllBrands(true)
        });
    }

    if (productGroups.size > 1) {
      filters.push({
        type: "dropdown",
        title: "Группа товаров",
        options: Array.from(productGroups).sort(),
        multi: true,
        showAll: true,
      });
    }

    return filters;
  }, [allArticles, showAllBrands]);

  const dynamicFilters = generatePartsAPIFilters();

  // Обработчик изменения фильтров для десктопа
  const handleDesktopFilterChange = useCallback((filterTitle: string, newValues: string[]) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterTitle] || [];
      // Сравниваем содержимое, чтобы избежать ненужных обновлений
      if (JSON.stringify(currentValues) === JSON.stringify(newValues)) {
        return prev;
      }
      return {
        ...prev,
        [filterTitle]: newValues
      };
    });
  }, []);
  
  // Обработчик для мобильной панели
  const handleMobileFilterChange = (type: string, value: any) => {
    if (type === 'search') {
      setSearchQuery(value);
    } else {
      // Для dropdown и range
      setSelectedFilters(prev => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  // Фильтрация по поиску и фильтрам
  const filteredArticles = useMemo(() => {
    return allArticles.filter(article => {
      // Фильтрация по поиску
      if (searchQuery.trim()) {
        const searchLower = searchQuery.toLowerCase();
        const articleTitle = [
          article.artSupBrand || '',
          article.artArticleNr || '',
          article.productGroup || ''
        ].join(' ').toLowerCase();
        
        if (!articleTitle.includes(searchLower)) {
          return false;
        }
      }
      
      // Фильтрация по выбранным фильтрам
      const brandFilter = selectedFilters['Производитель'] || [];
      if (brandFilter.length > 0 && !brandFilter.includes(article.artSupBrand || '')) {
        return false;
      }
      
      const groupFilter = selectedFilters['Группа товаров'] || [];
      if (groupFilter.length > 0 && !groupFilter.includes(article.productGroup || '')) {
        return false;
      }
      
      return true;
    });
  }, [allArticles, searchQuery, selectedFilters]);

  // Обновляем видимые артикулы при изменении поиска или фильтров
  useEffect(() => {
    setVisibleArticles(filteredArticles.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
    setIsLoadingMore(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, JSON.stringify(selectedFilters)]);

  // Функция для загрузки следующей порции артикулов по кнопке
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      
      const newArticles = filteredArticles.slice(startIndex, endIndex);
      
      if (newArticles.length > 0) {
        setVisibleArticles(prev => [...prev, ...newArticles]);
        setCurrentPage(nextPage);
      }
      
      setIsLoadingMore(false);
    }, 300);
  }, [currentPage, filteredArticles, isLoadingMore]);

  // Определяем есть ли еще артикулы для загрузки
  const hasMoreArticles = visibleArticles.length < filteredArticles.length;

  if (filtersLoading) {
    return <div className="py-8 text-center">Загрузка фильтров...</div>;
  }

  return (
    <>
      <Head>
        <title>Catalog</title>
        <meta name="description" content="Catalog" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <CatalogInfoHeader
        title={isPartsAPIMode ? decodeURIComponent(categoryName as string || 'Запчасти') : "Аккумуляторы"}
        count={isPartsAPIMode ? filteredArticles.length : 3587}
        productName={isPartsAPIMode ? "запчасть" : "аккумулятор"}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Каталог" },
          ...(isPartsAPIMode ? [{ label: decodeURIComponent(categoryName as string || 'Запчасти') }] : [])
        ]}
        showCount={true}
        showProductHelp={true}
      />
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-hflex flex-block-13">
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
              </div>
            </div>
            {isPartsAPIMode ? (
                <div className="filters-desktop">
                  <Filters
                    filters={dynamicFilters}
                    onFilterChange={handleDesktopFilterChange}
                    filterValues={selectedFilters}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </div>
            ) : (
                <div className="filters-desktop">
                    <Filters
                        filters={catalogFilters}
                        onFilterChange={handleDesktopFilterChange}
                        filterValues={selectedFilters}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>
            )}
            <FiltersPanelMobile
              open={showFiltersMobile}
              onClose={() => setShowFiltersMobile(false)}
              filters={isPartsAPIMode ? dynamicFilters : catalogFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <div className="w-layout-vflex flex-block-14-copy-copy">
              {/* Индикатор загрузки для PartsAPI */}
              {isPartsAPIMode && articlesLoading && (
                <div className="flex justify-center items-center py-8">
                  <LoadingSpinner size="lg" text="Загружаем артикулы..." />
                </div>
              )}
              
              {/* Сообщение об ошибке */}
              {isPartsAPIMode && articlesError && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-lg text-red-600">Ошибка загрузки артикулов: {articlesError.message}</div>
                </div>
              )}
              
              {/* Отображение артикулов PartsAPI */}
              {isPartsAPIMode && visibleArticles.length > 0 && (
                <>
                  {visibleArticles.map((article, idx) => (
                    <ArticleCard
                      key={`${article.artId}_${idx}`}
                      article={article}
                      index={idx}
                    />
                  ))}
                  
                  {/* Кнопка "Показать еще" */}
                  {hasMoreArticles && (
                    <div className="w-layout-hflex pagination">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="button_strock w-button"
                      >
                        {isLoadingMore ? (
                          <>
            
                            Загружаем...
                          </>
                        ) : (
                          <>
                            Показать еще
                            <span className="">
                              ({Math.min(ITEMS_PER_PAGE, filteredArticles.length - visibleArticles.length)})
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
              
              {/* Пустое состояние для PartsAPI */}
              {isPartsAPIMode && !articlesLoading && !articlesError && visibleArticles.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-gray-500 text-lg mb-4">Товары не найдены</div>
                  <div className="text-gray-400 text-sm">Попробуйте изменить фильтры или поисковый запрос</div>
                </div>
              )}
              
              {/* Обычные товары (не PartsAPI) */}
              {!isPartsAPIMode && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-gray-500 text-lg mb-4">Раздел в разработке</div>
                  <div className="text-gray-400 text-sm">Данные для этой категории скоро появятся.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {!isPartsAPIMode && <CatalogPagination />}
      <section className="section-3">
        <CatalogSubscribe />
      </section>
      <Footer />
      <MobileMenuBottomSection />
    </>
  );
} 