'use client';

import React from 'react';
import { SettingsForm } from './settingsForm';

export const AccountSettings = () => {
  return (
    <div className="bg-white rounded-[20px] p-6">
      <h2 className="text-xl font-semibold mb-6">Настройки аккаунта</h2>
      <SettingsForm />
    </div>
  );
};
