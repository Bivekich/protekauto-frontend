import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CatalogProductCardSkeleton: React.FC = () => {
  return (
    <div className="w-layout-vflex flex-block-15-copy" data-article-card="skeleton">
      {/* Иконка избранного */}
      <div className="favcardcat">
        <div className="icon-setting w-embed">
          <Skeleton width={24} height={24} />
        </div>
      </div>
      
      {/* Изображение товара */}
      <div className="div-block-4">
        <Skeleton height={200} className="image-5" />
        <div className="text-block-7">
          <Skeleton width={60} height={20} />
        </div>
      </div>
      
      {/* Информация о товаре */}
      <div className="div-block-3">
        <div className="w-layout-hflex flex-block-16">
          <div className="text-block-8">
            <Skeleton width={80} height={24} />
          </div>
          <div className="text-block-9">
            <Skeleton width={60} height={20} />
          </div>
        </div>
        <div className="text-block-10" style={{ marginTop: '8px' }}>
          <Skeleton height={20} />
        </div>
        <div className="text-block-11" style={{ marginTop: '4px' }}>
          <Skeleton width="70%" height={16} />
        </div>
      </div>
      
      {/* Кнопка купить */}
      <div className="catc w-inline-block">
        <div className="div-block-25">
          <div className="icon-setting w-embed">
            <Skeleton width={24} height={24} />
          </div>
        </div>
        <div className="text-block-6">
          <Skeleton width={50} height={16} />
        </div>
      </div>
    </div>
  );
  };

export default CatalogProductCardSkeleton; 