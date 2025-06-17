import React from "react";

const CartInfo2: React.FC = () => (
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
          <a href="/cart" className="link-block w-inline-block">
            <div>Корзина</div>
          </a>
          <div className="text-block-3">→</div>
          <div className="link-block-2 w-inline-block">
            <div>Подтверждение и оплата</div>
          </div>
        </div>
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">Подтверждение и оплата</h1>
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

export default CartInfo2; 