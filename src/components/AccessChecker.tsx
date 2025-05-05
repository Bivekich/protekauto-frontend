'use client';

import { ReactNode, useState, useEffect } from 'react';
import MaintenancePage from './MaintenancePage';

interface AccessCheckerProps {
  children: ReactNode;
}

const AccessChecker = ({ children }: AccessCheckerProps) => {
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем, что мы на клиенте (не SSR)
    if (typeof window !== 'undefined') {
      try {
        const accessGranted =
          localStorage.getItem('maintenance_access') === 'granted';
        setIsAccessGranted(accessGranted);
      } catch (e) {
        console.error('Error accessing localStorage:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // При SSR всегда показываем загрузку
  if (typeof window === 'undefined') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Загрузка...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Загрузка...</div>
      </div>
    );
  }

  if (!isAccessGranted) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
};

export default AccessChecker;
