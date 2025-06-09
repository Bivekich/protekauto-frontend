export interface Client {
  id: string
  clientNumber: string
  name: string
  phone: string
  email?: string
}

export interface ClientAuthResponse {
  exists: boolean
  client?: Client
  sessionId: string
}

export interface SMSCodeResponse {
  success: boolean
  sessionId: string
  code: string
}

export interface VerificationResponse {
  success: boolean
  client?: Client
  token?: string
}

export type AuthStep = 'phone' | 'code' | 'registration'

export interface AuthState {
  step: AuthStep
  phone: string
  sessionId: string
  client?: Client
  isExistingClient: boolean
} 