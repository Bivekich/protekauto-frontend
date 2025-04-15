'use client';

import { OrdersList } from '@/widgets/profile/orders';

export default function ProfileOrdersPage() {
  return (
    <div className={'w-full'}>
      <h1 className={'text-2xl font-bold mb-6'}>Мои заказы</h1>
      <OrdersList />
    </div>
  );
}
