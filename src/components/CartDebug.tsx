import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

const CartDebug: React.FC = () => {
  const { state, addItem, clearCart } = useCart();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartState = localStorage.getItem('cartState');
      const cartSummaryState = localStorage.getItem('cartSummaryState');
      const oldCart = localStorage.getItem('cart');
      
      setDebugInfo({
        cartState: cartState ? JSON.parse(cartState) : null,
        cartSummaryState: cartSummaryState ? JSON.parse(cartSummaryState) : null,
        oldCart: oldCart ? JSON.parse(oldCart) : null,
        currentItems: state.items.length
      });
    }
  }, [state.items]);

  const addTestItem = () => {
    addItem({
      name: 'Тестовый товар',
      description: 'Описание тестового товара',
      article: 'TEST123',
      brand: 'TestBrand',
      price: 1000,
      currency: 'RUB',
      quantity: 1,
      image: '',
      productId: 'test-product',
      offerKey: 'test-offer',
      isExternal: false
    });
  };

  const clearStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartState');
      localStorage.removeItem('cartSummaryState');
      localStorage.removeItem('cart');
      window.location.reload();
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      border: '1px solid #ccc', 
      padding: '10px',
      borderRadius: '5px',
      maxWidth: '300px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <h4>Cart Debug</h4>
      <button onClick={addTestItem} style={{ marginBottom: '5px', marginRight: '5px' }}>
        Добавить товар
      </button>
      <button onClick={clearCart} style={{ marginBottom: '5px', marginRight: '5px' }}>
        Очистить корзину
      </button>
      <button onClick={clearStorage} style={{ marginBottom: '10px' }}>
        Очистить localStorage
      </button>
      <div>
        <strong>Товаров в корзине:</strong> {state.items.length}
      </div>
      <pre style={{ fontSize: '10px', maxHeight: '200px', overflow: 'auto' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
};

export default CartDebug; 