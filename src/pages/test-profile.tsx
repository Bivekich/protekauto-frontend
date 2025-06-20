import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const TestProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Устанавливаем тестового пользователя в localStorage
    const testUser = {
      id: 'cmboumhyx0002mq0i6wibydxv',
      name: 'Лев Данилов',
      phone: '+79611177205',
      email: 'lev@example.com'
    };

    localStorage.setItem('userData', JSON.stringify(testUser));
    localStorage.setItem('authToken', `client_${testUser.id}`);
    
    console.log('Тестовый пользователь установлен:', testUser);
    
    // Перенаправляем на страницу профиля
    setTimeout(() => {
      router.push('/profile-set');
    }, 1000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Настройка тестового пользователя</h1>
        <p className="text-gray-600 mb-4">
          Устанавливаем данные тестового пользователя и перенаправляем на страницу профиля...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
      </div>
    </div>
  );
};

export default TestProfilePage; 