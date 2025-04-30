'use client';

import { useState } from 'react';
import GarageItem from './GarageItem';
import GarageAddCarForm from './GarageAddCarForm';

// Определяем тип Car
type Car = {
  id: string;
  name: string;
  vin: string;
  comment?: string;
  releaseDate?: string;
  year?: string;
  productionPeriod?: string;
  market?: string;
  engine?: string;
  engineNumber?: string;
  transmission?: string;
  bodyColor?: string;
  interiorColor?: string;
};

type GarageCarsListProps = {
  cars: Car[];
  onRemove: (id: string) => void;
  onAddCar: (car: Omit<Car, 'id'>) => void;
};

const GarageCarsList = ({ cars, onRemove, onAddCar }: GarageCarsListProps) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleAddCompleted = (car: Omit<Car, 'id'>) => {
    onAddCar(car);
    setShowAddForm(false);
  };

  return (
    <>
      {showAddForm ? (
        <GarageAddCarForm
          onAdd={handleAddCompleted}
          onCancel={handleCancelAdd}
        />
      ) : (
        <div className="bg-white rounded-[20px] p-[24px]">
          <div className="mb-[24px]">
            <h2 className="text-[36px] font-bold text-[#000814]">
              Мои автомобили
            </h2>
          </div>

          <div className="mb-[20px]">
            {cars.length > 0 ? (
              <div>
                {cars.map((car) => (
                  <GarageItem key={car.id} item={car} onRemove={onRemove} />
                ))}
              </div>
            ) : (
              <div className="text-[16px] text-[#697586] py-[24px] text-center">
                У вас пока нет добавленных автомобилей
              </div>
            )}
          </div>

          <div>
            <button
              onClick={handleAddClick}
              className="py-[10px] px-[16px] rounded-[12px] bg-[#EC1C24] text-white text-[16px] font-medium flex items-center gap-[8px]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3.33334V12.6667"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33325 8H12.6666"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Добавить авто</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GarageCarsList;
