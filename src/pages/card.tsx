import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import CatalogSubscribe from "@/components/CatalogSubscribe";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CartRecommended from "@/components/CartRecommended";
import InfoCard from "@/components/card/InfoCard";  
import ProductImageGallery from "@/components/card/ProductImageGallery";
import ProductSortHeader from "@/components/card/ProductSortHeader";
import ProductList from "@/components/card/ProductList";
import ShowMoreOffers from "@/components/card/ShowMoreOffers";
import ProductCharacteristics from "@/components/card/ProductCharacteristics";
import ProductDescriptionTabs from "@/components/card/ProductDescriptionTabs";
import { SEARCH_PRODUCT_OFFERS } from "@/lib/graphql";
import { useArticleImage } from "@/hooks/useArticleImage";
import { useRecommendedProducts } from "../hooks/useRecommendedProducts";

const INITIAL_OFFERS_COUNT = 4;

export default function CardPage() {
  const router = useRouter();
  const { article, brand, q, artId } = router.query;
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [brandQuery, setBrandQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("price"); // price, quantity, delivery
  const [visibleOffersCount, setVisibleOffersCount] = useState(INITIAL_OFFERS_COUNT);

  useEffect(() => {
    if (article && typeof article === 'string') {
      setSearchQuery(article.trim().toUpperCase());
    }
    if (brand && typeof brand === 'string') {
      setBrandQuery(brand.trim());
    }
    setVisibleOffersCount(INITIAL_OFFERS_COUNT);
  }, [article, brand]);

  const { data, loading, error } = useQuery(SEARCH_PRODUCT_OFFERS, {
    variables: {
      articleNumber: searchQuery,
      brand: brandQuery || ''
    },
    skip: !searchQuery,
    errorPolicy: 'all'
  });
  
  const { imageUrl: mainImageUrl } = useArticleImage(artId as string, { enabled: !!artId });

  const result = data?.searchProductOffers;

  // Используем хук для рекомендуемых товаров
  const { recommendedProducts, isLoading: isLoadingRecommendedPrices } = useRecommendedProducts(result?.analogs);

  // Если это поиск по параметру q, используем q как article
  useEffect(() => {
    if (q && typeof q === 'string' && !article) {
      setSearchQuery(q.trim().toUpperCase());
      const catalogFromUrl = router.query.catalog as string;
      
      if (catalogFromUrl) {
        const catalogToBrandMap: { [key: string]: string } = {
          'AU1587': 'AUDI',
          'VW1587': 'VOLKSWAGEN',
          'BMW1587': 'BMW',
          'MB1587': 'MERCEDES-BENZ',
        };
        
        setBrandQuery(catalogToBrandMap[catalogFromUrl] || '');
      } else {
        setBrandQuery('');
      }
    }
  }, [q, article, router.query]);

  // Собираем и сортируем все предложения (БЕЗ аналогов)
  const allOffers = useMemo(() => {
    if (!result) return [];
    
    const offers: any[] = [];
    
    // Добавляем только предложения основного товара (НЕ аналоги)
    if (result.internalOffers) {
      result.internalOffers.forEach((offer: any) => {
        // Показываем только предложения с ценой больше 0
        if (offer.price && offer.price > 0) {
          offers.push({
            ...offer,
            type: 'internal',
            brand: result.brand,
            articleNumber: result.articleNumber,
            name: result.name,
            isAnalog: false,
            deliveryTime: offer.deliveryDays,
            sortPrice: offer.price
          });
        }
      });
    }
    
    if (result.externalOffers) {
      result.externalOffers.forEach((offer: any) => {
        // Показываем только предложения с ценой больше 0
        if (offer.price && offer.price > 0) {
          offers.push({
            ...offer,
            type: 'external',
            brand: offer.brand || result.brand,
            articleNumber: offer.code || result.articleNumber,
            name: offer.name || result.name,
            isAnalog: false,
            deliveryTime: offer.deliveryTime,
            sortPrice: offer.price
          });
        }
      });
    }

    // Сортировка предложений
    const sortedOffers = [...offers].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.sortPrice - b.sortPrice;
        case 'quantity':
          return (b.quantity || 0) - (a.quantity || 0);
        case 'delivery':
          return (a.deliveryTime || 999) - (b.deliveryTime || 999);
        default:
          return a.sortPrice - b.sortPrice;
      }
    });
    
    return sortedOffers;
  }, [result, sortBy]);

  // Видимые предложения
  const visibleOffers = allOffers.slice(0, visibleOffersCount);
  const hasMoreOffers = allOffers.length > visibleOffersCount;

  const handleShowMoreOffers = () => {
    setVisibleOffersCount(prev => Math.min(prev + 4, allOffers.length));
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setVisibleOffersCount(INITIAL_OFFERS_COUNT); // Сбрасываем к начальному количеству
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Загрузка товара - Protek</title>
          <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
          <link href="images/webclip.png" rel="apple-touch-icon" />
        </Head>
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Загрузка данных товара...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{result ? `${result.brand} ${result.articleNumber} - ${result.name}` : `Карточка товара`} - Protek</title>
        <meta name="description" content={`Подробная информация о товаре ${result?.name}`} />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <InfoCard 
        brand={result ? result.brand : brandQuery}
        articleNumber={result ? result.articleNumber : searchQuery}
        name={result ? result.name : "деталь"}
      />
      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex flex-block-14">
            <div className="w-layout-hflex core-product-card-copy">
              <ProductImageGallery imageUrl={mainImageUrl} />
              <div className="w-layout-vflex flex-block-48">
                <ProductSortHeader 
                  brand={result ? result.brand : brandQuery}
                  articleNumber={result ? result.articleNumber : searchQuery}
                  name={result ? result.name : "деталь"}
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                />
                <ProductList 
                  offers={visibleOffers}
                  isLoading={loading}
                />
                <ShowMoreOffers 
                  hasMoreOffers={hasMoreOffers}
                  onShowMore={handleShowMoreOffers}
                  remainingCount={allOffers.length - visibleOffersCount}
                />
                <div className="w-layout-vflex description-item">
                  <ProductDescriptionTabs 
                    result={result}
                  />
                  <ProductCharacteristics 
                    result={result}
                  />
                </div>
              </div>
            </div>
            <CartRecommended 
              recommendedProducts={recommendedProducts}
              isLoadingPrices={isLoadingRecommendedPrices}
            />
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