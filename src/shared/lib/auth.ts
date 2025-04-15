// Утилиты для работы с аутентификацией на клиентской стороне

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Тип данных пользователя
export interface User {
  id: string;
  phone: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  isVerified: boolean;
  profileType: string;
  settings?: {
    receiveNotifications?: boolean;
    [key: string]: boolean | string | number | undefined;
  };
}

// Сохранение токена в localStorage
export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Получение токена из localStorage
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

// Удаление токена из localStorage
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Сохранение пользовательских данных в localStorage
export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Получение пользовательских данных из localStorage
export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;
  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error('Ошибка при парсинге данных пользователя:', error);
    return null;
  }
};

// Удаление пользовательских данных из localStorage
export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

// Проверка, авторизован ли пользователь
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Полный выход из системы
export const logout = (): void => {
  removeToken();
  removeUser();
};

// Сохранение данных авторизации
export const saveAuth = (token: string, user: User): void => {
  saveToken(token);
  saveUser(user);
};
