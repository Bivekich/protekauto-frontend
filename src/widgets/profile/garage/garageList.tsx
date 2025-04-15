'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { Button, Spinner } from '@/shared/ui';
import Image from 'next/image';

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin?: string;
  plateNumber?: string;
  image?: string;
}

export const GarageList = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // В реальном проекте здесь будет запрос к API
        // const response = await fetch(`/api/clients/${user.id}/cars`);
        // const data = await response.json();

        // Временные демо-данные
        const demoCars: Car[] = [
          {
            id: '1',
            brand: 'Toyota',
            model: 'Camry',
            year: 2019,
            vin: 'ABC123DEF456GHI78',
            plateNumber: 'A123BC',
            image: '/images/cars/toyota-camry.jpg',
          },
          {
            id: '2',
            brand: 'Volkswagen',
            model: 'Polo',
            year: 2021,
            plateNumber: 'E456CD',
            image: '/images/cars/vw-polo.jpg',
          },
        ];

        setCars(demoCars);
        setError(null);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError(
          'Не удалось загрузить автомобили. Пожалуйста, попробуйте позже.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  const handleDeleteCar = async (carId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
      return;
    }

    try {
      setLoading(true);
      // В реальном проекте здесь будет запрос к API
      // await fetch(`/api/clients/${user?.id}/cars/${carId}`, {
      //   method: 'DELETE',
      // });

      // Обновляем список автомобилей
      setCars(cars.filter((car) => car.id !== carId));
    } catch (err) {
      console.error('Error deleting car:', err);
      setError('Не удалось удалить автомобиль. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[20px] p-6">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Попробовать снова
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Мои автомобили</h2>
        <Button onClick={toggleAddModal}>Добавить автомобиль</Button>
      </div>

      {cars.length === 0 ? (
        <div className="bg-white rounded-[20px] p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">
            У вас пока нет автомобилей
          </h3>
          <p className="text-gray-600 mb-6">
            Добавьте автомобиль, чтобы получать подходящие запчасти
          </p>
          <Button onClick={toggleAddModal}>Добавить автомобиль</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-[20px] overflow-hidden shadow"
            >
              <div className="relative h-48 w-full">
                {car.image ? (
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    <span className="text-gray-400">Нет изображения</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {car.brand} {car.model}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>Год выпуска: {car.year}</p>
                  {car.plateNumber && <p>Гос. номер: {car.plateNumber}</p>}
                  {car.vin && <p>VIN: {car.vin}</p>}
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="text" href={`/catalog?car=${car.id}`}>
                    Подобрать запчасти
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => handleDeleteCar(car.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Здесь можно добавить модальное окно для добавления автомобиля */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Добавление автомобиля
            </h3>
            <p className="text-gray-600 mb-6">Функционал в разработке</p>
            <div className="flex justify-end">
              <Button onClick={toggleAddModal}>Закрыть</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
