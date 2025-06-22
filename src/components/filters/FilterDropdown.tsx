import React, { useState, useEffect } from "react";

interface FilterDropdownProps {
  title?: string; // Делаем необязательным
  options: string[];
  multi?: boolean;
  showAll?: boolean;
  defaultOpen?: boolean; // Открыт ли по умолчанию
  hasMore?: boolean; // Есть ли еще опции для загрузки
  onShowMore?: () => void; // Обработчик "Показать еще"
  isMobile?: boolean; // Добавляем флаг для мобильной версии
  selectedValues?: string[]; // Выбранные значения
  onChange?: (values: string[]) => void; // Обработчик изменений
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  title, 
  options, 
  multi = true, 
  showAll = false,
  defaultOpen = false,
  hasMore = false,
  onShowMore,
  isMobile = false,
  selectedValues = [],
  onChange
}) => {
  const [open, setOpen] = useState(isMobile || defaultOpen); // На мобилке или если defaultOpen - сразу открыт
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedValues);
  const visibleOptions = showAll && !showAllOptions ? options.slice(0, 4) : options;

  useEffect(() => {
    // Сравниваем содержимое массивов, а не ссылки
    if (JSON.stringify(selected) !== JSON.stringify(selectedValues)) {
      setSelected(selectedValues);
    }
  }, [selectedValues, selected]);

  const handleSelect = (option: string) => {
    let newSelected: string[];
    if (multi) {
      newSelected = selected.includes(option) 
        ? selected.filter(o => o !== option) 
        : [...selected, option];
    } else {
      newSelected = selected.includes(option) ? [] : [option];
    }
    
    setSelected(newSelected);
    
    // Вызываем колбэк только если значения действительно изменились
    if (onChange && JSON.stringify(newSelected) !== JSON.stringify(selected)) {
        onChange(newSelected);
    }
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
              {((showAll && options.length > 4) || hasMore) && (
                <div className="w-layout-vflex flex-block-17">
                  <div
                    className="div-block-8"
                    onClick={() => {
                      if (hasMore && onShowMore) {
                        onShowMore();
                      } else {
                        setShowAllOptions(!showAllOptions);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="text-block-13">
                      {hasMore ? "Показать еще" : (showAllOptions ? "Скрыть" : "Показать все")}
                    </div>
                    <img
                      loading="lazy"
                      src="/images/arrow_drop_down.svg"
                      alt=""
                      style={{ marginLeft: 4, transform: showAllOptions ? 'rotate(180deg)' : undefined }}
                    />
                  </div>
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
        <h4 className="heading-2">
          {title} {selectedValues.length > 0 && `(${selectedValues.length})`}
        </h4>
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
          {((showAll && options.length > 4) || hasMore) && (
            <div className="w-layout-vflex flex-block-17">
              <div
                className="div-block-8"
                onClick={() => {
                  if (hasMore && onShowMore) {
                    onShowMore();
                  } else {
                    setShowAllOptions(!showAllOptions);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-block-13">
                  {hasMore ? "Показать еще" : (showAllOptions ? "Скрыть" : "Показать все")}
                </div>
                <img
                  loading="lazy"
                  src="/images/arrow_drop_down.svg"
                  alt=""
                  style={{ marginLeft: 4, transform: showAllOptions ? 'rotate(180deg)' : undefined }}
                />
              </div>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default FilterDropdown;