import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListCard from "@/components/ProductListCard";
import Filters, { FilterConfig } from "@/components/Filters";
import FiltersWithSearch from "@/components/FiltersWithoutSearch";
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
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
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

const catalogFilters: FilterConfig[] = [
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

// Фильтры без поиска для PartsAPI режима (заменены на динамические)
// const catalogFiltersWithoutSearch: FilterConfig[] = catalogFilters;

// Количество артикулов для загрузки за раз
const ITEMS_PER_PAGE = 20;

export default function Catalog() {
  const router = useRouter();
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  // const [showSortMobile, setShowSortMobile] = useState(false); // Закомментировано
  const [allArticles, setAllArticles] = useState<PartsAPIArticle[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<PartsAPIArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Получаем параметры из URL для PartsAPI категории
  const { partsApiCategory, categoryName, carId, carType } = router.query;
  const isPartsAPIMode = !!partsApiCategory;

  // console.log('📋 Параметры каталога:', { partsApiCategory, categoryName, carId, carType, isPartsAPIMode });

  // Запрос артикулов PartsAPI если есть категория
  const { data: articlesData, loading: articlesLoading, error: articlesError } = useQuery<PartsAPIArticlesData, PartsAPIArticlesVariables>(
    GET_PARTSAPI_ARTICLES,
    {
      variables: {
        strId: partsApiCategory ? parseInt(partsApiCategory as string) : 0,
        carId: carId ? parseInt(carId as string) : 9877,
        carType: (carType as any) || 'PC'
      },
      skip: !isPartsAPIMode || !partsApiCategory,
      errorPolicy: 'ignore', // Игнорируем ошибки чтобы не ломать UI
      fetchPolicy: 'cache-first', // Используем кеш в первую очередь
      notifyOnNetworkStatusChange: false // Не уведомляем о статусе сети
    }
  );

  // Обновляем все артикулы когда получаем данные
  useEffect(() => {
    if (articlesData?.partsAPIArticles && articlesData.partsAPIArticles.length > 0) {
      // console.log('✅ Получены артикулы PartsAPI:', articlesData.partsAPIArticles.length);
      setAllArticles(articlesData.partsAPIArticles);
      // Показываем первую порцию артикулов
      setVisibleArticles(articlesData.partsAPIArticles.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
  }, [articlesData]);

  // Генерируем динамические фильтры для PartsAPI
  const generatePartsAPIFilters = useCallback((): FilterConfig[] => {
    if (!allArticles.length) return [];

    const brands = new Set<string>();
    const productGroups = new Set<string>();

    allArticles.forEach(article => {
      if (article.artSupBrand) brands.add(article.artSupBrand);
      if (article.productGroup) productGroups.add(article.productGroup);
    });

    const filters: FilterConfig[] = [];

    if (brands.size > 1) {
      filters.push({
        type: "dropdown",
        title: "Производитель",
        options: Array.from(brands).sort(),
        multi: true,
        showAll: true,
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
  }, [allArticles]);

  const dynamicFilters = generatePartsAPIFilters();

  // Обработчик изменений фильтров
  const handleFilterChange = useCallback((filterTitle: string, values: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterTitle]: values
    }));
  }, []);

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
    // Показываем отфильтрованные результаты
    setVisibleArticles(filteredArticles.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [searchQuery, selectedFilters, allArticles]);

  // Функция для загрузки следующей порции артикулов
  const loadMoreArticles = useCallback(() => {
    if (isLoadingMore) return;

    const currentFilteredArticles = filteredArticles;
    if (!currentFilteredArticles.length) return;

    setIsLoadingMore(true);
    
    // Имитируем небольшую задержку для плавности
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      
      const newArticles = currentFilteredArticles.slice(startIndex, endIndex);
      
      if (newArticles.length > 0) {
        setVisibleArticles(prev => [...prev, ...newArticles]);
        setCurrentPage(nextPage);
        // console.log(`✅ Загружена страница ${nextPage}, артикулов: ${newArticles.length}`);
      }
      
      setIsLoadingMore(false);
    }, 300);
  }, [currentPage, filteredArticles, isLoadingMore]);

  // Определяем есть ли еще артикулы для загрузки
  const hasMoreArticles = visibleArticles.length < filteredArticles.length;

  // Hook для бесконечной прокрутки
  const { targetRef } = useInfiniteScroll(loadMoreArticles, {
    hasMore: hasMoreArticles,
    isLoading: isLoadingMore,
    threshold: 0.1,
    rootMargin: '200px'
  });

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
              {/* Закомментированы фильтры сортировки */}
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
            {/* Фильтры для десктопа */}
            <div className="filters-desktop">
              {isPartsAPIMode ? (
                <FiltersWithSearch 
                  filters={dynamicFilters} 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                />
              ) : (
                <Filters filters={catalogFilters} />
              )}
            </div>
            <FiltersPanelMobile
              filters={isPartsAPIMode ? dynamicFilters : catalogFilters}
              open={showFiltersMobile}
              onClose={() => setShowFiltersMobile(false)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
            <div className="w-layout-vflex flex-block-14-copy-copy">
              {/* Закомментированы вкладки сортировки */}
              {/* <CatalogTabs /> */}
              
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
              
              {/* Отображение артикулов PartsAPI с lazy loading */}
              {isPartsAPIMode && visibleArticles.length > 0 && (
                <>
                  {visibleArticles.map((article, idx) => (
                    <ArticleCard
                      key={`${article.artId}_${idx}`}
                      article={article}
                      index={idx}
                    />
                  ))}
                  
                  {/* Элемент-триггер для бесконечной прокрутки */}
                  {hasMoreArticles && (
                    <div ref={targetRef} className="w-full flex justify-center items-center py-8">
                      {isLoadingMore ? (
                        <LoadingSpinner text="Загружаем еще..." />
                      ) : (
                        <div className="text-gray-400">Прокрутите для загрузки еще</div>
                      )}
                    </div>
                  )}
                  
                  {/* Информация о загруженных артикулах */}
                  {!hasMoreArticles && filteredArticles.length > 0 && (
                    <div className="w-full flex justify-center items-center py-8">
                      <div className="text-gray-600 text-center">
                        <div>Показано все {filteredArticles.length} артикулов{searchQuery.trim() || Object.keys(selectedFilters).some(key => selectedFilters[key].length > 0) ? ' по фильтрам' : ''}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          Загружено по {ITEMS_PER_PAGE} артикулов за раз
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Показываем прогресс загрузки */}
                  {visibleArticles.length > 0 && hasMoreArticles && (
                    <div className="w-full flex justify-center items-center py-4">
                      <div className="text-sm text-gray-500">
                        Показано {visibleArticles.length} из {filteredArticles.length} артикулов{searchQuery.trim() || Object.keys(selectedFilters).some(key => selectedFilters[key].length > 0) ? ' по фильтрам' : ''}
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* Стандартные товары если не PartsAPI режим */}
              {!isPartsAPIMode && mockData.map((item, idx) => (
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
              
              {/* Сообщение если нет артикулов */}
              {isPartsAPIMode && !articlesLoading && allArticles.length === 0 && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-lg text-gray-600">
                    Артикулы для данной категории не найдены
                  </div>
                </div>
              )}
              
              {/* Сообщение если поиск не дал результатов */}
              {isPartsAPIMode && !articlesLoading && allArticles.length > 0 && searchQuery.trim() && filteredArticles.length === 0 && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-lg text-gray-600">
                    По запросу "{searchQuery}" ничего не найдено
                  </div>
                </div>
              )}
              
              {/* Пагинация только для не-PartsAPI режима */}
              {!isPartsAPIMode && <CatalogPagination />}
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