import React, { useRef, useState, useLayoutEffect } from "react";

interface FilterRangeProps {
  title: string;
  min?: number;
  max?: number;
  isMobile?: boolean; // Добавляем флаг для мобильной версии
}

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 32000;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

const FilterRange: React.FC<FilterRangeProps> = ({ title, min = DEFAULT_MIN, max = DEFAULT_MAX, isMobile = false }) => {
  const [from, setFrom] = useState(min);
  const [to, setTo] = useState(max);
  const [dragging, setDragging] = useState<null | "from" | "to">(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Обновляем ширину полосы при монтировании и ресайзе
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Перевод значения в px и обратно
  const valueToPx = (value: number) => trackWidth ? ((value - min) / (max - min)) * trackWidth : 0;
  const pxToValue = (px: number) => trackWidth ? Math.round((px / trackWidth) * (max - min) + min) : min;

  // Drag logic
  const onMouseDown = (type: "from" | "to") => (e: React.MouseEvent) => {
    setDragging(type);
    e.preventDefault();
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = clamp(x, 0, trackWidth);
      const value = clamp(pxToValue(x), min, max);
      if (dragging === "from") {
        setFrom(v => clamp(Math.min(value, to), min, to));
      } else {
        setTo(v => clamp(Math.max(value, from), from, max));
      }
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, from, to, min, max, trackWidth]);

  // Input handlers
  const handleFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = Number(e.target.value.replace(/\D/g, ""));
    if (isNaN(v)) v = min;
    setFrom(clamp(Math.min(v, to), min, to));
  };
  const handleToInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = Number(e.target.value.replace(/\D/g, ""));
    if (isNaN(v)) v = max;
    setTo(clamp(Math.max(v, from), from, max));
  };

  // px позиции для точек
  const pxFrom = valueToPx(from);
  const pxTo = valueToPx(to);

  // Мобильная версия - без dropdown
  if (isMobile) {
    return (
      <div className="mobile-range-filter">
        <h3 className="mobile-filter-title">{title}</h3>
        <div className="input-fields" style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div className="input-field" style={{ position: 'relative', flex: 1 }}>
            <label htmlFor="from" className="field-label" style={{ position: 'absolute', left: 3, top: '50%', transform: 'translateY(-50%)', color: '#888', fontSize: 15, pointerEvents: 'none' }}>от</label>
            <input
              className="text-field-2"
              maxLength={6}
              name="from"
              placeholder={String(min)}
              type="text"
              id="from"
              value={from}
              onChange={handleFromInput}
              style={{ padding: '8px 10px 8px 36px', fontSize: 16, width: '100%' }}
            />
          </div>
          <div className="input-field" style={{ position: 'relative', flex: 1 }}>
            <label htmlFor="to" className="field-label" style={{ position: 'absolute', left: 3, top: '50%', transform: 'translateY(-50%)', color: '#888', fontSize: 15, pointerEvents: 'none' }}>до</label>
            <input
              className="text-field-2"
              maxLength={6}
              name="to"
              placeholder={String(max)}
              type="text"
              id="to"
              value={to}
              onChange={handleToInput}
              style={{ padding: '8px 10px 8px 36px', fontSize: 16, width: '100%' }}
            />
          </div>
        </div>
        <div className="range-slider-container" ref={trackRef}>
          <div className="range-track"></div>
          <div
            className="range-fill"
            style={{
              left: pxFrom,
              width: pxTo - pxFrom,
            }}
          ></div>
          <div
            className="range-handle range-handle-from"
            style={{ left: pxFrom - 8 }}
            onMouseDown={onMouseDown("from")}
          ></div>
          <div
            className="range-handle range-handle-to"
            style={{ left: pxTo - 8 }}
            onMouseDown={onMouseDown("to")}
          ></div>
        </div>
        <div className="range-values">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }

  // Десктопная версия - с dropdown
  return (
    <div className="dropdown w-dropdown w--open">
      <div className="dropdown-toggle w-dropdown-toggle">
        <h4 className="heading-2">{title}</h4>
        <div className="icon-3 w-icon-dropdown-toggle"></div>
      </div>
      <nav className="dropdown-list w-dropdown-list">
        <div className="form-block-2">
          <form className="form-2" onSubmit={e => e.preventDefault()}>
            <div className="div-block-5">
              <label htmlFor="from" className="field-label">от</label>
              <input
                className="text-field-2 w-input"
                maxLength={6}
                name="from"
                placeholder={String(min)}
                type="text"
                id="from"
                value={from}
                onChange={handleFromInput}
              />
            </div>
            <div className="div-block-5">
              <label htmlFor="to" className="field-label">до</label>
              <input
                className="text-field-2 w-input"
                maxLength={6}
                name="to"
                placeholder={String(max)}
                type="text"
                id="to"
                value={to}
                onChange={handleToInput}
              />
            </div>
          </form>
        </div>
        <div className="div-block-6" style={{ position: "relative", height: 32, marginTop: 12 }} ref={trackRef}>
          <div className="track" style={{ position: "absolute", top: 14, left: 0, right: 0, height: 4, borderRadius: 2 }}></div>
          <div
            className="track fill"
            style={{
              position: "absolute",
              top: 14,
              left: pxFrom,
              width: pxTo - pxFrom,
              height: 4,
              borderRadius: 2,
              zIndex: 2,
            }}
          ></div>
          <div
            className="start"
            style={{
              position: "absolute",
              top: 6,
              left: pxFrom - 8,
              zIndex: 3,
              cursor: "pointer"
            }}
            onMouseDown={onMouseDown("from")}
          ></div>
          <div
            className="start end"
            style={{
              position: "absolute",
              top: 6,
              left: pxTo - 8,
              zIndex: 3,
              cursor: "pointer"
            }}
            onMouseDown={onMouseDown("to")}
          ></div>
        </div>
      </nav>
    </div>
  );
};

export default FilterRange;