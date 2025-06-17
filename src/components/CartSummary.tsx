import React, { useState } from "react";
import Link from "next/link";

const CartSummary: React.FC = () => {
  const [deliveryType, setDeliveryType] = useState("Доставка курьером");
  const [address, setAddress] = useState("Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleEditDelivery = () => {
    const value = prompt("Введите способ доставки", deliveryType);
    if (value !== null) setDeliveryType(value);
  };
  const handleEditAddress = () => {
    const value = prompt("Введите адрес доставки", address);
    if (value !== null) setAddress(value);
  };

  const handleSubmit = () => {
    if (deliveryType.trim() === "" || address.trim() === "" || !consent) {
      setError("Пожалуйста, заполните все поля и согласитесь с правилами.");
    } else {
      setError("");
      // Здесь можно добавить переход на страницу оформления заказа
      window.location.href = "/cart-step-2";
    }
  };

  return (
    <div className="w-layout-vflex cart-ditail">
      <div className="cart-detail-info">
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Подразделение</div>
          <h4 className="heading-12">ООО Рога и копыта</h4>
        </div>
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Способ получения</div>
          <h4 className="heading-12">Доставка курьером</h4>
          <div className="text-block-32">Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1</div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-vflex flex-block-63">
          <h4 className="heading-12">Получатель</h4>
          <div className="w-layout-hflex flex-block-62">
            <input
              className="input-receiver"
              type="text"
              placeholder="Имя и фамилия"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          <div className="w-layout-hflex flex-block-62">
            <input
              className="input-receiver"
              type="tel"
              placeholder="Номер телефона"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-vflex flex-block-60">
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy">Товары, 3 шт.</div>
            <div className="text-block-33">2 538 ₽</div>
          </div>
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy">Моя скидка</div>
            <div className="text-block-33">-570 ₽</div>
          </div>
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy">Доставка</div>
            <div className="text-block-33">39 ₽</div>
          </div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-hflex flex-block-59">
          <div className="text-block-32">Итого</div>
          <h4 className="heading-9-copy-copy">39 389 ₽</h4>
        </div>
        <a href="#" className="submit-button fill w-button">Оплатить</a>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
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