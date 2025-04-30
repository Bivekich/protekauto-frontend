'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0D336C] px-[130px] py-[60px]">
      <div className="flex flex-col gap-[40px]">
        {/* Верхняя часть футера */}
        <div className="flex justify-between w-full">
          {/* Левая колонка с логотипом и контактами */}
          <div className="max-w-[399px]">
            <div>
              <Image
                src="/logo-footer.svg"
                alt="Протек Авто"
                width={220}
                height={80}
                className="mb-5"
              />
            </div>

            <div className="flex flex-col gap-[26px]">
              {/* График работы */}
              <p className="text-[#B7CAE2] text-lg font-normal leading-[1.4]">
                Пн-Пт 9:00 – 18:00, <br />
                Сб 10:00 – 16:00, Вс – выходной
              </p>

              {/* Телефон с ховер-эффектом */}
              <Link href="tel:+74952602060">
                <div className="flex items-center gap-[14px] bg-white hover:bg-[#EC1C24] text-[#000814] hover:text-white rounded-xl py-4 px-7 w-fit mb-[15px] transition-all cursor-pointer group">
                  <div className="relative w-4 h-4">
                    <Image
                      src="/icons/phone.svg"
                      alt="Телефон"
                      width={16}
                      height={16}
                      className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity"
                    />
                    <Image
                      src="/icons/phone-hover.svg"
                      alt="Телефон"
                      width={16}
                      height={16}
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="font-normal text-lg">
                    +7 (495) 260-20-60
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Блоки ссылок */}
          <div className="flex gap-[100px] mr-[120px]">
            {/* Первый блок ссылок - Покупателям */}
            <div className="flex flex-col gap-9">
              <div>
                <h3 className="text-white font-semibold text-2xl">
                  Покупателям
                </h3>
              </div>
              <div className="flex flex-col gap-[15px]">
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Оплата
                </Link>
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Возврат
                </Link>
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Доставка
                </Link>
              </div>
            </div>

            {/* Второй блок ссылок - Сотрудничество */}
            <div className="flex flex-col gap-9">
              <div>
                <h3 className="text-white font-semibold text-2xl">
                  Сотрудничество
                </h3>
              </div>
              <div className="flex flex-col gap-[15px]">
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Оптовым покупателям
                </Link>
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Поставщикам
                </Link>
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Дилерская сеть
                </Link>
              </div>
            </div>

            {/* Третий блок ссылок - PROTEK */}
            <div className="flex flex-col gap-9">
              <div>
                <h3 className="text-white font-semibold text-2xl">PROTEK</h3>
              </div>
              <div className="flex flex-col gap-[15px]">
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Вакансии
                </Link>
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  О компании
                </Link>
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Контакты
                </Link>
              </div>
            </div>

            {/* Четвертый блок ссылок - Оферта */}
            <div className="flex flex-col gap-9">
              <div>
                <h3 className="text-white font-semibold text-2xl">Оферта</h3>
              </div>
              <div className="flex flex-col gap-[15px]">
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Поставщика
                </Link>
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Поставщика
                </Link>
                <Link
                  href="/"
                  className="text-[#B7CAE2] text-base hover:text-white font-normal"
                >
                  Поставщика
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="flex justify-between items-center">
          {/* Платежные системы */}
          <div className="flex items-center gap-5">
            <Image
              src="/icons/mastercard.svg"
              alt="Mastercard"
              width={44}
              height={16}
            />
            <Image src="/icons/visa.svg" alt="Visa" width={54} height={16} />
            <Image src="/icons/mir.svg" alt="Mir" width={54} height={16} />
          </div>

          {/* Копирайт справа внизу */}
          <div className="text-[#CBD5E3] text-base opacity-50 font-normal">
            © 2025 Protek. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
