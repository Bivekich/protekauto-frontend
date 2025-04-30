'use client';

import { useState } from 'react';
import {
  GarageAutoSearch,
  GarageCarsList,
  GarageHistoryList,
  GarageEmpty,
  GarageAddFromHistory,
  GarageAddCarForm,
} from './';
import { AccountSidebar, Breadcrumbs } from '@/components/Layout';

type GaragePageProps = {
  isAuthorized: boolean;
};

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

type SearchHistory = {
  id: string;
  name: string;
  vin: string;
  date: string;
  comment?: string;
};

const GaragePage = ({ isAuthorized }: GaragePageProps) => {
  // Хуки должны быть вызваны до любого условного return
  const [cars, setCars] = useState<Car[]>([
    {
      id: '1',
      name: 'Lexus RX330/350',
      vin: 'JTJHK31U802039999',
      comment: '',
      releaseDate: '23.05.2013',
      year: '2014',
      productionPeriod: '2011-2015',
      market: 'Европа',
      engine: 'CFNA',
      engineNumber: '476054',
      transmission: 'NVS (5S)',
      bodyColor: 'B4B4',
      interiorColor: 'BY',
    },
    {
      id: '2',
      name: 'Toyota Camry',
      vin: 'JT2BF22K1W0104567',
      comment: 'Рабочий автомобиль',
    },
  ]);

  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([
    {
      id: '1',
      name: 'Lexus RX330/350',
      vin: 'JTJHK31U802039999',
      date: '14.05.2025',
    },
    {
      id: '2',
      name: 'Lexus RX330/350',
      vin: 'JTJHK31U802039999',
      date: '14.05.2025',
    },
  ]);

  // Состояние для тестирования пустого гаража
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Состояние для отображения формы добавления нового автомобиля
  const [showAddForm, setShowAddForm] = useState(false);

  // Состояние для формы добавления из истории
  const [addFromHistoryItem, setAddFromHistoryItem] =
    useState<SearchHistory | null>(null);

  const handleRemoveCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const handleRemoveFromHistory = (id: string) => {
    setSearchHistory(searchHistory.filter((item) => item.id !== id));
  };

  const handleClearAllHistory = () => {
    setSearchHistory([]);
  };

  const handleAddToGarage = (item: SearchHistory) => {
    // Показываем форму добавления из истории
    setAddFromHistoryItem(item);
  };

  const handleCancelAddFromHistory = () => {
    setAddFromHistoryItem(null);
  };

  const handleConfirmAddFromHistory = (item: SearchHistory) => {
    // Проверяем, нет ли уже такого VIN в гараже
    const existingCar = cars.find((car) => car.vin === item.vin);

    if (!existingCar) {
      // Если автомобиля нет в гараже, добавляем его
      setCars([
        ...cars,
        {
          id: Date.now().toString(),
          name: item.name,
          vin: item.vin,
          comment: item.comment || '',
          releaseDate: '',
          year: '',
          productionPeriod: '',
          market: '',
          engine: '',
          engineNumber: '',
          transmission: '',
          bodyColor: '',
          interiorColor: '',
        },
      ]);

      // Скрываем форму
      setAddFromHistoryItem(null);

      // Если был режим пустого состояния, выключаем его
      if (showEmptyState) {
        setShowEmptyState(false);
      }
    } else {
      // Если автомобиль уже есть, просто закрываем форму
      // В реальном приложении здесь можно показать уведомление
      setAddFromHistoryItem(null);
    }
  };

  const handleAddCar = () => {
    // Этот обработчик для компонента GarageEmpty
    console.log('Инициировано добавление автомобиля из пустого состояния');
    // Показываем форму добавления автомобиля
    setShowAddForm(true);
    // Отключаем отображение пустого состояния
    setShowEmptyState(false);
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false);

    // Если нет автомобилей, снова показываем пустое состояние
    if (cars.length === 0) {
      setShowEmptyState(true);
    }
  };

  const handleAddNewCar = (car: Omit<Car, 'id'>) => {
    // Добавляем новый автомобиль в список
    setCars([
      ...cars,
      {
        id: Date.now().toString(),
        ...car,
      },
    ]);

    // Если был режим пустого состояния, выключаем его
    if (showEmptyState) {
      setShowEmptyState(false);
    }
  };

  const handleSearch = (query: string) => {
    console.log('Поиск по запросу:', query);
    // Здесь будет логика поиска по гаражу
  };

  // Проверяем авторизацию пользователя
  if (!isAuthorized) {
    return (
      <div className="py-[50px] px-[130px] text-center">
        <h2 className="text-[30px] font-bold text-[#000814] mb-[20px]">
          Для доступа к гаражу необходимо авторизоваться
        </h2>
        <p className="text-[18px] text-[#424F60]">
          Пожалуйста, войдите в личный кабинет, чтобы получить доступ к вашему
          гаражу.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F8FB]">
      {/* Хлебные крошки */}
      <div className="bg-white py-[30px] px-[130px]">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Личный кабинет', href: '/account' },
            { label: 'Гараж', current: true },
          ]}
        />
        <h1 className="text-[36px] font-extrabold text-[#000814] mt-[14px]">
          Гараж
        </h1>
      </div>

      {/* Основной контент */}
      <div className="px-[130px] py-[40px] pb-[60px] flex gap-[30px]">
        {/* Меню личного кабинета */}
        <AccountSidebar activeLink="garage" />

        {/* Основной контент гаража */}
        <div className="flex-grow flex flex-col gap-[20px]">
          {/* Поиск по гаражу */}
          <GarageAutoSearch onSearch={handleSearch} />

          {/* Форма добавления автомобиля */}
          {showAddForm ? (
            <GarageAddCarForm
              onAdd={handleAddNewCar}
              onCancel={handleCancelAddForm}
            />
          ) : showEmptyState || cars.length === 0 ? (
            <GarageEmpty onAddCar={handleAddCar} />
          ) : (
            <GarageCarsList
              cars={cars}
              onRemove={handleRemoveCar}
              onAddCar={handleAddNewCar}
            />
          )}

          {/* Форма добавления из истории или список истории */}
          {!showAddForm && (
            <>
              {addFromHistoryItem ? (
                <GarageAddFromHistory
                  item={addFromHistoryItem}
                  onAdd={handleConfirmAddFromHistory}
                  onCancel={handleCancelAddFromHistory}
                />
              ) : (
                <GarageHistoryList
                  historyItems={searchHistory}
                  onRemove={handleRemoveFromHistory}
                  onAddToGarage={handleAddToGarage}
                  onClearAll={handleClearAllHistory}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GaragePage;
