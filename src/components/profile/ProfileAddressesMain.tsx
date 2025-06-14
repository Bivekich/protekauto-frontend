import * as React from "react";
import ProfileAddressCard from "./ProfileAddressCard";
import ProfileAddressWay from "./ProfileAddressWay";

const addresses = [
  {
    type: "Самовывоз",
    title: "Отделение почты России 238120",
    address: "Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1",
    recipient: "Воронин Павел",
    phone: "+7 911 491 15 18",
    storagePeriod: "15 дней",
    workTime: "10:00-22:00",
  },
  {
    type: "Доставка курьером",
    title: "Дом",
    address: "г. Калиниград, ул. Понартская, 5, кв./офис 1",
    recipient: "Воронин Павел",
    phone: "+7 911 491 15 18",
    comment: "Позвонить, не работает домофон. Или же позвонить, так как не работает домофон",
  },
  {
    type: "Самовывоз",
    title: "Отделение почты России 238120",
    address: "Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1",
    recipient: "Воронин Павел",
    phone: "+7 911 491 15 18",
    storagePeriod: "15 дней",
    workTime: "10:00-22:00",
  },
];

const ProfileAddressesMain = () => {
  const [mainIndex, setMainIndex] = React.useState(0);
  const [showWay, setShowWay] = React.useState(false);
  if (showWay) return <ProfileAddressWay onBack={() => setShowWay(false)} />;
  return (
    <div className="flex relative flex-col gap-8 items-start p-8 bg-white rounded-2xl flex-[1_0_0] max-md:gap-5">
      <div className="flex flex-wrap gap-5 items-start self-stretch">
        {addresses.map((addr, idx) => (
          <ProfileAddressCard
            key={idx}
            {...addr}
            onSelectMain={() => setMainIndex(idx)}
            isMain={mainIndex === idx}
          />
        ))}
      </div>
      <div
        layer-name="Button Small"
        className="flex relative gap-2.5 justify-center items-center px-5 py-3.5 bg-red-600 rounded-xl h-[50px] cursor-pointer"
        onClick={() => setShowWay(true)}
      >
        <div
          layer-name="Button Small"
          className="relative text-base font-medium leading-5 text-center text-white"
        >
          Добавить адрес доставки
      </div>
    </div>
  </div>
  );
}

export default ProfileAddressesMain;


