import React from "react";
import CartRecommendedProductCard from "./CartRecommendedProductCard";

interface CartRecommendedProps {
  recommendedProducts?: any[];
  isLoadingPrices?: boolean;
}

const CartRecommended: React.FC<CartRecommendedProps> = ({ 
  recommendedProducts = [], 
  isLoadingPrices = false 
}) => {
  // Фильтруем и ограничиваем количество рекомендаций
  const validRecommendations = recommendedProducts
    .filter(item => item && item.brand && item.articleNumber) // Фильтруем только валидные товары
    .slice(0, 5); // Ограничиваем до 5 товаров

  // Если нет валидных рекомендаций, не показываем блок
  if (validRecommendations.length === 0) {
    return null;
  }

  const formatPrice = (price: number | null, isLoading: boolean = false) => {
    if (isLoading) return "Загрузка...";
    if (!price) return "По запросу";
    return `от ${price.toLocaleString('ru-RU')} ₽`;
  };

  return (
    <>
      <h2 className="heading-11">Рекомендованные товары</h2>
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
            articleNumber={item.articleNumber}
            brandName={item.brand}
            artId={item.artId}
          />
        ))}
      </div>
    </>
  );
};

export default CartRecommended; 