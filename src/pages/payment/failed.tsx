import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function PaymentFailed() {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Получаем параметры из URL
    const { payment_id, order_id, error } = router.query;
    
    if (payment_id) {
      setPaymentId(payment_id as string);
    }
    
    if (order_id) {
      setOrderId(order_id as string);
    }

    if (error) {
      setErrorMessage(error as string);
    }
  }, [router.query]);

  const handleRetryPayment = () => {
    // Возвращаемся в корзину для повторной попытки
    router.push('/cart');
  };

  const handleContactSupport = () => {
    router.push('/contacts');
  };

  const handleContinueShopping = () => {
    router.push('/catalog');
  };

  return (
    <>
      <Head>
        <title>Ошибка оплаты - Protekauto</title>
        <meta name="description" content="Произошла ошибка при оплате заказа" />
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
            <div className="text-block-3">Ошибка оплаты</div>
          </div>
        </div>
      </div>

      <section className="main">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex" style={{ alignItems: 'center', textAlign: 'center', padding: '4rem 0' }}>
            
            {/* Иконка ошибки */}
            <div style={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              backgroundColor: '#EF4444', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Заголовок */}
            <h1 className="heading" style={{ marginBottom: '1rem', color: '#EF4444' }}>
              Ошибка оплаты
            </h1>

            {/* Описание */}
            <div className="text-block-4" style={{ marginBottom: '2rem', maxWidth: 600 }}>
              К сожалению, произошла ошибка при обработке платежа. 
              Ваш заказ не был оплачен, но вы можете попробовать еще раз.
            </div>

            {/* Информация об ошибке */}
            {(paymentId || orderId || errorMessage) && (
              <div style={{ 
                backgroundColor: '#FEF2F2', 
                border: '1px solid #FECACA', 
                borderRadius: 8, 
                padding: '1.5rem',
                marginBottom: '2rem',
                maxWidth: 400,
                width: '100%'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 600, color: '#DC2626' }}>
                  Детали ошибки
                </h3>
                {orderId && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Номер заказа:</strong> {orderId}
                  </div>
                )}
                {paymentId && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>ID платежа:</strong> {paymentId}
                  </div>
                )}
                {errorMessage && (
                  <div style={{ color: '#DC2626' }}>
                    <strong>Ошибка:</strong> {errorMessage}
                  </div>
                )}
              </div>
            )}

            {/* Кнопки действий */}
            <div className="w-layout-hflex" style={{ gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className="submit-button fill w-button"
                onClick={handleRetryPayment}
                style={{ minWidth: 200 }}
              >
                Попробовать снова
              </button>
              
              <button 
                className="submit-button w-button"
                onClick={handleContactSupport}
                style={{ 
                  minWidth: 200,
                  backgroundColor: 'transparent',
                  border: '2px solid var(--_button---primary)',
                  color: 'var(--_button---primary)'
                }}
              >
                Связаться с поддержкой
              </button>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button 
                onClick={handleContinueShopping}
                style={{ 
                  background: 'none',
                  border: 'none',
                  color: '#6B7280',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Продолжить покупки
              </button>
            </div>

            {/* Дополнительная информация */}
            <div style={{ 
              marginTop: '3rem', 
              padding: '1.5rem',
              backgroundColor: '#F3F4F6',
              border: '1px solid #D1D5DB',
              borderRadius: 8,
              maxWidth: 600,
              width: '100%'
            }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#374151' }}>
                Возможные причины ошибки:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6B7280' }}>
                <li>Недостаточно средств на карте</li>
                <li>Карта заблокирована или просрочена</li>
                <li>Неверно введены данные карты</li>
                <li>Технические проблемы платежной системы</li>
                <li>Превышен лимит по карте</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 