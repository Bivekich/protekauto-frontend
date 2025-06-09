import React, { useState, useRef, useEffect } from 'react';

interface CatalogSortDropdownProps {
  active: number;
  onChange: (index: number) => void;
}

const sortOptions = [
  'По популярности',
  'Сначала дешевле',
  'Сначала дороже',
  'Высокий рейтинг',
];

const CatalogSortDropdown: React.FC<CatalogSortDropdownProps> = ({ active, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div
      data-hover="false"
      data-delay="0"
      className="dropdown-2 w-dropdown desktop-only"
      ref={dropdownRef}
    >
      <div
        className="flex-block-85 w-dropdown-toggle"
        onClick={() => setIsOpen((v) => !v)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="code-embed-9 w-embed">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 16L7 20L11 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 8L17 4L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>Сортировка</div>
      </div>
      <nav className={`dropdown-list-2 w-dropdown-list${isOpen ? ' w--open' : ''}`} style={{ minWidth: 180, whiteSpace: 'normal' }}>
        {sortOptions.map((option, index) => (
          <a
            key={index}
            href="#"
            className={`w-dropdown-link${active === index ? ' w--current' : ''}`}
            tabIndex={0}
            onClick={e => {
              e.preventDefault();
              onChange(index);
              setIsOpen(false);
            }}
          >
            {option}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default CatalogSortDropdown; 