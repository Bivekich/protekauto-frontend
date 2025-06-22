import React, { useState } from "react";

interface ProductDescriptionTabsProps {
  result?: any;
}

const tabList = [
  { key: 'description', label: 'Описание' },
  { key: 'characteristics', label: 'Характеристики' },
  // { key: 'reviews', label: 'Отзывы' },
  // { key: 'analogs', label: 'Аналоги' }
];

const ProductDescriptionTabs = ({ result }: ProductDescriptionTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'characteristics' | 'reviews' | 'analogs'>('characteristics');

  return (
    <div className="w-layout-hflex flex-block-51">
      {tabList.map(tab => (
        <div
          key={tab.key}
          className={activeTab === tab.key ? 'tab_card-activ' : 'tab_card'}
          onClick={() => setActiveTab(tab.key as typeof activeTab)}
          style={{ cursor: 'pointer' }}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default ProductDescriptionTabs; 