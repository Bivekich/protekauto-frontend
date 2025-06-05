import React from "react";

const sortOptions = [
  "По популярности",
  "Сначала дешевле",
  "Сначала дороже",
  "Высокий рейтинг",
];

interface CatalogSortProps {
  active: number;
  onChange: (idx: number) => void;
}

const CatalogSort: React.FC<CatalogSortProps> = ({ active, onChange }) => {
  return (
    <div className="w-layout-hflex sort_block">
      {sortOptions.map((option, idx) => (
        <button
          key={option}
          className={
            "sort_btn" + (active === idx ? " sort_btn-active" : "")
          }
          onClick={() => onChange(idx)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default CatalogSort; 