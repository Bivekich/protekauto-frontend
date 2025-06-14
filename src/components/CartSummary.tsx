import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER, CREATE_PAYMENT } from "@/lib/graphql";

const CartSummary: React.FC = () => {
  const { state, updateDelivery, clearCart } = useCart();
  const { summary, delivery, items } = state;
  
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [createOrder] = useMutation(CREATE_ORDER);
  const [createPayment] = useMutation(CREATE_PAYMENT);

  const handleEditDelivery = () => {
    const value = prompt("Введите способ доставки", delivery.type);
    if (value !== null) {
      updateDelivery({ type: value });
    }
  };

  const handleEditAddress = () => {
    const value = prompt("Введите адрес доставки", delivery.address);
    if (value !== null) {
      updateDelivery({ address: value });
    }
  };

  const handleSubmit = async () => {
    if (delivery.type.trim() === "" || delivery.address.trim() === "" || !consent) {
      setError("Пожалуйста, заполните все поля и согласитесь с правилами.");
      return;
    }
    
    if (summary.totalItems === 0) {
      setError("Корзина пуста. Добавьте товары для оформления заказа.");
      return;
    }

    // Проверяем авторизацию
    const userData = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;
    if (!userData) {
      setError("Необходимо авторизоваться для оформления заказа.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const user = JSON.parse(userData);
      const selectedItems = items.filter(item => item.selected);

      // Создаем заказ
      const orderResult = await createOrder({
        variables: {
          input: {
            clientEmail: user.email || '',
            clientPhone: user.phone || '',
            clientName: user.name || '',
            deliveryAddress: delivery.address,
            comment: `Способ доставки: ${delivery.type}`,
            items: selectedItems.map(item => ({
              productId: item.productId,
              externalId: item.offerKey,
              name: item.name,
              article: item.article || '',
              brand: item.brand || '',
              price: item.price,
              quantity: item.quantity
            }))
          }
        }
      });

      const order = orderResult.data?.createOrder;
      if (!order) {
        throw new Error('Не удалось создать заказ');
      }

      // Создаем платеж
      const paymentResult = await createPayment({
        variables: {
          input: {
            orderId: order.id,
            returnUrl: `${window.location.origin}/payment/success`,
            description: `Оплата заказа №${order.orderNumber}`
          }
        }
      });

      const payment = paymentResult.data?.createPayment;
      if (!payment?.confirmationUrl) {
        throw new Error('Не удалось создать платеж');
      }

      // Очищаем корзину и переходим на оплату
      clearCart();
      window.location.href = payment.confirmationUrl;

    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при оформлении заказа');
    } finally {
      setIsProcessing(false);
    }
  };

  // Функция для форматирования цены
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  return (
    <div className="w-layout-vflex cart-ditail">
      <div className="cart-detail-info">
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Способ доставки</div>
          <div className="w-layout-hflex flex-block-57">
            <h4 className="heading-12">{delivery.type}</h4>
            <div className="link-r" onClick={handleEditDelivery} style={{ cursor: 'pointer' }}>Изменить</div>
          </div>
        </div>
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Адрес доставки</div>
          <div className="w-layout-hflex flex-block-57">
            <h4 className="heading-12">Дом</h4>
            <div className="link-r" onClick={handleEditAddress} style={{ cursor: 'pointer' }}>Изменить</div>
          </div>
          <div className="text-block-32">{delivery.address}</div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-vflex flex-block-60">
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy-copy">
              Товары, {summary.totalItems} шт.
            </div>
            <div className="text-block-33">{formatPrice(summary.totalPrice)}</div>
          </div>
          {summary.totalDiscount > 0 && (
            <div className="w-layout-hflex flex-block-59">
              <div className="text-block-21-copy-copy">Моя скидка</div>
              <div className="text-block-33">-{formatPrice(summary.totalDiscount)}</div>
            </div>
          )}
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy-copy">Доставка</div>
            <div className="text-block-33">{formatPrice(summary.deliveryPrice)}</div>
          </div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-hflex flex-block-59">
          <div className="text-block-32">Итого</div>
          <h4 className="heading-9-copy-copy">{formatPrice(summary.finalPrice)}</h4>
        </div>
        <button 
          className="submit-button fill w-button" 
          onClick={handleSubmit}
          disabled={summary.totalItems === 0 || isProcessing}
          style={{ 
            opacity: (summary.totalItems === 0 || isProcessing) ? 0.5 : 1,
            cursor: (summary.totalItems === 0 || isProcessing) ? 'not-allowed' : 'pointer'
          }}
        >
          {isProcessing ? 'Оформляем заказ...' : 'Оформить заказ'}
        </button>
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