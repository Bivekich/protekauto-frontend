import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CatalogProductCardSkeleton: React.FC = () => {
  return (
    <div className="w-layout-vflex flex-block-15-copy">
      <div className="favcardcat">
        <div className="icon-setting w-embed">
          <Skeleton circle height={24} width={24} />
        </div>
      </div>
      
      {/* Скелетон изображения */}
      <div className="div-block-4" style={{ position: 'relative' }}>
        <Skeleton height={192} />
        <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
          <Skeleton height={24} width={64} />
        </div>
      </div>
      
      {/* Скелетон контента */}
      <div className="div-block-3" style={{ padding: '16px' }}>
        <div className="w-layout-hflex flex-block-16" style={{ marginBottom: '8px', gap: '8px' }}>
          <Skeleton height={24} width={80} />
          <Skeleton height={20} width={64} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <Skeleton height={16} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <Skeleton height={16} width="75%" />
        </div>
        <div>
          <Skeleton height={16} width="50%" />
        </div>
      </div>
      
      {/* Скелетон кнопки */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <Skeleton height={40} />
      </div>
    </div>
  );
};

export default CatalogProductCardSkeleton; 