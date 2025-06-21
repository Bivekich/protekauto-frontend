import React from "react";

interface ProductCharacteristicsProps {
  result?: any;
}

const ProductCharacteristics = ({ result }: ProductCharacteristicsProps) => {
  return (
    <div className="w-layout-vflex characteristics-block">
      <div className="text-block-25">
        {result?.name ? `Характеристики ${result.name}` : 'Характеристики товара'}
      </div>
      <div className="characteristics-list">
        {result && (
          <>
            <div className="characteristic-item">
              <span className="characteristic-label">Бренд:</span>
              <span className="characteristic-value">{result.brand}</span>
            </div>
            <div className="characteristic-item">
              <span className="characteristic-label">Артикул:</span>
              <span className="characteristic-value">{result.articleNumber}</span>
            </div>
            <div className="characteristic-item">
              <span className="characteristic-label">Название:</span>
              <span className="characteristic-value">{result.name}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCharacteristics; 