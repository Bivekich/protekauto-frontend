import React from "react";

const InfoNews = () => (
  <section className="section-info">
    <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        <div className="w-layout-hflex flex-block-7">
          <a href="/" className="link-block w-inline-block">
            <div>Главная</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="#" className="link-block-2 w-inline-block">
            <div>Новости</div>
          </a>
        </div>
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">Новости</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InfoNews; 