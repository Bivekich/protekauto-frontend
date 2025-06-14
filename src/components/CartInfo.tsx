import React from "react";
import { useCart } from "@/contexts/CartContext";

const CartInfo: React.FC = () => {
  const { state } = useCart();
  const { summary } = state;

  // Функция для форматирования цены
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  return (
    <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        <div className="w-layout-hflex flex-block-7">
          <a href="/" className="link-block w-inline-block">
            <div>Главная</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="/catalog" className="link-block w-inline-block">
            <div>Каталог</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="/cart" className="link-block-2 w-inline-block">
            <div>Корзина</div>
          </a>
        </div>
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">Корзина</h1>
            <div className="text-block-4">
              {summary.totalItems > 0 ? (
                <>В вашей корзине {summary.totalItems} товара на <strong>{formatPrice(summary.finalPrice)}</strong></>
              ) : (
                'Ваша корзина пуста'
              )}
            </div>
          </div>
          <div className="w-layout-hflex flex-block-11">
            <img src="/images/qwestions.svg" loading="lazy" alt="" className="image-4" />
            <div className="text-block-5">Как оформить заказ?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInfo; 