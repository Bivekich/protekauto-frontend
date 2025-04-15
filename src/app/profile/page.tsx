'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getUser, logout, User } from '@/shared/lib/auth';

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push('/');
          return;
        }

        // Получаем данные пользователя из localStorage
        const user = getUser();
        if (!user) {
          logout();
          router.push('/');
          return;
        }

        // Проверяем актуальность данных с сервера
        const response = await fetch('/api/public/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Если токен недействителен, выходим из системы
          logout();
          router.push('/');
          return;
        }

        const data = await response.json();
        setUserData(data.client);
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Личный кабинет</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Выйти
          </button>
        </div>

        {userData && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Персональная информация
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500">ФИО:</span>
                    <p className="font-medium">
                      {userData.firstName} {userData.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Телефон:</span>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium">{userData.email || '—'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Тип профиля:</span>
                    <p className="font-medium">{userData.profileType}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Мои заказы</h2>
                <p className="text-gray-500">
                  У вас пока нет размещенных заказов.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Перейти в каталог
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Избранные товары</h2>
              <p className="text-gray-500">
                У вас пока нет товаров в избранном.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
