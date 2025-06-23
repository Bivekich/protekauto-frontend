import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const InvoicePage: React.FC = () => {
  const router = useRouter();
  const { orderId, orderNumber } = router.query;
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Здесь можно загрузить данные заказа если нужно
    // Пока используем базовую информацию из query параметров
  }, [orderId, orderNumber]);

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleGoToProfile = () => {
    router.push('/profile/orders');
  };

  return (
    <>
      <Head>
        <title>Счёт на оплату - Протек Авто</title>
        <meta name="description" content="Счёт на оплату заказа" />
      </Head>

      <div className="w-layout-vflex" style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        padding: '40px 20px'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {/* Заголовок */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#28a745',
              borderRadius: '50%',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#333', 
              marginBottom: '8px' 
            }}>
              Заказ оформлен!
            </h1>
            <p style={{ 
              fontSize: '16px', 
              color: '#666',
              marginBottom: '0'
            }}>
              Заказ №{orderNumber} успешно создан
            </p>
          </div>

          {/* Информация о счёте */}
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#333', 
              marginBottom: '16px' 
            }}>
              Реквизиты для оплаты
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Получатель
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                ООО "Протек Авто"
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                ИНН
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                1234567890
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                КПП
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                123456001
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Расчётный счёт
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                40702810123456789012
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Банк
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                ПАО "Сбербанк России"
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                БИК
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                044525225
              </div>
            </div>

            <div style={{ marginBottom: '0' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Корреспондентский счёт
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                30101810400000000225
              </div>
            </div>
          </div>

          {/* Важная информация */}
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '32px'
          }}>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#856404', 
              marginBottom: '8px' 
            }}>
              Важно!
            </h4>
            <p style={{ 
              fontSize: '14px', 
              color: '#856404',
              marginBottom: '8px'
            }}>
              • В назначении платежа обязательно укажите номер заказа: <strong>№{orderNumber}</strong>
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: '#856404',
              marginBottom: '8px'
            }}>
              • Счёт на оплату будет выслан на указанную при оформлении заказа электронную почту
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: '#856404',
              marginBottom: '0'
            }}>
              • После поступления оплаты заказ будет передан в обработку
            </p>
          </div>

          {/* Кнопки действий */}
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            flexDirection: 'column'
          }}>
            <button
              onClick={handleGoToProfile}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0056b3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#007bff';
              }}
            >
              Мои заказы
            </button>
            
            <button
              onClick={handleBackToHome}
              style={{
                backgroundColor: 'transparent',
                color: '#007bff',
                border: '1px solid #007bff',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#007bff';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#007bff';
              }}
            >
              На главную
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage; 