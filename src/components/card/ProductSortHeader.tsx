import React from "react";

interface ProductSortHeaderProps {
  brand?: string;
  articleNumber?: string;
  name?: string;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const sortOptions = [
    { key: "delivery", label: "Доставка" },
  { key: "quantity", label: "Количество" },
  
  { key: "price", label: "Цена" }
];

const ProductSortHeader: React.FC<ProductSortHeaderProps> = ({ 
  brand, 
  articleNumber, 
  name, 
  sortBy, 
  onSortChange 
}) => {
  const handleClick = (key: string) => {
    if (sortBy === key) {
      onSortChange(""); // сброс сортировки
    } else {
      onSortChange(key);
    }
  };

  return (
    <div className="w-layout-hflex sort-list-card">
      {sortOptions.map(option => (
        <div
          key={option.key}
          className={`sort-item${sortBy === option.key ? " active" : ""}`}
          onClick={() => handleClick(option.key)}
          style={{ cursor: "pointer" }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default ProductSortHeader; 