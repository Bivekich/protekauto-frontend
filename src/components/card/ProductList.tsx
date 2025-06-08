import React from "react";
import ProductItemCard from "./ProductItemCard";

const ProductList = () => {
  return (
    <div className="w-layout-vflex product-list-search">
      <ProductItemCard />
      <ProductItemCard />
      <ProductItemCard />
    </div>
  );
};

export default ProductList; 