'use client';

import { FC, useLayoutEffect, useRef, useState } from 'react';
import { ISegmentedControlProps } from './segmentedControl.types';

export const SegmentedControl: FC<ISegmentedControlProps> = ({
  options,
  onChange,
  selected,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    selected ? options.findIndex((option) => option.value === selected) : 0
  );
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
  });

  const navRef = useRef<HTMLDivElement>(null);

  const updateUnderline = (target: HTMLElement) => {
    const { offsetWidth, offsetLeft } = target;
    setUnderlineStyle({
      width: offsetWidth,
      left: offsetLeft,
    });
  };

  useLayoutEffect(() => {
    if (navRef.current) {
      const activeItem = navRef.current.children[activeIndex] as HTMLElement;
      updateUnderline(activeItem);
    }
  }, [activeIndex]);

  return (
    <nav className="relative w-fit h-16">
      <div className="flex space-x-6" ref={navRef}>
        {options.map((item, index) => (
          <button
            key={item.value}
            onClick={(e) => {
              setActiveIndex(index);
              updateUnderline(e.currentTarget);
              if (onChange) onChange(item.value);
            }}
            className={`px-5 py-2 text-paragraph font-semibold transition-colors
            ${activeIndex !== index && 'hover:text-gray-500'}
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={'absolute bottom-0 w-full bg-[#E9E9E9]'}>
        <div
          className="h-[3px] bg-primary-red transition-all duration-300"
          style={{
            width: `${underlineStyle.width}px`,
            transform: `translateX(${underlineStyle.left}px)`,
          }}
        />
      </div>
    </nav>
  );
};
