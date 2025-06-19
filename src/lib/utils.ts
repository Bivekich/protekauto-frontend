// Утилиты для проекта

// Простая утилита для дебага запросов
let requestCounter = 0;
export const debugQuery = (queryName: string, variables?: any) => {
  requestCounter++;
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 GraphQL Query #${requestCounter}: ${queryName}`, variables);
  }
  return requestCounter;
};

// Утилита для дебага рендеров компонентов
export const debugRender = (componentName: string, props?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎨 Render: ${componentName}`, props);
  }
};

// Утилита для отслеживания производительности
export const measurePerformance = (label: string, fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    console.time(label);
    fn();
    console.timeEnd(label);
  } else {
    fn();
  }
};

// Debounce функция для оптимизации запросов
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle функция для ограничения частоты выполнения
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Кэш для мемоизации результатов
const memoCache = new Map<string, any>();

// Простая мемоизация функций
export const memoize = <T extends (...args: any[]) => any>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T => {
  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    if (memoCache.has(key)) {
      return memoCache.get(key);
    }
    
    const result = func(...args);
    memoCache.set(key, result);
    
    // Ограничиваем размер кэша
    if (memoCache.size > 1000) {
      const firstKey = memoCache.keys().next().value;
      if (firstKey !== undefined) {
        memoCache.delete(firstKey);
      }
    }
    
    return result;
  }) as T;
};

// Очистка кэша мемоизации
export const clearMemoCache = () => {
  memoCache.clear();
}; 