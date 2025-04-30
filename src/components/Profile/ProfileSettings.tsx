'use client';

import { useState } from 'react';

interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notifications: boolean;
}

export function ProfileSettings() {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Макс',
    lastName: 'Еличев',
    phone: '+7 909 797 66 45',
    email: '',
    notifications: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Настройки аккаунта</h1>

      <div className="bg-white rounded-2xl p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6">Персональные данные</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Имя</label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
                className="w-full p-4 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Фамилия</label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
                className="w-full p-4 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Номер телефона</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full p-4 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">E-mail</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full p-4 border rounded-md"
                placeholder="@"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={profileData.notifications}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  notifications: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
            <label>Получать уведомления об акциях и новостях компании</label>
          </div>
        </form>
      </div>

      <div className="flex justify-between items-center bg-white rounded-2xl p-4">
        <button
          type="submit"
          className="px-10 py-5 bg-red-600 text-white rounded-xl font-medium"
        >
          Сохранить изменения
        </button>

        <button
          type="button"
          className="px-10 py-5 border border-red-600 text-black rounded-xl font-medium"
        >
          Добавить юридическое лицо
        </button>
      </div>
    </div>
  );
}
