'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '../shared/providers/AuthProvider';
import { useRouter } from 'next/navigation';

// Динамический импорт AuthPopup для отложенной загрузки
const AuthPopup = dynamic(() => import('./Auth').then((mod) => mod.AuthPopup), {
  ssr: false,
});

const Header = () => {
  const [cartSum] = useState(109876);
  const [searchText, setSearchText] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { auth } = useAuth();
  const router = useRouter();

  // Следим за прокруткой страницы
  useEffect(() => {
    const handleScroll = () => {
      // Показываем шапку после прокрутки на 200px
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Форматирование числа без использования toLocaleString()
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleAuthClick = () => {
    if (auth.isAuthenticated) {
      router.push('/profile');
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleAuthClose = () => {
    setIsAuthOpen(false);
  };

  // Обработчик поиска
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  // Функция для проверки нажатия Enter в поле поиска
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchText.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchText.trim())}`);
      }
    }
  };

  // Заменяем кнопку авторизации в обоих местах (в фиксированной и обычной шапке)
  const authButton = (
    <button
      onClick={handleAuthClick}
      className="bg-[#0D336C] text-white flex items-center gap-2 px-5 py-[9px] rounded-xl hover:bg-[#00245B] transition-colors"
    >
      <div className="relative">
        <Image
          src="/icons/account-icon.svg"
          alt="Аккаунт"
          width={20}
          height={20}
        />
        {auth.isAuthenticated && (
          <div className="absolute w-2 h-2 bg-[#2AF50C] rounded-full top-0 right-0"></div>
        )}
      </div>
      <span>{auth.isAuthenticated ? 'Личный кабинет' : 'Войти'}</span>
    </button>
  );

  // Компонент поля поиска
  const searchField = (
    <div className="relative flex items-center bg-white rounded-lg px-[30px] py-3 hover:bg-[#F5F8FB] border border-transparent hover:border-[#0D336C] transition-all focus-within:border-[#EC1C24] max-w-[500px] w-full">
      <input
        type="text"
        placeholder="Введите код запчасти или VIN номер автомобиля"
        className={`w-full outline-none ${
          searchText ? 'text-black' : 'text-[#8893A1]'
        } bg-transparent`}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleSearchKeyPress}
      />
      <button
        onClick={handleSearch}
        className={`absolute right-[30px] ${
          searchText ? 'text-black' : 'text-[#8893A1]'
        } hover:text-[#EC1C24] transition-colors`}
        aria-label="Поиск"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors"
        >
          <path
            d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="relative">
      {/* Фиксированная скролл-шапка */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 shadow-md ${
          scrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: '#0D336C' }}
      >
        <div className="flex items-center justify-between px-[130px] py-5">
          <div className="flex items-center gap-10 flex-grow">
            <div className="flex items-center">
              <Image
                src="/logo-scroll.svg"
                alt="Протек Авто"
                width={180}
                height={50}
                priority
              />
            </div>

            <button
              className="bg-white p-2 rounded-lg flex justify-center items-center w-12 h-12 hover:bg-[#EC1C24] hover:text-white transition-colors group"
              aria-label="Каталог"
            >
              <Image
                src="/icons/burger-menu.svg"
                alt="Каталог"
                width={24}
                height={24}
                className="group-hover:filter group-hover:brightness-0 group-hover:invert transition-all"
              />
            </button>

            {searchField}
          </div>

          <div className="flex gap-[10px]">
            <Link
              href="/garage"
              className="bg-[#0D336C] text-white flex items-center gap-2 px-5 py-[9px] rounded-xl hover:bg-[#00245B] transition-colors"
            >
              <Image
                src="/icons/garage-icon.svg"
                alt="Гараж"
                width={20}
                height={20}
              />
              <span>Добавить в гараж</span>
            </Link>

            <Link
              href="/favorites"
              className="bg-[#0D336C] text-white flex items-center gap-2 px-5 py-[9px] rounded-xl hover:bg-[#00245B] transition-colors"
            >
              <Image
                src="/icons/favorite-icon.svg"
                alt="Избранное"
                width={20}
                height={20}
              />
              <span>Избранное</span>
            </Link>

            {authButton}

            <Link
              href="/cart"
              className="bg-[#0D336C] text-white flex items-center gap-2 px-5 py-[9px] rounded-xl hover:bg-[#00245B] transition-colors"
            >
              <div className="relative">
                <Image
                  src="/icons/cart-icon.svg"
                  alt="Корзина"
                  width={20}
                  height={20}
                />
                <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#EC1C24] rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
                  12
                </div>
              </div>
              <span>{formatNumber(cartSum)} ₽</span>
            </Link>
          </div>
        </div>
      </div>

      <header className="relative w-full z-40">
        {/* Верхняя часть шапки */}
        <div className="w-full bg-white py-4">
          <div
            className="flex justify-between items-center w-full"
            style={{ paddingLeft: '380px', paddingRight: '130px' }}
          >
            <div className="flex-1"></div>
            <div className="flex gap-[30px]">
              <Link
                href="/"
                className="text-[#0D336C] text-base hover:text-[#C00D0D] transition-colors"
              >
                О компании
              </Link>
              <Link
                href="/"
                className="text-[#0D336C] text-base hover:text-[#C00D0D] transition-colors"
              >
                Оплата и доставка
              </Link>
              <Link
                href="/"
                className="text-[#0D336C] text-base hover:text-[#C00D0D] transition-colors"
              >
                Гарантия и возврат
              </Link>
              <Link
                href="/"
                className="text-[#0D336C] text-base hover:text-[#C00D0D] transition-colors"
              >
                Покупателям
              </Link>
              <Link
                href="/"
                className="text-[#0D336C] text-base hover:text-[#C00D0D] transition-colors"
              >
                Оптовым клиентам
              </Link>
              <Link
                href="/"
                className="text-[#0D336C] text-base hover:text-[#C00D0D] transition-colors"
              >
                Контакты
              </Link>
            </div>
            <div className="flex-1"></div>

            <div className="flex items-center gap-[30px]">
              <div className="flex items-center gap-[5px]">
                <Image
                  src="/icons/phone.svg"
                  alt="Телефон"
                  width={16}
                  height={16}
                />
                <span className="font-semibold text-black">
                  +7 (495) 260-20-60
                </span>
              </div>

              <div className="flex items-center gap-[30px]">
                <div className="flex items-center gap-[5px]">
                  <Image
                    src="/icons/tg-icon.svg"
                    alt="Telegram"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex items-center gap-[5px]">
                  <Image
                    src="/icons/wa-icon.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Средняя часть шапки с логотипом */}
        <div
          className="absolute left-[130px] top-[5px] w-[207px] h-[74px]"
          style={{ zIndex: 50 }}
        >
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Протек Авто"
              width={207}
              height={74}
              priority
            />
          </Link>
        </div>

        {/* Нижняя часть шапки */}
        <div className="bg-[#0D336C] py-5 px-[130px] flex items-center justify-between">
          <button
            className="bg-white p-2 rounded-lg flex justify-center items-center w-12 h-12 hover:bg-[#EC1C24] hover:text-white transition-colors group"
            aria-label="Каталог"
          >
            <Image
              src="/icons/burger-menu.svg"
              alt="Каталог"
              width={24}
              height={24}
              className="group-hover:filter group-hover:brightness-0 group-hover:invert transition-all"
            />
          </button>

          {searchField}

          <div className="flex gap-[10px]">
            <Link
              href="/garage"
              className="bg-[#0D336C] text-white flex items-center gap-2 px-5 py-[9px] rounded-xl hover:bg-[#00245B] transition-colors"
            >
              <Image
                src="/icons/garage-icon.svg"
                alt="Гараж"
                width={20}
                height={20}
              />
              <span>Добавить в гараж</span>
            </Link>

            <Link
              href="/favorites"
              className="bg-[#0D336C] text-white flex items-center gap-2 px-5 py-[9px] rounded-xl hover:bg-[#00245B] transition-colors"
            >
              <Image
                src="/icons/favorite-icon.svg"
                alt="Избранное"
                width={20}
                height={20}
              />
              <span>Избранное</span>
            </Link>

            {authButton}

            <Link
              href="/cart"
              className="bg-[#0D336C] text-white flex items-center gap-2 px-5 py-[9px] rounded-xl hover:bg-[#00245B] transition-colors"
            >
              <div className="relative">
                <Image
                  src="/icons/cart-icon.svg"
                  alt="Корзина"
                  width={20}
                  height={20}
                />
                <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#EC1C24] rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
                  12
                </div>
              </div>
              <span>{formatNumber(cartSum)} ₽</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Всплывающее окно авторизации */}
      {isAuthOpen && (
        <AuthPopup isOpen={isAuthOpen} onClose={handleAuthClose} />
      )}
    </div>
  );
};

export default Header;
