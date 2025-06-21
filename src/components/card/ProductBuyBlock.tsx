import React, { useState } from "react";
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

interface ProductBuyBlockProps {
  offer?: any;
}

const ProductBuyBlock = ({ offer }: ProductBuyBlockProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!offer) {
    return (
      <div className="w-layout-hflex add-to-cart-block-copy">
        <div className="text-center py-4">
          <p className="text-gray-500">Загрузка...</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(offer.quantity || 999, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const itemToAdd = {
        productId: offer.type === 'internal' ? offer.id : undefined,
        offerKey: offer.type === 'external' ? offer.id || offer.offerKey : undefined,
        name: offer.name || `${offer.brand} ${offer.articleNumber}`,
        description: `${offer.brand} ${offer.articleNumber} - ${offer.name || 'деталь'}`,
        brand: offer.brand,
        article: offer.articleNumber,
        price: offer.price,
        currency: offer.currency || 'RUB',
        quantity: quantity,
        deliveryTime: offer.deliveryTime?.toString() || offer.deliveryDays?.toString() || '0',
        warehouse: offer.warehouse || 'Склад',
        supplier: offer.supplier || (offer.type === 'external' ? 'AutoEuro' : 'Protek'),
        isExternal: offer.type === 'external',
        image: '/images/image-10.png',
      };

      addItem(itemToAdd);
      
      // Показываем уведомление
      toast.success(`Товар "${offer.brand} ${offer.articleNumber}" добавлен в корзину (${quantity} шт.) за ${(offer.price * quantity).toLocaleString('ru-RU')} ₽`);
      
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
      toast.error('Ошибка добавления товара в корзину');
    }
  };

  const totalPrice = offer.price * quantity;

  return (
    <div className="w-layout-hflex add-to-cart-block-copy">
      <div className="pcs-card">{offer.quantity || 0} шт</div>
      <div className="price opencard">{totalPrice.toLocaleString('ru-RU')} ₽</div>
      <div className="w-layout-hflex pcs-copy">
        <button 
          type="button"
          className="minus-plus" 
          onClick={() => handleQuantityChange(-1)}
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        >
          <img loading="lazy" src="/images/minus_icon.svg" alt="Уменьшить" />
        </button>
        <div className="input-pcs">
          <div className="text-block-26">{quantity}</div>
        </div>
        <button 
          type="button"
          className="minus-plus" 
          onClick={() => handleQuantityChange(1)}
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        >
          <img loading="lazy" src="/images/plus_icon.svg" alt="Увеличить" />
        </button>
      </div>
      <button 
        type="button"
        onClick={handleAddToCart}
        className="button-icon w-inline-block"
        style={{ cursor: 'pointer', background: 'none', border: 'none' }}
        aria-label="Добавить в корзину"
      >
        <img loading="lazy" src="/images/cart_icon.svg" alt="В корзину" className="image-11" />
      </button>
    </div>
  );
};

export default ProductBuyBlock; 