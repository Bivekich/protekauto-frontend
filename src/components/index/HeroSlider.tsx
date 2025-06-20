import React, { useEffect } from "react";

const HeroSlider = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Webflow && window.Webflow.require) {
      if (window.Webflow.destroy) {
        window.Webflow.destroy();
      }
      if (window.Webflow.ready) {
        window.Webflow.ready();
      }
    }
  }, []);

  return (
    <section className="section-5">
      <div className="w-layout-blockcontainer container w-container">
        <div data-delay="4000" data-animation="slide" className="slider w-slider" data-autoplay="false" data-easing="ease"
          data-hide-arrows="false" data-disable-swipe="false" data-autoplay-limit="0" data-nav-spacing="3"
          data-duration="500" data-infinite="true">
          <div className="mask w-slider-mask">
            <div className="slide w-slide">
              <div className="w-layout-vflex flex-block-100">
                <div className="div-block-35"><img src="/images/imgfb.png" loading="lazy"
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                    srcSet="/images/imgfb-p-500.png 500w, /images/imgfb-p-800.png 800w, /images/imgfb.png 1027w" alt=""
                    className="image-21" /></div>
                <div className="w-layout-vflex flex-block-99">
                  <h2 className="heading-17">ШИРОКИЙ ВЫБОР АВТОЗАПЧАСТЕЙ</h2>
                  <div className="text-block-51">Сотрудничаем только с проверенными поставщиками.Постоянно обновляем
                    ассортимент, чтобы предложить самые лучшие и актуальные детали.</div>
                </div>
                <div className="w-layout-hflex flex-block-101">
                  <div className="w-layout-hflex flex-block-102"><img src="/images/1.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Быстрая доставка по всей стране</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/2.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Высокое качество продукции</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/3.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Выгодные цены</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/4.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Профессиональная консультация</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-slide">
              <div className="w-layout-vflex flex-block-100">
                <div className="div-block-35"><img src="/images/imgfb.png" loading="lazy"
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                    srcSet="/images/imgfb-p-500.png 500w, /images/imgfb-p-800.png 800w, /images/imgfb.png 1027w" alt=""
                    className="image-21" /></div>
                <div className="w-layout-vflex flex-block-99">
                  <h2 className="heading-17">УЗКИЙ ВЫБОР АВТОЗАПЧАСТЕЙ</h2>
                  <div className="text-block-51">Сотрудничаем только с проверенными поставщиками.Постоянно обновляем
                    ассортимент, чтобы предложить самые лучшие и актуальные детали.</div>
                </div>
                <div className="w-layout-hflex flex-block-101">
                  <div className="w-layout-hflex flex-block-102"><img src="/images/1.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Быстрая доставка по всей стране</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/2.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Высокое качество продукции</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/3.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Выгодные цены</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/4.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Профессиональная консультация</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-slide">
              <div className="w-layout-vflex flex-block-100">
                <div className="div-block-35"><img src="/images/imgfb.png" loading="lazy"
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                    srcSet="/images/imgfb-p-500.png 500w, /images/imgfb-p-800.png 800w, /images/imgfb.png 1027w" alt=""
                    className="image-21" /></div>
                <div className="w-layout-vflex flex-block-99">
                  <h2 className="heading-17">ЛУЧШИЙ ВЫБОР АВТОЗАПЧАСТЕЙ</h2>
                  <div className="text-block-51">Сотрудничаем только с проверенными поставщиками.Постоянно обновляем
                    ассортимент, чтобы предложить самые лучшие и актуальные детали.</div>
                </div>
                <div className="w-layout-hflex flex-block-101">
                  <div className="w-layout-hflex flex-block-102"><img src="/images/1.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Быстрая доставка по всей стране</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/2.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Высокое качество продукции</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/3.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Выгодные цены</div>
                  </div>
                  <div className="w-layout-hflex flex-block-102"><img src="/images/4.png" loading="lazy" alt=""
                      className="image-20" />
                    <div className="text-block-52">Профессиональная консультация</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="left-arrow w-slider-arrow-left">
            <div className="div-block-34">
              <div className="icon-2 w-icon-slider-left"></div>
            </div>
          </div>
          <div className="right-arrow w-slider-arrow-right">
            <div className="div-block-34">
              <div className="icon-2 w-icon-slider-right"></div>
            </div>
          </div>
          <div className="slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;