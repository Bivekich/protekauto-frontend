import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ORDER, CREATE_PAYMENT, GET_CLIENT_ME, GET_CLIENT_DELIVERY_ADDRESSES, GET_DELIVERY_OFFERS } from "@/lib/graphql";

const CartSummary: React.FC = () => {
  const { state, updateDelivery, updateOrderComment, clearCart } = useCart();
  const { summary, delivery, items, orderComment } = state;
  const legalEntityDropdownRef = useRef<HTMLDivElement>(null);
  const addressDropdownRef = useRef<HTMLDivElement>(null);
  const paymentDropdownRef = useRef<HTMLDivElement>(null);
  
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 - первый шаг, 2 - второй шаг
  
  // Новые состояния для первого шага
  const [selectedLegalEntity, setSelectedLegalEntity] = useState<string>("");
  const [selectedLegalEntityId, setSelectedLegalEntityId] = useState<string>("");
  const [isIndividual, setIsIndividual] = useState(true); // true = физ лицо, false = юр лицо
  const [showLegalEntityDropdown, setShowLegalEntityDropdown] = useState(false);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState<string>("");
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  
  // Новые состояния для способа оплаты
  const [paymentMethod, setPaymentMethod] = useState<string>("yookassa");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  
  // Состояния для офферов доставки
  const [deliveryOffers, setDeliveryOffers] = useState<any[]>([]);
  const [selectedDeliveryOffer, setSelectedDeliveryOffer] = useState<any>(null);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [offersError, setOffersError] = useState<string>("");
  
  const [createOrder] = useMutation(CREATE_ORDER);
  const [createPayment] = useMutation(CREATE_PAYMENT);
  const [getDeliveryOffers] = useMutation(GET_DELIVERY_OFFERS);

  // Получаем данные клиента
  const { data: clientData, loading: clientLoading } = useQuery(GET_CLIENT_ME);
  const { data: addressesData, loading: addressesLoading } = useQuery(GET_CLIENT_DELIVERY_ADDRESSES);



  // Получаем пользователя из localStorage для проверки авторизации
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, []);

  // Загрузка состояния компонента из localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCartSummaryState = localStorage.getItem('cartSummaryState');
      if (savedCartSummaryState) {
        try {
          const state = JSON.parse(savedCartSummaryState);
          setCurrentStep(state.currentStep || 1);
          setSelectedLegalEntity(state.selectedLegalEntity || '');
          setSelectedLegalEntityId(state.selectedLegalEntityId || '');
          setIsIndividual(state.isIndividual ?? true);
          setSelectedDeliveryAddress(state.selectedDeliveryAddress || '');
          setRecipientName(state.recipientName || '');
          setRecipientPhone(state.recipientPhone || '');
          setPaymentMethod(state.paymentMethod || 'yookassa');
          setConsent(state.consent || false);
        } catch (error) {
          console.error('Ошибка загрузки состояния CartSummary:', error);
        }
      }
    }
  }, []);

  // Сохранение состояния компонента в localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stateToSave = {
        currentStep,
        selectedLegalEntity,
        selectedLegalEntityId,
        isIndividual,
        selectedDeliveryAddress,
        recipientName,
        recipientPhone,
        paymentMethod,
        consent
      };
      localStorage.setItem('cartSummaryState', JSON.stringify(stateToSave));
    }
  }, [currentStep, selectedLegalEntity, selectedLegalEntityId, isIndividual, selectedDeliveryAddress, recipientName, recipientPhone, paymentMethod, consent]);

  // Инициализация данных получателя
  useEffect(() => {
    if (clientData?.clientMe && !recipientName && !recipientPhone) {
      setRecipientName(clientData.clientMe.name || '');
      setRecipientPhone(clientData.clientMe.phone || '');
    }
  }, [clientData, recipientName, recipientPhone]);

  // Закрытие dropdown при клике вне их
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем клик вне дропдауна типа лица
      if (legalEntityDropdownRef.current && !legalEntityDropdownRef.current.contains(event.target as Node)) {
        setShowLegalEntityDropdown(false);
      }
      
      // Проверяем клик вне дропдауна адресов
      if (addressDropdownRef.current && !addressDropdownRef.current.contains(event.target as Node)) {
        setShowAddressDropdown(false);
      }
      
      // Проверяем клик вне дропдауна способов оплаты
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target as Node)) {
        setShowPaymentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Функция для загрузки офферов доставки
  const loadDeliveryOffers = async () => {
    if (!selectedDeliveryAddress || !recipientName || !recipientPhone || items.length === 0) {
      return;
    }

    setLoadingOffers(true);
    setOffersError("");

    try {

      
      // Подготавливаем данные для API
      const deliveryOffersInput = {
        items: items.map(item => ({
          name: item.name,
          article: item.article || '',
          brand: item.brand || '',
          price: item.price,
          quantity: item.quantity,
          weight: item.weight || 500, // Примерный вес в граммах
          dimensions: "10x10x5" // Примерные размеры
        })),
        deliveryAddress: selectedDeliveryAddress,
        recipientName,
        recipientPhone
      };

      const { data } = await getDeliveryOffers({
        variables: { input: deliveryOffersInput }
      });

      if (data?.getDeliveryOffers && Array.isArray(data.getDeliveryOffers) && data.getDeliveryOffers.length > 0) {
        setDeliveryOffers(data.getDeliveryOffers);
        setOffersError('');
        
        // Автоматически выбираем первый оффер
        const firstOffer = data.getDeliveryOffers[0];
        setSelectedDeliveryOffer(firstOffer);
        
        // Обновляем стоимость доставки в корзине
        updateDelivery({ 
          address: selectedDeliveryAddress,
          cost: firstOffer.cost,
          date: firstOffer.deliveryDate,
          time: firstOffer.deliveryTime
        });
      } else {
        setOffersError('Не удалось получить варианты доставки');
        
        // Добавляем стандартные варианты доставки как fallback
        const standardOffers = [
          {
            id: 'standard',
            name: 'Стандартная доставка',
            description: 'Доставка в течение 3-5 рабочих дней',
            deliveryDate: 'в течение 3-5 рабочих дней',
            deliveryTime: '',
            cost: 500
          },
          {
            id: 'express',
            name: 'Экспресс доставка',
            description: 'Доставка на следующий день',
            deliveryDate: 'завтра',
            deliveryTime: '10:00-18:00',
            cost: 1000
          }
        ];
        setDeliveryOffers(standardOffers);
        setSelectedDeliveryOffer(standardOffers[0]);
        updateDelivery({ 
          address: selectedDeliveryAddress,
          cost: standardOffers[0].cost,
          date: standardOffers[0].deliveryDate,
          time: standardOffers[0].deliveryTime
        });
      }
    } catch (error) {
      setOffersError('Ошибка загрузки вариантов доставки');
      
      // Добавляем стандартные варианты доставки как fallback при ошибке
      const standardOffers = [
        {
          id: 'standard',
          name: 'Стандартная доставка',
          description: 'Доставка в течение 3-5 рабочих дней',
          deliveryDate: 'в течение 3-5 рабочих дней',
          deliveryTime: '',
          cost: 500
        }
      ];
      setDeliveryOffers(standardOffers);
      setSelectedDeliveryOffer(standardOffers[0]);
      updateDelivery({ 
        address: selectedDeliveryAddress,
        cost: standardOffers[0].cost,
        date: standardOffers[0].deliveryDate,
        time: standardOffers[0].deliveryTime
      });
    } finally {
      setLoadingOffers(false);
    }
  };





  // Автоматическая загрузка офферов при изменении ключевых данных
  useEffect(() => {
    if (selectedDeliveryAddress && recipientName && recipientPhone && items.length > 0) {
      // Загружаем офферы с небольшой задержкой для избежания множественных запросов
      const timeoutId = setTimeout(() => {
        loadDeliveryOffers();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedDeliveryAddress, recipientName, recipientPhone, items.length]);

  const handleProceedToStep2 = () => {
    if (!selectedDeliveryAddress) {
      setError("Пожалуйста, выберите адрес доставки.");
      return;
    }
    
    if (summary.totalItems === 0) {
      setError("Корзина пуста. Добавьте товары для оформления заказа.");
      return;
    }

    if (!selectedDeliveryOffer) {
      setError("Пожалуйста, выберите способ доставки.");
      return;
    }

    // Проверяем достаточность средств для оплаты с баланса
    if (paymentMethod === 'balance' && !isIndividual) {
      const defaultContract = clientData?.clientMe?.contracts?.find((contract: any) => contract.isDefault && contract.isActive);
      const finalAmount = summary.totalPrice - summary.totalDiscount + (selectedDeliveryOffer?.cost || summary.deliveryPrice);
      const availableBalance = (defaultContract?.balance || 0) + (defaultContract?.creditLimit || 0);
      
      if (availableBalance < finalAmount) {
        setError("Недостаточно средств на балансе для оплаты заказа. Выберите другой способ оплаты.");
        return;
      }
    }

    setError("");
    setCurrentStep(2);
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    if (!recipientName.trim() || !recipientPhone.trim() || !consent) {
      setError("Пожалуйста, заполните данные получателя и согласитесь с правилами.");
      return;
    }

    // Проверяем авторизацию
    const userData = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;
    if (!userData) {
      setError("Для оформления заказа необходимо войти в систему.");
      setShowAuthWarning(true);
      return;
    }

    setIsProcessing(true);
    setError("");
    setShowAuthWarning(false);

    try {
      const user = JSON.parse(userData);
      const selectedItems = items.filter(item => item.selected);

      // Создаем заказ с clientId для авторизованных пользователей
      const orderResult = await createOrder({
        variables: {
          input: {
            clientId: user.id,
            clientEmail: user.email || '',
            clientPhone: recipientPhone,
            clientName: recipientName,
            deliveryAddress: selectedDeliveryAddress || delivery.address,
            legalEntityId: !isIndividual ? selectedLegalEntityId : null,
            paymentMethod: paymentMethod,
            comment: orderComment || `Адрес доставки: ${selectedDeliveryAddress}. ${!isIndividual && selectedLegalEntity ? `Юридическое лицо: ${selectedLegalEntity}.` : 'Физическое лицо.'} Способ оплаты: ${getPaymentMethodName(paymentMethod)}. Доставка: ${selectedDeliveryOffer?.name || 'Стандартная доставка'} (${selectedDeliveryOffer?.deliveryDate || ''} ${selectedDeliveryOffer?.deliveryTime || ''}).`,
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

      // Обрабатываем разные способы оплаты
      if (paymentMethod === 'balance') {
        // Для оплаты с баланса - заказ уже оплачен, переходим на страницу успеха
        clearCart();
        // Очищаем сохраненное состояние оформления заказа
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cartSummaryState');
        }
        window.location.href = `/payment/success?orderId=${order.id}&orderNumber=${order.orderNumber}&paymentMethod=balance`;
      } else if (paymentMethod === 'invoice') {
        // Для оплаты по реквизитам - переходим на страницу с реквизитами
        clearCart();
        // Очищаем сохраненное состояние оформления заказа
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cartSummaryState');
        }
        window.location.href = `/payment/invoice?orderId=${order.id}&orderNumber=${order.orderNumber}`;
      } else {
        // Для ЮКассы - создаем платеж и переходим на оплату
        const paymentResult = await createPayment({
          variables: {
            input: {
              orderId: order.id,
              returnUrl: `${window.location.origin}/payment/success?orderId=${order.id}&orderNumber=${order.orderNumber}`,
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
        // Очищаем сохраненное состояние оформления заказа
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cartSummaryState');
        }
        window.location.href = payment.confirmationUrl;
      }

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

  // Функция для получения названия способа оплаты
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'yookassa':
        return 'ЮКасса (банковские карты)';
      case 'balance':
        return 'Оплата с баланса';
      case 'invoice':
        return 'Оплата по реквизитам';
      default:
        return 'Выберите способ оплаты';
    }
  };

  if (currentStep === 1) {
    // Первый шаг - настройка доставки
    return (
      <div className="w-layout-vflex cart-ditail">
        <div className="cart-detail-info">
          {/* Тип клиента - показываем всегда */}
          <div className="w-layout-vflex flex-block-58" style={{ position: 'relative' }} ref={legalEntityDropdownRef}>
            <div className="text-block-31">Тип клиента</div>
            <div 
              className="w-layout-hflex flex-block-62" 
              onClick={() => setShowLegalEntityDropdown(!showLegalEntityDropdown)}
              style={{ cursor: 'pointer', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div className="text-block-31">
                {isIndividual ? 'Физическое лицо' : selectedLegalEntity || 'Выберите юридическое лицо'}
              </div>
              <div className="code-embed w-embed" style={{ transform: showLegalEntityDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
            
            {/* Dropdown список типов клиента */}
            {showLegalEntityDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {/* Опция физического лица */}
                <div
                  onClick={() => {
                    setIsIndividual(true);
                    setSelectedLegalEntity('');
                    setSelectedLegalEntityId('');
                    setPaymentMethod('yookassa'); // Для физ лица только ЮКасса
                    setShowLegalEntityDropdown(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    backgroundColor: isIndividual ? '#f8f9fa' : 'white',
                    fontSize: '14px',
                    fontWeight: isIndividual ? 500 : 400
                  }}
                  onMouseEnter={(e) => {
                    if (!isIndividual) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isIndividual) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  Физическое лицо
                </div>

                {/* Юридические лица (если есть) */}
                {clientData?.clientMe?.legalEntities && clientData.clientMe.legalEntities.length > 0 && 
                  clientData.clientMe.legalEntities.map((entity: any, index: number) => (
                    <div
                      key={entity.id}
                      onClick={() => {
                        setIsIndividual(false);
                        setSelectedLegalEntity(entity.shortName || entity.fullName);
                        setSelectedLegalEntityId(entity.id);
                        setPaymentMethod('yookassa'); // По умолчанию ЮКасса для юр лица
                        setShowLegalEntityDropdown(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderBottom: index < clientData.clientMe.legalEntities.length - 1 ? '1px solid #f0f0f0' : 'none',
                        backgroundColor: !isIndividual && (entity.shortName || entity.fullName) === selectedLegalEntity ? '#f8f9fa' : 'white',
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => {
                        if (isIndividual || (entity.shortName || entity.fullName) !== selectedLegalEntity) {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isIndividual || (entity.shortName || entity.fullName) !== selectedLegalEntity) {
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      {entity.shortName || entity.fullName}
                    </div>
                  ))
                }
              </div>
            )}
          </div>

          {/* Адрес доставки */}
          <div className="w-layout-vflex flex-block-58" style={{ position: 'relative' }} ref={addressDropdownRef}>
            <div className="text-block-31">Адрес доставки</div>
            <div 
              className="w-layout-hflex flex-block-62" 
              onClick={() => setShowAddressDropdown(!showAddressDropdown)}
              style={{ cursor: 'pointer', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div className="text-block-31" style={{ fontSize: '14px', color: selectedDeliveryAddress ? '#333' : '#999' }}>
                {selectedDeliveryAddress || 'Выберите адрес доставки'}
              </div>
              <div className="code-embed w-embed" style={{ transform: showAddressDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
            
            {/* Dropdown список адресов */}
            {showAddressDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {/* Кнопка добавления нового адреса */}
                <div
                  onClick={() => {
                    // Переход в личный кабинет на страницу адресов
                    window.location.href = '/profile-addresses';
                    setShowAddressDropdown(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    backgroundColor: '#f8f9fa',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#007bff',
                    borderBottom: '1px solid #dee2e6'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e3f2fd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                >
                  + Добавить новый адрес
                </div>

                {/* Существующие адреса */}
                {addressesData?.clientMe?.deliveryAddresses?.map((address: any, index: number) => (
                  <div
                    key={address.id}
                                      onClick={() => {
                    setSelectedDeliveryAddress(address.address);
                    setShowAddressDropdown(false);
                    // Обновляем адрес в контексте корзины
                    updateDelivery({ address: address.address });
                  }}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      borderBottom: index < (addressesData?.clientMe?.deliveryAddresses?.length || 0) - 1 ? '1px solid #f0f0f0' : 'none',
                      backgroundColor: address.address === selectedDeliveryAddress ? '#f8f9fa' : 'white',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => {
                      if (address.address !== selectedDeliveryAddress) {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (address.address !== selectedDeliveryAddress) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                      {address.name || address.deliveryType}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {address.address}
                    </div>
                  </div>
                )) || (
                  <div style={{
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#666',
                    textAlign: 'center'
                  }}>
                    Нет сохранённых адресов
                  </div>
                )}
              </div>
            )}

            {/* Показываем выбранный адрес */}
            {selectedDeliveryAddress && (
              <div className="text-block-32" style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                {selectedDeliveryAddress}
              </div>
            )}
          </div>

                     {/* Варианты доставки */}
           <div className="w-layout-vflex flex-block-66">
             <div className="text-block-31" style={{ marginBottom: '12px' }}>Варианты доставки</div>
             
             {loadingOffers && (
               <div style={{
                 padding: '16px',
                 textAlign: 'center',
                 fontSize: '14px',
                 color: '#666'
               }}>
                 Загружаем варианты доставки...
               </div>
             )}

             {offersError && (
               <div style={{
                 padding: '12px',
                 backgroundColor: '#FEF3C7',
                 border: '1px solid #F59E0B',
                 borderRadius: '4px',
                 fontSize: '12px',
                 color: '#92400E',
                 marginBottom: '12px'
               }}>
                 {offersError}
               </div>
             )}

             {deliveryOffers.length > 0 && !loadingOffers && (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 {deliveryOffers.map((offer, index) => (
                   <div 
                     key={offer.id}
                     onClick={() => {
                       setSelectedDeliveryOffer(offer);
                       updateDelivery({
                         address: selectedDeliveryAddress,
                         cost: offer.cost,
                         date: offer.deliveryDate,
                         time: offer.deliveryTime
                       });
                     }}
                     style={{ 
                       padding: '12px',
                       border: selectedDeliveryOffer?.id === offer.id ? '2px solid #007bff' : '1px solid #dee2e6',
                       borderRadius: '8px',
                       cursor: 'pointer',
                       backgroundColor: selectedDeliveryOffer?.id === offer.id ? '#f8f9fa' : 'white',
                       transition: 'all 0.2s'
                     }}
                     onMouseEnter={(e) => {
                       if (selectedDeliveryOffer?.id !== offer.id) {
                         e.currentTarget.style.backgroundColor = '#f8f9fa';
                       }
                     }}
                     onMouseLeave={(e) => {
                       if (selectedDeliveryOffer?.id !== offer.id) {
                         e.currentTarget.style.backgroundColor = 'white';
                       }
                     }}
                   >
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       <div style={{ flex: 1 }}>
                         <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>
                           {offer.name}
                         </div>
                         <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                           {offer.description}
                         </div>
                         <div style={{ fontSize: '12px', color: '#007bff' }}>
                           {offer.deliveryDate} • {offer.deliveryTime}
                         </div>
                       </div>
                       <div style={{ 
                         fontWeight: 500, 
                         fontSize: '14px',
                         color: offer.cost === 0 ? '#28a745' : '#333'
                       }}>
                         {offer.cost === 0 ? 'Бесплатно' : `${offer.cost} ₽`}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             )}

             {deliveryOffers.length === 0 && !loadingOffers && selectedDeliveryAddress && (
               <div style={{
                 padding: '16px',
                 textAlign: 'center',
                 fontSize: '14px',
                 color: '#666',
                 border: '1px dashed #dee2e6',
                 borderRadius: '8px'
               }}>
                 Выберите адрес доставки для просмотра вариантов
               </div>
             )}
           </div>

          {/* Способ оплаты */}
          <div className="w-layout-vflex flex-block-58" style={{ position: 'relative' }} ref={paymentDropdownRef}>
            <div className="text-block-31">Способ оплаты</div>
            <div 
              className="w-layout-hflex flex-block-62" 
              onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
              style={{ cursor: 'pointer', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div className="text-block-31" style={{ fontSize: '14px', color: '#333' }}>
                {getPaymentMethodName(paymentMethod)}
              </div>
              <div className="code-embed w-embed" style={{ transform: showPaymentDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
            
            {/* Dropdown список способов оплаты */}
            {showPaymentDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {/* ЮКасса - доступна всегда */}
                <div
                  onClick={() => {
                    setPaymentMethod('yookassa');
                    setShowPaymentDropdown(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    backgroundColor: paymentMethod === 'yookassa' ? '#f8f9fa' : 'white',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => {
                    if (paymentMethod !== 'yookassa') {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (paymentMethod !== 'yookassa') {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  ЮКасса (банковские карты)
                </div>

                {/* Дополнительные способы оплаты для юридических лиц */}
                {!isIndividual && (
                  <>
                    <div
                      onClick={() => {
                        setPaymentMethod('balance');
                        setShowPaymentDropdown(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f0f0f0',
                        backgroundColor: paymentMethod === 'balance' ? '#f8f9fa' : 'white',
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => {
                        if (paymentMethod !== 'balance') {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (paymentMethod !== 'balance') {
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      <div>Оплата с баланса</div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                        {(() => {
                          if (clientLoading) {
                            return (
                              <span style={{ fontWeight: 500, color: '#666' }}>
                                Загрузка...
                              </span>
                            );
                          }
                          
                          if (!clientData?.clientMe) {
                            return (
                              <span style={{ fontWeight: 500, color: '#e74c3c' }}>
                                Ошибка загрузки данных
                              </span>
                            );
                          }
                          
                          const contracts = clientData?.clientMe?.contracts || [];
                          const defaultContract = contracts.find((contract: any) => contract.isDefault && contract.isActive);
                          
                          if (!defaultContract) {
                            const anyActiveContract = contracts.find((contract: any) => contract.isActive);
                            
                            if (!anyActiveContract) {
                              return (
                                <span style={{ fontWeight: 500, color: '#e74c3c' }}>
                                  Нет активных контрактов
                                </span>
                              );
                            }
                          }
                          
                          const contract = defaultContract || contracts.find((contract: any) => contract.isActive);
                          const balance = contract?.balance || 0;
                          const creditLimit = contract?.creditLimit || 0;
                          const totalAvailable = balance + creditLimit;
                          
                          return (
                            <span style={{ fontWeight: 500 }}>
                              Доступно: {formatPrice(totalAvailable)}
                            </span>
                          );
                        })()}
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setPaymentMethod('invoice');
                        setShowPaymentDropdown(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        backgroundColor: paymentMethod === 'invoice' ? '#f8f9fa' : 'white',
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => {
                        if (paymentMethod !== 'invoice') {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (paymentMethod !== 'invoice') {
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      Оплата по реквизитам
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Показываем предупреждение для оплаты с баланса если недостаточно средств */}
            {paymentMethod === 'balance' && !isIndividual && (
              (() => {
                const defaultContract = clientData?.clientMe?.contracts?.find((contract: any) => contract.isDefault && contract.isActive);
                const availableBalance = (defaultContract?.balance || 0) + (defaultContract?.creditLimit || 0);
                const finalAmount = summary.totalPrice - summary.totalDiscount + (selectedDeliveryOffer?.cost || summary.deliveryPrice);
                const isInsufficientFunds = availableBalance < finalAmount;
                
                return isInsufficientFunds ? (
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 12px',
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #F59E0B',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#92400E'
                  }}>
                    Недостаточно средств на балансе для оплаты заказа
                  </div>
                ) : null;
              })()
            )}
          </div>

          <div className="px-line"></div>

          {/* Сводка заказа */}
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
              <div className="text-block-33">
                {selectedDeliveryOffer?.cost === 0 
                  ? 'Бесплатно' 
                  : formatPrice(selectedDeliveryOffer?.cost || summary.deliveryPrice)
                }
              </div>
            </div>
          </div>

          <div className="px-line"></div>

          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-32">Итого</div>
            <h4 className="heading-9-copy-copy">
              {formatPrice(
                summary.totalPrice - summary.totalDiscount + (selectedDeliveryOffer?.cost || summary.deliveryPrice)
              )}
            </h4>
          </div>

          <button 
            className="submit-button fill w-button" 
            onClick={handleProceedToStep2}
            disabled={summary.totalItems === 0}
            style={{ 
              opacity: summary.totalItems === 0 ? 0.5 : 1,
              cursor: summary.totalItems === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Оформить заказ
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
  }

  // Второй шаг - подтверждение и оплата
  return (
    <div className="w-layout-vflex cart-ditail">
      <div className="cart-detail-info">
        {/* Адрес доставки */}
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Адрес доставки</div>
          <div className="w-layout-hflex flex-block-57">
            <h4 className="heading-12">Доставка</h4>
            <div className="link-r" onClick={handleBackToStep1} style={{ cursor: 'pointer' }}>Изменить</div>
          </div>
          <div className="text-block-32">{selectedDeliveryAddress || delivery.address}</div>
        </div>

        {/* Получатель */}
        <div className="w-layout-vflex flex-block-63">
          <h4 className="heading-12">Получатель</h4>
          <div className="w-layout-hflex flex-block-62" style={{ marginBottom: '8px' }}>
            <input
              type="text"
              placeholder="Имя и фамилия"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #D0D0D0',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
            />
          </div>
          <div className="w-layout-hflex flex-block-62">
            <input
              type="tel"
              placeholder="Номер телефона"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #D0D0D0',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Тип клиента и способ оплаты */}
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Тип клиента и оплата</div>
          <div className="w-layout-hflex flex-block-57">
            <h4 className="heading-12">
              {isIndividual ? 'Физическое лицо' : selectedLegalEntity}
            </h4>
            <div className="link-r" onClick={handleBackToStep1} style={{ cursor: 'pointer' }}>Изменить</div>
          </div>
          <div className="text-block-32" style={{ fontSize: '14px', color: '#666' }}>
            Способ оплаты: {getPaymentMethodName(paymentMethod)}
          </div>
          {paymentMethod === 'balance' && !isIndividual && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {(() => {
                const defaultContract = clientData?.clientMe?.contracts?.find((contract: any) => contract.isDefault && contract.isActive);
                const balance = defaultContract?.balance || 0;
                const creditLimit = defaultContract?.creditLimit || 0;
                const totalAvailable = balance + creditLimit;
                
                return (
                  <span style={{ fontWeight: 500 }}>
                    Доступно: {formatPrice(totalAvailable)}
                  </span>
                );
              })()}
            </div>
          )}
        </div>

        {/* Комментарий к заказу */}
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Комментарий к заказу</div>
          <textarea
            value={orderComment}
            onChange={(e) => updateOrderComment(e.target.value)}
            placeholder="Добавьте комментарий к заказу (необязательно)"
            className="text-block-32"
            style={{
              width: '100%',
              minHeight: '60px',
              padding: '8px 12px',
              border: '1px solid #D0D0D0',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        <div className="px-line"></div>

        {/* Сводка заказа */}
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
            <div className="text-block-33">
              {selectedDeliveryOffer?.cost === 0 
                ? 'Бесплатно' 
                : formatPrice(selectedDeliveryOffer?.cost || summary.deliveryPrice)
              }
            </div>
          </div>
        </div>

        <div className="px-line"></div>

        <div className="w-layout-hflex flex-block-59">
          <div className="text-block-32">Итого</div>
          <h4 className="heading-9-copy-copy">
            {formatPrice(
              summary.totalPrice - summary.totalDiscount + (selectedDeliveryOffer?.cost || summary.deliveryPrice)
            )}
          </h4>
        </div>
        
        {showAuthWarning && (
          <div style={{ 
            backgroundColor: '#FEF3C7', 
            border: '1px solid #F59E0B', 
            borderRadius: '8px', 
            padding: '12px', 
            marginBottom: '16px',
            color: '#92400E'
          }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>
              Требуется авторизация
            </div>
            <div style={{ fontSize: '14px', marginBottom: '12px' }}>
              Для оформления заказа необходимо войти в систему или зарегистрироваться
            </div>
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#F59E0B',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Войти в систему
            </button>
          </div>
        )}
        
        <button 
          className="submit-button fill w-button" 
          onClick={handleSubmit}
          disabled={summary.totalItems === 0 || isProcessing || !recipientName.trim() || !recipientPhone.trim()}
          style={{ 
            opacity: (summary.totalItems === 0 || isProcessing || !recipientName.trim() || !recipientPhone.trim()) ? 0.5 : 1,
            cursor: (summary.totalItems === 0 || isProcessing || !recipientName.trim() || !recipientPhone.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {isProcessing ? 'Оформляем заказ...' : 
            paymentMethod === 'balance' ? 'Оплатить с баланса' :
            paymentMethod === 'invoice' ? 'Выставить счёт' :
            'Оплатить'}
        </button>

        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

        {/* Кнопка "Назад" */}
        <button 
          onClick={handleBackToStep1}
          style={{
            background: 'none',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '12px 24px',
            marginTop: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#666'
          }}
        >
          ← Назад к настройкам доставки
        </button>

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