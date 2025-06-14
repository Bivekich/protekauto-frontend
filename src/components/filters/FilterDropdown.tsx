import React, { useState, useEffect } from "react";

interface FilterDropdownProps {
  title?: string; // Делаем необязательным
  options: string[];
  multi?: boolean;
  showAll?: boolean;
  isMobile?: boolean; // Добавляем флаг для мобильной версии
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  title, 
  options, 
  multi = true, 
  showAll = false,
  isMobile = false
}) => {
  const [open, setOpen] = useState(isMobile); // На мобилке сразу открыт
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const visibleOptions = showAll && !showAllOptions ? options.slice(0, 4) : options;

  const handleSelect = (option: string) => {
    setSelected(sel => sel.includes(option) ? sel.filter(o => o !== option) : [...sel, option]);
  };

  // Мобильная версия - всегда открытый список
  if (isMobile) {
    return (
      <div className="filter-block-mobile">
        <div className="dropdown w-dropdown w--open">
          <div className="dropdown-toggle w-dropdown-toggle" style={{ cursor: 'default', background: 'none', boxShadow: 'none' }}>
            <h4 className="heading-2">{title}</h4>
          </div>
          <nav className="dropdown-list w-dropdown-list" style={{ display: 'block', position: 'static', boxShadow: 'none', background: 'transparent', padding: 0 }}>
            <div className="w-layout-vflex flex-block-17">
              {visibleOptions.map(option => (
                <div className="div-block-8" key={option} onClick={() => handleSelect(option)}>
                  <div className={`div-block-7${selected.includes(option) ? " active" : ""}`}>
                    {selected.includes(option) && (
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path d="M5.33333 12L0 6.89362L1.86667 5.10638L5.33333 8.42553L14.1333 0L16 1.78723L5.33333 12Z" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                  <div className="text-block-12">{option}</div>
                </div>
              ))}
              {showAll && options.length > 4 && (
                <div className="show-all-option" onClick={() => setShowAllOptions(!showAllOptions)} style={{ color: '#007bff', cursor: 'pointer', fontSize: 15 }}>
                  {showAllOptions ? "Скрыть" : "Показать все"}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  }

  // Десктопная версия - классический dropdown
  return (
    <div className={`dropdown w-dropdown${open ? " w--open" : ""}`}>
      <div className="dropdown-toggle w-dropdown-toggle" onClick={() => setOpen(!open)}>
        <h4 className="heading-2">{title}</h4>
        <div className="icon-3 w-icon-dropdown-toggle"></div>
      </div>
      {open && (
        <nav className="dropdown-list w-dropdown-list">
          <div className="w-layout-vflex flex-block-17">
            {visibleOptions.map(option => (
              <div className="div-block-8" key={option} onClick={() => handleSelect(option)}>
                <div className={`div-block-7${selected.includes(option) ? " active" : ""}`}>
                  {selected.includes(option) && (
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <path d="M5.33333 12L0 6.89362L1.86667 5.10638L5.33333 8.42553L14.1333 0L16 1.78723L5.33333 12Z" fill="currentColor" />
                    </svg>
                  )}
                </div>
                <div className="text-block-12">{option}</div>
              </div>
            ))}
          </div>
          {showAll && options.length > 4 && (
            <div className="show-all-option" onClick={() => setShowAllOptions(!showAllOptions)}>
              {showAllOptions ? "Скрыть" : "Показать все"}
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default FilterDropdown;