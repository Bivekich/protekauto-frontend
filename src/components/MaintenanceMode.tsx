import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface MaintenanceModeProps {
  onPasswordCorrect: () => void;
}

const MaintenanceMode: React.FC<MaintenanceModeProps> = ({ onPasswordCorrect }) => {
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [progress, setProgress] = useState(0);

  const correctPassword = 'protek2024'; // Замените на ваш пароль

  // Дебаг информация (удалите в продакшене)
  useEffect(() => {
    console.log('Maintenance Mode Environment Variable:', process.env.NEXT_PUBLIC_MAINTENANCE_MODE);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      onPasswordCorrect();
    } else {
      setIsShaking(true);
      setPassword('');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit(e);
    }
  };

  return (
    <>
      <Head>
        <title>Техническое обслуживание - Protek Auto</title>
        <meta name="description" content="Сайт временно недоступен из-за технического обслуживания" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Анимированный фон */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-6 h-6 bg-red-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-24 left-20 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 right-12 w-5 h-5 bg-blue-400 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Логотип и автомобиль */}
          <div className="mb-8">
            <div className="relative">
              {/* Анимированный автомобиль */}
              <div className="mb-6 relative">
                <div className="inline-block">
                  <svg
                    className="w-32 h-20 mx-auto text-blue-400 animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V304c0 8.8-7.2 16-16 16H448c-8.8 0-16-7.2-16-16V288H80v16c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                  </svg>
                </div>
                
                {/* Дым из выхлопной трубы */}
                <div className="absolute -right-8 top-6">
                  <div className="w-4 h-4 bg-gray-400 rounded-full opacity-60 animate-ping"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full opacity-40 animate-pulse absolute -top-2 -right-2"></div>
                </div>
              </div>

              <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
                PROTEK AUTO
              </h1>
              
              {/* Инструменты */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <svg className="w-8 h-8 text-yellow-400 animate-spin" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.4 408.6 7.4 428.9 19.9 441.4l51.2 51.2c12.5 12.5 32.8 12.5 45.3 0l44.9-44.9c8.5-8.5 8.5-22.4 0-30.9l-65.4-65.4c-8.5-8.5-22.4-8.5-30.9 0L19.9 396.1z"/>
                </svg>
                <svg className="w-8 h-8 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5z"/>
                </svg>
                <svg className="w-8 h-8 text-green-400 animate-bounce" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Текст состояния */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-4">
              🔧 Техническое обслуживание
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Наш автосервис временно закрыт на профилактику
            </p>
            <p className="text-lg text-gray-400">
              Мы настраиваем двигатель для лучшей производительности
            </p>
          </div>

          {/* Прогресс бар */}
          <div className="mb-8">
            <div className="bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">Прогресс обслуживания: {progress}%</p>
          </div>

          {/* Форма ввода пароля */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              🔐 Код доступа для техперсонала
            </h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Введите код доступа..."
                  className={`w-full px-6 py-4 bg-gray-700 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300 ${
                    isShaking ? 'animate-pulse border-red-500 bg-red-900/20' : 'border-gray-600'
                  }`}
                  autoComplete="off"
                  tabIndex={0}
                  aria-label="Введите пароль для доступа к сайту"
                />
                
                {/* Индикатор безопасности */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                tabIndex={0}
                aria-label="Войти в систему"
              >
                🚀 Запустить двигатель
              </button>
            </form>
            
            {isShaking && (
              <p className="text-red-400 text-sm mt-4 animate-pulse">
                ❌ Неверный код доступа! Попробуйте еще раз.
              </p>
            )}
          </div>

          {/* Контактная информация */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              По вопросам обращайтесь к администратору системы
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <span className="text-2xl">🛠️</span>
              <span className="text-2xl">⚙️</span>
              <span className="text-2xl">🔧</span>
            </div>
          </div>
        </div>

        {/* Дополнительные анимационные элементы */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenanceMode; 