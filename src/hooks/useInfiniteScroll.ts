import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  hasMore?: boolean;
  isLoading?: boolean;
  debounceMs?: number;
}

interface UseInfiniteScrollReturn {
  targetRef: React.RefObject<HTMLDivElement | null>;
  isIntersecting: boolean;
}

// Debounce функция
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const useInfiniteScroll = (
  onLoadMore: () => void,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn => {
  const {
    threshold = 0.1,
    rootMargin = '100px',
    hasMore = true,
    isLoading = false,
    debounceMs = 200
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  // Создаем debounced версию onLoadMore
  const debouncedOnLoadMore = useCallback(
    debounce(onLoadMore, debounceMs),
    [onLoadMore, debounceMs]
  );

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting && hasMore && !isLoading) {
        debouncedOnLoadMore();
      }
    },
    [debouncedOnLoadMore, hasMore, isLoading]
  );

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [handleIntersection, threshold, rootMargin]);

  return { targetRef, isIntersecting };
}; 