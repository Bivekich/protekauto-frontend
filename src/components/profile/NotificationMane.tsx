import * as React from "react";
import LKMenu from '@/components/LKMenu';
import CustomCheckbox from './CustomCheckbox';

const NotificationMane = () => {
  const [all, setAll] = React.useState(false);
  const [delivery, setDelivery] = React.useState(false);
  const [payment, setPayment] = React.useState(false);
  const [reserve, setReserve] = React.useState(false);
  const [refuse, setRefuse] = React.useState(false);
  const [returnItem, setReturnItem] = React.useState(false);
  const [upd, setUpd] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [division, setDivision] = React.useState("Все");
  const divisionOptions = ["Все", "Склад 1", "Склад 2", "Офис"];
  const [isDivisionOpen, setIsDivisionOpen] = React.useState(false);
  const [address, setAddress] = React.useState("Все");
  const addressOptions = ["Все", "Калининград, ул. Понартская, 5", "Москва, ул. Ленина, 10"];
  const [isAddressOpen, setIsAddressOpen] = React.useState(false);
  const [showAddEmail, setShowAddEmail] = React.useState(true);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex overflow-hidden flex-col p-8 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-10 justify-between items-center w-full whitespace-nowrap max-md:max-w-full">
            <div className="self-stretch my-auto text-xl font-bold leading-none text-gray-950">
              voronin.p.e@gmail.com
            </div>
            <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto text-sm leading-snug text-gray-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/84d525d7bd06a6d1614a61af6453f489170b4196?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
              />
              <div className="self-stretch my-auto text-gray-600">Удалить</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 items-start mt-5 w-full text-sm leading-snug max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full">
              <div className="text-gray-950 max-md:max-w-full">
                Подразделение
              </div>
              <div className="relative mt-1.5">
                <div
                  className="flex items-center justify-between px-6 py-4 w-full bg-white rounded border border-solid border-stone-300 text-neutral-500 max-md:px-5 max-md:max-w-full cursor-pointer select-none"
                  onClick={() => setIsDivisionOpen((prev) => !prev)}
                  tabIndex={0}
                  onBlur={() => setIsDivisionOpen(false)}
                  style={{ minHeight: 48 }}
                >
                  <span className="text-neutral-500">{division}</span>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {isDivisionOpen && (
                  <ul className="absolute left-0 right-0 z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg animate-fadeIn">
                    {divisionOptions.map(option => (
                      <li
                        key={option}
                        className={`px-6 py-4 cursor-pointer hover:bg-blue-100 ${option === division ? 'bg-blue-50 font-semibold' : ''}`}
                        onMouseDown={() => { setDivision(option); setIsDivisionOpen(false); }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
              <div className="text-gray-950 max-md:max-w-full">
                Адрес доставки
              </div>
              <div className="relative mt-1.5">
                <div
                  className="flex items-center justify-between px-6 py-4 w-full bg-white rounded border border-solid border-stone-300 text-neutral-500 max-md:px-5 max-md:max-w-full cursor-pointer select-none"
                  onClick={() => setIsAddressOpen((prev) => !prev)}
                  tabIndex={0}
                  onBlur={() => setIsAddressOpen(false)}
                  style={{ minHeight: 48 }}
                >
                  <span className="text-neutral-500">{address}</span>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {isAddressOpen && (
                  <ul className="absolute left-0 right-0 z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg animate-fadeIn">
                    {addressOptions.map(option => (
                      <li
                        key={option}
                        className={`px-6 py-4 cursor-pointer hover:bg-blue-100 ${option === address ? 'bg-blue-50 font-semibold' : ''}`}
                        onMouseDown={() => { setAddress(option); setIsAddressOpen(false); }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 justify-between items-start mt-5 w-full max-md:max-w-full">
            <div className="flex gap-2.5 items-center pr-5">
              <CustomCheckbox selected={all} onSelect={() => setAll(v => !v)} />
              <div className="self-stretch my-auto text-sm font-medium leading-snug text-zinc-900">
                Все оповещения
              </div>
            </div>
            <div className="flex gap-2.5 items-center pr-5">
              <CustomCheckbox selected={delivery} onSelect={() => setDelivery(v => !v)} />
              <div className="self-stretch my-auto text-sm font-medium leading-snug text-zinc-900">
                Доставка товара
              </div>
            </div>
            <div className="flex gap-2.5 items-center pr-5">
              <CustomCheckbox selected={payment} onSelect={() => setPayment(v => !v)} />
              <div className="self-stretch my-auto text-sm font-medium leading-snug text-zinc-900">
                Поступление оплаты
              </div>
            </div>
            <div className="flex gap-2.5 items-center pr-5">
              <CustomCheckbox selected={reserve} onSelect={() => setReserve(v => !v)} />
              <div className="self-stretch my-auto text-sm font-medium leading-snug text-zinc-900">
                Снято с резерва
              </div>
            </div>
            <div className="flex gap-2.5 items-center pr-5">
              <CustomCheckbox selected={refuse} onSelect={() => setRefuse(v => !v)} />
              <div className="self-stretch my-auto text-sm font-medium leading-snug text-zinc-900">
                Отказ в поставке
              </div>
            </div>
            <div className="flex gap-2.5 items-center pr-5">
              <CustomCheckbox selected={returnItem} onSelect={() => setReturnItem(v => !v)} />
              <div className="self-stretch my-auto text-sm font-medium leading-snug text-zinc-900">
                Возврат товара
              </div>
            </div>
            <div className="flex gap-2.5 items-center pr-5">
              <CustomCheckbox selected={upd} onSelect={() => setUpd(v => !v)} />
              <div className="self-stretch my-auto text-sm font-medium leading-snug text-zinc-900">
                УПД или чек
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full border border-solid bg-stone-300 border-stone-300 min-h-[1px] max-md:max-w-full" />
        {showAddEmail && (
        <div className="flex flex-col mt-8 w-full max-md:max-w-full">
          <div className="text-xl font-bold leading-none text-gray-950">
            Добавление e-mail для уведомлений
          </div>
          <div className="flex flex-col mt-5 w-full max-md:max-w-full">
            <div className="text-sm leading-snug text-gray-950 max-md:max-w-full">
              Адрес электронной почты
            </div>
            <div className="flex flex-wrap gap-5 items-start mt-1.5 w-full text-base font-medium leading-tight whitespace-nowrap max-md:max-w-full">
              <div className="flex-1 shrink gap-2.5 self-stretch px-6 py-4 text-sm leading-snug bg-white rounded border border-solid basis-0 border-stone-300 min-h-[52px] min-w-[240px] text-neutral-500 max-md:px-5 max-md:max-w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Введите e-mail"
                    className="w-full bg-transparent outline-none text-gray-950 placeholder:text-gray-400"
                    style={{ border: 'none', padding: 0, margin: 0 }}
                  />
              </div>
                <div className="cursor-pointer gap-2.5 self-stretch px-5 py-4 text-center text-white bg-red-600 rounded-xl min-h-[50px]" onClick={() => setShowAddEmail(false)}>
                Готово
              </div>
                <div className="cursor-pointer gap-2.5 self-stretch px-5 py-4 text-center rounded-xl border border-red-600 border-solid min-h-[50px] text-gray-950" onClick={() => setShowAddEmail(false)}>
                Отменить
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 w-full border border-solid bg-stone-300 border-stone-300 min-h-[1px] max-md:max-w-full" />
        <div className="flex flex-wrap gap-10 justify-between items-start mt-8 w-full text-base font-medium leading-tight text-center max-md:max-w-full">
          <div className="gap-2.5 self-stretch px-5 py-4 text-white whitespace-nowrap bg-red-600 rounded-xl min-h-[50px]">
            Сохранить
          </div>
          <div
            className={`cursor-pointer gap-2.5 self-stretch px-5 py-4 rounded-xl border border-red-600 border-solid min-h-[50px] min-w-[240px] text-gray-950${showAddEmail ? ' opacity-50 pointer-events-none' : ''}`}
            onClick={() => { if (!showAddEmail) setShowAddEmail(true); }}
          >
            Добавить почту для уведомлений
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMane; 