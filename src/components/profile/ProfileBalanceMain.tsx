import * as React from "react";
import ProfileBalanceCard from "./ProfileBalanceCard";

const ProfileBalanceMain = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex overflow-hidden flex-col justify-center p-8 w-full bg-white rounded-2xl min-h-[543px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap flex-1 gap-5 size-full max-md:max-w-full">
          <ProfileBalanceCard
            orgName="ООО «Рога и копыта»"
            contract="Договор № 241ГМ02 от 23.04.2025"
            balance="-124 567 ₽"
            limit="130 000 ₽"
            limitLeft="5 433 ₽"
            ordersSum="14 224 567 ₽"
            days="30 дней"
            daysLeft="Осталось 5 дней"
            paid="14 100 000 ₽"
            inputValue="124 567 ₽"
            buttonLabel="Пополнить"
          />
          <ProfileBalanceCard
            orgName="ООО «Рога и копыта»"
            contract="Договор № 542ГМ02 от 05.02.2025"
            balance="0 ₽"
            limit="10 000 ₽"
            limitLeft="10 000 ₽"
            ordersSum="34 567 ₽"
            days="10 дней"
            daysLeft="Осталось 10 дней"
            paid="34 567 ₽"
            inputValue="0 ₽"
            buttonLabel="Пополнить"
          />
          <ProfileBalanceCard
            orgName="ИП Иванов Иван Иванович"
            contract="Договор № 241ГМ02 от 23.04.2025"
            balance="4 320 ₽"
            limit="100 000 ₽"
            limitLeft="100 000 ₽"
            ordersSum="4 104 345 ₽"
            days="30 дней"
            daysLeft="Осталось 30 дней"
            paid="4 108 665 ₽"
            inputValue="124 567 ₽"
            buttonLabel="Пополнить"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileBalanceMain;


