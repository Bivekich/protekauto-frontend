import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface ProductListCardProps {
  id?: string;
  productId?: string;
  offerKey?: string;
  image: string;
  title: string;
  brand: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  stock?: string;
  delivery?: string;
  address?: string;
  recommended?: boolean;
  isExternal?: boolean;
  currency?: string;
  deliveryTime?: string;
  warehouse?: string;
  supplier?: string;
}

const ProductListCard: React.FC<ProductListCardProps> = ({
  id,
  productId,
  offerKey,
  image,
  title,
  brand,
  price,
  oldPrice,
  discount,
  rating = 4.8,
  stock = "444 шт",
  delivery = "Сегодня с 18:00",
  address = "Москва ЦС (Новая Рига)",
  recommended = false,
  isExternal = false,
  currency = "RUB",
  deliveryTime,
  warehouse,
  supplier,
}) => {
  const [count, setCount] = useState(1);
  const { addItem } = useCart();

  // Функция для парсинга цены из строки
  const parsePrice = (priceStr: string): number => {
    const cleanPrice = priceStr.replace(/[^\d.,]/g, '').replace(',', '.');
    return parseFloat(cleanPrice) || 0;
  };

  const handleAddToCart = () => {
    const numericPrice = parsePrice(price);
    const numericOldPrice = oldPrice ? parsePrice(oldPrice) : undefined;

    addItem({
      productId: productId,
      offerKey: offerKey,
      name: title,
      description: `${brand} - ${title}`,
      brand: brand,
      price: numericPrice,
      originalPrice: numericOldPrice,
      currency: currency,
      quantity: count,
      deliveryTime: deliveryTime || delivery,
      warehouse: warehouse || address,
      supplier: supplier,
      isExternal: isExternal,
      image: image,
    });

    // Показываем уведомление о добавлении
    alert(`Товар "${title}" добавлен в корзину (${count} шт.)`);
  };

  return (
    <div className="w-layout-hflex product-item-search">
      <div className="w-layout-hflex flex-block-81">
        <div className="w-layout-hflex info-block-search-copy">
          <div className="w-layout-hflex raiting">
            <img src="/images/Star-1.svg" alt="Рейтинг" className="image-8" />
            <div className="text-block-22">{rating}</div>
          </div>
          <div className="pcs-search">{stock}</div>
          <div className="pcs-search">{delivery}</div>
        </div>
        <div className="w-layout-hflex info-block-product-card-search">
          {recommended && (
            <>
              <div className="w-layout-hflex item-recommend">
                <img src="/images/ri_refund-fill.svg" alt="Рекомендуем" />
              </div>
              <div className="text-block-25">Рекомендуем</div>
            </>
          )}
        </div>
        <div className="price">{price}</div>
      </div>
      <div className="w-layout-hflex add-to-cart-block">
        <div className="w-layout-hflex flex-block-82">
          <div className="w-layout-hflex pcs">
            <div className="minus-plus" onClick={() => setCount(Math.max(1, count - 1))}>
              <img src="/images/minus_icon.svg" alt="-" />
            </div>
            <div className="input-pcs">
              <div className="text-block-26">{count}</div>
            </div>
            <div className="minus-plus" onClick={() => setCount(count + 1)}>
              <img src="/images/plus_icon.svg" alt="+" />
            </div>
          </div>
          <button 
            onClick={handleAddToCart}
            className="button-icon w-inline-block"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <img src="/images/cart_icon.svg" alt="В корзину" className="image-11" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard; 