import React, { useState } from "react";

const ProductDescriptionTabs = () => {
  const [activeTab, setActiveTab] = useState<'characteristics' | 'description'>('characteristics');

  return (
    <div className="w-layout-hflex flex-block-51">
      <div
        className={activeTab === 'characteristics' ? 'tab_card-activ' : 'tab_card'}
        onClick={() => setActiveTab('characteristics')}
        style={{ cursor: 'pointer' }}
      >
        Характеристики
      </div>
      <div
        className={activeTab === 'description' ? 'tab_card-activ' : 'tab_card'}
        onClick={() => setActiveTab('description')}
        style={{ cursor: 'pointer' }}
      >
        Описание
      </div>
    </div>
  );
};

export default ProductDescriptionTabs; 