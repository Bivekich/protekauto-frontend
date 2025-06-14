import React, { useState } from "react";
import CustomCheckbox from './CustomCheckbox';

const Tabs = ({ deliveryType, setDeliveryType }) => (
  <div className="flex items-center mt-5 w-full text-lg font-medium text-center whitespace-nowrap rounded-xl bg-slate-200">
    <div
      className={`flex flex-1 shrink gap-5 items-center self-stretch my-auto rounded-xl basis-0 cursor-pointer ${deliveryType === "pickup" ? "bg-red-600 text-white" : "bg-slate-200 text-gray-950"}`}
      onClick={() => setDeliveryType("pickup")}
    >
      <div className="flex-1 shrink gap-5 self-stretch px-6 py-3.5 my-auto w-full rounded-xl basis-0 max-md:px-5">
        Самовывоз
      </div>
    </div>
    <div
      className={`flex flex-1 shrink gap-5 items-center self-stretch my-auto rounded-xl basis-0 cursor-pointer ${deliveryType === "courier" ? "bg-red-600 text-white" : "bg-slate-200 text-gray-950"}`}
      onClick={() => setDeliveryType("courier")}
    >
      <div className="flex-1 shrink gap-5 self-stretch px-6 py-3.5 my-auto w-full rounded-xl basis-0 max-md:px-5">
        Курьером
      </div>
    </div>
  </div>
);

