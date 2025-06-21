import React from "react";

interface ProductSortHeaderProps {
  brand?: string;
  articleNumber?: string;
  name?: string;
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
}

export default function ProductSortHeader({ brand, articleNumber, name, sortBy = "price", onSortChange }: ProductSortHeaderProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSortChange) {
      onSortChange(e.target.value);
    }
  };

  return (
    <div className="w-layout-hflex flex-block-52">
      <div className="w-layout-vflex flex-block-53">
        <h2 className="heading-2">{brand || "БРЕНД"} {articleNumber || "АРТИКУЛ"}</h2>
        <div className="text-block-23">{name || "Название товара"}</div>
      </div>
      <div className="w-layout-hflex flex-block-54">
        <div className="text-block-24">Сортировать по:</div>
        <select className="select w-select" value={sortBy} onChange={handleSortChange}>
          <option value="price">Цене</option>
          <option value="quantity">Количеству</option>
          <option value="delivery">Доставке</option>
        </select>
      </div>
    </div>
  );
} 