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
      {/* Выкатывающийся блок под шапку */}
      <div 
        className="fixed left-0 right-0 bg-white z-50 shadow-lg"
        style={{ 
          top: '0',
          paddingTop: '50px', 
          paddingBottom: '50px', 
          paddingLeft: '130px', 
          paddingRight: '130px',
          width: '1920px',
          margin: '0 auto'
        }}
      >
        <div className="flex flex-col" style={{ gap: '40px' }}>
            {/* Header */}
            <div className="flex justify-between items-center w-full">
              <h2 style={{ 
                fontSize: '52px', 
                lineHeight: '1.2', 
                fontWeight: 800,
                fontFamily: 'Onest, sans-serif',
                color: '#000814',
                margin: 0,
                flex: 1
              }}>
                Вход или регистрация
              </h2>
              <button
                onClick={handleClose}
                className="hover:opacity-70"
                style={{ 
                  width: '17.5px', 
                  height: '17.5px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#000814',
                  padding: 0,
                  flexShrink: 0
                }}
              >
                <svg width="17.5" height="17.5" viewBox="0 0 18 18" fill="none">
                  <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col">
              {error && (
                <div style={{ 
                  marginBottom: '15px', 
                  padding: '12px 16px', 
                  backgroundColor: '#FEF2F2', 
                  border: '1px solid #FECACA', 
                  borderRadius: '4px' 
                }}>
                  <p style={{ color: '#991B1B', margin: 0 }}>{error}</p>
                </div>
              )}
              
              {renderStep()}
            </div>
          </div>
        </div>
    </ApolloProvider>
  )
}

export default AuthModal 