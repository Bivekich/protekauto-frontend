import React from "react";
import ProductInfo from "./ProductInfo";
import ProductBuyBlock from "./ProductBuyBlock";

const ProductItemCard = () => {
  return (
    <div className="w-layout-hflex product-item-card">
      <ProductInfo />
      <ProductBuyBlock />
    </div>
  );
};

export default ProductItemCard; 