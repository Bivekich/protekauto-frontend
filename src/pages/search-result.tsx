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
import InfoSearch from "@/components/InfoSearch";
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

    // Фильтр по сроку доставки
    const deliveryDays: number[] = [];
    result.internalOffers?.forEach((offer: any) => {
      if (offer.deliveryDays && offer.deliveryDays > 0) deliveryDays.push(offer.deliveryDays);
    });
    result.externalOffers?.forEach((offer: any) => {
      if (offer.deliveryTime && offer.deliveryTime > 0) deliveryDays.push(offer.deliveryTime);
    });
    
    // Добавляем сроки доставки аналогов
    Object.values(loadedAnalogs).forEach((analog: any) => {
      analog.internalOffers?.forEach((offer: any) => {
        if (offer.deliveryDays && offer.deliveryDays > 0) deliveryDays.push(offer.deliveryDays);
      });
      analog.externalOffers?.forEach((offer: any) => {
        if (offer.deliveryTime && offer.deliveryTime > 0) deliveryDays.push(offer.deliveryTime);
      });
    });

    if (deliveryDays.length > 0) {
      const minDays = Math.min(...deliveryDays);
      const maxDays = Math.max(...deliveryDays);
      
      if (maxDays > minDays) {
        filters.push({
          type: "range",
          title: "Срок доставки (дни)",
          min: minDays,
          max: maxDays,
        });
      }
    }

    // Фильтр по количеству наличия
    const quantities: number[] = [];
    result.internalOffers?.forEach((offer: any) => {
      if (offer.quantity && offer.quantity > 0) quantities.push(offer.quantity);
    });
    result.externalOffers?.forEach((offer: any) => {
      if (offer.quantity && offer.quantity > 0) quantities.push(offer.quantity);
    });
    
    // Добавляем количества аналогов
    Object.values(loadedAnalogs).forEach((analog: any) => {
      analog.internalOffers?.forEach((offer: any) => {
        if (offer.quantity && offer.quantity > 0) quantities.push(offer.quantity);
      });
      analog.externalOffers?.forEach((offer: any) => {
        if (offer.quantity && offer.quantity > 0) quantities.push(offer.quantity);
      });
    });

    if (quantities.length > 0) {
      const minQuantity = Math.min(...quantities);
      const maxQuantity = Math.max(...quantities);
      
      if (maxQuantity > minQuantity) {
        filters.push({
          type: "range",
          title: "Количество (шт.)",
          min: minQuantity,
          max: maxQuantity,
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
  const usedOfferIds = new Set<string>();

  // 1. Самая низкая цена (среди всех предложений)
  const lowestPriceOffer = [...validOffers].sort((a, b) => a.price - b.price)[0];
  if (lowestPriceOffer) {
    result.push({ offer: lowestPriceOffer, type: 'Самая низкая цена' });
    usedOfferIds.add(`${lowestPriceOffer.articleNumber}-${lowestPriceOffer.price}-${lowestPriceOffer.deliveryDuration}`);
  }

  // 2. Самый дешевый аналог (только среди аналогов)
  const analogOffers = validOffers.filter(offer => offer.isAnalog);
  if (analogOffers.length > 0) {
    const cheapestAnalogOffer = [...analogOffers].sort((a, b) => a.price - b.price)[0];
    const analogId = `${cheapestAnalogOffer.articleNumber}-${cheapestAnalogOffer.price}-${cheapestAnalogOffer.deliveryDuration}`;
    
    if (!usedOfferIds.has(analogId)) {
      result.push({ offer: cheapestAnalogOffer, type: 'Самый дешевый аналог' });
      usedOfferIds.add(analogId);
    }
  }
  
  // 3. Самая быстрая доставка (среди всех предложений)
  const fastestDeliveryOffer = [...validOffers].sort((a, b) => a.deliveryDuration - b.deliveryDuration)[0];
  if (fastestDeliveryOffer) {
    const fastestId = `${fastestDeliveryOffer.articleNumber}-${fastestDeliveryOffer.price}-${fastestDeliveryOffer.deliveryDuration}`;
    
    if (!usedOfferIds.has(fastestId)) {
      result.push({ offer: fastestDeliveryOffer, type: 'Самая быстрая доставка' });
    }
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
  const [deliveryRange, setDeliveryRange] = useState<[number, number] | null>(null);
  const [quantityRange, setQuantityRange] = useState<[number, number] | null>(null);
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
      brand: brandQuery || '' // Используем пустую строку если бренд не указан
    },
    skip: !searchQuery,
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
    result.internalOffers.forEach((o: any) => offers.push({ ...o, deliveryDuration: o.deliveryDays, type: 'internal', brand: result.brand, articleNumber: result.articleNumber, name: result.name }));
    result.externalOffers.forEach((o: any) => offers.push({ ...o, deliveryDuration: o.deliveryTime, type: 'external', articleNumber: o.code, name: o.name }));

    // Аналоги
    Object.values(loadedAnalogs).forEach((analog: any) => {
      analog.internalOffers.forEach((o: any) => offers.push({ ...o, deliveryDuration: o.deliveryDays, type: 'internal', brand: analog.brand, articleNumber: analog.articleNumber, name: analog.name, isAnalog: true }));
      analog.externalOffers.forEach((o: any) => offers.push({ ...o, deliveryDuration: o.deliveryTime, type: 'external', brand: o.brand || analog.brand, articleNumber: o.code || analog.articleNumber, name: o.name, isAnalog: true }));
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
      // Фильтр по сроку доставки
      if (deliveryRange) {
        const deliveryDays = offer.deliveryDuration;
        if (deliveryDays < deliveryRange[0] || deliveryDays > deliveryRange[1]) {
          return false;
        }
      }
      // Фильтр по количеству наличия
      if (quantityRange) {
        const quantity = offer.quantity;
        if (quantity < quantityRange[0] || quantity > quantityRange[1]) {
          return false;
        }
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
  }, [allOffers, selectedBrands, priceRange, deliveryRange, quantityRange, filterSearchTerm]);
  
  const handleFilterChange = (type: string, value: any) => {
    if (type === 'Производитель') {
        setSelectedBrands(value);
    } else if (type === 'Цена (₽)') {
        setPriceRange(value);
    } else if (type === 'Срок доставки (дни)') {
        setDeliveryRange(value);
    } else if (type === 'Количество (шт.)') {
        setQuantityRange(value);
    } else if (type === 'search') {
        setFilterSearchTerm(value);
    }
  };

  const initialOffersExist = allOffers.length > 0;
  
  const filtersAreActive = selectedBrands.length > 0 || priceRange !== null || deliveryRange !== null || quantityRange !== null || filterSearchTerm !== '';

  const hasOffers = result && (result.internalOffers.length > 0 || result.externalOffers.length > 0);
  const hasAnalogs = result && result.analogs.length > 0;
  const searchResultFilters = createFilters(result, loadedAnalogs);
  const bestOffersData = getBestOffers(filteredOffers);



  // Если это поиск по параметру q (из UnitDetailsSection), используем q как article
  useEffect(() => {
    if (q && typeof q === 'string' && !article) {
      setSearchQuery(q.trim().toUpperCase());
      // Определяем бренд из каталога или используем дефолтный
      const catalogFromUrl = router.query.catalog as string;
      const vehicleFromUrl = router.query.vehicle as string;
      
      if (catalogFromUrl) {
        // Маппинг каталогов к брендам
        const catalogToBrandMap: { [key: string]: string } = {
          'AU1587': 'AUDI',
          'VW1587': 'VOLKSWAGEN',
          'BMW1587': 'BMW',
          'MB1587': 'MERCEDES-BENZ',
          // Добавьте другие маппинги по необходимости
        };
        
        setBrandQuery(catalogToBrandMap[catalogFromUrl] || '');
      } else {
        setBrandQuery('');
      }
    }
  }, [q, article, router.query]);

  // Удаляем старую заглушку - теперь обрабатываем все типы поиска

  const minPrice = useMemo(() => {
    if (result && result.minPrice) return result.minPrice;
    if (allOffers.length > 0) {
      const prices = allOffers.filter(o => o.price > 0).map(o => o.price);
      if (prices.length > 0) {
        return `${Math.min(...prices).toLocaleString('ru-RU')} ₽`;
      }
    }
    return "-";
  }, [result, allOffers]);

  if (loading) {
    return (
      <>
        <Head>
          <title>Поиск предложений {searchQuery} - Protek</title>
        </Head>

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
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <InfoSearch
        brand={result ? result.brand : brandQuery}
        articleNumber={result ? result.articleNumber : searchQuery}
        name={result ? result.name : "деталь"}
        offersCount={result ? result.totalOffers : 0}
        minPrice={minPrice}
      />
      <section className="main">
      <div className="w-layout-blockcontainer container w-container">
        <div className="w-layout-hflex flex-block-84">
          {/* <CatalogSortDropdown active={sortActive} onChange={setSortActive} /> */}
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
      </div>
      </section>
      {/* Мобильная панель фильтров */}
      <FiltersPanelMobile
        filters={searchResultFilters}
        open={showFiltersMobile}
        onClose={() => setShowFiltersMobile(false)}
        searchQuery={filterSearchTerm}
        onSearchChange={(value) => handleFilterChange('search', value)}
      />
      {/* Лучшие предложения */}
      {bestOffersData.length > 0 && (
        <section className="section-6">
          <div className="w-layout-blockcontainer container w-container">
            <div className="w-layout-vflex flex-block-36">
              {bestOffersData.map(({ offer, type }, index) => (
                <BestPriceCard
                  key={`best-${type}-${index}`}
                  bestOfferType={type}
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
            <div style={{ width: '300px', marginRight: '20px' }}>
              <Filters 
                filters={searchResultFilters}
                onFilterChange={handleFilterChange}
                filterValues={{
                  'Производитель': selectedBrands,
                  'Цена (₽)': priceRange,
                  'Срок доставки (дни)': deliveryRange,
                  'Количество (шт.)': quantityRange
                }}
                searchQuery={filterSearchTerm}
                onSearchChange={(value) => handleFilterChange('search', value)}
              />
            </div>

            {/* Основной товар */}
            <div className="w-layout-vflex flex-block-14-copy">
              {hasOffers && result && (() => {
                const mainProductOffers = transformOffersForCard(
                  filteredOffers.filter(o => !o.isAnalog)
                );
                
                // Не показываем основной товар, если у него нет предложений
                if (mainProductOffers.length === 0) {
                  return null;
                }

                return (
                  <>
                    <CoreProductCard
                      brand={result.brand}
                      article={result.articleNumber}
                      name={result.name}
                      image={mainImageUrl}
                      offers={mainProductOffers}
                      showMoreText={mainProductOffers.length < filteredOffers.filter(o => !o.isAnalog).length ? "Показать еще" : undefined}
                    />
                  </>
                );
              })()}
              
              {/* Аналоги */}
              {hasAnalogs && result && (() => {
                // Фильтруем аналоги с предложениями
                const analogsWithOffers = result.analogs.slice(0, visibleAnalogsCount).filter((analog: any) => {
                  const analogKey = `${analog.brand}-${analog.articleNumber}`;
                  const loadedAnalogData = loadedAnalogs[analogKey];
                  
                  if (!loadedAnalogData) {
                    return true; // Показываем загружающиеся аналоги
                  }
                  
                  const analogOffers = transformOffersForCard(
                    filteredOffers.filter(o => o.isAnalog && o.articleNumber === analog.articleNumber)
                  );
                  
                  // Показываем аналог только если у него есть предложения
                  return analogOffers.length > 0;
                });

                // Если нет аналогов с предложениями, не показываем секцию
                if (analogsWithOffers.length === 0) {
                  return null;
                }
                return (
                  <>
                    <h2 className="heading-11">Аналоги</h2>
                    {analogsWithOffers.map((analog: any, index: number) => {
                      const analogKey = `${analog.brand}-${analog.articleNumber}`;
                      const loadedAnalogData = loadedAnalogs[analogKey];
                      
                      const analogOffers = loadedAnalogData 
                        ? transformOffersForCard(
                            filteredOffers.filter(o => o.isAnalog && o.articleNumber === analog.articleNumber)
                          ) 
                        : [];

                      return (
                        <CoreProductCard
                            key={analogKey}
                            brand={analog.brand}
                            article={analog.articleNumber}
                            name={analog.name}
                            offers={analogOffers}
                            isAnalog
                            isLoadingOffers={!loadedAnalogData}
                        />
                      )
                    })}

                    {(() => {
                      // Проверяем, есть ли еще аналоги с предложениями для загрузки
                      const remainingAnalogs = result.analogs.slice(visibleAnalogsCount);
                      const hasMoreAnalogsWithOffers = remainingAnalogs.some((analog: any) => {
                        const analogKey = `${analog.brand}-${analog.articleNumber}`;
                        const loadedAnalogData = loadedAnalogs[analogKey];
                        
                        if (!loadedAnalogData) {
                          return true; // Могут быть предложения у незагруженных аналогов
                        }
                        
                        const analogOffers = transformOffersForCard(
                          filteredOffers.filter(o => o.isAnalog && o.articleNumber === analog.articleNumber)
                        );
                        
                        return analogOffers.length > 0;
                      });

                      return hasMoreAnalogsWithOffers && (
                        <div className="w-layout-hflex pagination">
<button
  onClick={() => setVisibleAnalogsCount(prev => prev + ANALOGS_CHUNK_SIZE)}
  disabled={analogsLoading}
  className="button_strock w-button"
>
  {analogsLoading ? "Загружаем..." : "Показать еще"}
</button>
</div>
                      );
                    })()}
                  </>
                );
              })()}
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
