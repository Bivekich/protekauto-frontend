/**
 * Типы данных для авторизации
 */

// Профиль клиента
export interface ClientProfile {
  id: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isVerified: boolean;
  profileType?: string;
}

// Ответ при успешной авторизации/регистрации
export interface AuthResponse {
  success: boolean;
  token: string;
  client: ClientProfile;
  needsRegistration?: boolean;
}

// Ответ при отправке кода подтверждения
export interface VerificationResponse {
  success: boolean;
  message: string;
  code?: string; // Присутствует только в режиме разработки
}

// Статус авторизации
export interface AuthState {
  isAuthenticated: boolean;
  user: ClientProfile | null;
  loading: boolean;
  error: string | null;
}
