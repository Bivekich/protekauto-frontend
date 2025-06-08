import React from "react";

export default function InfoCard() {
  return (
    <section>
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
          <div className="w-layout-hflex flex-block-8">
            <div className="w-layout-hflex flex-block-10">
              <h1 className="heading">Аккумуляторная батарея SPEEDMATE AGM 60А/ч</h1>
            </div>
            <div className="w-layout-hflex flex-block-11">
              <div className="text-block-5-copy">SPEEDMATE <strong className="bold-text">SM-EK600</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 