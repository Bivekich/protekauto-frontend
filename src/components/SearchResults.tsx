'use client';

import { useState } from 'react';
import Image from 'next/image';

// Типы данных
interface Product {
  id: string;
  brand: string;
  sku: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  stock: number;
  deliveryDays: number;
  isRecommended?: boolean;
}

interface SearchResultsProps {
  query: string;
}

type SortOption = 'price_asc' | 'price_desc' | 'rating' | 'delivery';

// Тестовые данные
const MOCK_PRODUCTS: Product[] = [
  // Основные товары
  {
    id: '1',
    brand: 'INA',
    sku: '530059210',
    name: 'Комплект роликов',
    price: 3796,
    rating: 4.8,
    stock: 100,
    deliveryDays: 41,
  },
  {
    id: '2',
    brand: 'Ganz',
    sku: 'GIE37312',
    name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
    price: 996,
    rating: 4.5,
    stock: 11,
    deliveryDays: 6,
  },
  {
    id: '3',
    brand: 'INA',
    sku: '530059210',
    name: 'Комплект роликов',
    price: 3796,
    rating: 5.0,
    stock: 100,
    deliveryDays: 41,
  },
  // Аналоги от других производителей
  {
    id: '4',
    brand: 'STELLOX',
    sku: '1023245SX',
    name: 'Комплект ГРМ',
    price: 2333,
    rating: 5.0,
    stock: 44444,
    deliveryDays: 5,
    isRecommended: true,
  },
  {
    id: '5',
    brand: 'AIX',
    sku: 'AIX10127',
    name: 'Кольцо уплотнительное клапанной крышки Chevrolet',
    price: 4726,
    rating: 5.0,
    stock: 44444,
    deliveryDays: 5,
  },
  {
    id: '6',
    brand: 'ABSEL',
    sku: 'WG052006K',
    name: 'Комплект ремня ГРМ',
    price: 8700,
    rating: 5.0,
    stock: 44444,
    deliveryDays: 5,
  },
  {
    id: '7',
    brand: 'Ganz',
    sku: 'GIE34006',
    name: 'РЕМКОМПЛЕКТ ГРМ VAG+SKODA 2012- MOT.1,2TSI/1,4TSI',
    price: 5300,
    rating: 5.0,
    stock: 44444,
    deliveryDays: 5,
  },
  {
    id: '8',
    brand: 'Gates',
    sku: 'K015680XS',
    name: 'Ремень ГРМ [163 зуб.,20mm] + 2 ролика + крепеж 788',
    price: 9870,
    rating: 5.0,
    stock: 44444,
    deliveryDays: 5,
  },
];

