'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'canceled';

export interface OrderDetailItem {
  id: string;
  manufacturer: string;
  article: string;
  name: string;
  status: string;
  quantity: number;
  price: number;
  pricePerItem: number;
  hasComments?: boolean;
}

export interface OrderDetail {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  items: OrderDetailItem[];
  total: number;
  customer: string;
  address: string;
}

// Демо-данные для примера
const demoOrders: OrderDetail[] = [
  {
    id: '1',
    number: 'Заказ от 2 августа 2024',
    date: '2024-08-02',
    status: 'processing',
    items: [
      {
        id: '1',
        manufacturer: 'Ganz',
        article: 'GIE37312',
        name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
        status: 'Ожидает поставки в ПВЗ',
        quantity: 1,
        price: 18763,
        pricePerItem: 18763,
      },
      {
        id: '2',
        manufacturer: 'Ganz',
        article: 'GIE37312',
        name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
        status: 'Ожидает поставки в ПВЗ',
        quantity: 1,
        price: 18763,
        pricePerItem: 18763,
      },
      {
        id: '3',
        manufacturer: 'Ganz',
        article: 'GIE37312',
        name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
        status: 'Ожидает поставки в ПВЗ',
        quantity: 1,
        price: 18763,
        pricePerItem: 18763,
        hasComments: true,
      },
    ],
    total: 39389,
    customer: 'ООО ПРОТЕК',
    address:
      'Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1',
  },
  {
    id: '2',
    number: 'Заказ от 2 августа 2024',
    date: '2024-08-02',
    status: 'delivered',
    items: [
      {
        id: '1',
        manufacturer: 'Ganz',
        article: 'GIE37312',
        name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
        status: 'Доставлен',
        quantity: 1,
        price: 18763,
        pricePerItem: 18763,
      },
    ],
    total: 39389,
    customer: 'ООО ПРОТЕК',
    address:
      'Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1',
  },
  {
    id: '3',
    number: 'Заказ от 2 августа 2024',
    date: '2024-08-02',
    status: 'canceled',
    items: [
      {
        id: '1',
        manufacturer: 'Ganz',
        article: 'GIE37312',
        name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
        status: 'Отказ в поставке',
        quantity: 1,
        price: 18763,
        pricePerItem: 18763,
      },
      {
        id: '2',
        manufacturer: 'Ganz',
        article: 'GIE37312',
        name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
        status: 'Отказ в поставке',
        quantity: 1,
        price: 18763,
        pricePerItem: 18763,
      },
      {
        id: '3',
        manufacturer: 'Ganz',
        article: 'GIE37312',
        name: 'Ролик ремня ГРМ VW AD GANZ GIE37312',
        status: 'Отказ в поставке',
        quantity: 1,
        price: 18763,
        pricePerItem: 18763,
      },
    ],
    total: 39389,
    customer: 'ООО ПРОТЕК',
    address:
      'Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1',
  },
];

// Форматирование цены для отображения
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

// Компонент отдельной позиции заказа
const OrderStatusItem = ({
  item,
  index,
}: {
  item: OrderDetailItem;
  index: number;
}) => {
  return (
    <div className="flex items-center gap-5 py-[6px] px-[8px] pr-7 rounded-lg hover:bg-[#F5F8FB] w-full">
      <div className="text-[#000000] w-9 text-center">{index}</div>
      <div className="flex flex-1 items-center gap-5">
        <div className="grid grid-cols-[130px_120px_1fr_140px_60px_90px] gap-5 w-full">
          <div className="font-bold text-[#000814]">{item.manufacturer}</div>
          <div className="font-bold text-[#000814]">{item.article}</div>
          <div className="text-[#8893A1]">{item.name}</div>
          <div className="font-semibold text-[#000814]">{item.status}</div>
          <div className="text-[#8893A1]">{item.quantity} шт.</div>
          <div className="flex flex-col items-end">
            <div className="font-bold text-[#000814]">
              {formatPrice(item.price)} ₽
            </div>
            <div className="text-[#8893A1] text-[12px]">
              {formatPrice(item.pricePerItem)} ₽/шт
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {item.hasComments && (
          <button className="text-[#FF9500]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V14C9 14.5523 9.44772 15 10 15H11C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13V10C11 9.44772 10.5523 9 10 9H9Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
        <button className="text-[#0066FF]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 4H16C17.1046 4 18 4.89543 18 6V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V6C2 4.89543 2.89543 4 4 4ZM4 6V16H16V6H4Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  // В реальном приложении данные будут загружаться по API на основе orderId
  const order = demoOrders.find((o) => o.id === orderId) || demoOrders[0];

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-6">
      {/* Хлебные крошки и кнопка назад */}
      <div className="mb-5 flex items-center">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-1">Назад</span>
        </button>
        <div className="ml-4 text-gray-500">
          <Link href="/account/orders" className="hover:underline">
            Заказы
          </Link>
          <span className="mx-2">/</span>
          <span>{order.number}</span>
        </div>
      </div>

      {/* Заголовок заказа */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{order.number}</h1>
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <button className="text-gray-500 hover:underline">
              Показать документы
            </button>
          </div>
          {order.status === 'processing' && (
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Выполняется
            </div>
          )}
          {order.status === 'delivered' && (
            <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">
              Доставлен
            </div>
          )}
          {order.status === 'canceled' && (
            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded">
              Отменен
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
        {/* Таблица товаров */}
        <div className="border-b border-[#D0D0D0] mb-5">
          {/* Заголовки таблицы */}
          <div className="grid grid-cols-[36px_130px_120px_1fr_140px_60px_90px_50px] gap-5 pb-[10px] border-b border-[#D0D0D0] px-[8px]">
            <div className="text-[#8893A1] text-[14px]">№</div>
            <div className="text-[#8893A1] text-[14px] flex items-center gap-1">
              Производитель
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 2.5L9 6H3L6 2.5Z" fill="#8893A1" />
              </svg>
            </div>
            <div className="text-[#8893A1] text-[14px]">Артикул</div>
            <div className="text-[#8893A1] text-[14px] flex items-center gap-1">
              Наименование
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 2.5L9 6H3L6 2.5Z" fill="#8893A1" />
              </svg>
            </div>
            <div className="text-[#8893A1] text-[14px]">Статус</div>
            <div className="text-[#8893A1] text-[14px]">Кол-во</div>
            <div className="text-[#8893A1] text-[14px] text-right">
              Стоимость
            </div>
            <div className="text-[#8893A1] text-[14px]"></div>
          </div>

          {/* Позиции заказа */}
          <div className="flex flex-col">
            {order.items.map((item, index) => (
              <React.Fragment key={item.id}>
                <OrderStatusItem item={item} index={index + 1} />
                {index < order.items.length - 1 && (
                  <div className="border-b border-[#E9E9E9]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Итоговая информация */}
        <div className="flex justify-between">
          <div className="text-sm">
            <div className="mb-2">
              <span className="font-medium">Покупатель:</span> {order.customer}
            </div>
            <div>
              <span className="font-medium">Адрес доставки:</span>{' '}
              {order.address}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-gray-500 text-sm">Итого</div>
            <div className="text-xl font-bold">
              {formatPrice(order.total)} ₽
            </div>
          </div>
        </div>
      </div>

      {/* Панель действий */}
      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
        >
          Вернуться к заказам
        </button>
        {order.status === 'pending' && (
          <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
            Оплатить заказ
          </button>
        )}
        {order.status !== 'canceled' && order.status !== 'delivered' && (
          <button className="px-5 py-2 border border-red-600 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium">
            Отменить заказ
          </button>
        )}
      </div>
    </div>
  );
}
