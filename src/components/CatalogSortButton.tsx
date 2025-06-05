import React from "react";

interface CatalogSortButtonProps {
  onClick: () => void;
}

const CatalogSortButton: React.FC<CatalogSortButtonProps> = ({ onClick }) => (
  <button className="w-layout-hflex flex-block-85 sort-btn-mobile" onClick={onClick} type="button">
    <span className="code-embed-9 w-embed">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 16L7 20L11 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 8L17 4L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    <div>Сортировка</div>
  </button>
);

export default CatalogSortButton; 