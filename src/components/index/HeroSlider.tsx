import React, { useState, useEffect, useCallback, useRef } from "react";

const slides = [
  {
    id: 0,
    heading: "ШИРОКИЙ ВЫБОР АВТОЗАПЧАСТЕЙ",
    text: "Сотрудничаем только с проверенными поставщиками.Постоянно обновляем ассортимент, чтобы предложить самые лучшие и актуальные детали.",
    img: "/images/imgfb.png",
    features: [
      { icon: "/images/1.png", text: "Быстрая доставка по всей стране" },
      { icon: "/images/2.png", text: "Высокое качество продукции" },
      { icon: "/images/3.png", text: "Выгодные цены" },
      { icon: "/images/4.png", text: "Профессиональная консультация" },
    ],
  },
  {
    id: 1,
    heading: "УЗКИЙ ВЫБОР АВТОЗАПЧАСТЕЙ",
    text: "Сотрудничаем только с проверенными поставщиками.Постоянно обновляем ассортимент, чтобы предложить самые лучшие и актуальные детали.",
    img: "/images/imgfb.png",
    features: [
      { icon: "/images/1.png", text: "Быстрая доставка по всей стране" },
      { icon: "/images/2.png", text: "Высокое качество продукции" },
      { icon: "/images/3.png", text: "Выгодные цены" },
      { icon: "/images/4.png", text: "Профессиональная консультация" },
    ],
  },
  {
    id: 2,
    heading: "ЛУЧШИЙ ВЫБОР АВТОЗАПЧАСТЕЙ",
    text: "Сотрудничаем только с проверенными поставщиками.Постоянно обновляем ассортимент, чтобы предложить самые лучшие и актуальные детали.",
    img: "/images/imgfb.png",
    features: [
      { icon: "/images/1.png", text: "Быстрая доставка по всей стране" },
      { icon: "/images/2.png", text: "Высокое качество продукции" },
      { icon: "/images/3.png", text: "Выгодные цены" },
      { icon: "/images/4.png", text: "Профессиональная консультация" },
    ],
  },
];

const AUTOPLAY_DELAY = 4000;

const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = slides.length;
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goTo = useCallback((idx: number) => setActive((idx + total) % total), [total]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive((prev) => (prev + 1) % total), AUTOPLAY_DELAY);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [active, total]);

  const handleManual = (fn: () => void) => {
    if (timer.current) clearTimeout(timer.current);
    fn();
  };

  const sliderContent = (
    <div className="slider w-slider">
      <div className="mask w-slider-mask">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`slide w-slide${active === idx ? " w--active" : ""}`}
          >
            <div className="w-layout-vflex flex-block-100">
              <div className="div-block-35">
                <img
                  src={slide.img}
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                  srcSet={`${slide.img} 500w, ${slide.img} 800w, ${slide.img} 1027w`}
                  alt=""
                  className="image-21"
                />
              </div>
              <div className="w-layout-vflex flex-block-99">
                <h2 className="heading-17">{slide.heading}</h2>
                <div className="text-block-51">{slide.text}</div>
              </div>
              <div className="w-layout-hflex flex-block-101">
                {slide.features.map((feature, i) => (
                  <div className="w-layout-hflex flex-block-102" key={i}>
                    <img src={feature.icon} loading="lazy" alt="" className="image-20" />
                    <div className="text-block-52">{feature.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="left-arrow w-slider-arrow-left" onClick={() => handleManual(prev)} style={{ cursor: "pointer" }}>
        <div className="div-block-34">
          <div className="icon-2 w-icon-slider-left"></div>
        </div>
      </div>
      <div className="right-arrow w-slider-arrow-right" onClick={() => handleManual(next)} style={{ cursor: "pointer" }}>
        <div className="div-block-34">
          <div className="icon-2 w-icon-slider-right"></div>
        </div>
      </div>
      <div className="slide-nav w-slider-nav w-slider-nav-invert w-round">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-slider-dot${active === idx ? " w-active" : ""}`}
            onClick={() => handleManual(() => goTo(idx))}
            aria-label={`Перейти к слайду ${idx + 1}`}
            tabIndex={0}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleManual(() => goTo(idx))}
            style={{ cursor: "pointer", display: "inline-block" }}
            role="button"
          />
        ))}
      </div>
    </div>
  );

  return (
    <section>
      {isMobile ? (
        sliderContent
      ) : (
        <div className="w-layout-blockcontainer container2-copy w-container">
          {sliderContent}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;