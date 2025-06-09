import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { REGISTER_NEW_CLIENT } from '@/lib/graphql'
import type { VerificationResponse } from '@/types/auth'

interface UserRegistrationProps {
  phone: string
  sessionId: string
  onSuccess: (data: VerificationResponse) => void
  onError: (error: string) => void
}

const UserRegistration: React.FC<UserRegistrationProps> = ({
  phone,
  sessionId,
  onSuccess,
  onError
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [registerClient] = useMutation<{ registerNewClient: VerificationResponse }>(REGISTER_NEW_CLIENT)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName.trim()) {
      onError('Введите имя')
      return
    }

    if (!lastName.trim()) {
      onError('Введите фамилию')
      return
    }

    setIsLoading(true)

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`
      
      const { data } = await registerClient({
        variables: {
          phone,
          name: fullName,
          sessionId
        }
      })

      if (data?.registerNewClient) {
        onSuccess(data.registerNewClient)
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error)
      onError('Не удалось зарегистрировать пользователя')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-end" style={{ gap: '20px' }}>
          {/* Блок с двумя полями ввода */}
          <div className="flex" style={{ gap: '12px' }}>
            {/* Поле имени */}
            <div className="flex flex-col" style={{ gap: '20px', width: '360px' }}>
              <label
                style={{
                  fontSize: '22px',
                  lineHeight: '1.4',
                  fontWeight: 400,
                  fontFamily: 'Onest, sans-serif',
                  color: '#000814'
                }}
              >
                Введите имя
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Иван"
                className="focus:outline-none"
                style={{
                  width: '360px',
                  height: '62px',
                  padding: '15px 24px',
                  fontSize: '18px',
                  lineHeight: '1.4',
                  fontWeight: 400,
                  fontFamily: 'Onest, sans-serif',
                  color: '#747474',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D0D0',
                  borderRadius: '4px'
                }}
                disabled={isLoading}
                required
              />
            </div>

            {/* Поле фамилии */}
            <div className="flex flex-col" style={{ gap: '20px', width: '360px' }}>
              <label
                style={{
                  fontSize: '22px',
                  lineHeight: '1.4',
                  fontWeight: 400,
                  fontFamily: 'Onest, sans-serif',
                  color: '#000814'
                }}
              >
                Фамилию
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Иванов"
                className="focus:outline-none"
                style={{
                  width: '360px',
                  height: '62px',
                  padding: '15px 24px',
                  fontSize: '18px',
                  lineHeight: '1.4',
                  fontWeight: 400,
                  fontFamily: 'Onest, sans-serif',
                  color: '#747474',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D0D0',
                  borderRadius: '4px'
                }}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Кнопка */}
          <button
            type="submit"
            disabled={isLoading || !firstName.trim() || !lastName.trim()}
            className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{
              backgroundColor: '#EC1C24',
              borderRadius: '12px',
              padding: '20px 30px',
              fontSize: '18px',
              lineHeight: '1.2',
              fontWeight: 500,
              fontFamily: 'Onest, sans-serif',
              color: '#FFFFFF',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Сохраняем...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserRegistration 