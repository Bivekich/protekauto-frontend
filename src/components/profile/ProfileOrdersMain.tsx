import * as React from "react";

interface ProfileOrdersMainProps {
  // Добавьте необходимые пропсы, если они нужны, например:
  // orders?: Order[];
}

const tabs = [
  { label: "Все" },
  { label: "Текущие" },
  { label: "Выполненные" },
  { label: "Отмененные" },
];

const ProfileOrdersMain: React.FC<ProfileOrdersMainProps> = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [period, setPeriod] = React.useState("Все");
  const periodOptions = ["Все", "Сегодня", "Неделя", "Месяц", "Год"];
  const [deliveryMethod, setDeliveryMethod] = React.useState("Все");
  const deliveryOptions = ["Все", "Самовывоз", "Доставка"];
  const [isPeriodOpen, setIsPeriodOpen] = React.useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = React.useState(false);
  const [docsSwitch1, setDocsSwitch1] = React.useState(false);
  const [docsSwitch2, setDocsSwitch2] = React.useState(false);
  const [docsSwitch3, setDocsSwitch3] = React.useState(false);

  return (
    <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
      <div className="flex flex-wrap gap-5 w-full whitespace-nowrap max-md:max-w-full">
        <div className="flex flex-wrap flex-1 shrink gap-5 self-start text-lg font-medium leading-tight text-center basis-[60px] min-w-[240px] text-gray-950 max-md:max-w-full">
          {tabs.map((tab, idx) => (
            <div
              key={tab.label}
              className={`flex flex-1 shrink gap-5 items-center h-full rounded-xl basis-0 ${activeTab === idx ? "bg-red-600 text-white" : "bg-slate-200 text-gray-950"}`}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveTab(idx)}
            >
              <div
                className={`flex-1 shrink gap-5 self-stretch px-6 py-3.5 my-auto w-full rounded-xl basis-0 max-md:px-5 ${activeTab === idx ? "bg-red-600 text-white" : "bg-slate-200 text-gray-950"}`}
              >
                {tab.label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 shrink gap-5 items-center px-8 py-3 h-full text-base leading-snug text-gray-400 bg-white rounded-lg basis-0 max-w-[360px] min-w-[240px] max-md:px-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск уведомлений"
            className="flex-1 shrink self-stretch my-auto basis-0 text-ellipsis outline-none bg-transparent text-gray-950 placeholder:text-gray-400"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c08da0aac46dcf126a2a1a0e5832e3b069cd2d94?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
            className="object-contain shrink-0 self-stretch my-auto w-5 rounded-sm aspect-square"
          />
        </div>
      </div>
      <div className="flex overflow-hidden flex-col p-8 mt-5 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="text-3xl font-bold leading-none text-gray-950">Все</div>
        <div className="flex flex-wrap gap-5 items-start mt-5 w-full text-sm leading-snug max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full">
            <div className="text-gray-950 max-md:max-w-full">Период</div>
            <div className="relative mt-1.5">
              <div
                className="flex items-center justify-between px-6 py-4 w-full bg-white rounded border border-solid border-stone-300 text-neutral-500 max-md:px-5 max-md:max-w-full cursor-pointer select-none"
                onClick={() => setIsPeriodOpen((prev) => !prev)}
                tabIndex={0}
                onBlur={() => setIsPeriodOpen(false)}
                style={{ minHeight: 48 }}
              >
                <span className="text-neutral-500">{period}</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              {isPeriodOpen && (
                <ul className="absolute left-0 right-0 z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg animate-fadeIn">
                  {periodOptions.map(option => (
                    <li
                      key={option}
                      className={`px-6 py-4 cursor-pointer hover:bg-blue-100 ${option === period ? 'bg-blue-50 font-semibold' : ''}`}
                      onMouseDown={() => { setPeriod(option); setIsPeriodOpen(false); }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
            <div className="text-gray-950 max-md:max-w-full">Способ получения</div>
            <div className="relative mt-1.5">
              <div
                className="flex items-center justify-between px-6 py-4 w-full bg-white rounded border border-solid border-stone-300 text-neutral-500 max-md:px-5 max-md:max-w-full cursor-pointer select-none"
                onClick={() => setIsDeliveryOpen((prev) => !prev)}
                tabIndex={0}
                onBlur={() => setIsDeliveryOpen(false)}
                style={{ minHeight: 48 }}
              >
                <span className="text-neutral-500">{deliveryMethod}</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              {isDeliveryOpen && (
                <ul className="absolute left-0 right-0 z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg animate-fadeIn">
                  {deliveryOptions.map(option => (
                    <li
                      key={option}
                      className={`px-6 py-4 cursor-pointer hover:bg-blue-100 ${option === deliveryMethod ? 'bg-blue-50 font-semibold' : ''}`}
                      onMouseDown={() => { setDeliveryMethod(option); setIsDeliveryOpen(false); }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 py-8 mt-5 w-full bg-white rounded-2xl max-md:max-w-full">
          <div className="flex flex-col pr-7 pl-5 w-full max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div className="flex gap-5 items-center self-stretch my-auto min-w-[240px]">
                <div className="gap-5 self-stretch px-6 py-3.5 my-auto text-sm font-medium leading-snug text-center text-white whitespace-nowrap bg-blue-600 rounded-xl max-md:px-5">
                  Выполняется
                </div>
                <div className="self-stretch my-auto text-xl font-semibold leading-tight text-gray-950">
                  Заказ от 2 августа 2024
                </div>
              </div>
              <div className="flex flex-col self-stretch pt-0.5 my-auto w-[188px]">
                <div className="flex items-center w-full gap-3">
                  <div className="self-stretch my-auto text-sm leading-snug text-neutral-500">
                    Показать документы
                  </div>
                  <div
                    className="flex flex-col self-stretch my-auto w-9 cursor-pointer"
                    onClick={() => setDocsSwitch1((prev) => !prev)}
                  >
                    <div className={`flex flex-col justify-center items-start p-0.5 rounded-[100px] ${docsSwitch1 ? 'bg-black' : 'bg-zinc-300'}`} style={{ width: 32, height: 20 }}>
                      <div className={`flex shrink-0 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${docsSwitch1 ? 'translate-x-4' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-5 items-center pr-24 pb-2.5 pl-2 w-full text-sm text-gray-400 whitespace-nowrap border-b border-solid border-b-stone-300 max-md:pr-5 max-md:max-w-full">
              <div className="gap-1.5 self-stretch my-auto w-9">№</div>
              <div className="flex gap-1.5 items-center self-stretch my-auto w-[130px]">
                <div className="self-stretch my-auto">Производитель</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6986f8aa2636258c97edd8ea0af4c70581cdb73e?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
              </div>
              <div className="gap-1.5 self-stretch my-auto w-[120px]">
                Артикул
              </div>
              <div className="flex flex-1 shrink gap-1.5 items-center self-stretch my-auto basis-0 min-w-[240px]">
                <div className="self-stretch my-auto">Наименование</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6986f8aa2636258c97edd8ea0af4c70581cdb73e?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
              </div>
              <div className="self-stretch my-auto w-[180px]">Статус</div>
              <div className="self-stretch my-auto w-[60px]">Кол-во</div>
              <div className="self-stretch my-auto text-right w-[90px]">
                Стоимость
              </div>
            </div>
            <div className="flex flex-col mt-1.5 w-full max-md:max-w-full">
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  1
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Ожидает поставки в ПВЗ
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e482a908a2d4339d70ca6b07d5cc745baabad4b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  2
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Ожидает поставки в ПВЗ
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e482a908a2d4339d70ca6b07d5cc745baabad4b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  3
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Ожидает поставки в ПВЗ
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e8d747981aca9b647b0cd0cd5b340b8caea6b64?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
            </div>
          </div>
          <div className="flex flex-col pr-7 pl-5 mt-5 w-full max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-start w-full text-gray-950 max-md:max-w-full">
              <div className="flex gap-2.5 items-end text-sm leading-snug whitespace-nowrap">
                <button type="button">
                  Скачать
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.00255 9.9973C4.00255 7.41452 4.00255 4.83143 4.00255 2.24866C4.00255 2.00095 4.00351 2 4.2556 2C6.81929 2 9.38265 2 11.9463 2C12.1774 2 12.1783 2.00064 12.1783 2.23722C12.1786 3.36236 12.1815 4.48751 12.1755 5.61233C12.1745 5.76762 12.2227 5.80763 12.3739 5.80668C13.5096 5.80096 14.6456 5.80319 15.7813 5.80319C15.9993 5.80319 16.0002 5.80414 16.0002 6.02167C16.0002 9.94077 16.0002 13.8599 16.0002 17.779C16.0002 17.9952 15.9993 17.9962 15.7807 17.9962C11.9221 17.9962 8.06347 17.9956 4.20486 18C4.04148 18 4 17.9505 4 17.7929C4.00447 15.1943 4.00319 12.5956 4.00319 9.99667H4.00255V9.9973ZM11.9125 11.0018C12.5759 11.0018 13.2393 10.9992 13.9028 11.004C14.0253 11.0049 14.0728 10.9713 14.0693 10.8427C14.0614 10.5311 14.0623 10.2193 14.0687 9.90775C14.0713 9.78834 14.0272 9.75373 13.9111 9.75404C12.5788 9.75722 11.2465 9.75785 9.91428 9.75404C9.78089 9.75373 9.75377 9.80644 9.75568 9.92362C9.76111 10.2247 9.7643 10.5261 9.75409 10.8268C9.7493 10.97 9.80068 11.0053 9.93726 11.004C10.5952 10.998 11.2536 11.0011 11.9116 11.0018H11.9125ZM11.9125 12.292C11.2491 12.292 10.5857 12.2946 9.92226 12.2898C9.79908 12.2889 9.75281 12.3244 9.756 12.4521C9.76366 12.7636 9.76271 13.0755 9.756 13.387C9.75345 13.5083 9.801 13.5391 9.91524 13.5388C11.2475 13.5363 12.5798 13.5363 13.912 13.5394C14.0282 13.5394 14.0719 13.5048 14.0697 13.3857C14.0633 13.0796 14.0604 12.7728 14.0703 12.4667C14.0751 12.3235 14.024 12.2879 13.8871 12.2892C13.2291 12.2952 12.5708 12.292 11.9128 12.2924L11.9125 12.292ZM11.9125 16.073C12.5759 16.073 13.2393 16.0705 13.9028 16.0752C14.0253 16.0762 14.0728 16.0425 14.0693 15.9139C14.0614 15.6024 14.0623 15.2905 14.0687 14.979C14.0713 14.8596 14.0272 14.825 13.9111 14.8253C12.5788 14.8285 11.2465 14.8291 9.91428 14.8253C9.78089 14.825 9.75377 14.8777 9.75568 14.9949C9.76111 15.2959 9.7643 15.5973 9.75409 15.898C9.7493 16.0412 9.80068 16.0765 9.93726 16.0752C10.5952 16.0692 11.2536 16.0724 11.9116 16.073H11.9125ZM7.19264 11.0018C7.56408 11.0018 7.93583 10.9983 8.30727 11.0037C8.4247 11.0056 8.4665 10.9675 8.46395 10.849C8.45757 10.5321 8.45789 10.2152 8.46331 9.89854C8.46523 9.78517 8.42023 9.75404 8.3127 9.75436C7.56982 9.75754 6.82663 9.75785 6.08375 9.755C5.97398 9.75468 5.93345 9.79056 5.93505 9.9014C5.94015 10.2129 5.94239 10.5248 5.93345 10.836C5.92962 10.9732 5.98323 11.0056 6.10992 11.0034C6.47083 10.997 6.83173 11.0011 7.19264 11.0014V11.0018ZM7.19902 12.2917V12.2924C6.82758 12.2924 6.45583 12.2952 6.08439 12.2908C5.97557 12.2895 5.93313 12.3248 5.93473 12.4365C5.93984 12.7586 5.9392 13.0809 5.93473 13.4029C5.93313 13.509 5.97717 13.5385 6.07737 13.5382C6.82567 13.5356 7.57397 13.536 8.32227 13.5388C8.42374 13.5391 8.46459 13.5058 8.46331 13.4016C8.45884 13.0796 8.45789 12.7573 8.46331 12.4353C8.46523 12.3228 8.42215 12.2889 8.31365 12.2901C7.94221 12.2946 7.57078 12.2917 7.19902 12.2917ZM7.19647 16.0724V16.073C7.56791 16.073 7.93966 16.0705 8.3111 16.0746C8.41609 16.0759 8.46587 16.0482 8.46395 15.9326C8.45821 15.6106 8.45916 15.2883 8.46299 14.9663C8.46427 14.865 8.42981 14.8256 8.32514 14.8262C7.57684 14.8291 6.82854 14.8297 6.08024 14.8262C5.96632 14.8256 5.93377 14.8697 5.93537 14.9764C5.93984 15.2934 5.94015 15.6103 5.93473 15.9272C5.93282 16.0371 5.97111 16.0759 6.08216 16.0746C6.45359 16.0698 6.82503 16.0727 7.19679 16.0727L7.19647 16.0724Z" fill="#4DB45E"/>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex gap-2.5 items-end">
                <div className="text-sm leading-snug text-gray-950">Итого</div>
                <div className="text-lg font-semibold leading-tight text-gray-950">
                  39 389 ₽
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4 w-full text-sm max-md:max-w-full">
              <div className="font-semibold leading-tight text-gray-950 max-md:max-w-full">
                Покупатель: ООО ПРОТЕК
              </div>
              <div className="mt-1.5 leading-snug text-gray-600 max-md:max-w-full">
                Адрес доставки: Калининградская область, Калиниград, улица
                Понартская, 5, кв./офис 1, Подъезд 1, этаж 1
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 py-8 mt-5 w-full bg-white rounded-2xl max-md:max-w-full">
          <div className="flex flex-col pr-7 pl-5 w-full max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div className="flex gap-5 items-center self-stretch my-auto min-w-[240px]">
                <div className="gap-5 self-stretch px-6 py-3.5 my-auto text-sm font-medium leading-snug text-center text-white whitespace-nowrap bg-green-500 rounded-xl max-md:px-5">
                  Доставлен
                </div>
                <div className="self-stretch my-auto text-xl font-semibold leading-tight text-gray-950">
                  Заказ от 2 августа 2024
                </div>
              </div>
              <div className="flex flex-col self-stretch pt-0.5 my-auto w-[188px]">
                <div className="flex items-center w-full gap-3">
                  <div className="self-stretch my-auto text-sm leading-snug text-neutral-500">
                    Показать документы
                  </div>
                  <div
                    className="flex flex-col self-stretch my-auto w-9 cursor-pointer"
                    onClick={() => setDocsSwitch2((prev) => !prev)}
                  >
                    <div className={`flex flex-col justify-center items-start p-0.5 rounded-[100px] ${docsSwitch2 ? 'bg-black' : 'bg-zinc-300'}`} style={{ width: 32, height: 20 }}>
                      <div className={`flex shrink-0 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${docsSwitch2 ? 'translate-x-4' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-5 items-center pr-24 pb-2.5 pl-2 w-full text-sm text-gray-400 whitespace-nowrap border-b border-solid border-b-stone-300 max-md:pr-5 max-md:max-w-full">
              <div className="gap-1.5 self-stretch my-auto w-9">№</div>
              <div className="flex gap-1.5 items-center self-stretch my-auto w-[130px]">
                <div className="self-stretch my-auto">Производитель</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6986f8aa2636258c97edd8ea0af4c70581cdb73e?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
              </div>
              <div className="gap-1.5 self-stretch my-auto w-[120px]">
                Артикул
              </div>
              <div className="flex flex-1 shrink gap-1.5 items-center self-stretch my-auto basis-0 min-w-[240px]">
                <div className="self-stretch my-auto">Наименование</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6986f8aa2636258c97edd8ea0af4c70581cdb73e?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
              </div>
              <div className="self-stretch my-auto w-[180px]">Статус</div>
              <div className="self-stretch my-auto w-[60px]">Кол-во</div>
              <div className="self-stretch my-auto text-right w-[90px]">
                Стоимость
              </div>
            </div>
            <div className="flex flex-col mt-1.5 w-full max-md:max-w-full">
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  1
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Ожидает поставки в ПВЗ
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e482a908a2d4339d70ca6b07d5cc745baabad4b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  2
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Ожидает поставки в ПВЗ
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e482a908a2d4339d70ca6b07d5cc745baabad4b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  3
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Ожидает поставки в ПВЗ
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e482a908a2d4339d70ca6b07d5cc745baabad4b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
            </div>
          </div>
          <div className="flex flex-col pr-7 pl-5 mt-5 w-full max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-start w-full text-gray-950 max-md:max-w-full">
              <div className="flex gap-2.5 items-end text-sm leading-snug whitespace-nowrap">
                <button type="button">
                  Скачать
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.00255 9.9973C4.00255 7.41452 4.00255 4.83143 4.00255 2.24866C4.00255 2.00095 4.00351 2 4.2556 2C6.81929 2 9.38265 2 11.9463 2C12.1774 2 12.1783 2.00064 12.1783 2.23722C12.1786 3.36236 12.1815 4.48751 12.1755 5.61233C12.1745 5.76762 12.2227 5.80763 12.3739 5.80668C13.5096 5.80096 14.6456 5.80319 15.7813 5.80319C15.9993 5.80319 16.0002 5.80414 16.0002 6.02167C16.0002 9.94077 16.0002 13.8599 16.0002 17.779C16.0002 17.9952 15.9993 17.9962 15.7807 17.9962C11.9221 17.9962 8.06347 17.9956 4.20486 18C4.04148 18 4 17.9505 4 17.7929C4.00447 15.1943 4.00319 12.5956 4.00319 9.99667H4.00255V9.9973ZM11.9125 11.0018C12.5759 11.0018 13.2393 10.9992 13.9028 11.004C14.0253 11.0049 14.0728 10.9713 14.0693 10.8427C14.0614 10.5311 14.0623 10.2193 14.0687 9.90775C14.0713 9.78834 14.0272 9.75373 13.9111 9.75404C12.5788 9.75722 11.2465 9.75785 9.91428 9.75404C9.78089 9.75373 9.75377 9.80644 9.75568 9.92362C9.76111 10.2247 9.7643 10.5261 9.75409 10.8268C9.7493 10.97 9.80068 11.0053 9.93726 11.004C10.5952 10.998 11.2536 11.0011 11.9116 11.0018H11.9125ZM11.9125 12.292C11.2491 12.292 10.5857 12.2946 9.92226 12.2898C9.79908 12.2889 9.75281 12.3244 9.756 12.4521C9.76366 12.7636 9.76271 13.0755 9.756 13.387C9.75345 13.5083 9.801 13.5391 9.91524 13.5388C11.2475 13.5363 12.5798 13.5363 13.912 13.5394C14.0282 13.5394 14.0719 13.5048 14.0697 13.3857C14.0633 13.0796 14.0604 12.7728 14.0703 12.4667C14.0751 12.3235 14.024 12.2879 13.8871 12.2892C13.2291 12.2952 12.5708 12.292 11.9128 12.2924L11.9125 12.292ZM11.9125 16.073C12.5759 16.073 13.2393 16.0705 13.9028 16.0752C14.0253 16.0762 14.0728 16.0425 14.0693 15.9139C14.0614 15.6024 14.0623 15.2905 14.0687 14.979C14.0713 14.8596 14.0272 14.825 13.9111 14.8253C12.5788 14.8285 11.2465 14.8291 9.91428 14.8253C9.78089 14.825 9.75377 14.8777 9.75568 14.9949C9.76111 15.2959 9.7643 15.5973 9.75409 15.898C9.7493 16.0412 9.80068 16.0765 9.93726 16.0752C10.5952 16.0692 11.2536 16.0724 11.9116 16.073H11.9125ZM7.19264 11.0018C7.56408 11.0018 7.93583 10.9983 8.30727 11.0037C8.4247 11.0056 8.4665 10.9675 8.46395 10.849C8.45757 10.5321 8.45789 10.2152 8.46331 9.89854C8.46523 9.78517 8.42023 9.75404 8.3127 9.75436C7.56982 9.75754 6.82663 9.75785 6.08375 9.755C5.97398 9.75468 5.93345 9.79056 5.93505 9.9014C5.94015 10.2129 5.94239 10.5248 5.93345 10.836C5.92962 10.9732 5.98323 11.0056 6.10992 11.0034C6.47083 10.997 6.83173 11.0011 7.19264 11.0014V11.0018ZM7.19902 12.2917V12.2924C6.82758 12.2924 6.45583 12.2952 6.08439 12.2908C5.97557 12.2895 5.93313 12.3248 5.93473 12.4365C5.93984 12.7586 5.9392 13.0809 5.93473 13.4029C5.93313 13.509 5.97717 13.5385 6.07737 13.5382C6.82567 13.5356 7.57397 13.536 8.32227 13.5388C8.42374 13.5391 8.46459 13.5058 8.46331 13.4016C8.45884 13.0796 8.45789 12.7573 8.46331 12.4353C8.46523 12.3228 8.42215 12.2889 8.31365 12.2901C7.94221 12.2946 7.57078 12.2917 7.19902 12.2917ZM7.19647 16.0724V16.073C7.56791 16.073 7.93966 16.0705 8.3111 16.0746C8.41609 16.0759 8.46587 16.0482 8.46395 15.9326C8.45821 15.6106 8.45916 15.2883 8.46299 14.9663C8.46427 14.865 8.42981 14.8256 8.32514 14.8262C7.57684 14.8291 6.82854 14.8297 6.08024 14.8262C5.96632 14.8256 5.93377 14.8697 5.93537 14.9764C5.93984 15.2934 5.94015 15.6103 5.93473 15.9272C5.93282 16.0371 5.97111 16.0759 6.08216 16.0746C6.45359 16.0698 6.82503 16.0727 7.19679 16.0727L7.19647 16.0724Z" fill="#4DB45E"/>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex gap-2.5 items-end">
                <div className="text-sm leading-snug text-gray-950">Итого</div>
                <div className="text-lg font-semibold leading-tight text-gray-950">
                  39 389 ₽
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4 w-full text-sm max-md:max-w-full">
              <div className="font-semibold leading-tight text-gray-950 max-md:max-w-full">
                Покупатель: ООО ПРОТЕК
              </div>
              <div className="mt-1.5 leading-snug text-gray-600 max-md:max-w-full">
                Адрес доставки: Калининградская область, Калиниград, улица
                Понартская, 5, кв./офис 1, Подъезд 1, этаж 1
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 py-8 mt-5 w-full bg-white rounded-2xl max-md:max-w-full">
          <div className="flex flex-col pr-7 pl-5 w-full max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div className="flex gap-5 items-center self-stretch my-auto min-w-[240px]">
                <div className="gap-5 self-stretch px-6 py-3.5 my-auto text-sm font-medium leading-snug text-center text-black whitespace-nowrap bg-yellow-400 rounded-xl max-md:px-5">
                  Отменен
                </div>
                <div className="self-stretch my-auto text-xl font-semibold leading-tight text-gray-950">
                  Заказ от 2 августа 2024
                </div>
              </div>
              <div className="flex flex-col self-stretch pt-0.5 my-auto w-[188px]">
                <div className="flex items-center w-full gap-3">
                  <div className="self-stretch my-auto text-sm leading-snug text-neutral-500">
                    Показать документы
                  </div>
                  <div
                    className="flex flex-col self-stretch my-auto w-9 cursor-pointer"
                    onClick={() => setDocsSwitch3((prev) => !prev)}
                  >
                    <div className={`flex flex-col justify-center items-start p-0.5 rounded-[100px] ${docsSwitch3 ? 'bg-black' : 'bg-zinc-300'}`} style={{ width: 32, height: 20 }}>
                      <div className={`flex shrink-0 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${docsSwitch3 ? 'translate-x-4' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-5 items-center pr-24 pb-2.5 pl-2 w-full text-sm text-gray-400 whitespace-nowrap border-b border-solid border-b-stone-300 max-md:pr-5 max-md:max-w-full">
              <div className="gap-1.5 self-stretch my-auto w-9">№</div>
              <div className="flex gap-1.5 items-center self-stretch my-auto w-[130px]">
                <div className="self-stretch my-auto">Производитель</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6986f8aa2636258c97edd8ea0af4c70581cdb73e?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
              </div>
              <div className="gap-1.5 self-stretch my-auto w-[120px]">
                Артикул
              </div>
              <div className="flex flex-1 shrink gap-1.5 items-center self-stretch my-auto basis-0 min-w-[240px]">
                <div className="self-stretch my-auto">Наименование</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6986f8aa2636258c97edd8ea0af4c70581cdb73e?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
              </div>
              <div className="self-stretch my-auto w-[180px]">Статус</div>
              <div className="self-stretch my-auto w-[60px]">Кол-во</div>
              <div className="self-stretch my-auto text-right w-[90px]">
                Стоимость
              </div>
            </div>
            <div className="flex flex-col mt-1.5 w-full max-md:max-w-full">
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  1
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Отказ в поставке
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e482a908a2d4339d70ca6b07d5cc745baabad4b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  2
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Отказ в поставке
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e482a908a2d4339d70ca6b07d5cc745baabad4b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
              <div className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                  3
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                    Ganz
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                    GIE37312
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                    Ролик ремня ГРМ VW AD GANZ GIE37312
                  </div>
                  <div className="self-stretch text-sm font-semibold leading-5 text-gray-950 w-[180px]">
                    Отказ в поставке
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                    1 шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                      18 763 ₽
                    </div>
                    <div className="text-xs text-gray-400">18 763 ₽/шт</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-center self-stretch my-auto w-[50px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e482a908a2d4339d70ca6b07d5cc745baabad4b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                  <div className="flex shrink-0 self-stretch my-auto h-[18px] rotate-[3.141592653589793rad] w-[18px]" />
                </div>
              </div>
              <div className="w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
            </div>
          </div>
          <div className="flex flex-col pr-7 pl-5 mt-5 w-full max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-start w-full text-gray-950 max-md:max-w-full">
              <div className="flex gap-2.5 items-end text-sm leading-snug whitespace-nowrap">
                <button type="button">
                  Скачать
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.00255 9.9973C4.00255 7.41452 4.00255 4.83143 4.00255 2.24866C4.00255 2.00095 4.00351 2 4.2556 2C6.81929 2 9.38265 2 11.9463 2C12.1774 2 12.1783 2.00064 12.1783 2.23722C12.1786 3.36236 12.1815 4.48751 12.1755 5.61233C12.1745 5.76762 12.2227 5.80763 12.3739 5.80668C13.5096 5.80096 14.6456 5.80319 15.7813 5.80319C15.9993 5.80319 16.0002 5.80414 16.0002 6.02167C16.0002 9.94077 16.0002 13.8599 16.0002 17.779C16.0002 17.9952 15.9993 17.9962 15.7807 17.9962C11.9221 17.9962 8.06347 17.9956 4.20486 18C4.04148 18 4 17.9505 4 17.7929C4.00447 15.1943 4.00319 12.5956 4.00319 9.99667H4.00255V9.9973ZM11.9125 11.0018C12.5759 11.0018 13.2393 10.9992 13.9028 11.004C14.0253 11.0049 14.0728 10.9713 14.0693 10.8427C14.0614 10.5311 14.0623 10.2193 14.0687 9.90775C14.0713 9.78834 14.0272 9.75373 13.9111 9.75404C12.5788 9.75722 11.2465 9.75785 9.91428 9.75404C9.78089 9.75373 9.75377 9.80644 9.75568 9.92362C9.76111 10.2247 9.7643 10.5261 9.75409 10.8268C9.7493 10.97 9.80068 11.0053 9.93726 11.004C10.5952 10.998 11.2536 11.0011 11.9116 11.0018H11.9125ZM11.9125 12.292C11.2491 12.292 10.5857 12.2946 9.92226 12.2898C9.79908 12.2889 9.75281 12.3244 9.756 12.4521C9.76366 12.7636 9.76271 13.0755 9.756 13.387C9.75345 13.5083 9.801 13.5391 9.91524 13.5388C11.2475 13.5363 12.5798 13.5363 13.912 13.5394C14.0282 13.5394 14.0719 13.5048 14.0697 13.3857C14.0633 13.0796 14.0604 12.7728 14.0703 12.4667C14.0751 12.3235 14.024 12.2879 13.8871 12.2892C13.2291 12.2952 12.5708 12.292 11.9128 12.2924L11.9125 12.292ZM11.9125 16.073C12.5759 16.073 13.2393 16.0705 13.9028 16.0752C14.0253 16.0762 14.0728 16.0425 14.0693 15.9139C14.0614 15.6024 14.0623 15.2905 14.0687 14.979C14.0713 14.8596 14.0272 14.825 13.9111 14.8253C12.5788 14.8285 11.2465 14.8291 9.91428 14.8253C9.78089 14.825 9.75377 14.8777 9.75568 14.9949C9.76111 15.2959 9.7643 15.5973 9.75409 15.898C9.7493 16.0412 9.80068 16.0765 9.93726 16.0752C10.5952 16.0692 11.2536 16.0724 11.9116 16.073H11.9125ZM7.19264 11.0018C7.56408 11.0018 7.93583 10.9983 8.30727 11.0037C8.4247 11.0056 8.4665 10.9675 8.46395 10.849C8.45757 10.5321 8.45789 10.2152 8.46331 9.89854C8.46523 9.78517 8.42023 9.75404 8.3127 9.75436C7.56982 9.75754 6.82663 9.75785 6.08375 9.755C5.97398 9.75468 5.93345 9.79056 5.93505 9.9014C5.94015 10.2129 5.94239 10.5248 5.93345 10.836C5.92962 10.9732 5.98323 11.0056 6.10992 11.0034C6.47083 10.997 6.83173 11.0011 7.19264 11.0014V11.0018ZM7.19902 12.2917V12.2924C6.82758 12.2924 6.45583 12.2952 6.08439 12.2908C5.97557 12.2895 5.93313 12.3248 5.93473 12.4365C5.93984 12.7586 5.9392 13.0809 5.93473 13.4029C5.93313 13.509 5.97717 13.5385 6.07737 13.5382C6.82567 13.5356 7.57397 13.536 8.32227 13.5388C8.42374 13.5391 8.46459 13.5058 8.46331 13.4016C8.45884 13.0796 8.45789 12.7573 8.46331 12.4353C8.46523 12.3228 8.42215 12.2889 8.31365 12.2901C7.94221 12.2946 7.57078 12.2917 7.19902 12.2917ZM7.19647 16.0724V16.073C7.56791 16.073 7.93966 16.0705 8.3111 16.0746C8.41609 16.0759 8.46587 16.0482 8.46395 15.9326C8.45821 15.6106 8.45916 15.2883 8.46299 14.9663C8.46427 14.865 8.42981 14.8256 8.32514 14.8262C7.57684 14.8291 6.82854 14.8297 6.08024 14.8262C5.96632 14.8256 5.93377 14.8697 5.93537 14.9764C5.93984 15.2934 5.94015 15.6103 5.93473 15.9272C5.93282 16.0371 5.97111 16.0759 6.08216 16.0746C6.45359 16.0698 6.82503 16.0727 7.19679 16.0727L7.19647 16.0724Z" fill="#4DB45E"/>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex gap-2.5 items-end">
                <div className="text-sm leading-snug text-gray-950">Итого</div>
                <div className="text-lg font-semibold leading-tight text-gray-950">
                  39 389 ₽
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4 w-full text-sm max-md:max-w-full">
              <div className="font-semibold leading-tight text-gray-950 max-md:max-w-full">
                Покупатель: ООО ПРОТЕК
              </div>
              <div className="mt-1.5 leading-snug text-gray-600 max-md:max-w-full">
                Адрес доставки: Калининградская область, Калиниград, улица
                Понартская, 5, кв./офис 1, Подъезд 1, этаж 1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOrdersMain;


