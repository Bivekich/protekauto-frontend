import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
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
import { SEARCH_PRODUCT_OFFERS } from "@/lib/graphql";

const sortOptions = [
  "По цене",
  "По рейтингу",
  "По количеству"
];

// Функция для создания динамических фильтров
const createFilters = (result: any): FilterConfig[] => {
  const filters: FilterConfig[] = [];

  if (result) {
    // Фильтр по производителю
    const brands = new Set<string>();
    brands.add(result.brand);
    
    result.externalOffers?.forEach((offer: any) => {
      if (offer.brand) brands.add(offer.brand);
    });
    
    result.analogs?.forEach((analog: any) => {
      if (analog.brand) brands.add(analog.brand);
    });

    if (brands.size > 1) {
      filters.push({
        type: "dropdown",
        title: "Производитель",
        options: Array.from(brands).sort(),
        multi: true,
        showAll: true,
      });
    }

    // Фильтр по цене
    const prices: number[] = [];
    result.internalOffers?.forEach((offer: any) => {
      if (offer.price > 0) prices.push(offer.price);
    });
    result.externalOffers?.forEach((offer: any) => {
      if (offer.price > 0) prices.push(offer.price);
    });
    
    // Добавляем цены аналогов
    result.analogs?.forEach((analog: any) => {
      analog.internalOffers?.forEach((offer: any) => {
        if (offer.price > 0) prices.push(offer.price);
      });
      analog.externalOffers?.forEach((offer: any) => {
        if (offer.price > 0) prices.push(offer.price);
      });
    });

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
  }

  return filters;
};

// Функция для получения лучших предложений (самые дешевые среди всех)
const getBestOffers = (result: any) => {
  const allOffers: any[] = [];
  
  // Добавляем основные предложения
  result?.internalOffers?.forEach((offer: any) => {
    allOffers.push({
      ...offer,
      type: 'internal',
      brand: result.brand,
      articleNumber: result.articleNumber,
      name: result.name,
      rating: offer.rating?.toString() || "4.8"
    });
  });
  
  result?.externalOffers?.forEach((offer: any) => {
    allOffers.push({
      ...offer,
      type: 'external',
      brand: offer.brand,
      articleNumber: offer.code,
      name: offer.name,
      rating: "4.5"
    });
  });
  
  // Добавляем предложения аналогов
  result?.analogs?.forEach((analog: any) => {
    analog.internalOffers?.forEach((offer: any) => {
      allOffers.push({
        ...offer,
        type: 'internal',
        brand: analog.brand,
        articleNumber: analog.articleNumber,
        name: analog.name,
        rating: offer.rating?.toString() || "4.8",
        isAnalog: true
      });
    });
    
    analog.externalOffers?.forEach((offer: any) => {
      allOffers.push({
        ...offer,
        type: 'external',
        brand: offer.brand || analog.brand,
        articleNumber: offer.code || analog.articleNumber,
        name: offer.name || analog.name,
        rating: "4.5",
        isAnalog: true
      });
    });
  });
  
  // Сортируем по цене (сначала самые дешевые)
  return allOffers
    .filter(offer => offer.price > 0)
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);
};

