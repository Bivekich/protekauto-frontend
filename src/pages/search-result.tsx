import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
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
import { SEARCH_PRODUCT_OFFERS, GET_ANALOG_OFFERS } from "@/lib/graphql";
import { useArticleImage } from "@/hooks/useArticleImage";

const ANALOGS_CHUNK_SIZE = 5;

const sortOptions = [
  "По цене",
  "По рейтингу",
  "По количеству"
];

// Функция для создания динамических фильтров
const createFilters = (result: any, loadedAnalogs: any): FilterConfig[] => {
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
    Object.values(loadedAnalogs).forEach((analog: any) => {
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

// Функция для получения лучших предложений по заданным критериям
const getBestOffers = (offers: any[]) => {
  const validOffers = offers.filter(offer => offer.price > 0 && typeof offer.deliveryDuration !== 'undefined');
  if (validOffers.length === 0) return [];

  const result: { offer: any; type: string }[] = [];

  // 1. Самая низкая цена
  const lowestPriceOffer = [...validOffers].sort((a, b) => a.price - b.price)[0];
  if (lowestPriceOffer) {
    result.push({ offer: lowestPriceOffer, type: 'Самая низкая цена' });
  }

  // 2. Самый дешевый аналог
  const analogOffers = validOffers.filter(offer => offer.isAnalog);
  if (analogOffers.length > 0) {
    const cheapestAnalogOffer = [...analogOffers].sort((a, b) => a.price - b.price)[0];
    result.push({ offer: cheapestAnalogOffer, type: 'Самый дешевый аналог' });
  }
  
  // 3. Лучший срок доставки
  const fastestDeliveryOffer = [...validOffers].sort((a, b) => a.deliveryDuration - b.deliveryDuration)[0];
  if (fastestDeliveryOffer) {
    result.push({ offer: fastestDeliveryOffer, type: 'Лучший срок доставки' });
  }
  
  return result;
};

const transformOffersForCard = (offers: any[]) => {
  return offers.map(offer => {
    const isExternal = offer.type === 'external';
    return {
      id: offer.id,
      productId: offer.productId,
      offerKey: offer.offerKey,
      rating: offer.rating?.toString() || (isExternal ? "4.5" : "4.8"),
      pcs: `${offer.quantity} шт.`,
      days: `${isExternal ? offer.deliveryTime : offer.deliveryDays} дн.`,
      recommended: !isExternal && offer.available,
      price: `${offer.price.toLocaleString('ru-RU')} ₽`,
      count: "1",
      isExternal,
      currency: offer.currency || "RUB",
      warehouse: offer.warehouse,
      supplier: offer.supplier,
      deliveryTime: isExternal ? offer.deliveryTime : offer.deliveryDays,
    };
  });
};

export default function SearchResult() {
  const router = useRouter();
  const { article, brand, q, artId } = router.query;
  
  const [sortActive, setSortActive] = useState(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showSortMobile, setShowSortMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [brandQuery, setBrandQuery] = useState<string>("");
  const [loadedAnalogs, setLoadedAnalogs] = useState<{ [key: string]: any }>({});
  const [visibleAnalogsCount, setVisibleAnalogsCount] = useState(ANALOGS_CHUNK_SIZE);

  // Состояния для фильтров
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>('');

  useEffect(() => {
    if (article && typeof article === 'string') {
      setSearchQuery(article.trim().toUpperCase());
    }
    if (brand && typeof brand === 'string') {
      setBrandQuery(brand.trim());
    }
    setLoadedAnalogs({});
    setVisibleAnalogsCount(ANALOGS_CHUNK_SIZE);
  }, [article, brand]);

  const { data, loading, error } = useQuery(SEARCH_PRODUCT_OFFERS, {
    variables: {
      articleNumber: searchQuery,
      brand: brandQuery
    },
    skip: !searchQuery || !brandQuery,
    errorPolicy: 'all'
  });
  
  const { imageUrl: mainImageUrl } = useArticleImage(artId as string, { enabled: !!artId });

  const [
    getAnalogOffers,
    { loading: analogsLoading, data: analogsData }
  ] = useLazyQuery(GET_ANALOG_OFFERS, {
    onCompleted: (data) => {
      if (data && data.getAnalogOffers) {
        const newAnalogs = data.getAnalogOffers.reduce((acc: any, analog: any) => {
          const key = `${analog.brand}-${analog.articleNumber}`;
          // Сразу трансформируем, но пока не используем
          // const offers = transformOffersForCard(analog.internalOffers, analog.externalOffers);
          acc[key] = { ...analog }; // offers убрали, т.к. allOffers - единый источник
          return acc;
        }, {});
        setLoadedAnalogs(prev => ({ ...prev, ...newAnalogs }));
      }
    }
  });

  // Эффект для автоматической загрузки предложений видимых аналогов
  useEffect(() => {
    if (data?.searchProductOffers?.analogs) {
      const analogsToLoad = data.searchProductOffers.analogs
        .slice(0, visibleAnalogsCount)
        .filter((a: any) => !loadedAnalogs[`${a.brand}-${a.articleNumber}`])
        .map((a: any) => ({ brand: a.brand, articleNumber: a.articleNumber }));

      if (analogsToLoad.length > 0) {
        getAnalogOffers({ variables: { analogs: analogsToLoad } });
      }
    }
  }, [visibleAnalogsCount, data, getAnalogOffers, loadedAnalogs]);

  const result = data?.searchProductOffers;

  const allOffers = useMemo(() => {
    if (!result) return [];
    
    const offers: any[] = [];
    
    // Основной товар
    result.internalOffers.forEach((o: any) => offers.push({ ...o, deliveryDuration: o.deliveryDays, rating: o.rating?.toString() || "4.8", type: 'internal', brand: result.brand, articleNumber: result.articleNumber, name: result.name }));
    result.externalOffers.forEach((o: any) => offers.push({ ...o, deliveryDuration: o.deliveryTime, rating: "4.5", type: 'external', articleNumber: o.code, name: o.name }));

    // Аналоги
    Object.values(loadedAnalogs).forEach((analog: any) => {
      analog.internalOffers.forEach((o: any) => offers.push({ ...o, deliveryDuration: o.deliveryDays, rating: o.rating?.toString() || "4.8", type: 'internal', brand: analog.brand, articleNumber: analog.articleNumber, name: analog.name, isAnalog: true }));
      analog.externalOffers.forEach((o: any) => offers.push({ ...o, deliveryDuration: o.deliveryTime, rating: "4.5", type: 'external', brand: o.brand || analog.brand, articleNumber: o.code || analog.articleNumber, name: o.name, isAnalog: true }));
    });
    
    return offers;
  }, [result, loadedAnalogs]);


  const filteredOffers = useMemo(() => {
    return allOffers.filter(offer => {
      // Фильтр по бренду
      if (selectedBrands.length > 0 && !selectedBrands.includes(offer.brand)) {
        return false;
      }
      // Фильтр по цене
      if (priceRange && (offer.price < priceRange[0] || offer.price > priceRange[1])) {
        return false;
      }
      // Фильтр по поисковой строке
      if (filterSearchTerm) {
        const searchTerm = filterSearchTerm.toLowerCase();
        const brandMatch = offer.brand.toLowerCase().includes(searchTerm);
        const articleMatch = offer.articleNumber.toLowerCase().includes(searchTerm);
        const nameMatch = offer.name.toLowerCase().includes(searchTerm);
        if (!brandMatch && !articleMatch && !nameMatch) {
          return false;
        }
      }
      return true;
    });
  }, [allOffers, selectedBrands, priceRange, filterSearchTerm]);
  
  const handleFilterChange = (type: string, value: any) => {
    if (type === 'Производитель') {
        setSelectedBrands(value);
    } else if (type === 'Цена (₽)') {
        setPriceRange(value);
    } else if (type === 'search') {
        setFilterSearchTerm(value);
    }
  };

  const initialOffersExist = allOffers.length > 0;
  
  const filtersAreActive = selectedBrands.length > 0 || priceRange !== null || filterSearchTerm !== '';

  const hasOffers = result && (result.internalOffers.length > 0 || result.externalOffers.length > 0);
  const hasAnalogs = result && result.analogs.length > 0;
  const searchResultFilters = createFilters(result, loadedAnalogs);
  const bestOffersData = getBestOffers(filteredOffers);

  // Отладочная информация
  console.log('🔍 Search Result Debug:', {
    result,
    hasOffers,
    internalOffers: result?.internalOffers?.length || 0,
    externalOffers: result?.externalOffers?.length || 0,
    analogs: result?.analogs?.length || 0,
    loadedAnalogs: Object.keys(loadedAnalogs).length,
    allOffersCount: allOffers.length,
    filteredOffersCount: filteredOffers.length
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

  return (
    <>
      <Head>
        <title>{result ? `${result.brand} ${result.articleNumber} - ${result.name}` : `Результаты поиска`} - Protek</title>
        <meta name="description" content={`Лучшие предложения и аналоги для ${result?.name}`} />
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
          { label: "Поиск деталей по артикулу", href: `/search?q=${searchQuery}&mode=parts` },
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
        onFilterChange={handleFilterChange}
        initialValues={{
          'Производитель': selectedBrands,
          'Цена (₽)': priceRange
        }}
      />
      {/* Лучшие предложения */}
      {bestOffersData.length > 0 && (
        <section>
          <div className="w-layout-blockcontainer container w-container">
            <div className="w-layout-vflex flex-block-36">
              {bestOffersData.map(({ offer, type }, index) => (
                <BestPriceCard
                  key={`best-${type}-${index}`}
                  bestOfferType={type}
                  rating={offer.rating}
                  title={`${offer.brand} ${offer.articleNumber}${offer.isAnalog ? ' (аналог)' : ''}`}
                  description={offer.name}
                  price={`${offer.price.toLocaleString()} ₽`}
                  delivery={`${offer.deliveryDuration} ${offer.deliveryDuration === 1 ? 'день' : 'дней'}`}
                  stock={`${offer.quantity} шт.`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Если нет предложений после фильтрации, но они были изначально */}
      {initialOffersExist && filteredOffers.length === 0 && !loading && (
        <section>
          <div className="w-layout-blockcontainer container w-container">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Нет предложений, соответствующих вашим фильтрам
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить или сбросить фильтры.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Если изначально не было предложений */}
      {!initialOffersExist && !loading && (
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
              <Filters 
                filters={searchResultFilters}
                onFilterChange={handleFilterChange}
                filterValues={{
                  'Производитель': selectedBrands,
                  'Цена (₽)': priceRange
                }}
              />
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
                    image={mainImageUrl}
                    offers={transformOffersForCard(
                      filteredOffers.filter(o => !o.isAnalog)
                    )}
                  />
                </div>
              )}
              
              {/* Аналоги */}
              {hasAnalogs && result && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Аналоги</h2>
                  {result.analogs.slice(0, visibleAnalogsCount).map((analog: any, index: number) => {
                    const analogKey = `${analog.brand}-${analog.articleNumber}`;
                    const loadedAnalogData = loadedAnalogs[analogKey];
                    
                    const analogOffers = loadedAnalogData 
                      ? transformOffersForCard(
                          filteredOffers.filter(o => o.isAnalog && o.articleNumber === analog.articleNumber)
                        ) 
                      : [];

                    // Скрываем аналог, только если фильтры активны и они убрали все его предложения
                    if (filtersAreActive && loadedAnalogData && analogOffers.length === 0) {
                      return null;
                    }

                    return (
                      <div key={analogKey} className="mb-6">
                          <CoreProductCard
                              brand={analog.brand}
                              article={analog.articleNumber}
                              name={analog.name}
                              offers={analogOffers}
                              isAnalog
                              isLoadingOffers={!loadedAnalogData}
                          />
                      </div>
                    )
                  })}

                  {visibleAnalogsCount < result.analogs.length && (
                     <button
                      onClick={() => setVisibleAnalogsCount(prev => prev + ANALOGS_CHUNK_SIZE)}
                      disabled={analogsLoading}
                      className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                    >
                      {analogsLoading ? 'Загрузка...' : 'Показать еще аналоги'}
                    </button>
                  )}
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
