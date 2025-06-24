import React, { useState } from "react";
import Filters, { FilterConfig } from "./Filters";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteListProps {
  filters: FilterConfig[];
  filterValues?: {[key: string]: any};
  onFilterChange?: (type: string, value: any) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  sortBy?: 'name' | 'brand' | 'price' | 'date';
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (sortBy: 'name' | 'brand' | 'price' | 'date') => void;
  onSortOrderChange?: (sortOrder: 'asc' | 'desc') => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({ 
  filters, 
  filterValues = {},
  onFilterChange,
  searchQuery = '',
  onSearchChange,
  sortBy = 'date',
  sortOrder = 'desc',
  onSortChange,
  onSortOrderChange
}) => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  const handleRemove = (id: string) => {
    removeFromFavorites(id);
  };

  const handleRemoveAll = () => {
    clearFavorites();
  };

  // Состояние для hover на иконке удаления всех
  const [removeAllHover, setRemoveAllHover] = useState(false);
  // Состояние для hover на корзине отдельного товара
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

    // Фильтр по производителю
    const selectedBrands = filterValues['Производитель'] || [];
    if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
      return false;
    }

    // Фильтр по цене
    const priceRange = filterValues['Цена (₽)'];
    if (priceRange && item.price) {
      const [minPrice, maxPrice] = priceRange;
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }
    }

    return true;
  });

  // Применяем сортировку
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'brand':
        comparison = a.brand.localeCompare(b.brand);
        break;
      case 'price':
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        comparison = priceA - priceB;
        break;
      case 'date':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
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

  const handleSortClick = (newSortBy: 'name' | 'brand' | 'price' | 'date') => {
    if (sortBy === newSortBy) {
      // Если тот же столбец, меняем порядок
      onSortOrderChange?.(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Если новый столбец, устанавливаем его и порядок по умолчанию
      onSortChange?.(newSortBy);
      onSortOrderChange?.(newSortBy === 'price' ? 'asc' : 'desc');
    }
  };

  // SVG-галочки для сортировки — всегда видны у всех колонок
  const getSortIcon = (columnSort: 'name' | 'brand' | 'price' | 'date') => {
    const isActive = sortBy === columnSort;
    const isAsc = sortOrder === 'asc';
    const color = isActive ? 'var(--_button---primary)' : '#94a3b8';
    return (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{marginLeft: 2}}>
        <path
          d={isActive ? (isAsc ? 'M6 12l4-4 4 4' : 'M6 8l4 4 4-4') : 'M6 8l4 4 4-4'}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="w-layout-hflex core-product-card">
      <Filters 
        filters={filters}
        onFilterChange={onFilterChange || (() => {})}
        filterValues={filterValues}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange || (() => {})}
      />
      <div className="w-layout-vflex flex-block-48">
        <div className="w-layout-vflex product-list-cart">
          {/* Информация о результатах фильтрации */}
          {(searchQuery || Object.values(filterValues).some(v => Array.isArray(v) ? v.length > 0 : v)) && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700">
                Найдено {sortedFavorites.length} из {favorites.length} товаров
                {searchQuery && (
                  <span> по запросу "{searchQuery}"</span>
                )}
              </div>
            </div>
          )}
          
          <div className="w-layout-hflex heading-list">
            <div className="w-layout-hflex flex-block-61">
              <div 
                className="sort-item-brand cursor-pointer hover:text-blue-600 flex items-center gap-1"
                onClick={() => handleSortClick('brand')}
              >
                Производитель {getSortIcon('brand')}
              </div>
              <div className="sort-item-brand-copy">Артикул</div>
              <div 
                className="sort-item-name cursor-pointer hover:text-blue-600 flex items-center gap-1"
                onClick={() => handleSortClick('name')}
              >
                Наименование {getSortIcon('name')}
              </div>
              <div className="sort-item-comments">Комментарий</div>
            </div>
            {favorites.length > 0 && (
              <div
                className="w-layout-hflex select-all-block"
                onClick={handleRemoveAll}
                style={{ cursor: 'pointer', color: removeAllHover ? '#ec1c24' : undefined, transition: 'color 0.2s' }}
                onMouseEnter={() => setRemoveAllHover(true)}
                onMouseLeave={() => setRemoveAllHover(false)}
              >
                <div className="text-block-30">Удалить</div>
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="image-13"
                >
                  <path
                    d="M4.625 17.5C4.14375 17.5 3.73192 17.3261 3.3895 16.9782C3.04708 16.6304 2.87558 16.2117 2.875 15.7222V4.16667H2V2.38889H6.375V1.5H11.625V2.38889H16V4.16667H15.125V15.7222C15.125 16.2111 14.9538 16.6298 14.6114 16.9782C14.269 17.3267 13.8568 17.5006 13.375 17.5H4.625ZM6.375 13.9444H8.125V5.94444H6.375V13.9444ZM9.875 13.9444H11.625V5.94444H9.875V13.9444Z"
                    fill={removeAllHover ? "#ec1c24" : "#D0D0D0"}
                    style={{ transition: 'fill 0.2s' }}
                  />
                </svg>
              </div>
            )}
          </div>
          {sortedFavorites.map((item) => {
            return (
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
                    <h4 
                      className="heading-9-copy-copy cursor-pointer hover:text-blue-600 flex items-center gap-1"
                      onClick={() => handleSortClick('price')}
                    >
                      {formatPrice(item.price, item.currency)} {getSortIcon('price')}
                    </h4>
                    <div className="w-layout-hflex control-element-copy">
                      {/* Корзина с hover-эффектом для удаления товара */}
                      <span
                        style={{ display: 'inline-flex' }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <svg
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="image-13"
                          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
                          onClick={() => handleRemove(item.id)}
                        >
                          <path
                            d="M4.625 17.5C4.14375 17.5 3.73192 17.3261 3.3895 16.9782C3.04708 16.6304 2.87558 16.2117 2.875 15.7222V4.16667H2V2.38889H6.375V1.5H11.625V2.38889H16V4.16667H15.125V15.7222C15.125 16.2111 14.9538 16.6298 14.6114 16.9782C14.269 17.3267 13.8568 17.5006 13.375 17.5H4.625ZM6.375 13.9444H8.125V5.94444H6.375V13.9444ZM9.875 13.9444H11.625V5.94444H9.875V13.9444Z"
                            fill={hoveredId === item.id ? "#ec1c24" : "#D0D0D0"}
                            style={{ transition: 'fill 0.2s' }}
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {sortedFavorites.length === 0 && (
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