import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const INITIAL_OFFERS_LIMIT = 5;

interface CoreProductCardOffer {
  id?: string;
  productId?: string;
  offerKey?: string;
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
  isAnalog?: boolean;
  isLoadingOffers?: boolean;
  onLoadOffers?: () => void;
}

const CoreProductCard: React.FC<CoreProductCardProps> = ({ 
  brand, 
  article, 
  name, 
  image, 
  offers, 
  showMoreText, 
  isAnalog = false,
  isLoadingOffers = false,
  onLoadOffers
}) => {
  const { addItem } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [visibleOffersCount, setVisibleOffersCount] = useState(INITIAL_OFFERS_LIMIT);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    offers.reduce((acc, _, index) => ({ ...acc, [index]: 1 }), {})
  );
  const [quantityErrors, setQuantityErrors] = useState<{ [key: number]: string }>({});

  const displayedOffers = offers.slice(0, visibleOffersCount);
  const hasMoreOffers = visibleOffersCount < offers.length;

  // Проверяем, есть ли товар в избранном
  const isItemFavorite = isFavorite(
    offers[0]?.productId, 
    offers[0]?.offerKey, 
    article, 
    brand
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

  // Функция для парсинга количества в наличии
  const parseStock = (stockStr: string): number => {
    const match = stockStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const handleQuantityInput = (index: number, value: string) => {
    const offer = offers[index];
    const availableStock = parseStock(offer.pcs);
    let num = parseInt(value, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > availableStock) {
      window.alert(`Максимум ${availableStock} шт.`);
      return;
    }
    setQuantities(prev => ({ ...prev, [index]: num }));
  };

  const handleAddToCart = (offer: CoreProductCardOffer, index: number) => {
    const quantity = quantities[index] || 1;
    const availableStock = parseStock(offer.pcs);
    
    // Проверяем наличие
    if (quantity > availableStock) {
      alert(`Недостаточно товара в наличии. Доступно: ${availableStock} шт.`);
      return;
    }

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

  // Обработчик клика по сердечку
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isItemFavorite) {
      // Создаем ID для удаления
      const id = `${offers[0]?.productId || offers[0]?.offerKey || ''}:${article}:${brand}`;
      removeFromFavorites(id);
    } else {
      // Добавляем в избранное
      const bestOffer = offers[0]; // Берем первое предложение как лучшее
      const numericPrice = bestOffer ? parsePrice(bestOffer.price) : 0;
      
      addToFavorites({
        productId: bestOffer?.productId,
        offerKey: bestOffer?.offerKey,
        name: name,
        brand: brand,
        article: article,
        price: numericPrice,
        currency: bestOffer?.currency || 'RUB',
        image: image
      });
    }
  };

  if (isLoadingOffers) {
    return (
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
        </div>
        <div className="w-layout-vflex flex-block-48-copy items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-2 text-gray-500">Загрузка предложений...</p>
        </div>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
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
            <div className="w-layout-vflex flex-block-48-copy items-center justify-center">
                {onLoadOffers ? (
                     <button
                        onClick={onLoadOffers}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Загрузить предложения
                    </button>
                ) : (
                    <p className="text-gray-500">Предложений не найдено.</p>
                )}
            </div>
        </div>
    );
  }

  return (
    <>
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
                <div 
                  className="favorite-icon w-embed" 
                  onClick={handleFavoriteClick} 
                  style={{ cursor: 'pointer', marginLeft: '10px', color: isItemFavorite ? '#e53935' : undefined }}
                >
                  <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M15 25L13.405 23.5613C7.74 18.4714 4 15.1035 4 10.9946C4 7.6267 6.662 5 10.05 5C11.964 5 13.801 5.88283 15 7.26703C16.199 5.88283 18.036 5 19.95 5C23.338 5 26 7.6267 26 10.9946C26 15.1035 22.26 18.4714 16.595 23.5613L15 25Z" 
                      fill={isItemFavorite ? "#e53935" : "currentColor"}
                    />
                  </svg>
                </div>
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
              <div className="sort-item first">Наличие</div>
              <div className="sort-item">Доставка</div>
            </div>
            <div className="sort-item price">Цена</div>
          </div>
          <div className="w-layout-vflex product-list-search-s1">
            {displayedOffers.map((offer, idx) => {
              const isLast = idx === displayedOffers.length - 1;
              return (
                <div 
                  className="w-layout-hflex product-item-search-s1"
                  key={idx}
                  style={isLast ? { borderBottom: 'none' } : undefined}
                >
                  <div className="w-layout-hflex flex-block-81">
                    <div className="w-layout-hflex info-block-search-s1">
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
                      <div className="w-layout-hflex pcs-cart-s1">
                        <button
                          type="button"
                          className="minus-plus"
                          onClick={() => handleQuantityInput(idx, ((quantities[idx] || 1) - 1).toString())}
                          style={{ cursor: 'pointer' }}
                          aria-label="Уменьшить количество"
                        >
                          <div className="pluspcs w-embed">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 10.5V9.5H14V10.5H6Z" fill="currentColor" />
                            </svg>
                          </div>
                        </button>
                        <div className="input-pcs">
                          <input
                            type="number"
                            min={1}
                            max={parseStock(offer.pcs)}
                            value={quantities[idx] || 1}
                            onChange={e => handleQuantityInput(idx, e.target.value)}
                            className="text-block-26 w-full text-center outline-none"
                            aria-label="Количество"
                          />
                        </div>
                        <button
                          type="button"
                          className="minus-plus"
                          onClick={() => handleQuantityInput(idx, ((quantities[idx] || 1) + 1).toString())}
                          style={{ cursor: 'pointer' }}
                          aria-label="Увеличить количество"
                        >
                          <div className="pluspcs w-embed">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 10.5V9.5H14V10.5H6ZM9.5 6H10.5V14H9.5V6Z" fill="currentColor" />
                            </svg>
                          </div>
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(offer, idx)}
                        className="button-icon w-inline-block"
                        style={{ cursor: 'pointer' }}
                        aria-label="Добавить в корзину"
                      >
                        <div className="div-block-26">
                          <img loading="lazy" src="/images/cart_icon.svg" alt="В корзину" className="image-11" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {hasMoreOffers || visibleOffersCount > INITIAL_OFFERS_LIMIT ? (
            <div 
              className="w-layout-hflex show-more-search"
              onClick={() => {
                if (hasMoreOffers) {
                  setVisibleOffersCount(prev => Math.min(prev + 10, offers.length));
                } else {
                  setVisibleOffersCount(INITIAL_OFFERS_LIMIT);
                }
              }}
              style={{ cursor: 'pointer' }}
              tabIndex={0}
              role="button"
              aria-label={hasMoreOffers ? `Еще ${offers.length - visibleOffersCount} предложений` : 'Скрыть предложения'}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (hasMoreOffers) {
                    setVisibleOffersCount(prev => Math.min(prev + 10, offers.length));
                  } else {
                    setVisibleOffersCount(INITIAL_OFFERS_LIMIT);
                  }
                }
              }}
            >
              <div className="text-block-27">
                {hasMoreOffers ? `Еще ${offers.length - visibleOffersCount} предложений` : 'Скрыть'}
              </div>
              <img 
                src="/images/arrow_drop_down.svg" 
                loading="lazy" 
                alt="" 
                className={`transition-transform duration-200 ${!hasMoreOffers ? 'rotate-180' : ''}`}
              />
            </div>
          ) : null}
        </div>
      </div>

    </>
  );
};

export default CoreProductCard; 