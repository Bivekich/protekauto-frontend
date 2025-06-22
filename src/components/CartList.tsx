import React from "react";
import CartItem from "./CartItem";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const CartList: React.FC = () => {
  const { state, toggleSelect, updateComment, removeItem, selectAll, removeSelected, updateQuantity } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { items } = state;

  const allSelected = items.length > 0 && items.every((item) => item.selected);

  const handleSelectAll = () => {
    selectAll();
  };

  const handleRemoveSelected = () => {
    removeSelected();
  };

  const handleSelect = (id: string) => {
    toggleSelect(id);
  };

  const handleFavorite = (id: string) => {
    const item = items.find(item => item.id === id);
    if (!item) return;

    const isInFavorites = isFavorite(item.productId, item.offerKey, item.article, item.brand);

    if (isInFavorites) {
      // Удаляем из избранного
      const favoriteId = `${item.productId || item.offerKey || ''}:${item.article}:${item.brand}`;
      removeFromFavorites(favoriteId);
    } else {
      // Добавляем в избранное
      addToFavorites({
        productId: item.productId,
        offerKey: item.offerKey,
        name: item.name,
        brand: item.brand || '',
        article: item.article || '',
        price: item.price,
        currency: item.currency,
        image: item.image
      });
    }
  };

  const handleComment = (id: string, comment: string) => {
    updateComment(id, comment);
  };

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleCountChange = (id: string, count: number) => {
    updateQuantity(id, count);
  };

  // Функция для форматирования цены
  const formatPrice = (price: number, currency: string = 'RUB') => {
    return `${price.toLocaleString('ru-RU')} ${currency === 'RUB' ? '₽' : currency}`;
  };

  return (
    <div className="w-layout-vflex flex-block-48">
      <div className="w-layout-vflex product-list-cart">
        <div className="w-layout-hflex multi-control">
          <div className="w-layout-hflex select-all-block" onClick={handleSelectAll} style={{ cursor: 'pointer' }}>
            <div
              className={"div-block-7" + (allSelected ? " active" : "")}
              style={{ marginRight: 8, cursor: 'pointer' }}
            >
              {allSelected && (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M2 5.5L6 9L12 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="text-block-30">Выделить всё</div>
          </div>
          <div className="w-layout-hflex select-all-block" onClick={handleRemoveSelected} style={{ cursor: 'pointer' }}>
            <div className="text-block-30">Удалить выбранные</div>
            <img src="/images/delete.svg" loading="lazy" alt="" className="image-13" />
          </div>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart-message" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>Ваша корзина пуста</p>
            <p>Добавьте товары из каталога</p>
          </div>
        ) : (
          items.map((item) => {
            const isInFavorites = isFavorite(item.productId, item.offerKey, item.article, item.brand);
            
            return (
              <div className="div-block-21" key={item.id}>
                <CartItem
                  name={item.name}
                  description={item.description}
                  delivery={item.deliveryTime || 'Уточняется'}
                  deliveryDate={item.deliveryDate || ''}
                  price={formatPrice(item.price, item.currency)}
                  pricePerItem={`${formatPrice(item.price, item.currency)}/шт`}
                  count={item.quantity}
                  comment={item.comment || ''}
                  selected={item.selected}
                  favorite={isInFavorites}
                  onSelect={() => handleSelect(item.id)}
                  onFavorite={() => handleFavorite(item.id)}
                  onComment={(comment) => handleComment(item.id, comment)}
                  onCountChange={(count) => handleCountChange(item.id, count)}
                  onRemove={() => handleRemove(item.id)}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartList; 