import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function PaymentSuccess() {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Получаем параметры из URL (ЮКасса передает их при возврате)
    const { payment_id, order_id } = router.query;
    
    if (payment_id) {
      setPaymentId(payment_id as string);
    }
    
    if (order_id) {
      setOrderId(order_id as string);
    }
  }, [router.query]);

  const handleContinueShopping = () => {
    router.push('/catalog');
  };

  const handleViewOrders = () => {
    router.push('/profile-orders');
  };

  return (
    <>
      <Head>
        <title>Оплата прошла успешно - Protekauto</title>
        <meta name="description" content="Ваш заказ успешно оплачен" />
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
            <div className="text-block-3">Оплата завершена</div>
          </div>
        </div>
      </div>

      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex" style={{ alignItems: 'center', textAlign: 'center', padding: '4rem 0' }}>
            
            {/* Иконка успеха */}
            <div style={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              backgroundColor: '#10B981', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Заголовок */}
            <h1 className="heading" style={{ marginBottom: '1rem', color: '#10B981' }}>
              Оплата прошла успешно!
            </h1>

            {/* Описание */}
            <div className="text-block-4" style={{ marginBottom: '2rem', maxWidth: 600 }}>
              Спасибо за ваш заказ! Оплата была успешно обработана. 
              Мы отправили подтверждение на вашу электронную почту.
            </div>

            {/* Информация о заказе */}
            {(paymentId || orderId) && (
              <div style={{ 
                backgroundColor: '#F9FAFB', 
                border: '1px solid #E5E7EB', 
                borderRadius: 8, 
                padding: '1.5rem',
                marginBottom: '2rem',
                maxWidth: 400,
                width: '100%'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
                  Детали платежа
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
                onClick={handleViewOrders}
                style={{ minWidth: 200 }}
              >
                Мои заказы
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
              backgroundColor: '#FEF3C7',
              border: '1px solid #F59E0B',
              borderRadius: 8,
              maxWidth: 600,
              width: '100%'
            }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#92400E' }}>
                Что дальше?
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#92400E' }}>
                <li>Мы обработаем ваш заказ в течение 1-2 рабочих дней</li>
                <li>Вы получите уведомление о статусе заказа на email</li>
                <li>Отслеживать заказ можно в разделе "Мои заказы"</li>
                <li>При вопросах обращайтесь в службу поддержки</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 