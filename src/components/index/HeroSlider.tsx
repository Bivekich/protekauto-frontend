import React, { useState, useCallback, useEffect, useRef } from "react";

const slides = [
  { id: 0, content: <div className="w-slide">Слайд 1</div> },
  { id: 1, content: <div className="w-slide">Слайд 2</div> },
  { id: 2, content: <div className="w-slide">Слайд 3</div> },
];

const AUTOPLAY_DELAY = 4000;

const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const timer = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((idx: number) => {
    setActive((idx + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Автопрокрутка
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTOPLAY_DELAY);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, total]);

  // Сброс автопрокрутки при ручном переключении
  const handleManual = (fn: () => void) => {
    if (timer.current) clearTimeout(timer.current);
    fn();
  };

  return (
    <section>
      <div className="w-layout-blockcontainer container2 w-container">
        <div className="slider w-slider">
          <div className="w-slider-mask">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`w-slide${active === idx ? " active" : ""}`}
                style={{ display: active === idx ? "block" : "none" }}
              >
                {slide.content}
              </div>
            ))}
          </div>
          <div className="left-arrow w-slider-arrow-left" onClick={() => handleManual(prev)} style={{ cursor: "pointer" }}>
            <div className="icon-2 w-icon-slider-left"></div>
          </div>
          <div className="right-arrow w-slider-arrow-right" onClick={() => handleManual(next)} style={{ cursor: "pointer" }}>
            <div className="w-icon-slider-right"></div>
            <div className="icon-2 w-icon-slider-left" style={{ transform: 'rotate(180deg)' }}></div>
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
      </div>
    </section>
  );
};

export default HeroSlider; 