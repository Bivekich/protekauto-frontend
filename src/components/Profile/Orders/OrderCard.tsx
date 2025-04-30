import React from 'react';
import Link from 'next/link';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'canceled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  hasComments?: boolean;
  article?: string;
  manufacturer?: string;
  itemStatus?: string;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  address: string;
  customer: string;
}

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  // Конфигурация стилей и текста для разных статусов заказа
  const statusConfig: Record<OrderStatus, { label: string; classes: string }> =
    {
      pending: {
        label: 'Ожидает оплаты',
        classes: 'bg-yellow-100 text-yellow-800',
      },
      processing: {
        label: 'Выполняется',
        classes: 'bg-blue-100 text-blue-800',
      },
      shipped: {
        label: 'Отправлен',
        classes: 'bg-purple-100 text-purple-800',
      },
      delivered: {
        label: 'Доставлен',
        classes: 'bg-green-100 text-green-800',
      },
      canceled: {
        label: 'Отменен',
        classes: 'bg-red-100 text-red-800',
      },
    };

  // Форматирование даты
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  // Форматирование цены
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <span className="font-semibold">{order.number}</span>
            <span className="text-gray-500 text-sm ml-2">
              от {formatDate(order.date)}
            </span>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              statusConfig[order.status].classes
            }`}
          >
            {statusConfig[order.status].label}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-gray-500 text-sm mb-1">Товары</h3>
            <ul className="text-sm">
              {order.items.slice(0, 2).map((item) => (
                <li key={item.id} className="mb-1">
                  {item.name} × {item.quantity}
                </li>
              ))}
              {order.items.length > 2 && (
                <li className="text-gray-500">
                  ... и еще {order.items.length - 2}{' '}
                  {order.items.length - 2 === 1
                    ? 'товар'
                    : order.items.length - 2 < 5
                    ? 'товара'
                    : 'товаров'}
                </li>
              )}
            </ul>
          </div>

          <div className="text-right">
            <h3 className="text-gray-500 text-sm mb-1">Сумма заказа</h3>
            <p className="font-bold text-lg">{formatPrice(order.total)}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <p>Адрес: {order.address}</p>
          </div>
          <Link
            href={`/account/orders/${order.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
