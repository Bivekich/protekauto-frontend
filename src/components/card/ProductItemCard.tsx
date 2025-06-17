import React from "react";
import ProductInfo from "./ProductInfo";
import ProductBuyBlock from "./ProductBuyBlock";

const ProductItemCard = ({ isLast = false }: { isLast?: boolean }) => {
  return (
    <div className={`w-layout-hflex product-item-card${isLast ? " last" : ""}`}>
      <ProductInfo />
      <ProductBuyBlock />
    </div>
  );
};

export default ProductItemCard; 