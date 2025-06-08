import React from "react";

const ProductSortHeader = () => {
  return (
    <div className="w-layout-hflex sort-list-card">
      <div className="w-layout-hflex flex-block-49-copy">
        <div className="sort-item first">Рейтинг</div>
        <div className="div-block-30">
          <div className="sort-item">Доставка</div>
        </div>
        <div className="sort-item">Наличие</div>
      </div>
      <div className="sort-item price card">Цена</div>
    </div>
  );
};

export default ProductSortHeader; 