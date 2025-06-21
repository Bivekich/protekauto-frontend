import React from "react";
import CartRecommendedProductCard from "./CartRecommendedProductCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface CartRecommendedProps {
  recommendedProducts?: any[];
  isLoadingPrices?: boolean;
}

const CartRecommended: React.FC<CartRecommendedProps> = ({ 
  recommendedProducts = [], 
  isLoadingPrices = false 
}) => {
  // Фильтруем товары - показываем только те, у которых есть предложения или цены
  const validRecommendations = recommendedProducts
    .filter(item => {
      // Проверяем что есть базовые данные
      if (!item || !item.brand || !item.articleNumber) return false;
      
      // Если загружаются цены, показываем товар
      if (isLoadingPrices) return true;
      
      // Показываем только если есть цена или предложения
      return item.minPrice && item.minPrice > 0;
    })
    .slice(0, 5); // Ограничиваем до 5 товаров

  // Если нет валидных рекомендаций и не загружаются данные, не показываем блок
  if (validRecommendations.length === 0 && !isLoadingPrices) {
    return null;
  }

  const formatPrice = (price: number | null, isLoading: boolean = false) => {
    if (isLoading) return "Загрузка...";
    if (!price) return "По запросу";
    return `от ${price.toLocaleString('ru-RU')} ₽`;
  };

  // Скелетон для загрузки
  const RecommendedSkeleton = () => (
    <div className="w-layout-grid grid-10 grid-mobile-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="product-card">
          <div className="image-product-card">
            <Skeleton height={200} />
          </div>
          <div className="content-product-card">
            <div className="text-product-card">
              <Skeleton height={16} style={{ marginBottom: '8px' }} />
              <Skeleton height={14} count={2} style={{ marginBottom: '4px' }} />
            </div>
            <div className="price-product-card">
              <Skeleton height={20} width={100} style={{ marginBottom: '8px' }} />
              <Skeleton height={14} width={80} />
            </div>
            <div className="add-to-cart-block">
              <Skeleton height={16} width={60} style={{ marginRight: '10px' }} />
              <Skeleton height={20} width={80} style={{ marginRight: '10px' }} />
              <div className="w-layout-hflex pcs-copy">
                <Skeleton height={32} width={32} style={{ marginRight: '8px' }} />
                <Skeleton height={32} width={40} style={{ marginRight: '8px' }} />
                <Skeleton height={32} width={32} style={{ marginRight: '8px' }} />
              </div>
              <Skeleton height={32} width={32} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <h2 className="heading-11">Рекомендованные товары</h2>
      {isLoadingPrices && validRecommendations.length === 0 ? (
        <RecommendedSkeleton />
      ) : (
        <div className="w-layout-hflex core-product-search-copy">
          {validRecommendations.map((item, idx) => (
            <CartRecommendedProductCard 
              key={`${item.brand}-${item.articleNumber}-${idx}`} 
              image="/images/image-10.png"
              discount=""
              price={formatPrice(item.minPrice, isLoadingPrices && item.minPrice === undefined)}
              oldPrice=""
              title={item.name || `${item.brand} ${item.articleNumber}`}
              brand={item.brand}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CartRecommended; 