import React, { useState, useRef, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { SEND_SMS_CODE, VERIFY_CODE } from '@/lib/graphql'
import type { SMSCodeResponse, VerificationResponse } from '@/types/auth'

interface CodeVerificationProps {
  phone: string
  sessionId: string
  isExistingClient: boolean
  onSuccess: (data: VerificationResponse) => void
  onError: (error: string) => void
  onBack: () => void
  onRegister: () => void
}

const CodeVerification: React.FC<CodeVerificationProps> = ({
  phone,
  sessionId,
  isExistingClient,
  onSuccess,
  onError,
  onBack,
  onRegister
}) => {
  const [code, setCode] = useState(['', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [smsCode, setSmsCode] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [sendSMS] = useMutation<{ sendSMSCode: SMSCodeResponse }>(SEND_SMS_CODE)
  const [verifyCode] = useMutation<{ verifyCode: VerificationResponse }>(VERIFY_CODE)

  // SMS код уже отправлен в PhoneInput, здесь только показываем
  useEffect(() => {
    console.log('CodeVerification mounted for', isExistingClient ? 'existing' : 'new', 'client')
  }, [])

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)

    // Автоматически переходим к следующему полю
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }

    // Если все поля заполнены, отправляем код
    if (newCode.every(digit => digit !== '') && !isLoading) {
      handleVerify(newCode.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async (codeString?: string) => {
    const finalCode = codeString || code.join('')
    
    if (finalCode.length !== 5) {
      onError('Введите полный код')
      return
    }

    setIsLoading(true)

    try {
      const { data } = await verifyCode({
        variables: {
          phone,
          code: finalCode,
          sessionId
        }
      })

      if (data?.verifyCode?.success) {
        if (data.verifyCode.client) {
          // Если клиент существует - авторизуем
          onSuccess(data.verifyCode)
        } else {
          // Если клиент новый - переходим к регистрации
          onRegister()
        }
      }
    } catch (error) {
      console.error('Ошибка верификации:', error)
      onError('Неверный код')
      setCode(['', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col" style={{ gap: '15px' }}>
        {/* Заголовок */}
        <label
          style={{
            fontSize: '22px',
            lineHeight: '1.4',
            fontWeight: 400,
            fontFamily: 'Onest, sans-serif',
            color: '#000814'
          }}
        >
          Введите код из СМС
        </label>

        {/* Основная строка с кнопкой назад и полями ввода */}
        <div className="flex items-center" style={{ gap: '30px' }}>
          {/* Кнопка "Ввести другой номер" */}
          <button
            type="button"
            onClick={onBack}
            className="flex items-center hover:opacity-70"
            style={{ gap: '18px' }}
          >
            <svg width="39" height="1" viewBox="0 0 39 1" fill="none">
              <path d="M39 0.5H0" stroke="#424F60" strokeWidth="1.5"/>
            </svg>
            <span
              style={{
                fontSize: '18px',
                lineHeight: '1.4',
                fontWeight: 400,
                fontFamily: 'Onest, sans-serif',
                color: '#424F60'
              }}
            >
              Ввести другой номер
            </span>
          </button>

          {/* Поля ввода кода и кнопка */}
          <div className="flex items-center" style={{ gap: '20px' }}>
            {/* 5 полей для цифр */}
            <div className="flex" style={{ gap: '12px' }}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={el => { inputRefs.current[index] = el }}
                  type="text"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="focus:outline-none text-center"
                  style={{
                    width: '62px',
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
                  maxLength={1}
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Кнопка "Войти" */}
            <button
              type="button"
              onClick={() => handleVerify()}
              disabled={isLoading || code.some(digit => digit === '')}
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
              {isLoading ? 'Проверяем...' : 'Войти'}
            </button>
          </div>
        </div>

        {/* Отладочная информация */}
        {smsCode && (
          <div style={{ 
            marginTop: '15px', 
            padding: '12px 16px', 
            backgroundColor: '#EFF6FF', 
            border: '1px solid #BFDBFE', 
            borderRadius: '4px' 
          }}>
            <p style={{ 
              fontSize: '14px', 
              color: '#1E40AF', 
              margin: 0,
              fontFamily: 'Onest, sans-serif'
            }}>
              <strong>Код для тестирования:</strong> {smsCode}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeVerification 