'use client';

import { FC, useLayoutEffect, useRef, useState } from 'react';
import { ISegmentedControlProps } from './segmentedControl.types';

const variants = {
  primary: {
    container: 'absolute bottom-0 w-full bg-[#E9E9E9]',
    segment: 'h-[3px] bg-primary-red transition-all duration-300',
    text: 'px-5 py-2 text-paragraph font-semibold',
  },
  secondary: {
    container: 'absolute top-0 w-full bg-sky-blue rounded-2xl',
    segment:
      'h-[50px] -z-10 bg-primary-red transition-all duration-300 rounded-2xl',
    text: 'text-paragraph-sm text-white font-medium h-[50px] px-5',
  },
};

export const SegmentedControl: FC<ISegmentedControlProps> = ({
  options,
  onChange,
  selected,
  variant = 'primary',
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
      <div
        className={`flex space-x-${variant === 'primary' ? 6 : 2} relative z-10`}
        ref={navRef}
      >
        {options.map((item, index) => (
          <button
            key={item.value}
            onClick={(e) => {
              setActiveIndex(index);
              updateUnderline(e.currentTarget);
              if (onChange) onChange(item.value);
            }}
            className={`${variants[variant].text} transition-colors flex items-center justify-center
            ${activeIndex !== index && (variant === 'primary' ? 'hover:text-gray-500' : '!text-black duration-500')}
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={variants[variant].container}>
        <div
          className={variants[variant].segment}
          style={{
            width: `${underlineStyle.width}px`,
            transform: `translateX(${underlineStyle.left}px)`,
          }}
        />
      </div>
    </nav>
  );
};
