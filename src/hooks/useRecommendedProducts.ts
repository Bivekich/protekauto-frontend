import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

interface RecommendedProduct {
  brand: string;
  articleNumber: string;
  name?: string;
  artId?: string;
  minPrice?: number | null;
}

export const useRecommendedProducts = (analogs: any[] = []) => {
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastAnalogsKeyRef = useRef<string>('');

  // Мемоизируем аналоги для избежания бесконечного цикла
  const memoizedAnalogs = useMemo(() => {
    if (!analogs || analogs.length === 0) return [];
    return analogs.slice(0, 5).map(analog => ({
      brand: analog?.brand || '',
      articleNumber: analog?.articleNumber || '',
      name: analog?.name || '',
      artId: analog?.artId || ''
    })).filter(analog => analog.brand && analog.articleNumber); // Фильтруем только валидные
  }, [analogs]);

  // Создаем стабильный ключ для сравнения
  const analogsKey = useMemo(() => {
    return memoizedAnalogs.map(a => `${a.brand}-${a.articleNumber}`).join('|');
  }, [memoizedAnalogs]);

  // Функция для получения минимальной цены товара
  const getMinPrice = useCallback(async (articleNumber: string, brand: string): Promise<number | null> => {
    try {
      const graphqlUri = process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL || 'http://localhost:3000/api/graphql';
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
                  price
                }
                externalOffers {
                  price
                }
              }
            }
          `,
          variables: {
            articleNumber: articleNumber,
            brand: brand
          }
        })
      });

      const data = await response.json();
      const offers = data?.data?.searchProductOffers;
      
      if (!offers) return null;

      const allPrices: number[] = [];
      
      if (offers.internalOffers) {
        offers.internalOffers.forEach((offer: any) => {
          if (offer.price && offer.price > 0) {
            allPrices.push(offer.price);
          }
        });
      }
      
      if (offers.externalOffers) {
        offers.externalOffers.forEach((offer: any) => {
          if (offer.price && offer.price > 0) {
            allPrices.push(offer.price);
          }
        });
      }

      return allPrices.length > 0 ? Math.min(...allPrices) : null;
    } catch (error) {
      console.error('Ошибка получения цены для товара:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const loadRecommendedPrices = async () => {
      // Если нет аналогов
      if (memoizedAnalogs.length === 0) {
        setRecommendedProducts([]);
        setIsLoading(false);
        return;
      }

      // Если ключ не изменился, не загружаем повторно
      if (analogsKey === lastAnalogsKeyRef.current) {
        return;
      }

      lastAnalogsKeyRef.current = analogsKey;
      setIsLoading(true);

      try {
        const productsWithPrices = await Promise.all(
          memoizedAnalogs.map(async (analog) => {
            const minPrice = await getMinPrice(analog.articleNumber, analog.brand);
            return {
              brand: analog.brand,
              articleNumber: analog.articleNumber,
              name: analog.name,
              artId: analog.artId,
              minPrice: minPrice
            };
          })
        );

        setRecommendedProducts(productsWithPrices);
      } catch (error) {
        console.error('Ошибка загрузки рекомендуемых товаров:', error);
        setRecommendedProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendedPrices();
  }, [analogsKey, getMinPrice]); // Убираем memoizedAnalogs из зависимостей

  return {
    recommendedProducts,
    isLoading
  };
}; 