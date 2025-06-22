/**
 * ProductListSkeleton
 * Скелетон для отображения списка товаров во время загрузки.
 * Используйте этот компонент вместо списка товаров, когда данные еще не получены.
 *
 * @param {number} [count=4] - Количество скелетон-элементов для отображения.
 * @example
 * <ProductListSkeleton count={6} />
 */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductListSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100"
        aria-label="Загрузка товара"
        tabIndex={0}
      >
        <div className="w-24 h-24 mr-4 flex-shrink-0">
          <Skeleton height={96} width={96} />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton height={20} width={`60%`} />
          <Skeleton height={16} width={`40%`} />
          <Skeleton height={16} width={`30%`} />
          <div className="flex space-x-2 mt-2">
            <Skeleton height={32} width={80} />
            <Skeleton height={32} width={80} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProductListSkeleton; 