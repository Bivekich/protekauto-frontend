import { useEffect, useLayoutEffect, useState } from 'react';

// Хук для избежания проблем с SSR
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Хук для проверки клиентского рендеринга
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}; 