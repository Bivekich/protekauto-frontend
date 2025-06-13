import React from "react";

interface CustomCheckboxProps {
  selected: boolean;
  onSelect: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ selected, onSelect }) => (
  <div
    className={"div-block-7" + (selected ? " active" : "")}
    onClick={onSelect}
    style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: selected ? '#EF4444' : '#fff', transition: 'background 0.2s' }}
  >
    {selected && (
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <path d="M2 5.5L6 9L12 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </div>
);

export default CustomCheckbox; 