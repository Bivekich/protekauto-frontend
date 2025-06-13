import React, { useState, useRef } from "react";

interface ProfileHistoryTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const manufacturers = ["Все", "VAG", "Toyota", "Ford", "BMW"];

const ProfileHistoryTabs: React.FC<ProfileHistoryTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(manufacturers[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие дропдауна при клике вне
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex flex-wrap gap-5 w-full max-md:max-w-full">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`flex flex-1 shrink gap-5 items-center h-full text-center rounded-xl basis-12 min-w-[240px] ${
            activeTab === tab
              ? "text-white"
              : "bg-slate-200 text-gray-950"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => onTabChange(tab)}
        >
          <div
            className={`flex-1 shrink gap-5 self-stretch px-6 py-3.5 my-auto w-full rounded-xl basis-0 min-w-[240px] max-md:px-5 ${
              activeTab === tab
                ? "text-white bg-red-600"
                : "bg-slate-200 text-gray-950"
            }`}
          >
            {tab}
          </div>
        </div>
      ))}
      <div
        className="relative w-[240px] max-w-full"
        ref={dropdownRef}
        tabIndex={0}
      >
        <div
          className="flex justify-between items-center px-6 py-4 text-sm leading-snug bg-white rounded border border-solid border-stone-300 text-neutral-500 cursor-pointer select-none w-full"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <span className="truncate">{selectedManufacturer}</span>
          <span className="ml-2 flex-shrink-0 flex items-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
        {isDropdownOpen && (
          <ul className="absolute left-0 top-full z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg w-full">
            {manufacturers.map((option) => (
              <li
                key={option}
                className={`px-6 py-4 cursor-pointer hover:bg-blue-100 ${option === selectedManufacturer ? 'bg-blue-50 font-semibold' : ''}`}
                onMouseDown={() => { setSelectedManufacturer(option); setIsDropdownOpen(false); }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileHistoryTabs; 