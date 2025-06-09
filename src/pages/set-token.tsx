import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const SetToken: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Очищаем все старые данные из localStorage
    localStorage.clear();
    
    // Устанавливаем данные пользователя в localStorage
    const userData = {
      id: 'cmbntpesd0000rq19p7jsszrz',
      name: 'Лев Данилов',
      phone: '+79611177205',
      email: ''
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', `client_${userData.id}`);

    console.log('localStorage очищен и токен установлен:', `client_${userData.id}`);
    console.log('userData установлен:', userData);
    
    // Перенаправляем на страницу реквизитов
    setTimeout(() => {
      router.push('/profile-requisites');
    }, 2000);
  }, [router]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Установка токена...</h1>
      <p>Токен устанавливается, вы будете перенаправлены на страницу реквизитов.</p>
      <p>ID клиента: cmbntpesd0000rq19p7jsszrz</p>
      <p>Токен: client_cmbntpesd0000rq19p7jsszrz</p>
    </div>
  );
};

export default SetToken; 