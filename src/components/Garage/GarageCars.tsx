'use client';

import GarageItem from './GarageItem';

// Определяем тип Car, так как он не экспортируется из GarageItem
type Car = {
  id: string;
  name: string;
  vin: string;
  comment?: string;
};

type GarageCarsProps = {
  cars: Car[];
  onRemove: (id: string) => void;
  onAddCar: () => void;
};

const GarageCars = ({ cars, onRemove, onAddCar }: GarageCarsProps) => {
  return (
    <div className="bg-white rounded-[20px] p-[24px]">
      <div className="mb-[24px]">
        <h2 className="text-[24px] font-medium text-[#000814]">
          Мои автомобили
        </h2>
      </div>

      <div className="flex flex-col gap-[16px]">
        {cars.length > 0 ? (
          cars.map((car) => (
            <GarageItem key={car.id} item={car} onRemove={onRemove} />
          ))
        ) : (
          <div className="text-[16px] text-[#697586] py-[24px] text-center">
            У вас пока нет добавленных автомобилей
          </div>
        )}
      </div>

      <div className="mt-[20px]">
        <button
          onClick={onAddCar}
          className="py-[10px] px-[16px] w-full rounded-[12px] bg-[#EC1C24] text-white text-[16px] font-medium flex items-center justify-center gap-[8px]"
        >
          <div className="w-[16px] h-[16px]"></div>
          Добавить авто
        </button>
      </div>
    </div>
  );
};

export default GarageCars;
