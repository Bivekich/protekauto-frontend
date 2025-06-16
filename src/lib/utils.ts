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