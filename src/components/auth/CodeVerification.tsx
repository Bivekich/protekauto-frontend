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
    <div className="flex flex-col gap-5 w-full">
      <label className="text-2xl leading-8 text-gray-950 mb-2 font-normal font-[Onest,sans-serif]">Введите код из СМС</label>
      <div className="flex gap-5 items-center w-full max-md:flex-col max-md:gap-4 max-sm:gap-3">
        {/* 5 полей для цифр */}
        <div className="flex gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el }}
              type="text"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-[62px] h-[62px] px-4 py-3 text-[18px] leading-[1.4] font-normal font-[Onest,sans-serif] text-neutral-500 bg-white border border-stone-300 rounded focus:outline-none text-center"
              maxLength={1}
              disabled={isLoading}
              aria-label={`Цифра ${index + 1}`}
            />
          ))}
        </div>
        {/* Кнопка "Войти" */}
        <button
          type="button"
          onClick={() => handleVerify()}
          disabled={isLoading || code.some(digit => digit === '')}
          style={{ color: 'white' }}
          className="flex items-center justify-center flex-shrink-0 bg-red-600 rounded-xl px-8 py-5 text-lg font-medium leading-5 text-white disabled:opacity-50 disabled:cursor-not-allowed h-[62px] max-sm:px-6 max-sm:py-4"
          aria-label="Войти"
          tabIndex={0}
        >
          {isLoading ? 'Проверяем...' : 'Войти'}
        </button>
      </div>
      {/* Кнопка "Ввести другой номер" под вводом кода */}
      <button
        type="button"
        onClick={onBack}
        className="flex gap-3 items-center hover:opacity-70 mt-2"
        aria-label="Ввести другой номер"
        tabIndex={0}
      >
<svg width="40" height="13" viewBox="0 0 40 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.469669 5.96967C0.176777 6.26256 0.176777 6.73743 0.469669 7.03033L5.24264 11.8033C5.53553 12.0962 6.01041 12.0962 6.3033 11.8033C6.59619 11.5104 6.59619 11.0355 6.3033 10.7426L2.06066 6.5L6.3033 2.25736C6.5962 1.96446 6.5962 1.48959 6.3033 1.1967C6.01041 0.903803 5.53553 0.903803 5.24264 1.1967L0.469669 5.96967ZM40 5.75L1 5.75L1 7.25L40 7.25L40 5.75Z" fill="#424F60"/>
</svg>
        <span className="text-lg leading-[1.4] font-normal font-[Onest,sans-serif] text-[#424F60]">Ввести другой номер</span>
      </button>
      {/* Отладочная информация */}
      {smsCode && (
        <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800 m-0 font-[Onest,sans-serif]">
            <strong>Код для тестирования:</strong> {smsCode}
          </p>
        </div>
      )}
    </div>
  )
}

export default CodeVerification 