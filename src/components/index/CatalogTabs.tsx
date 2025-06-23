import React from "react";

const CatalogTabs = () => (
  <section>
    <div className="w-layout-blockcontainer container w-container">
      <div className="w-layout-vflex flex-block-5">
        <h2 className="heading-4">Каталоги автозапчастей</h2>
        <div className="w-layout-hflex flex-block-6">
          <div className="w-layout-hflex flex-block-24">
            <div className="w-layout-hflex flex-block-25">
              <div className="tab_c">Техническое обслуживание</div>
              <div className="tab_c">Легковые</div>
              <div className="tab_c">Грузовые</div>
              <div className="tab_c">Коммерческие</div>
            </div>
            <div className="w-layout-hflex flex-block-27">
              {[...Array(7)].map((_, i) => (
                <div className="w-layout-vflex flex-block-26" key={i}>
                  {["Audi", "BMW", "Cadillac", "Chevrolet", "Citroen", "Fiat", "Mazda"].map((brand) => (
                    <a href={`/brand?selected=${encodeURIComponent(brand)}`} className="link-block-6 w-inline-block" key={brand}>
                      <div>{brand}</div>
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div className="w-layout-hflex flex-block-29">
              <div className="text-block-18">Все марки</div>
              <img src="/images/Arrow_right.svg" loading="lazy" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CatalogTabs; 