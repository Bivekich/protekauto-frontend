'use client';

import { useState } from 'react';

const SITE_PASSWORD = 'gQFNd7k_N2';

const MaintenancePage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === SITE_PASSWORD) {
      localStorage.setItem('maintenance_access', 'granted');
      window.location.reload();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div
        className={`max-w-md w-full bg-white rounded-xl shadow-lg p-8 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        <div className="text-center mb-6">
          <div className="inline-block mb-4 relative">
            <div className="text-6xl">🔧</div>
            <div className="absolute -top-2 -right-2 text-3xl animate-bounce">
              ⚙️
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Тсс! Секретная разработка</h1>
          <p className="text-gray-600 mb-4">
            Здесь строится что-то невероятное, но пока доступ только для команды
            разработки!
          </p>
          <div className="text-sm text-gray-500 italic mb-6">
            &ldquo;Код пишется, дизайн рисуется, менеджеры чешут репу...&rdquo;
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Секретный пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
              placeholder="Введите пароль команды"
              aria-label="Введите секретный пароль для доступа"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">
                Неверный пароль! Вы точно из нашей команды? 🤔
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Войти на сайт
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>А пока заглушка активна, посмотрите на этого котика:</p>
          <div className="mt-4 flex justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">🐱</div>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs">
            © {new Date().getFullYear()} Протек Авто - Секретная разработка
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
