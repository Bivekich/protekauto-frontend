import React from "react";

interface ProductInfoProps {
  offer?: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ offer }) => {
  if (!offer) {
    return (
      <div className="w-layout-hflex info-block-search">
        <div className="text-center py-4 text-gray-500">
          Нет данных о предложении
        </div>
      </div>
    );
  }

  // Форматируем срок доставки
  const formatDeliveryTime = (deliveryTime: number | string) => {
    const days = typeof deliveryTime === 'string' ? parseInt(deliveryTime) : deliveryTime;
    
    if (!days || days === 0) {
      return "Сегодня";
    } else if (days === 1) {
      return "Завтра";
    } else if (days <= 3) {
      return `${days} дня`;
    } else if (days <= 7) {
      return `${days} дней`;
    } else {
      return `${days} дней`;
    }
  };

  return (
    <div className="w-layout-hflex info-block-search">
      {/* Иконки рекомендации (если есть) */}
      <div className="w-layout-hflex info-block-product-card-search">
        {offer.recommended && (
          <>
            <div className="w-layout-hflex item-recommend-copy">
              <img loading="lazy" src="/images/ri_refund-fill_1.svg" alt="Рекомендуем" />
            </div>
            <div className="w-layout-hflex item-recommend-copy">
              <img loading="lazy" src="/images/mdi_approve.svg" alt="Проверено" />
            </div>
            <div className="w-layout-hflex item-recommend-copy">
              <img loading="lazy" src="/images/ri_refund-fill.svg" alt="Гарантия" className="image-16" />
            </div>
          </>
        )}
      </div>
      
      {/* Срок доставки */}
      <div className="delivery-time-search">
        {formatDeliveryTime(offer.deliveryTime || offer.deliveryDays || 0)}
      </div>
    </div>
  );
};

export default ProductInfo; 