import React, { useState } from "react";
import Filters, { FilterConfig } from "./Filters";

const initialItems = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  brand: "VAG",
  article: "6RU807421BGRU",
  name: "Ролик ремня ГРМ VW AD GANZ GIE37312",
  price: "от 18 763 ₽",
}));

const FavoriteList: React.FC<{ filters: FilterConfig[] }> = ({ filters }) => {
  const [items, setItems] = useState(initialItems);
  const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({});

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveAll = () => {
    setItems([]);
  };

  const handleFilterChange = (type: string, value: any) => {
    setFilterValues(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="w-layout-hflex core-product-card">
      <Filters 
        filters={filters} 
        onFilterChange={handleFilterChange}
        filterValues={filterValues}
      />
      <div className="w-layout-vflex flex-block-48">
        <div className="w-layout-vflex product-list-cart">
          <div className="w-layout-hflex heading-list">
            <div className="w-layout-hflex flex-block-61">
              <div className="sort-item-brand">Производитель</div>
              <div className="sort-item-brand-copy">Артикул</div>
              <div className="sort-item-name">Наименование</div>
              <div className="sort-item-comments">Комментарий</div>
            </div>
            <div className="w-layout-hflex select-all-block" onClick={handleRemoveAll} style={{ cursor: 'pointer' }}>
              <div className="text-block-30">Удалить всё</div>
              <img src="/images/delete.svg" alt="" className="image-13" />
            </div>
          </div>
          {items.map((item) => (
            <div className="div-block-21" key={item.id}>
              <div className="w-layout-hflex favorite-item">
                <div className="w-layout-hflex info-block-search">
                  <div className="w-layout-hflex block-detail">
                    <h4 className="brandname">{item.brand}</h4>
                    <h4 className="brandname">{item.article}</h4>
                    <div className="productname_f">{item.name}</div>
                  </div>
                  <div className="comments_f w-form">
                    <form className="form-copy">
                      <input className="text-field-copy w-input" maxLength={256} name="Search-5" placeholder="Комментарий" type="text" id={`Search-5-${item.id}`} required />
                    </form>
                  </div>
                </div>
                <div className="w-layout-hflex add-to-cart-block">
                  <h4 className="heading-9-copy-copy">{item.price}</h4>
                  <div className="w-layout-hflex control-element">
                    <img src="/images/delete.svg" alt="" className="image-13" style={{ cursor: 'pointer' }} onClick={() => handleRemove(item.id)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>Нет избранных товаров</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList; 