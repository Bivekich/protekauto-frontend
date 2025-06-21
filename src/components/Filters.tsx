import React from "react";
import FilterDropdown from "./filters/FilterDropdown";
import FilterRange from "./filters/FilterRange";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Типизация для фильтра
export type FilterConfig =
  | {
      type: "dropdown";
      title: string;
      options: string[];
      multi?: boolean;
      showAll?: boolean;
      defaultOpen?: boolean;
      hasMore?: boolean;
      onShowMore?: () => void;
    }
  | {
      type: "range";
      title: string;
      min: number;
      max: number;
    };

interface FiltersProps {
  filters: FilterConfig[];
  onFilterChange: (type: string, value: any) => void;
  filterValues?: {
    [key: string]: any;
  };
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
}

const Filters: React.FC<FiltersProps> = ({ 
  filters, 
  onFilterChange, 
  filterValues = {},
  searchQuery = '',
  onSearchChange,
  isLoading = false
}) => (
  <div className="w-layout-vflex flex-block-12">
    {/* Поиск - показываем только если есть обработчик */}
    {onSearchChange && (
      <div className="div-block-2">
        <div className="form-block">
          <form className="form" onSubmit={e => e.preventDefault()}>
            <a href="#" className="link-block-3 w-inline-block">
              <span className="code-embed-6 w-embed">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 17.5L13.8834 13.8833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <input
              className="text-field w-input"
              maxLength={256}
              name="Search"
              placeholder="Введите код запчасти или VIN номер автомобиля"
              type="text"
              id="Search-4"
              required
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    )}
    
    {/* Скелетоны фильтров при загрузке */}
    {isLoading && (
      <>
        <div className="dropdown w-dropdown">
          <div className="dropdown-toggle w-dropdown-toggle" style={{ padding: '12px 16px' }}>
            <Skeleton height={20} width={100} />
          </div>
        </div>
        <div className="dropdown w-dropdown">
          <div className="dropdown-toggle w-dropdown-toggle" style={{ padding: '12px 16px' }}>
            <Skeleton height={20} width={120} />
          </div>
        </div>
      </>
    )}
    
    {/* Фильтры из пропса */}
    {!isLoading && filters.map((filter, idx) => {
      if (filter.type === "dropdown") {
        return (
          <FilterDropdown
            key={filter.title + idx}
            title={filter.title}
            options={filter.options}
            multi={filter.multi}
            showAll={filter.showAll}
            defaultOpen={filter.defaultOpen}
            selectedValues={(filterValues && filterValues[filter.title]) || []}
            onChange={(values) => onFilterChange(filter.title, values)}
          />
        );
      }
      if (filter.type === "range") {
        return (
          <FilterRange
            key={filter.title + idx}
            title={filter.title}
            min={filter.min}
            max={filter.max}
            value={(filterValues && filterValues[filter.title]) || null}
            onChange={(value) => onFilterChange(filter.title, value)}
          />
        );
      }
      return null;
    })}
  </div>
);

export default Filters; 