import React from "react";

export default function InfoCard() {
  return (
    <section className="section-info">
      <div className="w-layout-blockcontainer container info w-container">
        <div className="w-layout-vflex flex-block-9">
          <div className="w-layout-hflex flex-block-7">
            <a href="#" className="link-block w-inline-block">
              <div>Главная</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="#" className="link-block w-inline-block">
              <div>Каталог</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="#" className="link-block w-inline-block">
              <div>Аккумуляторы и зарядные устройства</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="#" className="link-block w-inline-block">
              <div>Аккумуляторы</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="#" className="link-block-2 w-inline-block">
              <div>Аккумуляторная батарея SPEEDMATE AGM 60А/ч</div>
            </a>
          </div>
          <div className="w-layout-hflex flex-block-bi">
            <div className="w-layout-hflex headingbi">
              <h1 className="heading-bi">Аккумуляторная батарея SPEEDMATE AGM 60А/ч</h1>
              <div className="div-block-127">
                <div className="icon-setting w-embed">
                  <svg width="currentwidth" height="currentheight" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 25L13.405 23.5613C7.74 18.4714 4 15.1035 4 10.9946C4 7.6267 6.662 5 10.05 5C11.964 5 13.801 5.88283 15 7.26703C16.199 5.88283 18.036 5 19.95 5C23.338 5 26 7.6267 26 10.9946C26 15.1035 22.26 18.4714 16.595 23.5613L15 25Z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-layout-hflex rightbi">
              <div className="text-block-5-copy">SPEEDMATE <strong className="bold-text">SM-EK600</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 