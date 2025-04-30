import Cookies from 'js-cookie';
import {
  type AuthResponse,
  type ClientProfile,
  type VerificationResponse,
} from '../types/auth';

// URL базового API
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000'; // Используем порт бэкенда

/**
 * Валидация телефонного номера
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex =
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return phoneRegex.test(phone);
};

/**
 * Форматирование телефонного номера в единый формат
 */
export const formatPhone = (phone: string): string => {
  // Удаляем все не цифры
  const cleaned = phone.replace(/\D/g, '');

  // Проверяем первую цифру
  if (cleaned.length === 11) {
    if (cleaned.startsWith('8') || cleaned.startsWith('7')) {
      return '+7' + cleaned.substring(1);
    }
  } else if (cleaned.length === 10) {
    return '+7' + cleaned;
  }

  return phone;
};

// Функция для проверки доступности API
const checkApiEndpoint = async (endpoint: string): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
        Origin: window.location.origin,
      },
      credentials: 'include',
    });

    if (response.ok) return API_BASE;
    return null;
  } catch (error) {
    console.error('API недоступен:', error);
    return null;
  }
};

/**
 * Отправка SMS кода для авторизации/регистрации
 */
export const sendAuthCode = async (
  phone: string
): Promise<VerificationResponse> => {
  try {
    // Валидация формата
    if (!validatePhone(phone)) {
      throw new Error('Неверный формат номера телефона');
    }

    // Форматирование номера
    const formattedPhone = formatPhone(phone);

    const response = await fetch(`/api/public/auth/sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: formattedPhone }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка при отправке кода');
    }

    return data;
  } catch (error) {
    console.error('Ошибка отправки кода:', error);
    throw error;
  }
};

/**
 * Сохранение токена авторизации
 */
export const saveAuthToken = (token: string): void => {
  // Сохраняем токен и в куках, и в localStorage
  Cookies.set('auth_token', String(token), {
    path: '/',
    expires: 1, // Сохраняем на 1 день
  });
  localStorage.setItem('auth_token', String(token));
};

/**
 * Авторизация с помощью телефона и SMS кода
 */
export const loginWithCode = async (
  phone: string,
  code: string
): Promise<AuthResponse> => {
  try {
    // Форматирование номера
    const formattedPhone = formatPhone(phone);

    const response = await fetch(`/api/public/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: formattedPhone, code }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка при входе');
    }

    // Сохраняем токен
    if (data.token) {
      saveAuthToken(data.token);
    }

    return data;
  } catch (error) {
    console.error('Ошибка входа:', error);
    throw error;
  }
};

/**
 * Регистрация/обновление профиля пользователя
 */
export const registerUser = async (userData: {
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
}): Promise<AuthResponse> => {
  try {
    // Проверяем доступность API
    const apiUrl =
      (await checkApiEndpoint('/api/public/auth/register')) || API_BASE;

    const response = await fetch(`${apiUrl}/api/public/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка регистрации');
    }

    // Сохраняем токен
    if (data.token) {
      saveAuthToken(data.token);
    }

    return data;
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    throw error;
  }
};

/**
 * Получение информации о текущем пользователе
 */
export const getCurrentUser = async (): Promise<ClientProfile | null> => {
  try {
    // Проверяем токен авторизации в куках или localStorage
    const cookieToken = Cookies.get('auth_token');
    const localStorageToken = localStorage.getItem('auth_token');
    const token = cookieToken || localStorageToken;

    if (!token) {
      return null;
    }

    try {
      // Используем базовый URL API напрямую
      const response = await fetch(`/api/public/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // При ошибке авторизации очищаем токены
          logout();
          return null;
        }
        const data = await response.json();
        throw new Error(data.error || 'Ошибка получения данных пользователя');
      }

      const data = await response.json();
      return data.client;
    } catch (error) {
      console.error('Ошибка подключения к API:', error);
      logout();
      return null;
    }
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    return null;
  }
};

/**
 * Выход из системы
 */
export const logout = (): void => {
  Cookies.remove('auth_token', { path: '/' });
  localStorage.removeItem('auth_token');
};

/**
 * Проверка авторизации пользователя
 */
export const isAuthenticated = (): boolean => {
  const cookieToken = Cookies.get('auth_token');
  const localStorageToken = localStorage.getItem('auth_token');
  return !!(cookieToken || localStorageToken);
};
