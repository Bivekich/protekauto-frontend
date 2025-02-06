'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface IProps {
  children: ReactNode;
}

export const AutoScroll = ({ children }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const animationFrame = useRef<number | null>(null);

  const checkOverflow = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;
      setIsOverflowing(contentWidth > containerWidth);
    }
  }, []);

  const animateScroll = useCallback(
    (start: number, end: number, duration: number) => {
      const startTime = performance.now();

      const step = (timestamp: number) => {
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        const value = start + (end - start) * percentage;

        if (containerRef.current) {
          containerRef.current.scrollLeft = value;
        }

        if (percentage < 1) {
          animationFrame.current = requestAnimationFrame(step);
        }
      };

      animationFrame.current = requestAnimationFrame(step);
    },
    []
  );

  const handleMouseEnter = () => {
    if (!isOverflowing || !containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const targetScroll = contentRef.current.scrollWidth - container.offsetWidth;

    if (targetScroll > 0) {
      animateScroll(container.scrollLeft, targetScroll, 800);
    }
  };

  const handleMouseLeave = () => {
    if (!isOverflowing || !containerRef.current) return;
    animateScroll(containerRef.current.scrollLeft, 0, 800);
  };

  useEffect(() => {
    checkOverflow();
    const ro = new ResizeObserver(checkOverflow);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [checkOverflow]);

  return (
    <div
      className={'relative overflow-hidden w-full'}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={'flex gap-2 transition duration-500 will-change-transform'}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};
