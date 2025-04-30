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
  {
    id: '1',
    brand: 'STELLOX',
    sku: '1023245SX',
    name: 'Комплект ГРМ',
    price: 17323,
    rating: 5.0,
    stock: 44444,
    deliveryDays: 5,
    isRecommended: true,
  },
  {
    id: '2',
    brand: 'INA',
    sku: '530059210',
    name: 'Комплект роликов',
    price: 3796,
    rating: 4.8,
    stock: 100,
    deliveryDays: 41,
  },
  {
    id: '3',
    brand: 'Ganz',
    sku: 'GIE37312',
    name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
    price: 996,
    rating: 4.5,
    stock: 11,
    deliveryDays: 6,
  },
  {
    id: '4',
    brand: 'AIX',
    sku: 'AIX10127',
    name: 'Кольцо уплотнительное клапанной крышки Chevrolet',
    price: 4726,
    rating: 5.0,
    stock: 44444,
    deliveryDays: 5,
  },
  {
    id: '5',
    brand: 'ABSEL',
    sku: 'WG052006K',
    name: 'Комплект ремня ГРМ',
    price: 8700,
    rating: 5.0,
    stock: 44444,
    deliveryDays: 5,
  },
  {
    id: '6',
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

  // Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'delivery':
        return a.deliveryDays - b.deliveryDays;
      default:
        return 0;
    }
  });

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
    <div className="py-8">
      {/* Шапка результатов поиска */}
      <div className="px-[30px] md:px-[130px] py-[20px] md:py-[30px] flex flex-col gap-[14px]">
        <h1 className="text-[16px] md:text-[18px] font-semibold text-[#181D23]">
          {query}
        </h1>

        <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#000814]">
              Комплект ГРМ
            </h2>
            <p className="text-[#8E9AAC]">
              Найдено {filteredProducts.length} предложения STELLOX от{' '}
              {sortedProducts[0]?.price.toLocaleString()}₽
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

          {/* Сортировка - только для десктопа */}
          <div className="hidden md:flex md:flex-col bg-white rounded-xl p-5 gap-3 mt-[30px]">
            <span className="text-[18px] font-bold text-[#000814]">
              Сортировка
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  id="sort-price-asc"
                  name="sort"
                  checked={sortBy === 'price_asc'}
                  onChange={() => setSortBy('price_asc')}
                  className="w-4 h-4"
                />
                <label htmlFor="sort-price-asc" className="text-[#181D23]">
                  Сначала дешевле
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  id="sort-price-desc"
                  name="sort"
                  checked={sortBy === 'price_desc'}
                  onChange={() => setSortBy('price_desc')}
                  className="w-4 h-4"
                />
                <label htmlFor="sort-price-desc" className="text-[#181D23]">
                  Сначала дороже
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  id="sort-rating"
                  name="sort"
                  checked={sortBy === 'rating'}
                  onChange={() => setSortBy('rating')}
                  className="w-4 h-4"
                />
                <label htmlFor="sort-rating" className="text-[#181D23]">
                  По рейтингу
                </label>
              </div>
              <div className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  id="sort-delivery"
                  name="sort"
                  checked={sortBy === 'delivery'}
                  onChange={() => setSortBy('delivery')}
                  className="w-4 h-4"
                />
                <label htmlFor="sort-delivery" className="text-[#181D23]">
                  По сроку доставки
                </label>
              </div>
            </div>
          </div>

          {/* Фильтры */}
          <div className="border-t border-b border-[#E9E9E9] py-[10px] flex flex-col gap-[10px] mt-[30px]">
            <div className="bg-white rounded-xl p-5 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[18px] font-bold text-[#000814]">
                  Бренд
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

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-[10px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#D0D0D0] rounded"
                  />
                  <span className="text-[#181D23]">Bosch</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#D0D0D0] rounded"
                  />
                  <span className="text-[#181D23]">Varta</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#D0D0D0] rounded"
                  />
                  <span className="text-[#181D23]">Mutlu</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#D0D0D0] rounded"
                  />
                  <span className="text-[#181D23]">Exide</span>
                </div>
              </div>

              <div className="flex items-center gap-[6px] text-[#EC1C24] text-[16px] font-semibold">
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

            {/* Дополнительные фильтры (можно добавить по аналогии) */}
          </div>

          {/* Мобильные кнопки фильтров */}
          {isMobileFiltersOpen && (
            <div className="flex gap-3 mt-5">
              <button
                className="flex-1 bg-white border border-[#0D336C] text-[#0D336C] py-3 rounded-xl font-semibold"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                Отмена
              </button>
              <button
                className="flex-1 bg-[#EC1C24] text-white py-3 rounded-xl font-semibold"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                Применить
              </button>
            </div>
          )}
        </div>

        {/* Правая панель с результатами */}
        <div className="flex-1 flex flex-col gap-[20px] md:gap-[30px]">
          {/* Топ предложения */}
          <div className="flex flex-col gap-[20px] md:gap-[30px]">
            {sortedProducts.slice(0, 3).map((product, index) => (
              <div key={product.id} className="flex flex-col gap-[5px]">
                <div className="pb-[10px] px-[10px] md:px-[20px]">
                  <span className="text-[16px] md:text-[18px] font-semibold text-[#000814]">
                    {index === 0 && 'Самая низкая цена'}
                    {index === 1 && 'Самый дешевый аналог'}
                    {index === 2 && 'Лучший срок поставки'}
                  </span>
                </div>

                <div className="bg-white rounded-xl p-3 md:p-5 flex flex-col gap-[5px]">
                  <div className="flex justify-between border-b border-[#CBD5E3] pb-[15px]">
                    <div className="flex gap-[10px] md:gap-[15px]">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/icons/search/star-filled.svg"
                          alt="Рейтинг"
                          width={16}
                          height={16}
                        />
                        <span className="text-[#000814]">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-[5px]">
                        <span className="text-[14px] font-bold text-[#000814]">
                          {product.brand} {product.sku}
                        </span>
                        <span className="text-[14px] text-[#8893A1]">
                          {product.name}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[14px] font-bold text-[#000814]">
                        {product.price.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-[10px] gap-3 md:gap-0">
                    <div className="flex gap-[20px]">
                      <div className="flex flex-col gap-[5px]">
                        <span className="text-[12px] text-[#8893A1]">Срок</span>
                        <span className="text-[14px] font-bold text-[#000814]">
                          {product.deliveryDays}{' '}
                          {getWordEnding(product.deliveryDays, [
                            'день',
                            'дня',
                            'дней',
                          ])}
                        </span>
                      </div>

                      <div className="flex flex-col gap-[5px]">
                        <span className="text-[12px] text-[#8893A1]">
                          Наличие
                        </span>
                        <span className="text-[14px] font-bold text-[#000814]">
                          {product.stock} шт.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-[20px]">
                      <div className="flex items-center gap-[12px]">
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          className="w-[20px] h-[20px] flex items-center justify-center bg-[#E6EDF6] rounded"
                        >
                          <span className="text-[#000814]">-</span>
                        </button>

                        <div className="h-[32px] min-w-[40px] px-[10px] border border-[#D0D0D0] rounded flex items-center justify-center">
                          <span className="text-[#747474]">
                            {quantity[product.id]}
                          </span>
                        </div>

                        <button
                          onClick={() => increaseQuantity(product.id)}
                          className="w-[20px] h-[20px] flex items-center justify-center bg-[#E6EDF6] rounded"
                        >
                          <span className="text-[#000814]">+</span>
                        </button>
                      </div>

                      <button className="bg-[#EC1C24] text-white px-[20px] py-[12px] rounded-xl font-semibold">
                        Купить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Список товаров (аналоги) */}
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[24px] md:text-[30px] font-semibold text-center text-[#000814]">
              Аналоги от других производителей
            </h2>

            {sortedProducts.slice(3).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 md:p-8 flex flex-col md:flex-row gap-[20px] md:gap-[30px]"
              >
                <div className="md:w-[250px] flex gap-[15px] items-start">
                  <div className="w-[40px] h-[40px] relative">
                    <Image
                      src="/icons/search/product-icon.svg"
                      alt="Запчасть"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex gap-[5px] items-center">
                      <span className="text-[16px] md:text-[18px] font-bold text-[#4DB45E]">
                        {product.brand}
                      </span>
                      <span className="text-[16px] md:text-[18px] font-bold text-[#000814]">
                        {product.sku}
                      </span>
                    </div>
                    <span className="text-[14px] text-[#8893A1]">
                      {product.name}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-[16px]">
                  <div className="hidden md:flex justify-between items-center py-[10px] px-[28px]">
                    <div className="flex gap-[40px] items-center">
                      <span className="text-[#8893A1]">Рейтинг</span>
                      <span className="text-[#8893A1]">Наличие</span>
                      <span className="text-[#8893A1]">Доставка</span>
                    </div>
                    <span className="text-[#8893A1]">Цена</span>
                  </div>

                  <div className="bg-white rounded-xl">
                    <div
                      className={`px-[15px] md:px-[20px] py-[6px] rounded-lg ${
                        product.isRecommended ? 'bg-[#E2F8E6]' : ''
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
                        <div className="grid grid-cols-3 md:flex md:gap-[40px] items-center">
                          <div className="flex items-center gap-2">
                            <Image
                              src={
                                product.rating >= 4.5
                                  ? '/icons/search/star-filled.svg'
                                  : '/icons/search/star-gray.svg'
                              }
                              alt="Рейтинг"
                              width={16}
                              height={16}
                            />
                            <span className="text-[#000814]">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-[#000814]">
                            {product.stock} шт
                          </span>
                          <span className="text-[#000814]">
                            {product.deliveryDays}{' '}
                            {getWordEnding(product.deliveryDays, [
                              'день',
                              'дня',
                              'дней',
                            ])}
                          </span>
                        </div>

                        {product.isRecommended && (
                          <div className="flex items-center gap-[14px] px-[10px] md:px-[20px]">
                            <Image
                              src="/icons/search/check-circle.svg"
                              alt="Рекомендуем"
                              width={16}
                              height={16}
                            />
                            <span className="text-[14px] text-[#000814] font-medium">
                              Рекомендуем
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between md:justify-start md:gap-[16px]">
                          <span className="text-[16px] text-[#000814] font-semibold">
                            от {product.price.toLocaleString()} ₽
                          </span>

                          <div className="flex items-center gap-[12px]">
                            <button
                              onClick={() => decreaseQuantity(product.id)}
                              className="w-[20px] h-[20px] flex items-center justify-center bg-[#E6EDF6] rounded"
                            >
                              <span className="text-[#000814]">-</span>
                            </button>

                            <div className="h-[32px] min-w-[40px] px-[10px] border border-[#D0D0D0] rounded flex items-center justify-center">
                              <span className="text-[#747474]">
                                {quantity[product.id]}
                              </span>
                            </div>

                            <button
                              onClick={() => increaseQuantity(product.id)}
                              className="w-[20px] h-[20px] flex items-center justify-center bg-[#E6EDF6] rounded"
                            >
                              <span className="text-[#000814]">+</span>
                            </button>
                          </div>

                          <button className="w-[32px] h-[32px] border border-[#EC1C24] rounded-lg flex items-center justify-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.33301 4.16669H16.6663M8.33301 8.33335V14.1667M11.6663 8.33335V14.1667M3.99967 4.16669L4.99967 15.8334C4.99967 16.2754 5.17526 16.6994 5.48782 17.0119C5.80038 17.3245 6.22431 17.5 6.66634 17.5H13.333C13.775 17.5 14.199 17.3245 14.5115 17.0119C14.8241 16.6994 14.9997 16.2754 14.9997 15.8334L15.9997 4.16669"
                                stroke="#EC1C24"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.66699 4.16667V2.5C6.66699 2.27899 6.75479 2.06702 6.91107 1.91074C7.06735 1.75446 7.27932 1.66667 7.50033 1.66667H12.5003C12.7213 1.66667 12.9333 1.75446 13.0896 1.91074C13.2459 2.06702 13.3337 2.27899 13.3337 2.5V4.16667"
                                stroke="#EC1C24"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Дополнительные предложения (если нужно) */}
                    <div className="flex items-center gap-[8px] justify-center p-[10px]">
                      <span className="text-[14px] text-[#0D336C] font-medium">
                        Ещё предложения от{' '}
                        {(product.price * 0.9).toLocaleString()} руб и{' '}
                        {product.deliveryDays - 2 > 0
                          ? product.deliveryDays - 2
                          : 1}{' '}
                        дней
                      </span>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательная функция для правильного окончания слов
function getWordEnding(
  num: number,
  wordForms: [string, string, string]
): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const index =
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)];
  return wordForms[index];
}