export default function SearchResults({ query }: SearchResultsProps) {
  const [quantity, setQuantity] = useState<Record<string, number>>(
    Object.fromEntries(MOCK_PRODUCTS.map((product) => [product.id, 1]))
  );
  const [sortBy, setSortBy] = useState<SortOption>('price_asc');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Фильтруем товары по запросу
  const filteredProducts = query
    ? MOCK_PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.sku.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_PRODUCTS;

  // Обработчики изменения количества
  const decreaseQuantity = (id: string) => {
    if (quantity[id] > 1) {
      setQuantity({ ...quantity, [id]: quantity[id] - 1 });
    }
  };

  const increaseQuantity = (id: string) => {
    setQuantity({ ...quantity, [id]: quantity[id] + 1 });
  };

  return (
    <div className="py-8 bg-[#F5F8FB]">
      {/* Шапка результатов поиска */}
      <div className="px-[30px] md:px-[130px] py-[20px] md:py-[30px] flex flex-col gap-[14px]">
        <h1 className="text-[16px] md:text-[18px] font-semibold text-[#181D23]">
          {query || 'INA 530059210'}
        </h1>

        <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#000814]">
              Комплект ГРМ
            </h2>
            <p className="text-[#8E9AAC]">
              Найдено {filteredProducts.length} предложений STELLOX от{' '}
              {Math.min(
                ...filteredProducts.map((product) => product.price)
              ).toLocaleString('ru-RU')}
              ₽
            </p>
          </div>

          <div className="flex items-center md:items-end gap-2">
            <div className="border border-[#FF0000] p-2 rounded">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V13M12 17H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z"
                  stroke="#FF0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-[#000814]">
              Как правильно подобрать запчасть
            </span>
          </div>
        </div>
      </div>

      {/* Мобильные фильтры для маленьких экранов */}
      <div className="md:hidden flex justify-between items-center px-[30px] py-3">
        <button
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#E9E9E9]"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
              stroke="#000814"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Фильтры</span>
        </button>

        <div className="relative">
          <select
            className="appearance-none bg-white px-4 py-2 rounded-lg border border-[#E9E9E9] pr-8"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="price_asc">Сначала дешевле</option>
            <option value="price_desc">Сначала дороже</option>
            <option value="rating">По рейтингу</option>
            <option value="delivery">По сроку доставки</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#000814"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Блок с результатами поиска */}
      <div className="px-[30px] md:px-[130px] pb-[40px] md:pb-[80px] flex flex-col md:flex-row gap-[30px] justify-between">
        {/* Левая панель с фильтрами */}
        <div
          className={`
          ${
            isMobileFiltersOpen
              ? 'fixed inset-0 z-50 bg-white overflow-auto p-5'
              : 'hidden'
          }
          md:relative md:block md:w-[320px] md:flex-col md:gap-[30px] md:z-auto md:p-0 md:bg-transparent
        `}
        >
          {isMobileFiltersOpen && (
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold">Фильтры</h3>
              <button onClick={() => setIsMobileFiltersOpen(false)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#000814"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="flex w-full relative">
            <input
              type="text"
              placeholder="Название или свойство"
              className="w-full py-3 px-[30px] rounded-lg border border-transparent hover:border-gray-300 focus:border-[#EC1C24] outline-none"
            />
            <div className="absolute right-[30px] top-1/2 transform -translate-y-1/2 text-[#8893A1]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Фильтры в левой колонке */}
          <div className="mt-[30px] bg-white rounded-xl p-5">
            <div className="flex justify-between items-center">
              <span className="text-[18px] font-bold text-[#000814]">
                Бесплатный подбор
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#000814"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  id="bosch"
                  className="w-4 h-4 border border-[#D0D0D0] rounded"
                />
                <label htmlFor="bosch" className="text-[#181D23]">
                  Bosch
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  id="varta"
                  className="w-4 h-4 border border-[#D0D0D0] rounded"
                />
                <label htmlFor="varta" className="text-[#181D23]">
                  Varta
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  id="mutlu"
                  className="w-4 h-4 border border-[#D0D0D0] rounded"
                />
                <label htmlFor="mutlu" className="text-[#181D23]">
                  Mutlu
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  id="exide"
                  className="w-4 h-4 border border-[#D0D0D0] rounded"
                />
                <label htmlFor="exide" className="text-[#181D23]">
                  Exide
                </label>
              </div>
            </div>

            <div className="flex items-center gap-[6px] text-[#EC1C24] text-[16px] font-semibold mt-4">
              <span>Показать все</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="#EC1C24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Фильтр по емкости */}
          <div className="mt-[30px] bg-white rounded-xl p-5">
            <div className="flex justify-between items-center">
              <span className="text-[18px] font-bold text-[#000814]">
                Емкость (A/ч)
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#000814"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="flex border rounded-lg w-1/2">
                <span className="px-2 py-1 bg-[#F5F8FB] text-[#8893A1] rounded-l-lg">
                  от
                </span>
                <input
                  type="text"
                  className="w-full px-2 py-1 outline-none"
                  value="1"
                />
              </div>
              <div className="flex border rounded-lg w-1/2">
                <span className="px-2 py-1 bg-[#F5F8FB] text-[#8893A1] rounded-l-lg">
                  до
                </span>
                <input
                  type="text"
                  className="w-full px-2 py-1 outline-none"
                  value="30"
                />
              </div>
            </div>

            <div className="mt-4 h-[6px] bg-[#E9E9E9] rounded-full relative">
              <div className="absolute top-0 left-0 right-0 h-full rounded-full">
                <div className="absolute left-[0%] w-[40%] h-full bg-[#EC1C24] rounded-full"></div>
                <div className="absolute left-0 w-[16px] h-[16px] bg-[#EC1C24] rounded-full -mt-[5px] border-2 border-white"></div>
                <div className="absolute left-[40%] w-[16px] h-[16px] bg-[#EC1C24] rounded-full -mt-[5px] border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Фильтр по полярности */}
          <div className="mt-[30px] bg-white rounded-xl p-5">
            <div className="flex justify-between items-center">
              <span className="text-[18px] font-bold text-[#000814]">
                Полярность
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#000814"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  id="reverse"
                  className="w-4 h-4 border border-[#D0D0D0] rounded"
                />
                <label htmlFor="reverse" className="text-[#181D23]">
                  Обратная
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  id="direct"
                  className="w-4 h-4 border border-[#D0D0D0] rounded"
                />
                <label htmlFor="direct" className="text-[#181D23]">
                  Прямая
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  id="universal"
                  className="w-4 h-4 border border-[#D0D0D0] rounded"
                />
                <label htmlFor="universal" className="text-[#181D23]">
                  Универсальная
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Правая панель с результатами */}
        <div className="flex-1 flex flex-col gap-[20px] md:gap-[30px]">
          {/* Карточки лучших предложений */}
          <div className="flex flex-col gap-[20px] md:gap-[30px]">
            <div className="flex flex-col md:flex-row gap-[30px] w-full">
              {/* Самая низкая цена */}
              <div className="flex flex-col w-full md:w-1/3">
                <div className="bg-[#F5F8FB] py-2 px-5 rounded-t-xl">
                  <h3 className="text-black font-semibold text-lg">
                    Самая низкая цена
                  </h3>
                </div>
                <div className="bg-white p-5 rounded-b-xl shadow-sm">
                  <div className="border-b border-[#CBD5E3] pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-amber-50 px-2 py-0.5 rounded">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99992 1.33334L10.0599 5.50668L14.6666 6.18001L11.3333 9.42668L12.1199 14.0133L7.99992 11.8467L3.87992 14.0133L4.66659 9.42668L1.33325 6.18001L5.93992 5.50668L7.99992 1.33334Z"
                            fill="#F8BD00"
                            stroke="#F8BD00"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-black font-medium">4.8</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-black font-bold text-sm">
                          INA 530059210
                        </h4>
                        <p className="text-[#8893A1] text-sm">
                          Комплект роликов
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <span className="text-black font-bold text-lg">
                        3 796 ₽
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#8893A1] text-xs">Срок</span>
                      <span className="text-black font-bold text-sm">
                        41 день
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#8893A1] text-xs">Наличие</span>
                      <span className="text-black font-bold text-sm">
                        100 шт.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <button
                          className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded"
                          onClick={() => decreaseQuantity('1')}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33333 8H12.6667"
                              stroke="#000814"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          className="w-6 h-6 border border-[#D0D0D0] mx-1 rounded text-center text-[#747474] text-xs"
                          value={quantity['1'] || 1}
                          readOnly
                        />
                        <button
                          className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded"
                          onClick={() => increaseQuantity('1')}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3.33334V12.6667M3.33333 8H12.6667"
                              stroke="#000814"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <button className="bg-[#EC1C24] text-white px-3 py-1 rounded-xl hover:bg-[#C00D0D] transition-colors text-sm">
                        Купить
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Самый дешевый аналог */}
              <div className="flex flex-col w-full md:w-1/3">
                <div className="bg-[#F5F8FB] py-2 px-5 rounded-t-xl">
                  <h3 className="text-black font-semibold text-lg">
                    Самый дешевый аналог
                  </h3>
                </div>
                <div className="bg-white p-5 rounded-b-xl shadow-sm">
                  <div className="border-b border-[#CBD5E3] pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-amber-50 px-2 py-0.5 rounded">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99992 1.33334L10.0599 5.50668L14.6666 6.18001L11.3333 9.42668L12.1199 14.0133L7.99992 11.8467L3.87992 14.0133L4.66659 9.42668L1.33325 6.18001L5.93992 5.50668L7.99992 1.33334Z"
                            fill="#F8BD00"
                            stroke="#F8BD00"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-black font-medium">4.5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-black font-bold text-sm">
                          Ganz GIE37312
                        </h4>
                        <p className="text-[#8893A1] text-sm">
                          Ролик ремня ГРМ VW AD GANZ GIE37312
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <span className="text-black font-bold text-lg">
                        996 ₽
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#8893A1] text-xs">Срок</span>
                      <span className="text-black font-bold text-sm">
                        6 дней
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#8893A1] text-xs">Наличие</span>
                      <span className="text-black font-bold text-sm">
                        11 шт.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <button
                          className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded"
                          onClick={() => decreaseQuantity('2')}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33333 8H12.6667"
                              stroke="#000814"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          className="w-6 h-6 border border-[#D0D0D0] mx-1 rounded text-center text-[#747474] text-xs"
                          value={quantity['2'] || 1}
                          readOnly
                        />
                        <button
                          className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded"
                          onClick={() => increaseQuantity('2')}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3.33334V12.6667M3.33333 8H12.6667"
                              stroke="#000814"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <button className="bg-[#EC1C24] text-white px-3 py-1 rounded-xl hover:bg-[#C00D0D] transition-colors text-sm">
                        Купить
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Лучший срок поставки */}
              <div className="flex flex-col w-full md:w-1/3">
                <div className="bg-[#F5F8FB] py-2 px-5 rounded-t-xl">
                  <h3 className="text-black font-semibold text-lg">
                    Лучший срок поставки
                  </h3>
                </div>
                <div className="bg-white p-5 rounded-b-xl shadow-sm">
                  <div className="border-b border-[#CBD5E3] pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-amber-50 px-2 py-0.5 rounded">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99992 1.33334L10.0599 5.50668L14.6666 6.18001L11.3333 9.42668L12.1199 14.0133L7.99992 11.8467L3.87992 14.0133L4.66659 9.42668L1.33325 6.18001L5.93992 5.50668L7.99992 1.33334Z"
                            fill="#F8BD00"
                            stroke="#F8BD00"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-black font-medium">5.0</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-black font-bold text-sm">
                          INA 530059210
                        </h4>
                        <p className="text-[#8893A1] text-sm">
                          Комплект роликов
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <span className="text-black font-bold text-lg">
                        3 796 ₽
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#8893A1] text-xs">Срок</span>
                      <span className="text-black font-bold text-sm">
                        41 день
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#8893A1] text-xs">Наличие</span>
                      <span className="text-black font-bold text-sm">
                        100 шт.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <button
                          className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded"
                          onClick={() => decreaseQuantity('3')}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33333 8H12.6667"
                              stroke="#000814"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          className="w-6 h-6 border border-[#D0D0D0] mx-1 rounded text-center text-[#747474] text-xs"
                          value={quantity['3'] || 1}
                          readOnly
                        />
                        <button
                          className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded"
                          onClick={() => increaseQuantity('3')}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3.33334V12.6667M3.33333 8H12.6667"
                              stroke="#000814"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <button className="bg-[#EC1C24] text-white px-3 py-1 rounded-xl hover:bg-[#C00D0D] transition-colors text-sm">
                        Купить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Секция аналоги от других производителей */}
          <div className="bg-white p-5 mt-8 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#EC1C24] flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-lg font-bold">
                  STELLOX <span className="text-[#4DB45E]">1023245SX</span>
                </h2>
              </div>
              <div>
                <Image
                  src="/icons/search/product-placeholder.jpg"
                  alt="STELLOX комплект ГРМ"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-[#8893A1] mb-4">Комплект ГРМ</p>

            {/* Таблица с данными */}
            <div className="bg-[#F5F8FB] py-2 px-4 rounded-lg grid grid-cols-4 mb-2">
              <div className="text-[#8893A1] text-sm">Рейтинг</div>
              <div className="text-[#8893A1] text-sm">Наличие</div>
              <div className="text-[#8893A1] text-sm">Доставка</div>
              <div className="text-[#8893A1] text-sm text-right">Цена</div>
            </div>

            {/* Первая строка - с рекомендацией */}
            <div className="bg-[#E2F8E6] py-3 px-4 rounded-lg grid grid-cols-4 mb-2 items-center">
              <div className="flex items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.99992 1.33334L10.0599 5.50668L14.6666 6.18001L11.3333 9.42668L12.1199 14.0133L7.99992 11.8467L3.87992 14.0133L4.66659 9.42668L1.33325 6.18001L5.93992 5.50668L7.99992 1.33334Z"
                    fill="#F8BD00"
                    stroke="#F8BD00"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>5.0</span>
              </div>
              <div>44 444 шт</div>
              <div>5 дней</div>
              <div className="flex items-center justify-end gap-3">
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6668 7.38668C14.1535 7.38668 13.7468 7.79335 13.7468 8.30668V10.64C13.7468 11.6667 12.9068 12.5067 11.8802 12.5067H4.12016C3.09349 12.5067 2.2535 11.6667 2.2535 10.64V8.30668C2.2535 7.79335 1.84683 7.38668 1.3335 7.38668C0.820163 7.38668 0.413496 7.79335 0.413496 8.30668V10.64C0.413496 12.6733 2.08683 14.3467 4.12016 14.3467H11.8802C13.9135 14.3467 15.5868 12.6733 15.5868 10.64V8.30668C15.5868 7.79335 15.1802 7.38668 14.6668 7.38668Z"
                      fill="#4DB45E"
                    />
                    <path
                      d="M7.5335 10.8534C7.68017 10.9334 7.84017 10.9734 8.00017 10.9734C8.16017 10.9734 8.32017 10.9334 8.46683 10.8534L11.2268 9.47341C11.6535 9.26008 11.8268 8.74674 11.6135 8.32008C11.4002 7.89341 10.8868 7.72008 10.4602 7.93341L8.92017 8.71341V2.00008C8.92017 1.48674 8.5135 1.08008 8.00017 1.08008C7.48683 1.08008 7.08017 1.48674 7.08017 2.00008V8.71341L5.54017 7.93341C5.1135 7.72008 4.60017 7.89341 4.38683 8.32008C4.1735 8.74674 4.34683 9.26008 4.7735 9.47341L7.5335 10.8534Z"
                      fill="#4DB45E"
                    />
                  </svg>
                  <span className="text-[#4DB45E] font-medium">
                    Рекомендуем
                  </span>
                </div>
                <div className="font-bold">от 17 323 ₽</div>
                <div className="flex items-center gap-1">
                  <button className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33333 8H12.6667"
                        stroke="#000814"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    className="w-6 h-6 border border-[#D0D0D0] rounded text-center text-[#747474] text-xs"
                    value="1"
                    readOnly
                  />
                  <button className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 3.33334V12.6667M3.33333 8H12.6667"
                        stroke="#000814"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="ml-1 text-[#EC1C24]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.66699 2.66669H13.3337M6.66699 6.66669V11.3334M9.33366 6.66669V11.3334M3.33366 2.66669L4.00033 12.6667C4.00033 13.0203 4.14062 13.3595 4.39067 13.6095C4.64072 13.8596 4.97991 14 5.33366 14H10.667C11.0208 14 11.3599 13.8596 11.61 13.6095C11.86 13.3595 12.0003 13.0203 12.0003 12.6667L12.667 2.66669"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.33301 2.66667V2C5.33301 1.82319 5.40325 1.65362 5.5283 1.52859C5.65334 1.40357 5.82291 1.33333 5.99967 1.33333H9.99967C10.1764 1.33333 10.346 1.40357 10.471 1.52859C10.5961 1.65362 10.6663 1.82319 10.6663 2V2.66667"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Остальные строки */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={`stellox-${i}`}
                className="py-3 px-4 rounded-lg grid grid-cols-4 mb-2 items-center"
              >
                <div className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99992 1.33334L10.0599 5.50668L14.6666 6.18001L11.3333 9.42668L12.1199 14.0133L7.99992 11.8467L3.87992 14.0133L4.66659 9.42668L1.33325 6.18001L5.93992 5.50668L7.99992 1.33334Z"
                      fill="#F8BD00"
                      stroke="#F8BD00"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>5.0</span>
                </div>
                <div>44 444 шт</div>
                <div>5 дней</div>
                <div className="flex items-center justify-end gap-3">
                  <div className="font-bold">от 17 323 ₽</div>
                  <div className="flex items-center gap-1">
                    <button className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.33333 8H12.6667"
                          stroke="#000814"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="w-6 h-6 border border-[#D0D0D0] rounded text-center text-[#747474] text-xs"
                      value="1"
                      readOnly
                    />
                    <button className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 3.33334V12.6667M3.33333 8H12.6667"
                          stroke="#000814"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className="ml-1 text-[#EC1C24]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.66699 2.66669H13.3337M6.66699 6.66669V11.3334M9.33366 6.66669V11.3334M3.33366 2.66669L4.00033 12.6667C4.00033 13.0203 4.14062 13.3595 4.39067 13.6095C4.64072 13.8596 4.97991 14 5.33366 14H10.667C11.0208 14 11.3599 13.8596 11.61 13.6095C11.86 13.3595 12.0003 13.0203 12.0003 12.6667L12.667 2.66669"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.33301 2.66667V2C5.33301 1.82319 5.40325 1.65362 5.5283 1.52859C5.65334 1.40357 5.82291 1.33333 5.99967 1.33333H9.99967C10.1764 1.33333 10.346 1.40357 10.471 1.52859C10.5961 1.65362 10.6663 1.82319 10.6663 2V2.66667"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center mt-4 text-[#0D336C] font-medium flex items-center justify-center gap-2">
              <span>Ещё предложения от 4726 руб и 5 дней</span>
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L8 8L15 1"
                  stroke="#0D336C"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Заголовок аналоги */}
          <h2 className="text-[24px] md:text-[30px] font-semibold text-center text-[#000814] my-8">
            Аналоги от других производителей
          </h2>

          {/* Карточки аналогов от других производителей */}
          {[
            'AIX AIX10127',
            'ABSEL WG052006K',
            'Ganz GIE34006',
            'Gates K015680XS',
          ].map((brand, index) => (
            <div
              key={`analogue-${index}`}
              className="bg-white p-5 rounded-xl mb-5"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EC1C24] flex items-center justify-center text-white font-bold">
                    {index + 2}
                  </div>
                  <h2 className="text-lg font-bold">
                    {brand.split(' ')[0]}{' '}
                    <span className="text-[#4DB45E]">
                      {brand.split(' ')[1]}
                    </span>
                  </h2>
                </div>
                <div>
                  <Image
                    src="/icons/search/product-placeholder.jpg"
                    alt="Product"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-[#8893A1] mb-4">
                {index === 0 &&
                  'Кольцо уплотнительное клапанной крышки Chevrolet'}
                {index === 1 && 'Комплект ремня ГРМ'}
                {index === 2 &&
                  'РЕМКОМПЛЕКТ ГРМ VAG+SKODA 2012- MOT.1,2TSI/1,4TSI'}
                {index === 3 &&
                  'Ремень ГРМ [163 зуб.,20mm] + 2 ролика + крепеж 788'}
              </p>

              {/* Таблица с данными */}
              <div className="bg-[#F5F8FB] py-2 px-4 rounded-lg grid grid-cols-4 mb-2">
                <div className="text-[#8893A1] text-sm">Рейтинг</div>
                <div className="text-[#8893A1] text-sm">Наличие</div>
                <div className="text-[#8893A1] text-sm">Доставка</div>
                <div className="text-[#8893A1] text-sm text-right">Цена</div>
              </div>

              {/* Строки товаров */}
              {[1, 2, 3].map((item) => (
                <div
                  key={`analogue-${index}-item-${item}`}
                  className="py-3 px-4 rounded-lg grid grid-cols-4 mb-2 items-center"
                >
                  <div className="flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99992 1.33334L10.0599 5.50668L14.6666 6.18001L11.3333 9.42668L12.1199 14.0133L7.99992 11.8467L3.87992 14.0133L4.66659 9.42668L1.33325 6.18001L5.93992 5.50668L7.99992 1.33334Z"
                        fill="#F8BD00"
                        stroke="#F8BD00"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>5.0</span>
                  </div>
                  <div>44 444 шт</div>
                  <div>5 дней</div>
                  <div className="flex items-center justify-end gap-3">
                    <div className="font-bold">от 17 323 ₽</div>
                    <div className="flex items-center gap-1">
                      <button className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.33333 8H12.6667"
                            stroke="#000814"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="w-6 h-6 border border-[#D0D0D0] rounded text-center text-[#747474] text-xs"
                        value="1"
                        readOnly
                      />
                      <button className="bg-[#E6EDF6] w-6 h-6 flex items-center justify-center rounded">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 3.33334V12.6667M3.33333 8H12.6667"
                            stroke="#000814"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button className="ml-1 text-[#EC1C24]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.66699 2.66669H13.3337M6.66699 6.66669V11.3334M9.33366 6.66669V11.3334M3.33366 2.66669L4.00033 12.6667C4.00033 13.0203 4.14062 13.3595 4.39067 13.6095C4.64072 13.8596 4.97991 14 5.33366 14H10.667C11.0208 14 11.3599 13.8596 11.61 13.6095C11.86 13.3595 12.0003 13.0203 12.0003 12.6667L12.667 2.66669"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.33301 2.66667V2C5.33301 1.82319 5.40325 1.65362 5.5283 1.52859C5.65334 1.40357 5.82291 1.33333 5.99967 1.33333H9.99967C10.1764 1.33333 10.346 1.40357 10.471 1.52859C10.5961 1.65362 10.6663 1.82319 10.6663 2V2.66667"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center mt-4 text-[#0D336C] font-medium flex items-center justify-center gap-2">
                <span>Ещё предложения от 4726 руб и 5 дней</span>
                <svg
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L8 8L15 1"
                    stroke="#0D336C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
