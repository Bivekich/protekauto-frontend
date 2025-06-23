import React from "react";
import { useRouter } from "next/router";

const crumbsMap: Record<string, string> = {
  "/profile-orders": "Заказы",
  "/profile-history": "История поиска",
  "/profile-announcement": "Уведомления",
  "/profile-notification": "Оповещения",
  "/profile-addresses": "Адреса доставки",
  "/profile-gar": "Гараж",
  "/profile-set": "Настройки аккаунта",
  "/profile-balance": "Баланс",
  "/profile-req": "Реквизиты",
  "/profile-settlements": "Взаиморасчеты",
  "/profile-acts": "Акты сверки",
};

function normalizePath(path: string): string {
  return path.replace(/\/+$/, "");
}

export default function ProfileInfo() {
  const router = useRouter();
  const currentPath: string = normalizePath(router.asPath);
  const crumbLabel: string = crumbsMap[currentPath] || "Профиль";
  return (
    <section className="section-info">
      <div className="w-layout-blockcontainer container info w-container">
        <div className="w-layout-vflex flex-block-9">
          <div className="w-layout-hflex flex-block-7">
            <a href="/" className="link-block w-inline-block">
              <div>Главная</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="#" className="link-block w-inline-block">
              <div>Личный кабинет</div>
            </a>
            <div className="text-block-3">→</div>
            <a href="#" className="link-block-2 w-inline-block">
              <div>{crumbLabel}</div>
            </a>
          </div>
          <div className="w-layout-hflex flex-block-8">
            <div className="w-layout-hflex flex-block-10">
              <h1 className="heading">{crumbLabel}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 