import React from "react";
import ProductInfo from "./ProductInfo";
import ProductBuyBlock from "./ProductBuyBlock";

interface ProductItemCardProps {
  isLast?: boolean;
  offer?: any;
}

const ProductItemCard = ({ isLast = false, offer }: ProductItemCardProps) => {
  return (
    <div className={`w-layout-hflex product-item-card${isLast ? " last" : ""}`}>
      <ProductInfo offer={offer} />
      <ProductBuyBlock offer={offer} />
    </div>
  );
};

export default ProductItemCard; 