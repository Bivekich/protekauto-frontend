import React from "react";

interface ProductDescriptionTabsProps {
  result?: any;
}

const ProductDescriptionTabs = ({ result }: ProductDescriptionTabsProps) => {
  return (
    <div className="w-layout-hflex tabs-block">
      <div className="tab active">Описание</div>
      <div className="tab">Характеристики</div>
      <div className="tab">Отзывы</div>
      <div className="tab">Аналоги</div>
    </div>
  );
};

export default ProductDescriptionTabs; 