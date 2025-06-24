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
      onError('Не удалось зарегистрировать пользователя')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-end w-full max-md:flex-col max-md:gap-4 max-sm:gap-3">
          {/* Имя */}
          <div className="flex flex-col gap-3 max-w-[360px] w-full">
            <label className="text-2xl leading-8 text-gray-950 mb-2 font-normal font-[Onest,sans-serif]">Введите имя</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Иван"
              className="max-w-[360px] w-full h-[62px] px-6 py-4 text-[18px] leading-[1.4] font-normal font-[Onest,sans-serif] text-neutral-500 bg-white border border-stone-300 rounded focus:outline-none"
              disabled={isLoading}
              required
            />
          </div>
          {/* Фамилия */}
          <div className="flex flex-col gap-3 max-w-[360px] w-full">
            <label className="text-2xl leading-8 text-gray-950 mb-2 font-normal font-[Onest,sans-serif]">Фамилию</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Иванов"
              className="max-w-[360px] w-full h-[62px] px-6 py-4 text-[18px] leading-[1.4] font-normal font-[Onest,sans-serif] text-neutral-500 bg-white border border-stone-300 rounded focus:outline-none"
              disabled={isLoading}
              required
            />
          </div>
          {/* Кнопка */}
          <button
            type="submit"
            disabled={isLoading || !firstName.trim() || !lastName.trim()}
            className="flex items-center justify-center flex-shrink-0 bg-red-600 rounded-xl px-8 py-5 text-lg font-medium leading-5 text-white disabled:opacity-50 disabled:cursor-not-allowed h-[70px] max-sm:px-6 max-sm:py-4"
            style={{
              color: 'white'
            }}
            aria-label="Сохранить"
            tabIndex={0}
          >
            {isLoading ? 'Сохраняем...' : 'Сохранить'}
            {/* <img src="/images/Arrow_right.svg" alt="" className="ml-2 w-6 h-6" /> */}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserRegistration 