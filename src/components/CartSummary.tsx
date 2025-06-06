import React, { useState } from "react";

const CartSummary: React.FC = () => {
  const [deliveryType, setDeliveryType] = useState("Доставка курьером");
  const [address, setAddress] = useState("Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1");
  const [consent, setConsent] = useState(false);

  const handleEditDelivery = () => {
    const value = prompt("Введите способ доставки", deliveryType);
    if (value !== null) setDeliveryType(value);
  };
  const handleEditAddress = () => {
    const value = prompt("Введите адрес доставки", address);
    if (value !== null) setAddress(value);
  };

  return (
    <div className="w-layout-vflex cart-ditail">
      <div className="cart-detail-info">
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Способ доставки</div>
          <div className="w-layout-hflex flex-block-57">
            <h4 className="heading-12">{deliveryType}</h4>
            <div className="link-r" onClick={handleEditDelivery} style={{ cursor: 'pointer' }}>Изменить</div>
          </div>
        </div>
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Адрес доставки</div>
          <div className="w-layout-hflex flex-block-57">
            <h4 className="heading-12">Дом</h4>
            <div className="link-r" onClick={handleEditAddress} style={{ cursor: 'pointer' }}>Изменить</div>
          </div>
          <div className="text-block-32">{address}</div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-vflex flex-block-60">
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy-copy">Товары, 3 шт.</div>
            <div className="text-block-33">2 538 ₽</div>
          </div>
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy-copy">Моя скидка</div>
            <div className="text-block-33">-570 ₽</div>
          </div>
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy-copy">Доставка</div>
            <div className="text-block-33">39 ₽</div>
          </div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-hflex flex-block-59">
          <div className="text-block-32">Итого</div>
          <h4 className="heading-9-copy-copy">39 389 ₽</h4>
        </div>
        <a href="#" className="submit-button fill w-button">Оформить заказ</a>
        <div className="w-layout-hflex privacy-consent" style={{ cursor: 'pointer' }} onClick={() => setConsent((v) => !v)}>
          <div
            className={"div-block-7" + (consent ? " active" : "")}
            style={{ marginRight: 8, cursor: 'pointer' }}
          >
            {consent && (
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M2 5.5L6 9L12 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <div className="consent-text">Соглашаюсь с правилами пользования торговой площадкой и возврата</div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary; 