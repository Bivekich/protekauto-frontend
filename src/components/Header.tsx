import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from '@apollo/client';
import BottomHead from "@/components/BottomHead";
import AuthModal from "@/components/auth/AuthModal";
import type { Client } from "@/types/auth";
import { useIsClient } from "@/lib/useIsomorphicLayoutEffect";
import { FIND_LAXIMO_VEHICLE } from '@/lib/graphql';
import { LaximoVehicleSearchResult } from '@/types/laximo';
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LaximoVehicleSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const isClient = useIsClient();

  // Query для поиска по VIN во всех каталогах
  const [findVehicleInCatalogs] = useLazyQuery(FIND_LAXIMO_VEHICLE, {
    onCompleted: (data) => {
      const vehicles = data.laximoFindVehicle || [];
      console.log('🔍 Найдено автомобилей по VIN:', vehicles.length);
      setSearchResults(vehicles);
      setIsSearching(false);
      setShowResults(true); // Показываем результаты даже если пустые (для отображения "не найдено")
    },
    onError: (error) => {
      console.error('❌ Ошибка поиска по VIN:', error);
      setSearchResults([]);
      setIsSearching(false);
      setShowResults(true); // Показываем сообщение об ошибке
    }
  });

  // Закрытие результатов при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Проверяем авторизацию при загрузке компонента (только на клиенте)
  useEffect(() => {
    if (!isClient) return;
    
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
      } catch (error) {
        console.error('Ошибка парсинга данных пользователя:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, [isClient]);

  useEffect(() => {
    const bottomHead = document.querySelector('.bottom_head');
    if (!bottomHead) return;
    const onScroll = () => {
      if (window.scrollY > 0) {
        bottomHead.classList.add('scrolled');
      } else {
        bottomHead.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Проверяем, является ли строка VIN номером
  const isVinNumber = (query: string): boolean => {
    const cleanQuery = query.trim().toUpperCase();
    // VIN состоит из 17 символов, содержит буквы и цифры, исключая I, O, Q
    return /^[A-HJ-NPR-Z0-9]{17}$/.test(cleanQuery);
  };

  // Список популярных каталогов для поиска по VIN
  const popularCatalogs = ['VW', 'AUDI', 'BMW', 'MERCEDES', 'FORD', 'TOYOTA', 'NISSAN', 'HYUNDAI', 'KIA'];

  const handleVinSearch = async (vin: string) => {
    setIsSearching(true);
    setSearchResults([]);
    
    console.log('🔍 Поиск по VIN глобально:', vin);
    
    // Выполняем глобальный поиск без указания каталога
    try {
      await findVehicleInCatalogs({
        variables: {
          catalogCode: '', // Пустой код каталога для глобального поиска
          vin: vin
        }
      });
    } catch (error) {
      console.error('❌ Ошибка глобального поиска по VIN:', error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    if (isVinNumber(searchQuery)) {
      // Если это VIN номер, ищем автомобиль
      handleVinSearch(searchQuery.trim().toUpperCase());
    } else {
      // Если это обычный поиск, переходим на страницу результатов
      router.push(`/search-result?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVehicleSelect = (vehicle: LaximoVehicleSearchResult) => {
    setShowResults(false);
    setSearchQuery('');
    
    // Переходим на страницу автомобиля - используем catalog вместо brand
    const catalogCode = (vehicle as any).catalog || vehicle.brand.toLowerCase();
    console.log('🚗 Переход на страницу автомобиля:', { catalogCode, vehicleId: vehicle.vehicleid, ssd: vehicle.ssd });
    router.push(`/vehicle-search/${catalogCode}/${vehicle.vehicleid}?ssd=${vehicle.ssd || ''}`);
  };

  return (
    <header className="section-4">
      <section className="top_head">
        <div className="w-layout-blockcontainer container nav w-container">
          <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
          <Link href="/" className="brand w-nav-brand"><img src="/images/logo.svg" loading="lazy" alt="" /></Link>
            <nav role="navigation" className="nav-menu w-nav-menu">
              <Link href="/about" className="nav-link w-nav-link">О компании</Link>
              <Link href="/payments-method" className="nav-link w-nav-link">Оплата и доставка</Link>
              <Link href="/" className="nav-link w-nav-link">Гарантия и возврат</Link>
              <Link href="/payments-method" className="nav-link w-nav-link">Покупателям</Link>
              <Link href="/wholesale" className="nav-link w-nav-link">Оптовым клиентам</Link>
              <Link href="/contacts" className="nav-link w-nav-link">Контакты</Link>
            </nav>
            <div className="w-layout-hflex flex-block-2">
              <div className="w-layout-hflex flex-block-3">
                <div className="w-layout-hflex flex-block-77-copy">
                  <div className="code-embed-4 w-embed"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.51667 8.99167C6.71667 11.35 8.65 13.275 11.0083 14.4833L12.8417 12.65C13.0667 12.425 13.4 12.35 13.6917 12.45C14.625 12.7583 15.6333 12.925 16.6667 12.925C17.125 12.925 17.5 13.3 17.5 13.7583V16.6667C17.5 17.125 17.125 17.5 16.6667 17.5C8.84167 17.5 2.5 11.1583 2.5 3.33333C2.5 2.875 2.875 2.5 3.33333 2.5H6.25C6.70833 2.5 7.08333 2.875 7.08333 3.33333C7.08333 4.375 7.25 5.375 7.55833 6.30833C7.65 6.6 7.58333 6.925 7.35 7.15833L5.51667 8.99167Z" fill="currentColor" /></svg></div>
                  <div className="phone-copy">+7 (495) 260-20-60</div>
                </div>
              </div>
              <div className="w-layout-hflex flex-block"><img src="/images/tg_icon.svg" loading="lazy" alt="" className="icon_messenger" /><img src="/images/wa_icon.svg" loading="lazy" alt="" className="icon_messenger" /></div>
            </div>
          </div>
        </div>
      </section>
      <section className="bottom_head">
        <div className="w-layout-blockcontainer container nav w-container">
          <div className="w-layout-hflex flex-block-4">
            <div data-animation="default" data-collapse="all" data-duration="400" data-easing="ease-in" data-easing2="ease" role="banner" className="navbar-2 w-nav">

              
            </div>
            <div className="w-layout-hflex flex-block-93">

            <div
                className={`menu-button w-nav-button${menuOpen ? " w--open" : ""}`}
                onClick={() => setMenuOpen((open) => !open)}
                style={{ cursor: "pointer" }}
              >
                <div className="code-embed-5 w-embed"><svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H30V3H0V0Z" fill="currentColor"></path>
                  <path d="M0 7.5H30V10.5H0V7.5Z" fill="currentColor"></path>
                  <path d="M0 15H30V18H0V15Z" fill="currentColor"></path>
                </svg></div>
              </div>
              <div className="form-block w-form" style={{ position: 'relative' }}>
                <form
                  id="custom-search-form"
                  name="custom-search-form"
                  data-custom-form="true"
                  className="form"
                  autoComplete="off"
                  onSubmit={handleSearchSubmit}
                  ref={searchFormRef}
                >
                  <div className="link-block-3 w-inline-block" style={{cursor: 'pointer'}} onClick={() => searchFormRef.current?.requestSubmit()}> 
                    <div className="code-embed-6 w-embed">
                      {isSearching ? (
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 17.5L13.8834 13.8833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </div>
                  </div>
                  <input 
                    className="text-field w-input" 
                    maxLength={256} 
                    name="customSearch" 
                    data-custom-input="true" 
                    placeholder="Введите код запчасти или VIN номер автомобиля" 
                    type="text" 
                    id="customSearchInput" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isSearching}
                  />
                </form>
                
                {/* Результаты поиска VIN */}
                {showResults && searchResults.length > 0 && (
                  <div 
                    ref={searchDropdownRef}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50 max-h-80 overflow-y-auto"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">Найденные автомобили по VIN</h3>
                    </div>
                    {searchResults.map((vehicle, index) => (
                      <button
                        key={`${vehicle.vehicleid}-${index}`}
                        onClick={() => handleVehicleSelect(vehicle)}
                        className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {vehicle.brand} {vehicle.model}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {vehicle.modification} • {vehicle.year} • {vehicle.bodytype}
                            </p>
                            {vehicle.engine && (
                              <p className="text-xs text-gray-500">
                                Двигатель: {vehicle.engine}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Сообщение о том, что VIN не найден */}
                {showResults && searchResults.length === 0 && isVinNumber(searchQuery) && !isSearching && (
                  <div 
                    ref={searchDropdownRef}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50"
                  >
                    <div className="p-4 text-center">
                      <div className="text-yellow-400 mb-2">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">VIN не найден</h3>
                      <p className="text-xs text-gray-600">
                        Автомобиль с VIN {searchQuery} не найден в доступных каталогах
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="success-message w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="error-message w-form-fail">
                  <div>Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
              <div className="w-layout-hflex flex-block-76">
                <Link href="/favorite" className="button_h w-inline-block">
                    <div className="code-embed-7 w-embed"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27 10.8V24H24.6V13.2H5.4V24H3V10.8L15 6L27 10.8ZM23.4 14.4H6.6V16.8H23.4V14.4ZM23.4 18H6.6V20.4H23.4V18Z" fill="currentColor" /><path d="M6.6 21.6H23.4V24H6.6V21.6Z" fill="currentColor" /></svg></div>
                    <div className="text-block-2">Добавить в гараж</div>
                </Link>
                <Link href="/favorite" className="button_h w-inline-block">
                  <div className="code-embed-7 w-embed"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 25L13.405 23.5613C7.74 18.4714 4 15.1035 4 10.9946C4 7.6267 6.662 5 10.05 5C11.964 5 13.801 5.88283 15 7.26703C16.199 5.88283 18.036 5 19.95 5C23.338 5 26 7.6267 26 10.9946C26 15.1035 22.26 18.4714 16.595 23.5613L15 25Z" fill="currentColor" /></svg></div>
                  <div className="text-block-2">Избранное</div>
                </Link>
                <button 
                  onClick={() => {
                    if (currentUser) {
                      // Если пользователь авторизован, переходим в личный кабинет
                      router.push('/profile-orders');
                    } else {
                      // Если не авторизован, открываем модальное окно
                      setAuthModalOpen(true);
                    }
                  }}
                  className="button_h login w-inline-block"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <div className="code-embed-8 w-embed"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3C8.376 3 3 8.376 3 15C3 21.624 8.376 27 15 27C21.624 27 27 21.624 27 15C27 8.376 21.624 3 15 3ZM15 7.8C17.316 7.8 19.2 9.684 19.2 12C19.2 14.316 17.316 16.2 15 16.2C12.684 16.2 10.8 14.316 10.8 12C10.8 9.684 12.684 7.8 15 7.8ZM15 24.6C12.564 24.6 9.684 23.616 7.632 21.144C9.73419 19.4955 12.3285 18.5995 15 18.5995C17.6715 18.5995 20.2658 19.4955 22.368 21.144C20.316 23.616 17.436 24.6 15 24.6Z" fill="currentColor" /></svg></div>
                  <div className="text-block-2">{currentUser ? 'Личный кабинет' : 'Войти'}</div>
                </button>
                <Link href="/cart" className="button_h w-inline-block">
                  <div className="code-embed-7 w-embed"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1998 22.2C8.8798 22.2 7.81184 23.28 7.81184 24.6C7.81184 25.92 8.8798 27 10.1998 27C11.5197 27 12.5997 25.92 12.5997 24.6C12.5997 23.28 11.5197 22.2 10.1998 22.2ZM3 3V5.4H5.39992L9.71977 14.508L8.09982 17.448C7.90783 17.784 7.79984 18.18 7.79984 18.6C7.79984 19.92 8.8798 21 10.1998 21H24.5993V18.6H10.7037C10.5357 18.6 10.4037 18.468 10.4037 18.3L10.4397 18.156L11.5197 16.2H20.4594C21.3594 16.2 22.1513 15.708 22.5593 14.964L26.8552 7.176C26.9542 6.99286 27.004 6.78718 26.9997 6.57904C26.9955 6.37089 26.9373 6.16741 26.8309 5.98847C26.7245 5.80952 26.5736 5.66124 26.3927 5.55809C26.2119 5.45495 26.0074 5.40048 25.7992 5.4H8.05183L6.92387 3H3ZM22.1993 22.2C20.8794 22.2 19.8114 23.28 19.8114 24.6C19.8114 25.92 20.8794 27 22.1993 27C23.5193 27 24.5993 25.92 24.5993 24.6C24.5993 23.28 23.5193 22.2 22.1993 22.2Z" fill="currentColor" /></svg></div>
                  <div className="text-block-2">Корзина</div>
                  <div className="pcs-info">
                    <div className="text-block-39">12</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BottomHead menuOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(client, token) => {
          setCurrentUser(client);
          if (isClient) {
            if (token) {
              localStorage.setItem('authToken', token);
            }
            
            // Сохраняем данные пользователя
            localStorage.setItem('userData', JSON.stringify(client));
          }
          
          console.log('Пользователь авторизован:', client);
          
          // Закрываем модальное окно
          setAuthModalOpen(false);
          
          // Перенаправляем в личный кабинет
          router.push('/profile-orders');
        }}
      />
    </header>
  );
};

export default Header; 