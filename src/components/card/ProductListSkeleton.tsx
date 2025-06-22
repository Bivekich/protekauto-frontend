import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ProductListSkeletonProps {
  count?: number;
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="w-layout-vflex product-list-search">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`w-layout-hflex product-item-card${index === count - 1 ? " last" : ""}`}>
          {/* ProductInfo скелетон */}
          <div className="w-layout-hflex info-block-search">
            <div className="w-layout-hflex info-block-product-card-search">
              {/* Иконки рекомендации */}
              <div className="w-layout-hflex item-recommend-copy">
                <Skeleton width={24} height={24} />
              </div>
              <div className="w-layout-hflex item-recommend-copy">
                <Skeleton width={24} height={24} />
              </div>
              <div className="w-layout-hflex item-recommend-copy">
                <Skeleton width={24} height={24} />
              </div>
            </div>
            
            {/* Срок доставки */}
            <div className="delivery-time-search">
              <Skeleton width={80} height={20} />
            </div>
          </div>
          
          {/* ProductBuyBlock скелетон */}
          <div className="w-layout-hflex add-to-cart-block-copy">
            <div className="pcs-card">
              <Skeleton width={50} height={20} />
            </div>
            <div className="price opencard">
              <Skeleton width={100} height={24} />
            </div>
            <div className="w-layout-hflex pcs-copy">
              <div className="minus-plus">
                <Skeleton width={20} height={20} />
              </div>
              <div className="input-pcs">
                <div className="text-block-26">
                  <Skeleton width={30} height={20} />
                </div>
              </div>
              <div className="minus-plus">
                <Skeleton width={20} height={20} />
              </div>
            </div>
            <div className="button-icon w-inline-block">
              <Skeleton width={32} height={32} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton; 