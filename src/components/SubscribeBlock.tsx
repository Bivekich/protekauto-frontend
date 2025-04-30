'use client';

import { useState } from 'react';

const SubscribeBlock = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки данных на сервер
    console.log('Подписка на рассылку:', email);
    // Очистка поля после отправки
    setEmail('');
  };

  return (
    <div className="bg-[#0D336C] px-[130px] py-[60px] border-b border-[rgba(255,255,255,0.14)]">
      <div className="flex items-center gap-[40px]">
        {/* Левая часть - Заголовок и текст */}
        <div className="flex-1 flex gap-[60px]">
          <div>
            <h2 className="text-white text-[22px] font-bold leading-[1.4]">
              Подпишитесь
              <br />
              на новостную рассылку
            </h2>
          </div>
          <div>
            <p className="text-[#CCDFF7] text-lg font-normal leading-[1.4]">
              Оставайтесь в курсе акций,
              <br />
              новинок и специальных предложений
            </p>
          </div>
        </div>

        {/* Правая часть - Форма подписки */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex gap-5 items-center">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Введите E-mail"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full h-[56px] px-6 rounded-[4px] bg-white border border-[#D0D0D0] text-[#747474] text-sm focus:outline-none hover:border-[#0D336C] focus:border-[#EC1C24] transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-[#C60000] hover:bg-[#9D0000] active:bg-[#EC1C24] text-white px-10 py-[14px] rounded-xl text-lg font-medium transition-colors whitespace-nowrap"
            >
              Подписаться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeBlock;
