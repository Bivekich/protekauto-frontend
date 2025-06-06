import React, { useState } from "react";
import CartItem from "./CartItem";

const initialItems = [
  {
    id: 1,
    name: "Ganz GIE37312",
    description: "Ролик ремня ГРМ VW AD GANZ GIE37312",
    delivery: "Послезавтра, курьером",
    deliveryDate: "пт, 7 февраля",
    price: "18 763 ₽",
    pricePerItem: "18 763 ₽/шт",
    count: 1,
    comment: "",
    selected: false,
    favorite: false,
  },
  {
    id: 2,
    name: "Ganz GIE37312",
    description: "Ролик ремня ГРМ VW AD GANZ GIE37312",
    delivery: "Послезавтра, курьером",
    deliveryDate: "пт, 7 февраля",
    price: "18 763 ₽",
    pricePerItem: "18 763 ₽/шт",
    count: 1,
    comment: "",
    selected: false,
    favorite: false,
  },
  // ...ещё товары
];

const CartList: React.FC = () => {
  const [items, setItems] = useState(initialItems);

  const allSelected = items.length > 0 && items.every((item) => item.selected);

  const handleSelectAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: !allSelected })));
  };

  const handleRemoveAll = () => {
    setItems((prev) => prev.filter((item) => !item.selected));
  };

  const handleSelect = (id: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const handleFavorite = (id: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, favorite: !item.favorite } : item));
  };

  const handleComment = (id: number, comment: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, comment } : item));
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-layout-vflex flex-block-48">
      <div className="w-layout-vflex product-list-cart">
        <div className="w-layout-hflex multi-control">
          <div className="w-layout-hflex select-all-block" onClick={handleSelectAll} style={{ cursor: 'pointer' }}>
            <div
              className={"div-block-7" + (allSelected ? " active" : "")}
              style={{ marginRight: 8, cursor: 'pointer' }}
            >
              {allSelected && (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M2 5.5L6 9L12 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="text-block-30">Выделить всё</div>
          </div>
          <div className="w-layout-hflex select-all-block" onClick={handleRemoveAll} style={{ cursor: 'pointer' }}>
            <div className="text-block-30">Удалить всё</div>
            <img src="/images/delete.svg" loading="lazy" alt="" className="image-13" />
          </div>
        </div>
        {items.map((item) => (
          <div className="div-block-21" key={item.id}>
            <CartItem
              {...item}
              onSelect={() => handleSelect(item.id)}
              onFavorite={() => handleFavorite(item.id)}
              onComment={(comment) => handleComment(item.id, comment)}
              onRemove={() => handleRemove(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList; 