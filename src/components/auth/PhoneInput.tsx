import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CHECK_CLIENT_BY_PHONE, SEND_SMS_CODE } from '@/lib/graphql'
import type { ClientAuthResponse, SMSCodeResponse } from '@/types/auth'

interface PhoneInputProps {
  onSuccess: (data: ClientAuthResponse, phone: string) => void
  onError: (error: string) => void
  onRegister: () => void
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onSuccess, onError, onRegister }) => {
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
    <div className="flex flex-col gap-5 w-full">
      <label className="text-2xl leading-8 text-gray-950 mb-2 font-normal font-[Onest,sans-serif] "           
      style={{
            fontSize: '22px',
            lineHeight: '1.4',
            fontWeight: 400,
            fontFamily: 'Onest, sans-serif',
            color: '#000814'
          }}>Введите номер телефона</label>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center w-full max-md:flex-col max-md:gap-4 max-sm:gap-3">
          <input
            type="tel"
            value={`+7 ${phone}`}
            onChange={handlePhoneChange}
            placeholder="+7 (999) 999-99-99"
            className="max-w-[360px] w-full h-[70px] px-[30px] py-[20px] text-[20px] leading-[1.4] font-[Onest,sans-serif] text-neutral-500 bg-white border border-stone-300 rounded focus:outline-none min-w-0 max-md:w-[300px] max-sm:w-full"
            disabled={isLoading}
            required
            aria-label="Введите номер телефона"
          />
          <button
            type="submit"
            disabled={isLoading || phone.replace(/\D/g, '').length !== 10}
            className="flex items-center justify-center flex-shrink-0 bg-red-600 rounded-xl px-8 py-5 text-lg font-medium leading-5 text-white disabled:opacity-50 disabled:cursor-not-allowed h-[70px] max-sm:px-6 max-sm:py-4"
            style={{ color: 'white' }}
            aria-label="Получить код"
            tabIndex={0}
          >
            {isLoading ? 'Проверяем...' : 'Получить код'}
          </button>
        </div>
      </form>
      {/* <button
        type="button"
        onClick={onRegister}
        className="flex gap-5 justify-center items-center px-7 py-5 w-80 rounded-xl border border-red-700 border-solid cursor-pointer max-md:self-center max-md:px-6 max-md:py-5 max-md:w-[280px] max-sm:px-5 max-sm:py-4 max-sm:w-full"
        aria-label="Зарегистрироваться"
        tabIndex={0}
      >
        <span className="text-xl font-medium leading-7 text-center text-gray-950 max-md:text-lg max-sm:text-base">Зарегистрироваться</span>
        <span aria-hidden="true">
          <svg width="31" height="16" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon" style={{width:'30px',height:'16px',flexShrink:0}}>
            <path d="M30.7071 8.70711C31.0976 8.31659 31.0976 7.68342 30.7071 7.2929L24.3431 0.928936C23.9526 0.538412 23.3195 0.538412 22.9289 0.928936C22.5384 1.31946 22.5384 1.95263 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 8L-1.74846e-07 9L30 9.00001L30 8.00001L30 7.00001L1.74846e-07 7L0 8Z" fill="#000814"/>
          </svg>
        </span>
      </button> */}
    </div>
  )
}

export default PhoneInput 