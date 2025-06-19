import React from "react";

const InfoNewsOpen = () => (
  <section className="section-info">
  <div className="w-layout-blockcontainer container info w-container">
    <div className="w-layout-vflex flex-block-9">
      <div className="w-layout-hflex flex-block-7">
        <a href="/" className="link-block w-inline-block">
          <div>Главная</div>
        </a>
        <div className="text-block-3">→</div>
        <a href="/news" className="link-block w-inline-block">
          <div>Новости</div>
        </a>
        <div className="text-block-3">→</div>
        <a href="/news" className="link-block w-inline-block">
          <div>Новости компании</div>
        </a>
        <div className="text-block-3">→</div>
        <a href="#" className="link-block-2 w-inline-block">
          <div>MasterKit Electro начал продажи новинки электрических насосов</div>
        </a>
      </div>
      <div className="w-layout-hflex flex-block-8">
        <div className="w-layout-hflex flex-block-10">
          <h1 className="heading">MasterKit Electro начал продажи новинки электрических насосов</h1>
        </div>
      </div>
      <div className="w-layout-hflex flex-block-98">
        <div className="w-layout-hflex flex-block-33">
          <div className="w-layout-hflex flex-block-32">
            <div className="div-block-13"></div>
            <div className="text-block-20">Новости компании</div>
          </div>
          <div className="w-layout-hflex flex-block-34">
            <div className="div-block-14"></div>
            <img src="/images/time-line.svg" loading="lazy" alt="" className="image-6" />
            <div className="text-block-20">17.12.2024</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
);

export default InfoNewsOpen; 