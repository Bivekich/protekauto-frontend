import React, { useState } from 'react';
import FilterDropdown from './filters/FilterDropdown';
import FilterRange from './filters/FilterRange';

// Типизация для фильтра
export type FilterConfig = {
  type: 'dropdown' | 'range';
  title: string;
  options?: string[];
  multi?: boolean;
  showAll?: boolean;
  min?: number;
  max?: number;
  hasMore?: boolean;
  onShowMore?: () => void;
};

export type FiltersProps = {
  filters: FilterConfig[];
  onFilterChange: (type: string, value: any) => void;
  filterValues: { [key: string]: any };
};

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, filterValues }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange('search', e.target.value);
  };

  return (
    <div className="filters-s1 w-layout-vflex flex-block-12">
      {/* Поиск всегда первый */}
      <div className="div-block-2">
        <div className="form-block">
          <form className="form" onSubmit={e => e.preventDefault()}>
            <span className="code-embed-6 w-embed" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 1}}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 17.5L13.8834 13.8833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <input
              className="text-field w-input"
              style={{paddingLeft: '40px'}}
              maxLength={256}
              name="Search"
              placeholder="Поиск по товарам на странице"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>
      {/* Фильтры из пропса */}
      {filters.map((filter, index) => (
        <div key={index} className="filter-item-s1">
          {filter.type === 'dropdown' && filter.options && (
            <FilterDropdown
              title={filter.title}
              options={filter.options}
              multi={filter.multi || false}
              showAll={filter.showAll || false}
              selectedValues={filterValues[filter.title] || []}
              onChange={(selected: string[]) => onFilterChange(filter.title, selected)}
              hasMore={filter.hasMore}
              onShowMore={filter.onShowMore}
            />
          )}
          {filter.type === 'range' && typeof filter.min === 'number' && typeof filter.max === 'number' && (
            <FilterRange
              title={filter.title}
              min={filter.min}
              max={filter.max}
              onChange={(value: [number, number]) => onFilterChange(filter.title, value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Filters; 