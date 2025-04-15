'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { Button, Spinner } from '@/shared/ui';

interface Address {
  id: string;
  title: string;
  address: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

export const AddressList = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // В реальном проекте здесь будет запрос к API
        // const response = await fetch(`/api/clients/${user.id}/addresses`);
        // const data = await response.json();

        // Временные демо-данные
        const demoAddresses: Address[] = [
          {
            id: '1',
            title: 'Дом',
            address: 'ул. Пушкина, д. 10, кв. 5',
            city: 'Москва',
            zipCode: '115477',
            isDefault: true,
          },
          {
            id: '2',
            title: 'Работа',
            address: 'ул. Ленина, д. 15, офис 301',
            city: 'Москва',
            zipCode: '107140',
            isDefault: false,
          },
        ];

        setAddresses(demoAddresses);
        setError(null);
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError('Не удалось загрузить адреса. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот адрес?')) {
      return;
    }

    try {
      setLoading(true);
      // В реальном проекте здесь будет запрос к API
      // await fetch(`/api/clients/${user?.id}/addresses/${addressId}`, {
      //   method: 'DELETE',
      // });

      // Обновляем список адресов
      setAddresses(addresses.filter((address) => address.id !== addressId));
    } catch (err) {
      console.error('Error deleting address:', err);
      setError('Не удалось удалить адрес. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      setLoading(true);
      // В реальном проекте здесь будет запрос к API
      // await fetch(`/api/clients/${user?.id}/addresses/${addressId}/default`, {
      //   method: 'PUT',
      // });

      // Обновляем список адресов
      setAddresses(
        addresses.map((address) => ({
          ...address,
          isDefault: address.id === addressId,
        }))
      );
    } catch (err) {
      console.error('Error setting default address:', err);
      setError(
        'Не удалось установить адрес по умолчанию. Пожалуйста, попробуйте позже.'
      );
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

  if (addresses.length === 0) {
    return (
      <div className="bg-white rounded-[20px] p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">
          У вас пока нет сохраненных адресов
        </h3>
        <p className="text-gray-600 mb-6">
          Добавьте адрес для более быстрого оформления заказов
        </p>
        <Button onClick={toggleAddModal}>Добавить адрес</Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Адреса доставки</h2>
        <Button onClick={toggleAddModal}>Добавить адрес</Button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white rounded-[20px] p-6 shadow">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold">{address.title}</h3>
                  {address.isDefault && (
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-red text-white">
                      По умолчанию
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{address.address}</p>
                <p className="text-gray-700">
                  {address.city}, {address.zipCode}
                </p>
              </div>
              <div className="space-y-2">
                {!address.isDefault && (
                  <Button
                    variant="text"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Сделать основным
                  </Button>
                )}
                <Button
                  variant="text"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Здесь можно добавить модальное окно для добавления адреса */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Добавление адреса</h3>
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
