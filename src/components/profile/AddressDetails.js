import React from "react";

const AddressDetails = ({ onClose, onBack, address, setAddress }) => (
  <div className="flex flex-col px-8 pt-8 bg-white rounded-2xl  w-[480px] max-md:w-full max-md:px-5 max-md:pb-8">
    <div className="flex relative flex-col gap-8 items-start h-[730px] w-[420px] max-md:w-full max-md:h-auto max-sm:gap-5">
      <div className="flex relative flex-col gap-5 items-start self-stretch max-sm:gap-4">
        <div className="flex relative gap-2.5 justify-center items-center self-stretch pr-10 max-md:pr-5">
          <div className="text-3xl font-bold leading-9 flex-[1_0_0] text-gray-950 max-md:text-2xl max-sm:text-2xl">
            Пункт выдачи
          </div>
          <div onClick={onClose} className="cursor-pointer absolute right-0 top-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1.8 18L0 16.2L7.2 9L0 1.8L1.8 0L9 7.2L16.2 0L18 1.8L10.8 9L18 16.2L16.2 18L9 10.8L1.8 18Z" fill="#000814"/>
            </svg>
          </div>
        </div>
        <div className="flex relative gap-2.5 items-center self-stretch max-md:flex-wrap">
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Адрес"
            className="gap-2.5 self-stretch px-6 py-4 mt-3.5 w-full text-lg leading-snug whitespace-nowrap bg-white rounded border border-solid border-stone-300 min-h-[55px] text-neutral-500 max-md:px-5 outline-none"
          />
        </div>
      </div>
      <div className="relative gap-2 self-stretch text-base font-bold leading-5 text-gray-950">
        Калининград, Улица Космонавта Леонова 12
      </div>
      <div className="flex relative flex-col gap-2.5 items-start">
        <div className="flex relative gap-1.5 items-center">
          <div className="relative aspect-[1/1] h-[18px] w-[18px]" />
          <div className="text-sm leading-5 text-gray-600 max-sm:text-sm">
            Доставка для юридических лиц
          </div>
        </div>
        <div className="flex relative gap-1.5 items-center">
          <div className="relative aspect-[1/1] h-[18px] w-[18px]" />
          <div className="text-sm leading-5 text-gray-600 max-sm:text-sm">
            Возврат товаров
          </div>
        </div>
        <div className="flex relative gap-1.5 items-center">
          <div className="relative aspect-[1/1] h-[18px] w-[18px]" />
          <div className="text-sm leading-5 text-gray-600 max-sm:text-sm">
            Срок хранения заказа - 15 дней
          </div>
        </div>
      </div>
      <div className="flex relative flex-col gap-2 items-start self-stretch">
        <div className="self-stretch text-lg font-bold leading-5 text-gray-950 max-sm:text-base">
          Режим работы
        </div>
        <div className="flex relative gap-2 items-start self-stretch max-sm:flex-col max-sm:gap-1">
          <div className="text-sm leading-5 text-gray-400 flex-[1_0_0] max-sm:text-sm">
            Понедельник-пятница
          </div>
          <div className="text-sm leading-5 text-gray-400 flex-[1_0_0] max-sm:text-sm">
            <span>09:00 - 18:00</span>
            <br />
            <span>13:00 - 14:00 (перерыв)</span>
          </div>
        </div>
        <div className="flex relative gap-2 items-start self-stretch max-sm:flex-col max-sm:gap-1">
          <div className="text-sm leading-5 text-gray-400 flex-[1_0_0] max-sm:text-sm">
            Суббота
          </div>
          <div className="text-sm leading-5 text-gray-400 flex-[1_0_0] max-sm:text-sm">
            09:00 - 14:00
          </div>
        </div>
        <div className="flex relative gap-2 items-start self-stretch max-sm:flex-col max-sm:gap-1">
          <div className="text-sm leading-5 text-gray-400 flex-[1_0_0] max-sm:text-sm">
            Воскресенье
          </div>
          <div className="text-sm leading-5 text-gray-400 flex-[1_0_0] max-sm:text-sm">
            Выходной
          </div>
        </div>
      </div>
    </div>
    <div
      className="cursor-pointer relative gap-2.5 self-stretch px-5 py-3.5 text-base leading-5 text-center text-white bg-red-600 rounded-xl h-[50px] max-sm:px-4 max-sm:py-3 max-sm:h-12 max-sm:text-base"
      onClick={onBack}
    >
      Добавить адрес доставки
    </div>
  </div>
);

export default AddressDetails; 