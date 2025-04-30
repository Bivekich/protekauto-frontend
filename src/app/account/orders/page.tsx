'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '@/components/Profile/Orders/OrderCard';
import Image from 'next/image';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'current' | 'completed' | 'canceled'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDocsMap, setShowDocsMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Имитация загрузки данных с API
    const fetchOrders = async () => {
      setLoading(true);

      // Временные данные для демонстрации
      const mockOrders: Order[] = [
        {
          id: '1',
          number: 'Заказ от 2 августа 2024',
          date: '2024-08-02',
          status: 'processing',
          total: 39389,
          items: [
            {
              id: '101',
              name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
              quantity: 1,
              price: 18763,
              article: 'GIE37312',
              manufacturer: 'Ganz',
              itemStatus: 'Ожидает поставки в ПВЗ',
            },
            {
              id: '102',
              name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
              quantity: 1,
              price: 18763,
              article: 'GIE37312',
              manufacturer: 'Ganz',
              itemStatus: 'Ожидает поставки в ПВЗ',
            },
            {
              id: '103',
              name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
              quantity: 1,
              price: 18763,
              article: 'GIE37312',
              manufacturer: 'Ganz',
              itemStatus: 'Ожидает поставки в ПВЗ',
              hasComments: true,
            },
          ],
          address:
            'Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1',
          customer: 'ООО ПРОТЕК',
        },
        {
          id: '2',
          number: 'Заказ от 2 августа 2024',
          date: '2024-08-02',
          status: 'delivered',
          total: 39389,
          items: [
            {
              id: '201',
              name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
              quantity: 1,
              price: 18763,
              article: 'GIE37312',
              manufacturer: 'Ganz',
              itemStatus: 'Ожидает поставки в ПВЗ',
            },
          ],
          address:
            'Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1',
          customer: 'ООО ПРОТЕК',
        },
        {
          id: '3',
          number: 'Заказ от 2 августа 2024',
          date: '2024-08-02',
          status: 'canceled',
          total: 39389,
          items: [
            {
              id: '301',
              name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
              quantity: 1,
              price: 18763,
              article: 'GIE37312',
              manufacturer: 'Ganz',
              itemStatus: 'Отказ в поставке',
            },
            {
              id: '302',
              name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
              quantity: 1,
              price: 18763,
              article: 'GIE37312',
              manufacturer: 'Ganz',
              itemStatus: 'Отказ в поставке',
            },
            {
              id: '303',
              name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
              quantity: 1,
              price: 18763,
              article: 'GIE37312',
              manufacturer: 'Ganz',
              itemStatus: 'Отказ в поставке',
            },
          ],
          address:
            'Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1',
          customer: 'ООО ПРОТЕК',
        },
      ];

      setTimeout(() => {
        setOrders(mockOrders);

        // Инициализируем состояние для переключателей
        const docsMapInit: Record<string, boolean> = {};
        mockOrders.forEach((order) => {
          docsMapInit[order.id] = false;
        });
        setShowDocsMap(docsMapInit);

        setLoading(false);
      }, 500);
    };

    fetchOrders();
  }, []);

  // Переключение отображения документов
  const toggleShowDocs = (orderId: string) => {
    setShowDocsMap((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Фильтрация заказов по статусу
  const getFilteredOrders = () => {
    let filteredOrders = orders;

    if (activeFilter === 'current') {
      filteredOrders = orders.filter(
        (order) =>
          order.status === 'processing' ||
          order.status === 'shipped' ||
          order.status === 'pending'
      );
    } else if (activeFilter === 'completed') {
      filteredOrders = orders.filter((order) => order.status === 'delivered');
    } else if (activeFilter === 'canceled') {
      filteredOrders = orders.filter((order) => order.status === 'canceled');
    }

    // Поиск
    if (searchQuery.trim()) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return filteredOrders;
  };

  const filteredOrders = getFilteredOrders();

  // Получение классов для статуса заказа
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'processing':
        return {
          bg: 'bg-[#1668E3]',
          text: 'text-white',
        };
      case 'delivered':
        return {
          bg: 'bg-[#4DB45E]',
          text: 'text-white',
        };
      case 'canceled':
        return {
          bg: 'bg-[#FFC400]',
          text: 'text-[#000000]',
        };
      default:
        return {
          bg: 'bg-[#1668E3]',
          text: 'text-white',
        };
    }
  };

  // Получение текста статуса заказа
  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Выполняется';
      case 'delivered':
        return 'Доставлен';
      case 'canceled':
        return 'Отменен';
      default:
        return 'Выполняется';
    }
  };

  return (
    <main className="flex flex-col w-full">
      <div className="w-full">
        {/* Табы фильтров */}
        <div className="flex justify-between items-center mb-5 w-full">
          <div className="flex gap-5 flex-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-[22px] py-[14px] rounded-xl font-medium text-lg ${
                activeFilter === 'all'
                  ? 'bg-[#EC1C24] text-white'
                  : 'bg-[#E6EDF6] text-[#000814]'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setActiveFilter('current')}
              className={`px-[22px] py-[14px] rounded-xl font-medium text-lg ${
                activeFilter === 'current'
                  ? 'bg-[#EC1C24] text-white'
                  : 'bg-[#E6EDF6] text-[#000814]'
              }`}
            >
              Текущие
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-[22px] py-[14px] rounded-xl font-medium text-lg ${
                activeFilter === 'completed'
                  ? 'bg-[#EC1C24] text-white'
                  : 'bg-[#E6EDF6] text-[#000814]'
              }`}
            >
              Выполненные
            </button>
            <button
              onClick={() => setActiveFilter('canceled')}
              className={`px-[22px] py-[14px] rounded-xl font-medium text-lg ${
                activeFilter === 'canceled'
                  ? 'bg-[#EC1C24] text-white'
                  : 'bg-[#E6EDF6] text-[#000814]'
              }`}
            >
              Отмененные
            </button>
          </div>

          {/* Поиск */}
          <div className="relative w-[350px]">
            <input
              type="text"
              placeholder="Поиск уведомлений"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[46px] bg-white border border-[#D0D0D0] rounded-lg pl-4 pr-10 text-[#8893A1]"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#8893A1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Содержимое страницы */}
        <div className="bg-white rounded-2xl p-[30px] mb-5">
          <h2 className="text-[30px] font-bold text-[#000814] mb-5">
            {activeFilter === 'all'
              ? 'Все'
              : activeFilter === 'current'
              ? 'Текущие'
              : activeFilter === 'completed'
              ? 'Выполненные'
              : 'Отмененные'}
          </h2>

          {/* Фильтры */}
          <div className="flex justify-between mb-5 w-full">
            <div className="flex w-full gap-5">
              <div className="flex flex-col gap-[6px] w-1/2">
                <span className="text-sm text-[#000814]">Период</span>
                <div className="w-full h-[50px] border border-[#D0D0D0] rounded flex justify-between items-center px-6">
                  <span className="text-[#747474]">Все</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#747474"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-[6px] w-1/2">
                <span className="text-sm text-[#000814]">Способ получения</span>
                <div className="w-full h-[50px] border border-[#D0D0D0] rounded flex justify-between items-center px-6">
                  <span className="text-[#747474]">Все</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#747474"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="py-10 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-red-600"></div>
              <p className="mt-2 text-gray-500">Загрузка заказов...</p>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="space-y-5">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-[#F0F0F0] p-[20px] mb-5"
                >
                  {/* Заголовок заказа */}
                  <div className="flex justify-between items-center px-[28px] pb-[14px]">
                    <div className="flex items-center gap-5">
                      <div
                        className={`${getStatusStyles(order.status).bg} ${
                          getStatusStyles(order.status).text
                        } rounded-xl py-[14px] px-[22px] font-medium`}
                      >
                        {getStatusText(order.status)}
                      </div>
                      <h3 className="text-[20px] font-semibold text-[#000814]">
                        {order.number}
                      </h3>
                    </div>

                    {/* Переключатель показа документов */}
                    <div className="flex items-center">
                      <span
                        className={`text-sm mr-3 ${
                          showDocsMap[order.id]
                            ? 'text-[#EC1C24]'
                            : 'text-[#747474]'
                        }`}
                      >
                        Показать документы
                      </span>
                      <button
                        onClick={() => toggleShowDocs(order.id)}
                        className="relative inline-flex items-center h-[18px] w-[34px] rounded-full transition-colors"
                        style={{
                          backgroundColor: showDocsMap[order.id]
                            ? '#4DB45E'
                            : '#D9D9D9',
                        }}
                      >
                        <span
                          className="absolute w-[14px] h-[14px] bg-white rounded-full transition-all duration-200"
                          style={{
                            left: showDocsMap[order.id] ? '18px' : '2px',
                            top: '2px',
                          }}
                        ></span>
                      </button>
                    </div>
                  </div>

                  {/* Таблица товаров */}
                  <div className="mt-5">
                    {/* Заголовки таблицы */}
                    <div className="grid grid-cols-[36px_130px_120px_1fr_140px_60px_90px_50px] border-b border-[#D0D0D0] pb-[10px] px-2">
                      <div className="text-[#8893A1] text-sm">№</div>
                      <div className="text-[#8893A1] text-sm flex items-center">
                        Производитель
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1"
                        >
                          <path d="M6 2.5L9 6H3L6 2.5Z" fill="#8893A1" />
                        </svg>
                      </div>
                      <div className="text-[#8893A1] text-sm">Артикул</div>
                      <div className="text-[#8893A1] text-sm flex items-center">
                        Наименование
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1"
                        >
                          <path d="M6 2.5L9 6H3L6 2.5Z" fill="#8893A1" />
                        </svg>
                      </div>
                      <div className="text-[#8893A1] text-sm">Статус</div>
                      <div className="text-[#8893A1] text-sm">Кол-во</div>
                      <div className="text-[#8893A1] text-sm text-right">
                        Стоимость
                      </div>
                      <div className="text-[#8893A1] text-sm"></div>
                    </div>

                    {/* Элементы заказа */}
                    <div className="flex flex-col">
                      {order.items.map((item, idx) => (
                        <React.Fragment key={item.id}>
                          <div className="grid grid-cols-[36px_130px_120px_1fr_140px_60px_90px_50px] items-center py-[8px] px-2 rounded-lg hover:bg-[#F5F8FB]">
                            <div className="text-[#000000] text-center">
                              {idx + 1}
                            </div>
                            <div className="font-bold text-[#000814]">
                              {item.manufacturer}
                            </div>
                            <div className="font-bold text-[#000814]">
                              {item.article}
                            </div>
                            <div className="text-[#8893A1]">{item.name}</div>
                            <div className="font-semibold text-[#000814]">
                              {item.itemStatus || 'Ожидает поставки в ПВЗ'}
                            </div>
                            <div className="text-[#8893A1]">
                              {item.quantity} шт.
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="font-bold text-[#000814]">
                                {formatPrice(item.price)} ₽
                              </div>
                              <div className="text-[#8893A1] text-xs">
                                {formatPrice(item.price)} ₽/шт
                              </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                              <button>
                                <Image
                                  src="/icons/comment-icon.svg"
                                  alt="Комментарии"
                                  width={20}
                                  height={20}
                                  className={
                                    item.hasComments
                                      ? 'text-[#4DB45E]'
                                      : 'text-[#D9D9D9]'
                                  }
                                />
                              </button>
                              <button>
                                <Image
                                  src="/icons/refund-icon.svg"
                                  alt="Возврат"
                                  width={20}
                                  height={20}
                                  className="text-[#D9D9D9]"
                                />
                              </button>
                            </div>
                          </div>
                          {idx < order.items.length - 1 && (
                            <div className="border-b border-[#E9E9E9]"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Футер заказа */}
                  <div className="mt-5 pt-5 flex justify-between items-start px-[28px]">
                    <div className="flex flex-col gap-[6px]">
                      <p className="font-semibold text-[14px] text-[#000814]">
                        Покупатель: {order.customer}
                      </p>
                      <p className="text-[14px] text-[#424F60]">
                        Адрес доставки: {order.address}
                      </p>
                    </div>
                    <div className="flex items-end gap-8">
                      <div className="flex items-center gap-2">
                        <span className="text-[#000814] text-[14px]">
                          Скачать
                        </span>
                        <Image
                          src="/icons/file-icon.svg"
                          alt="Скачать документы"
                          width={18}
                          height={18}
                        />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[#000814] text-[14px]">
                          Итого
                        </span>
                        <span className="text-[#000814] text-[18px] font-semibold">
                          {formatPrice(order.total)} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-500">Заказы не найдены</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
