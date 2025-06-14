import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface CoreProductCardOffer {
  id?: string;
  productId?: string;
  offerKey?: string;
  rating: string;
  pcs: string;
  days: string;
  recommended?: boolean;
  price: string;
  count: string;
  isExternal?: boolean;
  currency?: string;
  warehouse?: string;
  supplier?: string;
  deliveryTime?: number;
}

interface CoreProductCardProps {
  brand: string;
  article: string;
  name: string;
  image?: string;
  offers: CoreProductCardOffer[];
  showMoreText?: string;
}

const CoreProductCard: React.FC<CoreProductCardProps> = ({ 
  brand, 
  article, 
  name, 
  image, 
  offers, 
  showMoreText 
}) => {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    offers.reduce((acc, _, index) => ({ ...acc, [index]: 1 }), {})
  );

  // Функция для парсинга цены из строки
  const parsePrice = (priceStr: string): number => {
    const cleanPrice = priceStr.replace(/[^\d.,]/g, '').replace(',', '.');
    return parseFloat(cleanPrice) || 0;
  };

  // Функция для парсинга времени доставки
  const parseDeliveryTime = (daysStr: string): string => {
    const match = daysStr.match(/\d+/);
    return match ? `${match[0]} дней` : daysStr;
  };

  const handleQuantityChange = (index: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + delta)
    }));
  };

  const handleAddToCart = (offer: CoreProductCardOffer, index: number) => {
    const quantity = quantities[index] || 1;
    const numericPrice = parsePrice(offer.price);

    addItem({
      productId: offer.productId,
      offerKey: offer.offerKey,
      name: name,
      description: `${brand} ${article} - ${name}`,
      brand: brand,
      article: article,
      price: numericPrice,
      currency: offer.currency || 'RUB',
      quantity: quantity,
      deliveryTime: parseDeliveryTime(offer.days),
      warehouse: offer.warehouse || 'Склад',
      supplier: offer.supplier || (offer.isExternal ? 'AutoEuro' : 'Protek'),
      isExternal: offer.isExternal || false,
      image: image,
    });

    // Показываем уведомление о добавлении
    alert(`Товар "${brand} ${article}" добавлен в корзину (${quantity} шт.)`);
  };

  return (
    <div className="w-layout-hflex core-product-search-s1"> 
      <div className="w-layout-hflex core-product-search-s1">
        <div className="w-layout-vflex core-product-s1">
          <div className="w-layout-vflex flex-block-47">
            <div className="div-block-19">
              <img src="/images/info.svg" loading="lazy" alt="info" className="image-9" />
            </div>
            <div className="w-layout-vflex flex-block-50">
              <div className="w-layout-hflex flex-block-79">
                <h3 className="heading-10 name">{brand}</h3>
                <h3 className="heading-10">{article}</h3>
              </div>
              <div className="text-block-21">{name}</div>
            </div>
          </div>
          {image && (
            <div className="div-block-20">
              <img src={image} loading="lazy" alt={name} className="image-10" />
            </div>
          )}
        </div>
        <div className="w-layout-vflex flex-block-48-copy">
          <div className="w-layout-hflex sort-list-s1">
            <div className="w-layout-hflex flex-block-49">
              <div className="sort-item first">Рейтинг</div>
              <div className="sort-item">Наличие</div>
              <div className="sort-item">Доставка</div>
            </div>
            <div className="sort-item price">Цена</div>
          </div>
          <div className="w-layout-vflex product-list-search-s1">
            {offers.map((offer, idx) => (
              <div className="w-layout-hflex product-item-search-s1" key={idx}>
                <div className="w-layout-hflex flex-block-81">
                  <div className="w-layout-hflex info-block-search-s1">
                    <div className="w-layout-hflex raiting">
                      <img src="/images/Star-1.svg" loading="lazy" alt="" className="image-8" />
                      <div className="text-block-22">{offer.rating}</div>
                    </div>
                    <div className="pcs-search-s1">{offer.pcs}</div>
                    <div className="pcs-search">{offer.days}</div>
                  </div>
                  <div className="w-layout-hflex info-block-product-card-search-s1">
                    {offer.recommended && (
                      <>
                        <div className="w-layout-hflex item-recommend">
                          <img src="/images/ri_refund-fill.svg" loading="lazy" alt="" />
                        </div>
                        <div className="text-block-25-s1">Рекомендуем</div>
                      </>
                    )}
                  </div>
                  <div className="price-s1">{offer.price}</div>
                </div>
                <div className="w-layout-hflex add-to-cart-block-s1">
                  <div className="w-layout-hflex flex-block-82">
                    <div className="w-layout-hflex pcs-re-s1">
                      <div 
                        className="minus-plus" 
                        onClick={() => handleQuantityChange(idx, -1)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img src="/images/minus_icon.svg" loading="lazy" alt="-" />
                      </div>
                      <div className="input-pcs">
                        <div className="text-block-26">{quantities[idx] || 1}</div>
                      </div>
                      <div 
                        className="minus-plus"
                        onClick={() => handleQuantityChange(idx, 1)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img src="/images/plus_icon.svg" loading="lazy" alt="+" />
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(offer, idx)}
                      className="button-icon w-inline-block"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <div className="div-block-26">
                        <img loading="lazy" src="/images/cart_icon.svg" alt="В корзину" className="image-11" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showMoreText && (
        <div className="w-layout-hflex show-more-search">
          <div className="text-block-27">{showMoreText}</div>
          <img src="/images/arrow_drop_down.svg" loading="lazy" alt="" />
        </div>
      )}
    </div>
  );
};

export default CoreProductCard; 