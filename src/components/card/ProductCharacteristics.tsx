import React from "react";

interface ProductCharacteristicsProps {
  result?: any;
}

const ProductCharacteristics = ({ result }: ProductCharacteristicsProps) => {
  return (
    <>

      <div className="w-layout-hflex flex-block-52">
        {result && (
          <>
          <div className="w-layout-vflex flex-block-53">
            <div className="w-layout-hflex flex-block-55">
              <span className="text-block-29">Бренд:</span>
              <span className="text-block-28">{result.brand}</span>
            </div>
            <div className="w-layout-hflex flex-block-55">
              <span className="text-block-29">Артикул:</span>
              <span className="text-block-28">{result.articleNumber}</span>
            </div>
          </div>
          <div className="w-layout-vflex flex-block-53">

            <div className="w-layout-hflex flex-block-55">
              <span className="text-block-29">Название:</span>
              <span className="text-block-28">{result.name}</span>
            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductCharacteristics; 