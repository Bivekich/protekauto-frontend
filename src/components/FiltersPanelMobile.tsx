import React, { useEffect, useState } from "react";
import FilterDropdown from "./filters/FilterDropdown";
import FilterRange from "./filters/FilterRange";
import type { FilterConfig } from "./Filters";

interface FiltersPanelMobileProps {
  filters: FilterConfig[];
  open: boolean;
  onClose: () => void;
  onFilterChange: (filterType: string, value: any) => void;
  initialValues: { [key: string]: any };
}

const FiltersPanelMobile: React.FC<FiltersPanelMobileProps> = ({ 
  filters, 
  open, 
  onClose, 
  onFilterChange,
  initialValues
}) => {
  const [currentValues, setCurrentValues] = useState(initialValues);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCurrentValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleValueChange = (filterTitle: string, value: any) => {
    setCurrentValues(prev => ({ ...prev, [filterTitle]: value }));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleApply = () => {
    Object.entries(currentValues).forEach(([key, value]) => {
      onFilterChange(key, value);
    });
    onFilterChange('search', searchTerm);
    onClose();
  };

  const handleReset = () => {
    const resetValues: { [key: string]: any } = {};
    filters.forEach(f => {
      if (f.type === 'dropdown') resetValues[f.title] = [];
      if (f.type === 'range') resetValues[f.title] = [f.min, f.max];
    });
    setCurrentValues(resetValues);
    setSearchTerm('');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`filters-panel-mobile-overlay${open ? " open" : ""}`}
        onClick={onClose}
        style={{ zIndex: 1000 }}
      />
      {/* Drawer */}
      <div
        className={`filters-panel-mobile-drawer${open ? " open" : ""}`}
        aria-hidden={!open}
        style={{ zIndex: 1001 }}
      >
        {/* Header */}
        <div className="filters-panel-mobile-header">
          <span className="filters-panel-mobile-title">Фильтры</span>
          <button 
            className="text-sm text-gray-600 hover:text-red-600"
            onClick={handleReset}
          >
            Сбросить
          </button>
          <button className="filters-panel-mobile-close" onClick={onClose} aria-label="Закрыть фильтры">&times;</button>
        </div>
        {/* Search */}
        <div className="filters-panel-mobile-content-search">
          <div className="div-block-2">
            <div className="form-block">
              <form className="form" onSubmit={e => { e.preventDefault(); handleApply(); }}>
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
        </div>
        {/* Filters */}
        <div className="filters-panel-mobile-content">
          {filters.map((filter) => {
            if (filter.type === "dropdown" && filter.options) {
              return (
                <FilterDropdown
                  key={filter.title}
                  title={filter.title}
                  options={filter.options}
                  multi={filter.multi}
                  showAll={filter.showAll}
                  isMobile
                  selectedValues={currentValues[filter.title] || []}
                  onChange={(values) => handleValueChange(filter.title, values)}
                />
              );
            }
            if (filter.type === "range" && filter.min !== undefined && filter.max !== undefined) {
              return (
                <FilterRange
                  key={filter.title}
                  title={filter.title}
                  min={filter.min}
                  max={filter.max}
                  isMobile
                  onChange={(value) => handleValueChange(filter.title, value)}
                />
              );
            }
            return null;
          })}
        </div>
        {/* Apply Button */}
        <button className="filters-panel-mobile-apply" onClick={handleApply}>Показать</button>
      </div>
    </>
  );
};

export default FiltersPanelMobile;