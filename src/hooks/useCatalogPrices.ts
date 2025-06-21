import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/CartContext';

interface PriceData {
  minPrice: number | null;
  cheapestOffer: any | null;
  isLoading: boolean;
  hasOffers: boolean;
}

interface UseCatalogPricesReturn {
  getPriceData: (articleNumber: string, brand: string) => PriceData;
  addToCart: (articleNumber: string, brand: string) => Promise<void>;
}

export const useCatalogPrices = (): UseCatalogPricesReturn => {
  const [priceCache, setPriceCache] = useState<Map<string, PriceData>>(new Map());
  const loadingRequestsRef = useRef<Set<string>>(new Set());
  const { addItem } = useCart();

  const getOffersData = useCallback(async (articleNumber: string, brand: string) => {
    const graphqlUri = process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL || 'http://localhost:3000/api/graphql';
    
    console.log('🔍 useCatalogPrices: запрос цен для:', { articleNumber, brand, graphqlUri });
    
    try {
      const response = await fetch(graphqlUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query SearchProductOffers($articleNumber: String!, $brand: String!) {
              searchProductOffers(articleNumber: $articleNumber, brand: $brand) {
                internalOffers {
                  id
                  productId
                  price
                  quantity
                  warehouse
                  deliveryDays
                  available
                  rating
                  supplier
                }
                externalOffers {
                  offerKey
                  brand
                  code
                  name
                  price
                  currency
                  deliveryTime
                  deliveryTimeMax
                  quantity
                  warehouse
                  supplier
                  comment
                  weight
                  volume
                  canPurchase
                }
              }
            }
          `,
          variables: {
            articleNumber,
            brand
          }
        })
      });

      console.log('📡 useCatalogPrices: HTTP статус ответа:', response.status);

      if (!response.ok) {
        console.error('❌ useCatalogPrices: HTTP ошибка:', response.status, response.statusText);
        return { minPrice: null, cheapestOffer: null, hasOffers: false };
      }

      const data = await response.json();
      console.log('📦 useCatalogPrices: получен ответ:', data);
      
      // Если есть ошибки GraphQL, логируем их
      if (data.errors) {
        console.error('❌ useCatalogPrices: GraphQL ошибки:', data.errors);
        return { minPrice: null, cheapestOffer: null, hasOffers: false };
      }
      
      const offers = data?.data?.searchProductOffers;
      console.log('🔍 useCatalogPrices: извлеченные предложения:', offers);
      
      if (!offers) {
        console.log('⚠️ useCatalogPrices: предложения не найдены');
        return { minPrice: null, cheapestOffer: null, hasOffers: false };
      }

      const allOffers: any[] = [];
      
      // Обрабатываем внутренние предложения
      if (offers.internalOffers) {
        console.log('📦 useCatalogPrices: обрабатываем внутренние предложения:', offers.internalOffers.length);
        offers.internalOffers.forEach((offer: any) => {
          if (offer.price && offer.price > 0) {
            allOffers.push({ 
              ...offer, 
              type: 'internal',
              id: offer.id,
              supplierName: offer.supplier,
              deliveryDays: offer.deliveryDays
            });
          }
        });
      }
      
      // Обрабатываем внешние предложения
      if (offers.externalOffers) {
        console.log('🌐 useCatalogPrices: обрабатываем внешние предложения:', offers.externalOffers.length);
        offers.externalOffers.forEach((offer: any) => {
          if (offer.price && offer.price > 0) {
            allOffers.push({ 
              ...offer, 
              type: 'external',
              id: offer.offerKey,
              supplierName: offer.supplier,
              deliveryDays: offer.deliveryTime || offer.deliveryTimeMax || 0
            });
          }
        });
      }

      console.log('🎯 useCatalogPrices: итого найдено предложений:', allOffers.length);

      // Проверяем, есть ли вообще какие-то предложения (даже без цены)
      const hasAnyOffers = (offers.internalOffers && offers.internalOffers.length > 0) || 
                          (offers.externalOffers && offers.externalOffers.length > 0);

      if (allOffers.length === 0) {
        console.log('⚠️ useCatalogPrices: нет валидных предложений с ценой > 0');
        return { minPrice: null, cheapestOffer: null, hasOffers: hasAnyOffers };
      }

      // Находим самое дешевое предложение
      const cheapestOffer = allOffers.reduce((cheapest, current) => {
        return current.price < cheapest.price ? current : cheapest;
      });

      console.log('💰 useCatalogPrices: самое дешевое предложение:', {
        price: cheapestOffer.price,
        supplier: cheapestOffer.supplierName,
        type: cheapestOffer.type
      });

      return {
        minPrice: cheapestOffer.price,
        cheapestOffer,
        hasOffers: true
      };
    } catch (error) {
      console.error('❌ useCatalogPrices: ошибка получения предложений:', error);
      return { minPrice: null, cheapestOffer: null, hasOffers: false };
    }
  }, []);

  const getPriceData = useCallback((articleNumber: string, brand: string): PriceData => {
    if (!articleNumber || !brand) {
      return { minPrice: null, cheapestOffer: null, isLoading: false, hasOffers: false };
    }

    const key = `${brand}-${articleNumber}`;
    const cached = priceCache.get(key);
    
    if (cached) {
      return cached;
    }

    // Проверяем, не загружается ли уже этот товар
    if (loadingRequestsRef.current.has(key)) {
      return { minPrice: null, cheapestOffer: null, isLoading: true, hasOffers: false };
    }

    // Устанавливаем состояние загрузки
    const loadingState: PriceData = { minPrice: null, cheapestOffer: null, isLoading: true, hasOffers: false };
    setPriceCache(prev => new Map(prev).set(key, loadingState));
    loadingRequestsRef.current.add(key);

    // Загружаем данные асинхронно
    getOffersData(articleNumber, brand).then(({ minPrice, cheapestOffer, hasOffers }) => {
      const finalState: PriceData = { minPrice, cheapestOffer, isLoading: false, hasOffers };
      setPriceCache(prev => new Map(prev).set(key, finalState));
      loadingRequestsRef.current.delete(key);
    }).catch((error) => {
      console.error('❌ useCatalogPrices: ошибка загрузки цены:', error);
      const errorState: PriceData = { minPrice: null, cheapestOffer: null, isLoading: false, hasOffers: false };
      setPriceCache(prev => new Map(prev).set(key, errorState));
      loadingRequestsRef.current.delete(key);
    });

    return loadingState;
  }, [priceCache, getOffersData]);

  const addToCart = useCallback(async (articleNumber: string, brand: string) => {
    const key = `${brand}-${articleNumber}`;
    const cached = priceCache.get(key);
    
    let cheapestOffer = cached?.cheapestOffer;
    
    // Если нет кэшированного предложения, загружаем
    if (!cheapestOffer) {
      const { cheapestOffer: offer } = await getOffersData(articleNumber, brand);
      cheapestOffer = offer;
    }

    if (!cheapestOffer) {
      toast.error('Не удалось найти предложения для этого товара');
      return;
    }

    // Добавляем в корзину самое дешевое предложение
    try {
      const itemToAdd = {
        productId: cheapestOffer.type === 'internal' ? cheapestOffer.id : undefined,
        offerKey: cheapestOffer.type === 'external' ? cheapestOffer.id : undefined,
        name: `${brand} ${articleNumber}`,
        description: `${brand} ${articleNumber}`,
        brand: brand,
        article: articleNumber,
        price: cheapestOffer.price,
        currency: cheapestOffer.currency || 'RUB',
        quantity: 1,
        deliveryTime: cheapestOffer.deliveryDays?.toString() || '0',
        warehouse: cheapestOffer.warehouse || 'Склад',
        supplier: cheapestOffer.supplierName || 'Неизвестный поставщик',
        isExternal: cheapestOffer.type === 'external',
        image: '/images/image-10.png', // Можно добавить изображение позже
      };

      addItem(itemToAdd);
      
      // Показываем уведомление
      toast.success(`Товар "${brand} ${articleNumber}" добавлен в корзину за ${cheapestOffer.price} ₽`);
      
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
      toast.error('Ошибка добавления товара в корзину');
    }
  }, [priceCache, getOffersData, addItem]);

  return {
    getPriceData,
    addToCart
  };
}; 