import React from "react";
import FilterDropdown from "./filters/FilterDropdown";
import FilterRange from "./filters/FilterRange";
import type { FilterConfig } from "./Filters";

interface FiltersPanelMobileProps {
  filters: FilterConfig[];
}

const FiltersPanelMobile: React.FC<FiltersPanelMobileProps> = ({ filters }) => {
  return (
    <div className="filters-panel-mobile-accordion">
      <div className="filter-block-mobile" style={{ padding: 12 }}>
        <form className="form" onSubmit={e => e.preventDefault()} style={{ width: '100%' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <span style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#8a94a6',
              display: 'flex',
              alignItems: 'center',
              height: 20,
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 17.5L13.8834 13.8833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <input
              className="text-field w-input"
              maxLength={256}
              name="Search"
              placeholder="Введите код запчасти или VIN номер автомобиля"
              type="text"
              id="Search-4"
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                paddingLeft: 40,
                paddingRight: 16,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 6,
                border: '1px solid #bfc4c9',
                background: '#fff',
                fontSize: 16,
                outline: 'none',
                color: '#222',
                margin: 0,
                boxShadow: 'none',
                fontWeight: 400,
                transition: 'border 0.2s',
                display: 'block',
              }}
              onFocus={e => e.currentTarget.style.border = '1px solid #1976d2'}
              onBlur={e => e.currentTarget.style.border = '1px solid #bfc4c9'}
            />
          </div>
        </form>
      </div>
      <style>{`
        .text-field.w-input::placeholder {
          color: #bdbdbd;
          opacity: 1;
        }
      `}</style>
      {/* Все фильтры всегда раскрыты */}
      {filters.map((filter, idx) => (
        <div className="filter-block-mobile" key={filter.title + idx}>
          {filter.type === "dropdown" ? (
            <FilterDropdown
              title={filter.title}
              options={filter.options}
              multi={filter.multi}
              showAll={filter.showAll}
              isMobile
            />
          ) : filter.type === "range" ? (
            <FilterRange
              title={filter.title}
              min={filter.min}
              max={filter.max}
              isMobile
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default FiltersPanelMobile;