export default function SearchResult() {
  const router = useRouter();
  const { article, brand, q } = router.query;
  
  const [sortActive, setSortActive] = useState(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showSortMobile, setShowSortMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [brandQuery, setBrandQuery] = useState<string>("");

  useEffect(() => {
    if (article && typeof article === 'string') {
      setSearchQuery(article.trim().toUpperCase());
    }
    if (brand && typeof brand === 'string') {
      setBrandQuery(brand.trim());
    }
  }, [article, brand]);

  // Запрос поиска предложений только если есть артикул и бренд
  const { data, loading, error } = useQuery(SEARCH_PRODUCT_OFFERS, {
    variables: {
      articleNumber: searchQuery,
      brand: brandQuery
    },
    skip: !searchQuery || !brandQuery,
    errorPolicy: 'all'
  });

  // Если это обычный поиск (не по артикулу), показываем заглушку
  if (q && !article) {
    return (
      <>
        <Head>
          <title>Результаты поиска - Protek</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Поиск по запросу "{q}"</h2>
            <p className="text-gray-600">Функция поиска по тексту находится в разработке</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Поиск предложений {searchQuery} - Protek</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Поиск предложений...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const result = data?.searchProductOffers;
  const hasOffers = result && (result.internalOffers.length > 0 || result.externalOffers.length > 0);
  const hasAnalogs = result && result.analogs.length > 0;
  const searchResultFilters = createFilters(result);

  // Отладочная информация
  console.log('🔍 Search Result Debug:', {
    result,
    hasOffers,
    internalOffers: result?.internalOffers?.length || 0,
    externalOffers: result?.externalOffers?.length || 0,
    analogs: result?.analogs?.length || 0
  });

  // Обработка ошибок
  if (error) {
    return (
      <>
        <Head>
          <title>Ошибка поиска - Protek</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Произошла ошибка при поиске</h2>
            <p className="text-gray-600 mb-6">Попробуйте повторить поиск позже или обратитесь в службу поддержки</p>
            <button
              onClick={() => router.back()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Вернуться назад
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
        title={result ? `${result.brand} ${result.articleNumber}` : `${brandQuery} ${searchQuery}`}
        count={result ? result.totalOffers : 0}
        productName={result ? result.name : "деталь"}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Поиск деталей по артикулу", href: `/article-search?article=${searchQuery}` },
          { label: "Предложения" }
        ]}
        showCount={true}
        showProductHelp={false}
      />
      <div className="w-layout-blockcontainer container w-container">
        <div className="w-layout-hflex flex-block-84">
          <CatalogSortDropdown active={sortActive} onChange={setSortActive} />
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
      </div>
      {/* Мобильная панель фильтров */}
      <FiltersPanelMobile
        filters={searchResultFilters}
        open={showFiltersMobile}
        onClose={() => setShowFiltersMobile(false)}
      />
      {/* Лучшие предложения */}
      {hasOffers && (
        <section>
          <div className="w-layout-blockcontainer container w-container">
            <div className="w-layout-vflex flex-block-36">
              {/* Показываем лучшие предложения (самые дешевые среди всех) */}
              {getBestOffers(result).map((offer: any, index: number) => (
                <BestPriceCard
                  key={`best-${offer.type}-${offer.id || offer.offerKey || index}`}
                  rating={offer.rating}
                  title={`${offer.brand} ${offer.articleNumber}${offer.isAnalog ? ' (аналог)' : ''}`}
                  description={offer.name}
                  price={`${offer.price.toLocaleString()} ₽`}
                  delivery={offer.type === 'internal' 
                    ? `${offer.deliveryDays} ${offer.deliveryDays === 1 ? 'день' : 'дней'}`
                    : `${offer.deliveryTime} ${offer.deliveryTime === 1 ? 'день' : 'дней'}`
                  }
                  stock={`${offer.quantity} шт.`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Если нет предложений, показываем сообщение */}
      {!hasOffers && !loading && (
        <section>
          <div className="w-layout-blockcontainer container w-container">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                К сожалению, предложений по данному артикулу не найдено
              </h3>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить параметры поиска или обратитесь к нашим менеджерам
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Телефон: +7 (495) 123-45-67</p>
                <p className="text-sm text-gray-500">Email: info@protek.ru</p>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-hflex flex-block-13-copy">
            {/* Фильтры для десктопа */}
            <div className="filters-desktop">
              <Filters filters={searchResultFilters} />
            </div>

            {/* Основной товар */}
            <div className="w-layout-vflex flex-block-14-copy">
              {hasOffers && result && (
                <div className="w-layout-hflex core-product-search-s1">
                  {!result.hasInternalStock && (
                    <div className="w-full mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-yellow-800 font-medium">
                          Данный товар доступен только под заказ через внешних поставщиков
                        </span>
                      </div>
                    </div>
                  )}
                  <CoreProductCard
                    brand={result.brand}
                    article={result.articleNumber}
                    name={result.name}
                    image="/images/image-10.png"
                    offers={[
                      // Внутренние предложения
                      ...result.internalOffers.map((offer: any) => ({
                        id: offer.id,
                        productId: offer.productId,
                        rating: offer.rating?.toString() || "4.8",
                        pcs: `${offer.quantity} шт`,
                        days: `${offer.deliveryDays} ${offer.deliveryDays === 1 ? 'день' : 'дней'}`,
                        recommended: offer.available,
                        price: `${offer.price.toLocaleString()} ₽`,
                        count: "1",
                        isExternal: false,
                        currency: "RUB",
                        warehouse: offer.warehouse,
                        supplier: offer.supplier,
                        deliveryTime: offer.deliveryDays
                      })),
                      // Внешние предложения
                      ...result.externalOffers.slice(0, 5).map((offer: any) => ({
                        offerKey: offer.offerKey,
                        rating: "4.5",
                        pcs: `${offer.quantity} шт`,
                        days: `${offer.deliveryTime} ${offer.deliveryTime === 1 ? 'день' : 'дней'}`,
                        recommended: false,
                        price: `${offer.price.toLocaleString()} ₽ ${!result.hasInternalStock ? '(под заказ)' : ''}`,
                        count: "1",
                        isExternal: true,
                        currency: offer.currency,
                        warehouse: offer.warehouse,
                        supplier: offer.supplier,
                        deliveryTime: offer.deliveryTime
                      }))
                    ]}
                    showMoreText={result.externalOffers.length > 5 ? 
                      `Ещё ${result.externalOffers.length - 5} предложений` : undefined}
                  />
                </div>
              )}
              
              {/* Аналоги */}
              {hasAnalogs && result && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Аналоги от других производителей</h3>
                  {result.analogs.slice(0, 3).map((analog: any, index: number) => (
                    <div key={`analog-${index}`} className="mb-6">
                      <CoreProductCard
                        brand={analog.brand}
                        article={analog.articleNumber}
                        name={analog.name}
                        image={undefined}
                        offers={[
                          // Внутренние предложения аналога
                          ...analog.internalOffers.map((offer: any) => ({
                            id: offer.id,
                            productId: offer.productId,
                            rating: offer.rating?.toString() || "4.8",
                            pcs: `${offer.quantity} шт`,
                            days: `${offer.deliveryDays} ${offer.deliveryDays === 1 ? 'день' : 'дней'}`,
                            recommended: offer.available,
                            price: `${offer.price.toLocaleString()} ₽`,
                            count: "1",
                            isExternal: false,
                            currency: "RUB",
                            warehouse: offer.warehouse,
                            supplier: offer.supplier,
                            deliveryTime: offer.deliveryDays
                          })),
                          // Внешние предложения аналога
                          ...analog.externalOffers.slice(0, 3).map((offer: any) => ({
                            offerKey: offer.offerKey,
                            rating: "4.5",
                            pcs: `${offer.quantity} шт`,
                            days: `${offer.deliveryTime} ${offer.deliveryTime === 1 ? 'день' : 'дней'}`,
                            recommended: false,
                            price: `${offer.price.toLocaleString()} ₽`,
                            count: "1",
                            isExternal: true,
                            currency: offer.currency,
                            warehouse: offer.warehouse,
                            supplier: offer.supplier,
                            deliveryTime: offer.deliveryTime
                          }))
                        ]}
                        showMoreText={analog.externalOffers.length > 3 ? 
                          `Ещё ${analog.externalOffers.length - 3} предложений` : undefined}
                      />
                    </div>
                  ))}
                </div>
              )}
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