const AddressForm = ({ onDetectLocation, address, setAddress, onBack }) => {
  const [deliveryType, setDeliveryType] = useState("pickup"); // "pickup" или "courier"
  const [isPrivateHouse, setIsPrivateHouse] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [city, setCity] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");
  const [floor, setFloor] = useState("");
  const [intercom, setIntercom] = useState("");
  const [courierComment, setCourierComment] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");

  return (
    <div className="flex flex-col px-8 pt-8 bg-white rounded-2xl  w-[480px] max-md:w-full max-md:px-5 max-md:pb-8">
      <div className="flex flex-col w-full leading-tight">
        <div className="text-3xl font-bold text-gray-950">
          Способ доставки
        </div>
        <Tabs deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
      </div>
      {deliveryType === "pickup" && (
        <div className="flex flex-col mt-10 w-full">
          <div className="flex flex-col w-full">
            <div className="text-lg font-bold leading-tight text-gray-950">
              Куда доставить заказ?
            </div>
            <div className="mt-2 text-sm leading-snug text-gray-400 pb-2">
              Выберите пункт выдачи на карте или используйте поиск
            </div>
          </div>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Адрес"
            className="gap-2.5 self-stretch px-6 py-4 mt-3.5 w-full text-lg leading-snug whitespace-nowrap bg-white rounded border border-solid border-stone-300 min-h-[55px] text-neutral-500 max-md:px-5 outline-none"
          />
          <div
            className="cursor-pointer flex gap-1.5 items-center mt-3.5 w-full text-sm leading-snug text-gray-600"
            onClick={onDetectLocation}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d97ef790819abac069b7cd0595eae50a6e5b63?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
            />
            <div className="self-stretch my-auto">
              Определить местоположение
            </div>
          </div>
        </div>
      )}
      {deliveryType === "courier" && (
        <>
          <div className="flex relative flex-col gap-5 items-start self-stretch max-sm:gap-4 mt-10">
            <div className="flex relative gap-2.5 items-center self-stretch max-sm:gap-2">
              <input
                type="text"
                value={placeName}
                onChange={e => setPlaceName(e.target.value)}
                placeholder="Название, например 'Дом'"
                layer-name="Input"
                className="relative gap-2.5 px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 flex-[1_0_0] h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
              />
            </div>
            <div className="flex relative flex-col gap-2.5 items-start self-stretch max-sm:gap-2">
              <div
                layer-name="Адрес доставки"
                className="relative self-stretch text-lg font-bold leading-5 text-gray-950 max-sm:text-base"
              >
                Адрес доставки
              </div>
              <div className="flex relative gap-2.5 items-start self-stretch max-sm:gap-2">
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Город"
                  layer-name="Input"
                  className="relative gap-2.5 px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 flex-[1_0_0] h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
                />
                <input
                  type="text"
                  value={houseNumber}
                  onChange={e => setHouseNumber(e.target.value)}
                  placeholder="Номер дома"
                  layer-name="Input"
                  className="relative gap-2.5 px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 flex-[1_0_0] h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
                />
              </div>
              <div className="flex relative gap-2.5 items-center self-stretch max-sm:gap-2">
                <input
                  type="text"
                  value={apartment}
                  onChange={e => setApartment(e.target.value)}
                  placeholder="Квартира"
                  layer-name="Input"
                  className="relative gap-2.5 px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 flex-[1_0_0] h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
                />
                <div
                  layer-name="Check_block"
                  className="flex relative gap-2.5 items-center flex-[1_0_0] h-[22px] max-sm:gap-2"
                >
                  <CustomCheckbox selected={isPrivateHouse} onSelect={() => setIsPrivateHouse(v => !v)} />
                  <div
                    layer-name="Экспресс доставка"
                    className="relative text-sm font-medium leading-5 text-zinc-900"
                  >
                    Частный дом
                  </div>
                </div>
              </div>
              <div className="flex relative gap-2.5 items-start self-stretch max-sm:gap-2">
                <div className="flex flex-col flex-[1_0_0]">
                  <div className="text-xs text-gray-400 mb-1">Подъезд</div>
                  <input
                    type="text"
                    value={entrance}
                    onChange={e => setEntrance(e.target.value)}
                    layer-name="Input"
                    className="relative gap-2.5 px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 w-full h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
                  />
                </div>
                <div className="flex flex-col flex-[1_0_0]">
                  <div className="text-xs text-gray-400 mb-1">Этаж</div>
                  <input
                    type="text"
                    value={floor}
                    onChange={e => setFloor(e.target.value)}
                    layer-name="Input"
                    className="relative gap-2.5 px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 w-full h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
                  />
                </div>
                <div className="flex flex-col flex-[1_0_0]">
                  <div className="text-xs text-gray-400 mb-1">Домофон</div>
                  <input
                    type="text"
                    value={intercom}
                    onChange={e => setIntercom(e.target.value)}
                    layer-name="Input"
                    className="relative gap-2.5 px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 w-full h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
                  />
                </div>
              </div>
              <div className="flex relative gap-2.5 items-start self-stretch h-[100px] max-sm:gap-2 max-sm:h-20">
                <textarea
                  value={courierComment}
                  onChange={e => setCourierComment(e.target.value)}
                  placeholder="Комментарий курьеру"
                  layer-name="Input"
                  className="relative gap-2.5 self-stretch px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 flex-[1_0_0] text-neutral-500 max-sm:gap-2 max-sm:text-base outline-none"
                  style={{ resize: 'none' }}
                />
              </div>
            </div>
            <div className="flex relative flex-col gap-2.5 items-start self-stretch max-sm:gap-2">
              <div
                layer-name="Данные получателя"
                className="relative self-stretch text-lg font-bold leading-5 text-gray-950 max-sm:text-base"
              >
                Данные получателя
              </div>
              <input
                type="text"
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                placeholder="ФИО"
                layer-name="Input"
                className="relative gap-2.5 self-stretch px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
              />
              <input
                type="text"
                value={recipientPhone}
                onChange={e => setRecipientPhone(e.target.value)}
                placeholder="Номер телефона"
                layer-name="Input"
                className="relative gap-2.5 self-stretch px-6 py-4 text-lg leading-6 bg-white rounded border border-solid border-stone-300 h-[55px] text-neutral-500 max-sm:gap-2 max-sm:text-base max-sm:h-[50px] outline-none"
              />
            </div>
            <div
              className="cursor-pointer relative gap-2.5 self-stretch px-5 py-3.5 text-base leading-5 text-center text-white bg-red-600 rounded-xl h-[50px] max-sm:px-4 max-sm:py-3 max-sm:h-12 max-sm:text-base"
              onClick={onBack}
            >
              Добавить адрес доставки
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressForm; 