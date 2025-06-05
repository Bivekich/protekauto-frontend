import React from "react";
import FilterDropdown from "./filters/FilterDropdown";
import FilterRange from "./filters/FilterRange";

const brands = [
  "Bosch", "Varta", "Mutlu", "Exide", "Topla", "TAB", "Rocket", "Akom", "Medalist", "Tyumen", "FB", "Delkor"
];
const polarities = ["Обратная", "Прямая", "Универсальная"];

const Filters: React.FC = () => (
  <div className="w-layout-vflex flex-block-12">
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
          <input className="text-field w-input" maxLength={256} name="Search" placeholder="Введите код запчасти или VIN номер автомобиля" type="text" id="Search-4" required />
        </form>
      </div>
    </div>
    <FilterDropdown title="Производитель" options={brands} multi showAll />
    <FilterRange title="Емкость (А/ч)" min={1} max={20000} />
    <FilterDropdown title="Полярность" options={polarities} />
    <FilterDropdown title="Производитель" options={brands} multi showAll />
  </div>
);

export default Filters; 