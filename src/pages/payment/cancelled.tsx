import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function PaymentCancelled() {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Получаем параметры из URL
    const { payment_id, order_id } = router.query;
    
    if (payment_id) {
      setPaymentId(payment_id as string);
    }
    
    if (order_id) {
      setOrderId(order_id as string);
    }
  }, [router.query]);

  const handleReturnToCart = () => {
    router.push('/cart');
  };

  const handleContinueShopping = () => {
    router.push('/catalog');
  };

  return (
    <>
      <Head>
        <title>Оплата отменена - Protekauto</title>
        <meta name="description" content="Оплата заказа была отменена" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      
      <Header />
      
      <div className="w-layout-blockcontainer container info w-container">
        <div className="w-layout-vflex flex-block-9">
          <div className="w-layout-hflex flex-block-7">
            <a href="/" className="link-block w-inline-block">
              <div>Главная</div>
            </a>
            <div className="text-block-3">→</div>
            <div className="text-block-3">Оплата отменена</div>
          </div>
        </div>
      </div>

      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex" style={{ alignItems: 'center', textAlign: 'center', padding: '4rem 0' }}>
            
            {/* Иконка отмены */}
            <div style={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              backgroundColor: '#F59E0B', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Заголовок */}
            <h1 className="heading" style={{ marginBottom: '1rem', color: '#F59E0B' }}>
              Оплата отменена
            </h1>

            {/* Описание */}
            <div className="text-block-4" style={{ marginBottom: '2rem', maxWidth: 600 }}>
              Вы отменили процесс оплаты. Ваш заказ сохранен в корзине, 
              и вы можете завершить оплату в любое время.
            </div>

            {/* Информация о заказе */}
            {(paymentId || orderId) && (
              <div style={{ 
                backgroundColor: '#FFFBEB', 
                border: '1px solid #FDE68A', 
                borderRadius: 8, 
                padding: '1.5rem',
                marginBottom: '2rem',
                maxWidth: 400,
                width: '100%'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 600, color: '#92400E' }}>
                  Информация о заказе
                </h3>
                {orderId && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Номер заказа:</strong> {orderId}
                  </div>
                )}
                {paymentId && (
                  <div>
                    <strong>ID платежа:</strong> {paymentId}
                  </div>
                )}
              </div>
            )}

            {/* Кнопки действий */}
            <div className="w-layout-hflex" style={{ gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className="submit-button fill w-button"
                onClick={handleReturnToCart}
                style={{ minWidth: 200 }}
              >
                Вернуться в корзину
              </button>
              
              <button 
                className="submit-button w-button"
                onClick={handleContinueShopping}
                style={{ 
                  minWidth: 200,
                  backgroundColor: 'transparent',
                  border: '2px solid var(--_button---primary)',
                  color: 'var(--_button---primary)'
                }}
              >
                Продолжить покупки
              </button>
            </div>

            {/* Дополнительная информация */}
            <div style={{ 
              marginTop: '3rem', 
              padding: '1.5rem',
              backgroundColor: '#F0F9FF',
              border: '1px solid #BAE6FD',
              borderRadius: 8,
              maxWidth: 600,
              width: '100%'
            }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#0C4A6E' }}>
                Что произошло?
              </h4>
              <div style={{ color: '#0369A1', lineHeight: 1.6 }}>
                Процесс оплаты был прерван по вашему запросу. Это может произойти, если вы:
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                  <li>Нажали кнопку "Отмена" на странице оплаты</li>
                  <li>Закрыли окно браузера во время оплаты</li>
                  <li>Вернулись на предыдущую страницу</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 