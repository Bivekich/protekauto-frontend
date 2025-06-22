import React, { useState } from "react";

interface ProductBuyBlockProps {
  offer?: any;
}

const ProductBuyBlock = ({ offer }: ProductBuyBlockProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!offer) {
    return (
      <div className="w-layout-hflex add-to-cart-block-copy">
        <div className="text-center py-4">
          <p className="text-gray-500">Загрузка...</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(offer.quantity || 999, quantity + delta));
    setQuantity(newQuantity);
  };

  const totalPrice = offer.price * quantity;

  return (
    <div className="w-layout-hflex add-to-cart-block-copy">
      <div className="pcs-card">{offer.quantity || 0} шт</div>
      <div className="price opencard">{totalPrice.toLocaleString('ru-RU')} ₽</div>
      <div className="w-layout-hflex pcs-copy">
        <div className="minus-plus" onClick={() => handleQuantityChange(-1)}>
          <img loading="lazy" src="images/minus_icon.svg" alt="" />
        </div>
        <div className="input-pcs">
          <div className="text-block-26">{quantity}</div>
        </div>
        <div className="minus-plus" onClick={() => handleQuantityChange(1)}>
          <img loading="lazy" src="images/plus_icon.svg" alt="" />
        </div>
      </div>
      <a href="/cart" className="button-icon w-inline-block">
        <img loading="lazy" src="images/cart_icon.svg" alt="" className="image-11" />
      </a>
    </div>
  );
};

export default ProductBuyBlock; 