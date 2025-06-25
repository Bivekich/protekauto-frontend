import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'
import PhoneInput from './PhoneInput'
import CodeVerification from './CodeVerification'
import UserRegistration from './UserRegistration'
import type { AuthState, AuthStep, ClientAuthResponse, VerificationResponse } from '@/types/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (client: any, token?: string) => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [authState, setAuthState] = useState<AuthState>({
    step: 'phone',
    phone: '',
    sessionId: '',
    isExistingClient: false
  })
  const [error, setError] = useState('')

  const handlePhoneSuccess = (data: ClientAuthResponse) => {
    setError('')
    // Всегда переходим к вводу кода, независимо от того, существует клиент или нет
    setAuthState(prev => ({
      ...prev,
      step: 'code',
      sessionId: data.sessionId,
      client: data.client,
      isExistingClient: data.exists
    }))
  }

  const handleCodeSuccess = (data: VerificationResponse) => {
    if (data.success && data.client) {
      onSuccess(data.client, data.token)
      onClose()
    }
  }

  const handleRegistrationSuccess = (data: VerificationResponse) => {
    if (data.success && data.client) {
      onSuccess(data.client, data.token)
      onClose()
    }
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleBack = () => {
    setAuthState(prev => ({
      ...prev,
      step: 'phone'
    }))
    setError('')
  }

  const handleGoToRegistration = () => {
    setAuthState(prev => ({
      ...prev,
      step: 'registration'
    }))
    setError('')
  }

  const handleClose = () => {
    setAuthState({
      step: 'phone',
      phone: '',
      sessionId: '',
      isExistingClient: false
    })
    setError('')
    onClose()
  }

  if (!isOpen) return null

  const renderStep = () => {
    switch (authState.step) {
      case 'phone':
        return (
          <PhoneInput
            onSuccess={(data, phone) => {
              setAuthState(prev => ({
                ...prev,
                phone: phone,
                sessionId: data.sessionId,
                client: data.client,
                isExistingClient: data.exists
              }))
              handlePhoneSuccess(data)
            }}
            onError={handleError}
            onRegister={handleGoToRegistration}
          />
        )
      case 'code':
        return (
          <CodeVerification
            phone={authState.phone}
            sessionId={authState.sessionId}
            isExistingClient={authState.isExistingClient}
            onSuccess={handleCodeSuccess}
            onError={handleError}
            onBack={handleBack}
            onRegister={handleGoToRegistration}
          />
        )
      case 'registration':
        return (
          <UserRegistration
            phone={authState.phone}
            sessionId={authState.sessionId}
            onSuccess={handleRegistrationSuccess}
            onError={handleError}
          />
        )
      default:
        return null
    }
  }

  return (
    <ApolloProvider client={apolloClient}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10 z-index-40 margin-top-[132px] transition-opacity duration-200"
        aria-label="Затемнение фона"
        tabIndex={-1}
        onClick={handleClose}
      />
      {/* Модальное окно */}
    <div className="flex relative  w-full bg-white   mx-auto z-50">
      <div className="flex relative flex-col gap-4 items-start px-32 py-10 w-full bg-white max-w-[1920px] min-h-[320px] max-md:px-16 max-md:py-8 max-sm:gap-8 max-sm:p-5 mx-auto z-50"
        style={{ marginTop: 0, position: 'relative' }}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={handleClose}
          className="absolute right-8 top-8 p-2 hover:opacity-70 focus:outline-none"
          aria-label="Закрыть окно авторизации"
          tabIndex={0}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M8 23.75L6.25 22L13.25 15L6.25 8L8 6.25L15 13.25L22 6.25L23.75 8L16.75 15L23.75 22L22 23.75L15 16.75L8 23.75Z" fill="#000814"/>
          </svg>
        </button>
        {/* Заголовок */}
        <div className="flex relative justify-between items-start w-full max-sm:flex-col max-sm:gap-5">
          <div className="relative text-5xl font-bold uppercase leading-[62.4px] text-gray-950 max-md:text-5xl max-sm:self-start max-sm:text-3xl">
            ВХОД
          </div>
        </div>
        {/* Ошибка */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800 m-0">{error}</p>
          </div>
        )}
        {/* Контент */}
        <div className="flex relative flex-col gap-5 items-start self-stretch w-full">
          {renderStep()}
        </div>
      </div>
    </div>
    </ApolloProvider>
  )
}

export default AuthModal 