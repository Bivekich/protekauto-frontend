import React from "react";
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

  const getSortIcon = (columnSort: 'name' | 'brand' | 'price' | 'date') => {
    if (sortBy !== columnSort) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
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
              <div className="w-layout-hflex select-all-block" onClick={handleRemoveAll} style={{ cursor: 'pointer' }}>
                <div className="text-block-30">Удалить всё</div>
                <img src="/images/delete.svg" alt="" className="image-13" />
              </div>
            )}
          </div>
          {sortedFavorites.map((item) => (
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