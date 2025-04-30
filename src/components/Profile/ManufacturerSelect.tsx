import React, { useState } from 'react';

interface ManufacturerSelectProps {
  manufacturers: string[];
  selectedManufacturer: string | null;
  onSelect: (manufacturer: string | null) => void;
}

export const ManufacturerSelect: React.FC<ManufacturerSelectProps> = ({
  manufacturers,
  selectedManufacturer,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (manufacturer: string | null) => {
    onSelect(manufacturer);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-[24px] py-[16px] border border-[#D0D0D0] rounded-[4px] text-[14px] text-[#747474] focus:outline-none"
        onClick={toggleDropdown}
      >
        <span>{selectedManufacturer || 'Производитель'}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-gray-200 rounded-[4px] shadow-lg max-h-[200px] overflow-y-auto">
          <div
            className="px-[24px] py-[12px] cursor-pointer hover:bg-[#E6EDF6] text-[14px]"
            onClick={() => handleSelect(null)}
          >
            Все производители
          </div>
          {manufacturers.map((manufacturer) => (
            <div
              key={manufacturer}
              className={`px-[24px] py-[12px] cursor-pointer hover:bg-[#E6EDF6] text-[14px] ${
                selectedManufacturer === manufacturer ? 'bg-[#E6EDF6]' : ''
              }`}
              onClick={() => handleSelect(manufacturer)}
            >
              {manufacturer}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManufacturerSelect;
