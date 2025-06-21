import React from "react";
import ProductItemCard from "./ProductItemCard";
import ProductListSkeleton from "./ProductListSkeleton";

interface ProductListProps {
  offers?: any[];
  isLoading?: boolean;
}

const ProductList = ({ offers = [], isLoading = false }: ProductListProps) => {
  // Показываем скелетон во время загрузки
  if (isLoading) {
    return <ProductListSkeleton count={4} />;
  }

  // Фильтруем предложения - показываем только те, у которых есть цена
  const validOffers = offers.filter(offer => offer && offer.price && offer.price > 0);

  // Если нет валидных предложений
  if (validOffers.length === 0) {
    return (
      <div className="w-layout-vflex product-list-search">
        <div className="text-center py-8">
          <p className="text-gray-500">Предложения с ценами не найдены</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-layout-vflex product-list-search">
      {validOffers.map((offer, idx) => (
        <ProductItemCard 
          key={`${offer.type}-${offer.id || idx}`} 
          offer={offer}
          isLast={idx === validOffers.length - 1} 
        />
      ))}
    </div>
  );
};

export default ProductList; 