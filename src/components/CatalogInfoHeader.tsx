import React from "react";

const CatalogInfoHeader: React.FC = () => (
  <section className="section-info">
    <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        <div className="w-layout-hflex flex-block-7">
          <a href="#" className="link-block w-inline-block">
            <div>Главная</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="#" className="link-block-2 w-inline-block">
            <div>Каталог</div>
          </a>
        </div>
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">Аккумуляторы</h1>
            <div className="text-block-4">Найдено 3587 товаров</div>
          </div>
          <div className="w-layout-hflex flex-block-11">
            <img src="/images/qwestions.svg" loading="lazy" alt="" className="image-4" />
            <div className="text-block-5">Как правильно выбрать аккумулятор?</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CatalogInfoHeader; 