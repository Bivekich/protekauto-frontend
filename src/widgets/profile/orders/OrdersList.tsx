'use client';

import React, { useEffect, useState } from 'react';

interface Order {
  id: string;
  status: string;
  amount: number;
  createdAt: string;
}

export const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // API запрос за заказами
        // const response = await fetch('/api/orders');
        // const data = await response.json();
        // setOrders(data);
        setOrders([]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (orders.length === 0) {
    return <div>У вас пока нет заказов.</div>;
  }

  return (
    <div className="orders-list">
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-medium">Заказ #{order.id}</h3>
            <p className="text-sm text-gray-600">Статус: {order.status}</p>
            <p className="text-sm">Сумма: {order.amount} ₽</p>
            <p className="text-sm text-gray-500">
              Дата: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
