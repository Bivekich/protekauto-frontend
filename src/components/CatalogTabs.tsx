import React, { useState } from "react";

const tabs = [
  "Популярные",
  "Сначала дешевле",
  "Сначала дороже",
  "Высокий рейтинг",
];

const CatalogTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="w-layout-hflex tabs_block">
      {tabs.map((tab, idx) => (
        <div
          key={tab}
          className={
            "tab_c" + (active === idx ? " tab_card-activ" : "")
          }
          style={active === idx ? { borderBottomColor: "var(--_button---primary)" } : {}}
          onClick={() => setActive(idx)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default CatalogTabs; 