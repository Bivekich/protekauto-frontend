import React from "react";
import ProductItemCard from "./ProductItemCard";

const ProductList = () => {
  const items = [1, 2, 3]; // или реальные данные, если есть
  return (
    <div className="w-layout-vflex product-list-search">
      {items.map((_, idx) => (
        <ProductItemCard key={idx} isLast={idx === items.length - 1} />
      ))}
    </div>
  );
};

export default ProductList; 