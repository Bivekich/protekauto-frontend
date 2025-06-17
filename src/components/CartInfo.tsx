import React from "react";

const CartInfo: React.FC = () => (
  <section className="section-info">
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
            <div className="text-block-4">В вашей корзине 3 товара на <strong>39 389.32 ₽</strong></div>
          </div>
          <div className="w-layout-hflex flex-block-11">
            <img src="/images/qwestions.svg" loading="lazy" alt="" className="image-4" />
            <div className="text-block-5">Как оформить заказ?</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CartInfo; 