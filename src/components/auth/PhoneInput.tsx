import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CHECK_CLIENT_BY_PHONE, SEND_SMS_CODE } from '@/lib/graphql'
import type { ClientAuthResponse, SMSCodeResponse } from '@/types/auth'

interface PhoneInputProps {
  onSuccess: (data: ClientAuthResponse, phone: string) => void
  onError: (error: string) => void
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onSuccess, onError }) => {
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [checkClient] = useMutation<{ checkClientByPhone: ClientAuthResponse }>(CHECK_CLIENT_BY_PHONE)
  const [sendSMSCode] = useMutation<{ sendSMSCode: SMSCodeResponse }>(SEND_SMS_CODE)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Убираем все кроме цифр
    let digitsOnly = value.replace(/\D/g, '')
    
    // Если начинается с 7, убираем её
    if (digitsOnly.startsWith('7')) {
      digitsOnly = digitsOnly.substring(1)
    }
    
    // Ограничиваем до 10 цифр
    if (digitsOnly.length <= 10) {
      // Форматируем номер
      let formatted = digitsOnly
      if (digitsOnly.length >= 1) {
        formatted = digitsOnly.replace(/(\d{1,3})(\d{0,3})(\d{0,2})(\d{0,2})/, (match, p1, p2, p3, p4) => {
          let result = `(${p1}`
          if (p2) result += `) ${p2}`
          if (p3) result += `-${p3}`
          if (p4) result += `-${p4}`
          return result
        })
      }
      
      setPhone(formatted)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const cleanPhone = '+7' + phone.replace(/\D/g, '')
    
    if (phone.replace(/\D/g, '').length !== 10) {
      onError('Введите корректный номер телефона')
      return
    }

    setIsLoading(true)
    
    try {
      // Сначала проверяем существует ли клиент
      const { data: clientData } = await checkClient({
        variables: { phone: cleanPhone }
      })
      
      if (clientData?.checkClientByPhone) {
        // Затем отправляем SMS код
        const { data: smsData } = await sendSMSCode({
          variables: { 
            phone: cleanPhone,
            sessionId: clientData.checkClientByPhone.sessionId
          }
        })
        
        if (smsData?.sendSMSCode?.success) {
          console.log('SMS код отправлен! Код:', smsData.sendSMSCode.code)
          onSuccess(clientData.checkClientByPhone, cleanPhone)
        } else {
          onError('Не удалось отправить SMS код')
        }
      }
    } catch (error) {
      console.error('Ошибка проверки телефона:', error)
      onError('Произошла ошибка при проверке номера')
    } finally {
      setIsLoading(false)
    }
  }

    return (
    <div className="w-full">
      <div className="w-full" style={{ marginBottom: '15px' }}>
        <label 
          className="block"
          style={{ 
            fontSize: '22px',
            lineHeight: '1.4',
            fontWeight: 'normal',
            fontFamily: 'Onest, sans-serif',
            color: '#000814',
            marginBottom: '15px'
          }}
        >
          Введите номер телефона
        </label>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center w-full" style={{ gap: '20px' }}>
            <input
              type="tel"
              value={`+7 ${phone}`}
              onChange={handlePhoneChange}
              placeholder="+7 (999) 999-99-99"
              className="focus:outline-none flex-1"
              style={{ 
                height: '70px',
                padding: '20px 30px',
                fontSize: '20px',
                lineHeight: '1.4',
                fontFamily: 'Onest, sans-serif',
                color: '#747474',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D0D0D0',
                borderRadius: '4px',
                minWidth: 0
              }}
              disabled={isLoading}
              required
            />
            <button
              type="submit"
              disabled={isLoading || phone.replace(/\D/g, '').length !== 10}
              className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: '#EC1C24',
                borderRadius: '12px',
                padding: '25px 35px',
                fontSize: '20px',
                lineHeight: '1.2',
                fontWeight: 500,
                fontFamily: 'Onest, sans-serif',
                color: '#FFFFFF',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                gap: '10px',
                height: '70px'
              }}
            >
              {isLoading ? 'Проверяем...' : 'Получить код'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PhoneInput 