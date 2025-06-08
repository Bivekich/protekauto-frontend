import React, { useState } from "react";

const categories = [
  "Все",
  "Новости компании",
  "Новые поступления",
  "Другое"
];

const NewsMenu = () => {
  const [active, setActive] = useState<number | null>(0);

  const handleClick = (idx: number) => {
    setActive(active === idx ? null : idx);
  };

  return (
    <div className="w-layout-hflex menu-category">
      {categories.map((cat, idx) => (
        <div
          key={cat}
          className={
            idx === active
              ? "tab-menu-category-activ"
              : "tab-menu-category"
          }
          onClick={() => handleClick(idx)}
          style={{ cursor: "pointer" }}
        >
          {cat}
        </div>
      ))}
    </div>
  );
};

export default NewsMenu; 