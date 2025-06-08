import React from "react";

const NewsAndPromos = () => (
  <section>
    <div className="w-layout-blockcontainer container2 w-container">
      <div className="w-layout-vflex flex-block-5">
        <div className="w-layout-hflex flex-block-31">
          <h2 className="heading-4">Новости и акции</h2>
          <div className="w-layout-hflex flex-block-29">
            <button type="button" className="text-block-18" style={{display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
              Ко всем новостям
              <img src="/images/Arrow_right.svg" loading="lazy" alt="" style={{marginLeft: 8}} />
            </button>
          </div>
        </div>
        <div className="w-layout-hflex flex-block-6-copy">
          {[...Array(4)].map((_, i) => (
            <div className="news" key={i}>
              <h3 className="heading_news">Kia Syros будет выделяться необычным стилем</h3>
              <div className="text-block-20">Компания Kia готова представить новый кроссовер Syros</div>
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
              <div className="div-block-15">
                <img src="/images/news_img.png" loading="lazy" alt="" height="Auto" className="image-7" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default NewsAndPromos; 