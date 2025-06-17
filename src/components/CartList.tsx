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
            <div className={"div-block-7" + (allSelected ? " active" : "")}
                 style={{ marginRight: 8, cursor: 'pointer' }}>
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
            <div className="bdel w-embed">
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.625 17.5C4.14375 17.5 3.73192 17.3261 3.3895 16.9782C3.04708 16.6304 2.87558 16.2117 2.875 15.7222V4.16667H2V2.38889H6.375V1.5H11.625V2.38889H16V4.16667H15.125V15.7222C15.125 16.2111 14.9538 16.6298 14.6114 16.9782C14.269 17.3267 13.8568 17.5006 13.375 17.5H4.625ZM6.375 13.9444H8.125V5.94444H6.375V13.9444ZM9.875 13.9444H11.625V5.94444H9.875V13.9444Z" fill="currentColor"></path>
              </svg>
            </div>
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