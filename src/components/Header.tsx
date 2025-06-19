import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from '@apollo/client';
import BottomHead from "@/components/BottomHead";
import AuthModal from "@/components/auth/AuthModal";
import type { Client } from "@/types/auth";
import { useIsClient } from "@/lib/useIsomorphicLayoutEffect";
import { FIND_LAXIMO_VEHICLE, DOC_FIND_OEM, FIND_LAXIMO_VEHICLE_BY_PLATE_GLOBAL, FIND_LAXIMO_VEHICLES_BY_PART_NUMBER } from '@/lib/graphql';
import { LaximoVehicleSearchResult, LaximoDocFindOEMResult, LaximoVehiclesByPartResult } from '@/types/laximo';
import Link from "next/link";
import CartButton from './CartButton';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LaximoVehicleSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [oemSearchResults, setOemSearchResults] = useState<LaximoDocFindOEMResult | null>(null);
  const [vehiclesByPartResults, setVehiclesByPartResults] = useState<LaximoVehiclesByPartResult | null>(null);
  const [searchType, setSearchType] = useState<'vin' | 'oem' | 'plate' | 'text'>('text');
  const [oemSearchMode, setOemSearchMode] = useState<'parts' | 'vehicles'>('parts'); // Режим поиска по OEM
  const router = useRouter();
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const isClient = useIsClient();

  // Query для поиска по артикулу через Doc FindOEM
  const [findOEMParts] = useLazyQuery(DOC_FIND_OEM, {
    onCompleted: (data) => {
      const result = data.laximoDocFindOEM;
      console.log('🔍 Найдено деталей по артикулу:', result?.details?.length || 0);
      setOemSearchResults(result);
      setSearchResults([]);
      setIsSearching(false);
      setShowResults(true);
    },
    onError: (error) => {
      console.error('❌ Ошибка поиска по артикулу:', error);
      setOemSearchResults(null);
      setSearchResults([]);
      setIsSearching(false);
      setShowResults(true);
    }
  });

  // Query для поиска автомобилей по артикулу
  const [findVehiclesByPartNumber] = useLazyQuery(FIND_LAXIMO_VEHICLES_BY_PART_NUMBER, {
    onCompleted: (data) => {
      const result = data.laximoFindVehiclesByPartNumber;
      console.log('🔍 Найдено автомобилей по артикулу:', result?.totalVehicles || 0);
      setVehiclesByPartResults(result);
      setSearchResults([]);
      setOemSearchResults(null);
      setIsSearching(false);
      setShowResults(true);
    },
    onError: (error) => {
      console.error('❌ Ошибка поиска автомобилей по артикулу:', error);
      setVehiclesByPartResults(null);
      setSearchResults([]);
      setOemSearchResults(null);
      setIsSearching(false);
      setShowResults(true);
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

  // Проверяем, является ли строка артикулом (OEM номером)
  const isOEMNumber = (query: string): boolean => {
    const cleanQuery = query.trim().toUpperCase();
    // Артикул обычно содержит буквы и цифры, может содержать дефисы, точки
    // Длина от 3 до 20 символов, не должен быть VIN номером или госномером
    return /^[A-Z0-9\-\.]{3,20}$/.test(cleanQuery) && !isVinNumber(cleanQuery) && !isPlateNumber(cleanQuery);
  };

  // Проверяем, является ли строка госномером РФ
  const isPlateNumber = (query: string): boolean => {
    const cleanQuery = query.trim().toUpperCase().replace(/\s+/g, '');
    // Российские госномера: А123БВ77, А123БВ777, АА123А77, АА123А777, А123АА77, А123АА777
    // Убираем пробелы и дефисы для проверки
    const platePatterns = [
      /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/, // А123БВ77, А123БВ777
      /^[АВЕКМНОРСТУХ]{2}\d{3}[АВЕКМНОРСТУХ]\d{2,3}$/, // АА123А77, АА123А777
      /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/, // А123АА77, А123АА777
    ];
    
    return platePatterns.some(pattern => pattern.test(cleanQuery));
  };

  // Определяем тип поиска
  const getSearchType = (query: string): 'vin' | 'oem' | 'plate' | 'text' => {
    if (isVinNumber(query)) return 'vin';
    if (isPlateNumber(query)) return 'plate';
    if (isOEMNumber(query)) return 'oem';
    return 'text';
  };

  // Список популярных каталогов для поиска по VIN
  const popularCatalogs = ['VW', 'AUDI', 'BMW', 'MERCEDES', 'FORD', 'TOYOTA', 'NISSAN', 'HYUNDAI', 'KIA'];

  // Обработчик поиска по VIN больше не используется (переходим на отдельную страницу)
  /*
  const handleVinSearch = async (vin: string) => {
    setIsSearching(true);
    setSearchResults([]);
    setOemSearchResults(null);
    setVehiclesByPartResults(null);
    
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
  */

  const handleOEMSearch = async (oemNumber: string) => {
    setIsSearching(true);
    setSearchResults([]);
    setOemSearchResults(null);
    setVehiclesByPartResults(null);
    
    console.log('🔍 Поиск по артикулу через Doc FindOEM:', oemNumber);
    
    try {
      await findOEMParts({
        variables: {
          oemNumber: oemNumber.trim().toUpperCase()
        }
      });
    } catch (error) {
      console.error('❌ Ошибка поиска по артикулу:', error);
    }
  };

  // Обработчик поиска по госномеру больше не используется (переходим на отдельную страницу)
  /*
  const handlePlateSearch = async (plateNumber: string) => {
    setIsSearching(true);
    setSearchResults([]);
    setOemSearchResults(null);
    setVehiclesByPartResults(null);
    
    // Очищаем госномер от пробелов и приводим к верхнему регистру
    const cleanPlateNumber = plateNumber.trim().toUpperCase().replace(/\s+/g, '');
    console.log('🔍 Поиск по госномеру:', cleanPlateNumber);
    
    try {
      await findVehicleByPlate({
        variables: {
          plateNumber: cleanPlateNumber
        }
      });
    } catch (error) {
      console.error('❌ Ошибка поиска по госномеру:', error);
    }
  };
  */

  const handlePartVehicleSearch = async (partNumber: string) => {
    setIsSearching(true);
    setSearchResults([]);
    setOemSearchResults(null);
    setVehiclesByPartResults(null);
    
    console.log('🔍 Поиск автомобилей по артикулу:', partNumber);
    
    try {
      await findVehiclesByPartNumber({
        variables: {
          partNumber: partNumber.trim().toUpperCase()
        }
      });
    } catch (error) {
      console.error('❌ Ошибка поиска автомобилей по артикулу:', error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    const currentSearchType = getSearchType(searchQuery);
    setSearchType(currentSearchType);
    
    if (currentSearchType === 'vin') {
      // Переходим на страницу результатов поиска по VIN
      router.push(`/vehicle-search-results?q=${encodeURIComponent(searchQuery.trim().toUpperCase())}`);
    } else if (currentSearchType === 'plate') {
      // Переходим на страницу результатов поиска по госномеру
      router.push(`/vehicle-search-results?q=${encodeURIComponent(searchQuery.trim().toUpperCase())}`);
    } else if (currentSearchType === 'oem') {
      // Если это артикул, переходим на новую страницу поиска с режимом запчастей
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim().toUpperCase())}&mode=parts`);
    } else {
      // Для текстового поиска также перенаправляем на новую страницу поиска
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&mode=parts`);
    }
  };

  const handleVehicleSelect = (vehicle: LaximoVehicleSearchResult) => {
    setShowResults(false);
    
    // Переходим на страницу автомобиля - используем catalog вместо brand
    const catalogCode = (vehicle as any).catalog || vehicle.brand.toLowerCase();
    console.log('🚗 Переход на страницу автомобиля:', { catalogCode, vehicleId: vehicle.vehicleid, ssd: vehicle.ssd });
    
    // Если переход происходит из поиска автомобилей по артикулу, передаем артикул для автоматического поиска
    const currentOEMNumber = oemSearchMode === 'vehicles' ? searchQuery.trim().toUpperCase() : '';
    const url = `/vehicle-search/${catalogCode}/${vehicle.vehicleid}?ssd=${vehicle.ssd || ''}${currentOEMNumber ? `&oemNumber=${encodeURIComponent(currentOEMNumber)}` : ''}`;
    
    setSearchQuery('');
    router.push(url);
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
                    placeholder="Введите код запчасти, VIN номер или госномер автомобиля" 
                    type="text" 
                    id="customSearchInput" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isSearching}
                  />
                </form>
                
                {/* Результаты поиска VIN */}
                {showResults && searchResults.length > 0 && (searchType === 'vin' || searchType === 'plate') && (
                  <div 
                    ref={searchDropdownRef}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50 max-h-80 overflow-y-auto"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">
                        {searchType === 'vin' ? 'Найденные автомобили по VIN' : 'Найденные автомобили по госномеру'}
                      </h3>
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

                {/* Результаты поиска по артикулу */}
                {showResults && searchType === 'oem' && (
                  <div 
                    ref={searchDropdownRef}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50 max-h-96 overflow-y-auto"
                  >
                    {/* Переключатель режимов поиска */}
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">Поиск по артикулу: {searchQuery}</h3>
                      </div>
                      <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
                        <button
                          onClick={() => {
                            setOemSearchMode('parts');
                            if (oemSearchMode !== 'parts') {
                              handleOEMSearch(searchQuery.trim().toUpperCase());
                            }
                          }}
                          className={`flex-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                            oemSearchMode === 'parts'
                              ? 'bg-white text-blue-600 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          🔧 Найти детали
                        </button>
                        <button
                          onClick={() => {
                            setOemSearchMode('vehicles');
                            if (oemSearchMode !== 'vehicles') {
                              handlePartVehicleSearch(searchQuery.trim().toUpperCase());
                            }
                          }}
                          className={`flex-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                            oemSearchMode === 'vehicles'
                              ? 'bg-white text-blue-600 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          🚗 Найти автомобили
                        </button>
                      </div>
                    </div>

                    {/* Результаты поиска деталей */}
                    {oemSearchMode === 'parts' && oemSearchResults && oemSearchResults.details.length > 0 && (
                      <>
                        <div className="p-3 border-b border-gray-100">
                          <p className="text-xs text-gray-600">Найдено {oemSearchResults.details.length} деталей</p>
                        </div>
                        {oemSearchResults.details.slice(0, 5).map((detail, index) => (
                          <div
                            key={`${detail.detailid}-${index}`}
                            className="p-3 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">
                                  {detail.name}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1">
                                  <span className="font-medium">OEM:</span> {detail.formattedoem}
                                </p>
                                <p className="text-xs text-gray-600">
                                  <span className="font-medium">Производитель:</span> {detail.manufacturer}
                                </p>
                                {detail.replacements.length > 0 && (
                                  <p className="text-xs text-blue-600 mt-1">
                                    +{detail.replacements.length} аналогов
                                  </p>
                                )}
                              </div>
                              <div className="text-right ml-2">
                                <button 
                                  onClick={() => {
                                    // Переходим на страницу поиска по артикулу
                                    router.push(`/search?q=${encodeURIComponent(detail.formattedoem)}&mode=parts`);
                                    setShowResults(false);
                                    setSearchQuery('');
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Подробнее
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {oemSearchResults.details.length > 5 && (
                          <div className="p-3 text-center border-t border-gray-100">
                            <button 
                              onClick={() => {
                                router.push(`/search?q=${encodeURIComponent(searchQuery)}&mode=parts`);
                                setShowResults(false);
                                setSearchQuery('');
                              }}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Показать все {oemSearchResults.details.length} деталей
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* Результаты поиска автомобилей по артикулу */}
                    {oemSearchMode === 'vehicles' && vehiclesByPartResults && vehiclesByPartResults.totalVehicles > 0 && (
                      <>
                        <div className="p-3 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-600">
                              Найдено {vehiclesByPartResults.totalVehicles} автомобилей в {vehiclesByPartResults.catalogs.length} каталогах
                            </p>
                            <button 
                              onClick={() => {
                                // Переходим на страницу со всеми автомобилями по артикулу
                                const cleanPartNumber = searchQuery.trim();
                                router.push(`/vehicles-by-part?partNumber=${encodeURIComponent(cleanPartNumber)}`);
                                setShowResults(false);
                                setSearchQuery('');
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Показать все
                            </button>
                          </div>
                        </div>
                        
                        {vehiclesByPartResults.catalogs.map((catalog, catalogIndex) => (
                          <div key={catalog.catalogCode} className="border-b border-gray-100 last:border-b-0">
                            <div className="p-3 bg-gray-50">
                              <h4 className="text-sm font-medium text-gray-800">
                                {catalog.brand} ({catalog.vehicleCount} автомобилей)
                              </h4>
                            </div>
                            
                            {catalog.vehicles.slice(0, 3).map((vehicle, vehicleIndex) => (
                              <button
                                key={`${vehicle.vehicleid}-${catalogIndex}-${vehicleIndex}`}
                                onClick={() => handleVehicleSelect(vehicle)}
                                className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-900 text-sm">
                                      {vehicle.name || `${vehicle.brand} ${vehicle.model}`}
                                    </h5>
                                    <p className="text-xs text-gray-600 mt-1">
                                      {vehicle.modification}
                                    </p>
                                    {vehicle.year && (
                                      <p className="text-xs text-gray-500">
                                        Год: {vehicle.year}
                                      </p>
                                    )}
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
                            
                            {catalog.vehicles.length > 3 && (
                              <div className="p-2 text-center bg-gray-50">
                                <button 
                                  onClick={() => {
                                    // Переходим на страницу со всеми автомобилями по артикулу
                                    console.log('Показать все автомобили в каталоге:', catalog.catalogCode);
                                    // Используем оригинальный артикул без лишних символов
                                    const cleanPartNumber = searchQuery.trim();
                                    router.push(`/vehicles-by-part?partNumber=${encodeURIComponent(cleanPartNumber)}&catalogCode=${catalog.catalogCode}`);
                                    setShowResults(false);
                                    setSearchQuery('');
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Показать все {catalog.vehicles.length} автомобилей в {catalog.brand}
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}

                    {/* Сообщения об отсутствии результатов */}
                    {oemSearchMode === 'parts' && (!oemSearchResults || oemSearchResults.details.length === 0) && !isSearching && (
                      <div className="p-4 text-center">
                        <div className="text-yellow-400 mb-2">
                          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Детали не найдены</h3>
                        <p className="text-xs text-gray-600">
                          Детали с артикулом {searchQuery} не найдены в базе данных
                        </p>
                      </div>
                    )}

                    {oemSearchMode === 'vehicles' && (!vehiclesByPartResults || vehiclesByPartResults.totalVehicles === 0) && !isSearching && (
                      <div className="p-4 text-center">
                        <div className="text-yellow-400 mb-2">
                          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 14.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Автомобили не найдены</h3>
                        <p className="text-xs text-gray-600">
                          Автомобили с артикулом {searchQuery} не найдены в каталогах
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Сообщение о том, что VIN/госномер не найден */}
                {showResults && searchResults.length === 0 && (searchType === 'vin' || searchType === 'plate') && !isSearching && (
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
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {searchType === 'vin' ? 'VIN не найден' : 'Госномер не найден'}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {searchType === 'vin' 
                          ? `Автомобиль с VIN ${searchQuery} не найден в доступных каталогах`
                          : `Автомобиль с госномером ${searchQuery} не найден в базе данных`
                        }
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
                <Link href="/profile-gar" className="button_h w-inline-block">
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
                <CartButton />
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