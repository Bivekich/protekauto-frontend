'use client';

import { GarageList } from '@/widgets/profile/garage';

export default function ProfileGaragePage() {
  return (
    <div className={'w-full'}>
      <h1 className={'text-2xl font-bold mb-6'}>Мой гараж</h1>
      <GarageList />
    </div>
  );
}
