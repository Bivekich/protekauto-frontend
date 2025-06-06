import React, { useState } from "react";

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
  },
  // ...ещё товары
];

const CartList2: React.FC = () => {
  const [items, setItems] = useState(initialItems);

  const handleComment = (id: number, comment: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, comment } : item));
  };

  return (
    <div className="w-layout-vflex flex-block-48">
      <div className="w-layout-vflex product-list-cart-check">
        {items.map((item) => (
          <div className="div-block-21-copy" key={item.id}>
            <div className="w-layout-hflex cart-item-check">
              <div className="w-layout-hflex info-block-search">
                <div className="text-block-35">{item.count}</div>
                <div className="w-layout-hflex block-name">
                  <h4 className="heading-9-copy">{item.name}</h4>
                  <div className="text-block-21-copy">{item.description}</div>
                </div>
                <div className="form-block-copy w-form">
                  <form className="form-copy" onSubmit={e => e.preventDefault()}>
                    <input
                      className="text-field-copy w-input"
                      maxLength={256}
                      name="Search-5"
                      data-name="Search 5"
                      placeholder="Комментарий"
                      type="text"
                      id="Search-5"
                      value={item.comment}
                      onChange={e => handleComment(item.id, e.target.value)}
                    />
                  </form>
                  <div className="success-message w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div className="error-message w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </div>
              <div className="w-layout-hflex add-to-cart-block">
                <div className="w-layout-hflex flex-block-39-copy">
                  <h4 className="heading-9-copy">{item.delivery}</h4>
                  <div className="text-block-21-copy">{item.deliveryDate}</div>
                </div>
                <div className="w-layout-hflex pcs">
                  <div className="pcs-text">{item.count} шт.</div>
                </div>
                <div className="w-layout-hflex flex-block-39-copy-copy">
                  <h4 className="heading-9-copy-copy">{item.price}</h4>
                  <div className="text-block-21-copy-copy">{item.pricePerItem}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList2; 