'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account/settings');
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p className="text-lg">
        Перенаправление на страницу настроек аккаунта...
      </p>
    </div>
  );
}
