import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ProductListSkeletonProps {
  count?: number;
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="w-layout-grid grid-10 grid-mobile-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="product-card">
          <div className="image-product-card">
            <Skeleton height={200} />
          </div>
          <div className="content-product-card">
            <div className="text-product-card">
              <Skeleton height={16} style={{ marginBottom: '8px' }} />
              <Skeleton height={14} count={2} style={{ marginBottom: '4px' }} />
            </div>
            <div className="price-product-card">
              <Skeleton height={20} width={100} style={{ marginBottom: '8px' }} />
              <Skeleton height={14} width={80} />
            </div>
            <div className="add-to-cart-block">
              <Skeleton height={16} width={60} style={{ marginRight: '10px' }} />
              <Skeleton height={20} width={80} style={{ marginRight: '10px' }} />
              <div className="w-layout-hflex pcs-copy">
                <Skeleton height={32} width={32} style={{ marginRight: '8px' }} />
                <Skeleton height={32} width={40} style={{ marginRight: '8px' }} />
                <Skeleton height={32} width={32} style={{ marginRight: '8px' }} />
              </div>
              <Skeleton height={32} width={32} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton; 