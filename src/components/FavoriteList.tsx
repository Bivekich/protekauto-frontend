import React, { useState } from "react";
import Filters, { FilterConfig } from "./Filters";
import { useFavorites } from "@/contexts/FavoritesContext";

const FavoriteList: React.FC<{ filters: FilterConfig[] }> = ({ filters }) => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const [filterValues, setFilterValues] = useState<{[key: string]: any}>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (type: string, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleRemove = (id: string) => {
    removeFromFavorites(id);
  };

  const handleRemoveAll = () => {
    clearFavorites();
  };

  // Применяем фильтры к избранным товарам
  const filteredFavorites = favorites.filter(item => {
    // Фильтр по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.article.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }

    // Здесь можно добавить логику для других фильтров
    // Например, фильтр по категории, производителю и т.д.
    
    return true;
  });

  const formatPrice = (price?: number, currency?: string) => {
    if (!price) {
      return 'Цена не указана';
    }
    if (currency === 'RUB') {
      return `от ${price.toLocaleString('ru-RU')} ₽`;
    }
    return `от ${price} ${currency || ''}`;
  };

  return (
    <div className="w-layout-hflex core-product-card">
      <Filters 
        filters={filters}
        onFilterChange={handleFilterChange}
        filterValues={filterValues}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div className="w-layout-vflex flex-block-48">
        <div className="w-layout-vflex product-list-cart">
          <div className="w-layout-hflex heading-list">
            <div className="w-layout-hflex flex-block-61">
              <div className="sort-item-brand">Производитель</div>
              <div className="sort-item-brand-copy">Артикул</div>
              <div className="sort-item-name">Наименование</div>
              <div className="sort-item-comments">Комментарий</div>
            </div>
            <div className="w-layout-hflex select-all-block" onClick={handleRemoveAll} style={{ cursor: 'pointer' }}>
              <div className="text-block-30">Удалить всё</div>
              <img src="/images/delete.svg" alt="" className="image-13" />
            </div>
          </div>
          {filteredFavorites.map((item) => (
            <div className="div-block-21" key={item.id}>
              <div className="w-layout-hflex favorite-item">
                <div className="w-layout-hflex info-block-search">
                  <div className="w-layout-hflex block-detail">
                    <h4 className="brandname">{item.brand}</h4>
                    <h4 className="brandname">{item.article}</h4>
                    <div className="productname_f">{item.name}</div>
                  </div>
                  <div className="comments_f w-form">
                    <form className="form-copy">
                      <input 
                        className="text-field-copy w-input" 
                        maxLength={256} 
                        name="Search-5" 
                        data-name="Search 5" 
                        placeholder="Комментарий" 
                        type="text" 
                        id={`Search-5-${item.id}`} 
                      />
                    </form>
                    <div className="success-message w-form-done">
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="error-message w-form-fail">
                      <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-hflex add-to-cart-block-copy">
                  <h4 className="heading-9-copy-copy">{formatPrice(item.price, item.currency)}</h4>
                  <div className="w-layout-hflex control-element-copy">
                    <img 
                      loading="lazy" 
                      src="/images/delete.svg" 
                      alt="" 
                      className="image-13" 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => handleRemove(item.id)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredFavorites.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>
              {favorites.length === 0 ? 'Нет избранных товаров' : 'Нет товаров, соответствующих фильтрам'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList; 