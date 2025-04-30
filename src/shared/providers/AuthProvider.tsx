'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ClientProfile, AuthState } from '../types/auth';
import { getCurrentUser, logout } from '../lib/auth';
import Cookies from 'js-cookie';

// Создаем контекст авторизации
interface AuthContextProps {
  auth: AuthState;
  login: (userData: ClientProfile) => void;
  logout: () => void;
  updateUser: (userData: Partial<ClientProfile>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Провайдер авторизации
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  // Загрузка пользователя при инициализации
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Синхронизируем токены между localStorage и cookies
        const localStorageToken = localStorage.getItem('auth_token');
        const cookieToken = Cookies.get('auth_token');

        // Если токен есть в localStorage, но нет в cookie - сохраняем в cookie
        if (localStorageToken && !cookieToken) {
          Cookies.set('auth_token', localStorageToken, {
            path: '/',
            expires: 1,
          });
        }
        // Если токен есть в cookie, но нет в localStorage - сохраняем в localStorage
        else if (cookieToken && !localStorageToken) {
          localStorage.setItem('auth_token', cookieToken);
        }

        const user = await getCurrentUser();
        setAuth({
          isAuthenticated: !!user,
          user,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Ошибка при загрузке пользователя:', err);
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Ошибка загрузки пользователя',
        });
      }
    };

    loadUser();
  }, []);

  const loginHandler = (userData: ClientProfile) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      loading: false,
      error: null,
    });
  };

  const logoutHandler = () => {
    // Очищаем токены и в localStorage, и в куках
    logout();
    localStorage.removeItem('auth_token');

    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  const updateUser = (userData: Partial<ClientProfile>) => {
    setAuth((prevState) => ({
      ...prevState,
      user: prevState.user ? { ...prevState.user, ...userData } : null,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login: loginHandler,
        logout: logoutHandler,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста авторизации
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
