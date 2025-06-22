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
    <div className="w-layout-vflex">
      {/* Заголовок с информацией о товаре */}
      {(brand || articleNumber || name) && (
        <div className="product-header-info mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {brand && <span className="text-red-600">{brand}</span>}
            {brand && articleNumber && <span className="mx-2">•</span>}
            {articleNumber && <span className="text-gray-700">{articleNumber}</span>}
          </h1>
          {name && (
            <p className="text-lg text-gray-600 mt-1">{name}</p>
          )}
        </div>
      )}
      
      {/* Сортировка */}
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
    </div>
  );
};

export default ProductSortHeader; 