'use client';

import { SettingsForm } from '@/widgets/profile/settings';

export default function ProfileSettingsPage() {
  return (
    <div className={'w-full'}>
      <h1 className={'text-2xl font-bold mb-6'}>Настройки аккаунта</h1>
      <div className="bg-white rounded-[20px] p-6">
        <h2 className="text-xl font-semibold mb-6">Настройки аккаунта</h2>
        <SettingsForm />
      </div>
    </div>
  );
}
