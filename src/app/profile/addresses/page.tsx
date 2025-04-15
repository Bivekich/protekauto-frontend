'use client';

import { AddressList } from '@/widgets/profile/addresses';

export default function ProfileAddressesPage() {
  return (
    <div className={'w-full'}>
      <h1 className={'text-2xl font-bold mb-6'}>Адреса доставки</h1>
      <AddressList />
    </div>
  );
}
