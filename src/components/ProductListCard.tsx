import React, { useState } from "react";

interface ProductListCardProps {
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
}

const ProductListCard: React.FC<ProductListCardProps> = ({
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
}) => {
  const [count, setCount] = useState(1);
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
          <a href="#" className="button-icon w-inline-block">
            <img src="/images/cart_icon.svg" alt="В корзину" className="image-11" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard; 