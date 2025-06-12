import * as React from "react";
import { useState } from "react";





const ProfileRequisitiesMain = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bik, setBik] = useState("");
  const [bankName, setBankName] = useState("");
  const [corrAccount, setCorrAccount] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
    <div className="flex overflow-hidden flex-col p-8 w-full text-3xl font-bold leading-none bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
      <div className="text-gray-950 max-md:max-w-full">
        Реквизиты ООО «Рога и копыта»{" "}
      </div>
      <div className="flex flex-col mt-8 w-full text-sm leading-snug text-gray-600 max-md:max-w-full">
        <div className="flex flex-col justify-center px-5 py-3 w-full rounded-lg bg-slate-50 max-md:max-w-full">
          <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-5 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
              <div className="self-stretch my-auto text-xl font-bold leading-none text-gray-950">
                Основной
              </div>
              <div className="self-stretch my-auto text-gray-600">
                № р/с 456984567652121
              </div>
              <div className="self-stretch my-auto text-gray-600">
                ПАО Альфабанк
              </div>
              <div className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer hover:text-red-600" role="button" tabIndex={0} aria-label="Настройки юридического лица">
                <img
                  src="/images/icon-setting.svg"
                  alt="Настройки"
                  className="object-contain w-[18px] h-[18px]"
                />
                <div className="self-stretch my-auto text-gray-600">
                  Юридическое лицо
                </div>
              </div>

                <div
                  layer-name="link_control_element"
                  className="flex gap-1.5 items-center self-stretch my-auto"
                >
                  <div
                    layer-name="radio"
                    className="relative aspect-[1/1] h-[18px] w-[18px] cursor-pointer"
                    onClick={() => setSelectedIndex(0)}
                  >
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedIndex === 0
                            ? `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8.5" stroke="#EC1C24"/><circle cx="9.0001" cy="8.99961" r="5.4" fill="#FF0000"/></svg>`
                            : `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8.5" stroke="#D0D0D0"/></svg>`
                        }}
                      />
                    </div>
                  </div>
                  <div
                    layer-name="Редактировать"
                    className="text-sm leading-5 text-gray-600"
                  >
                    Основной счет
                  </div>
              </div>
              
            </div>
            <div className="flex gap-5 items-center self-stretch pr-2.5 my-auto whitespace-nowrap">
              <div
                className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer hover:text-red-600"
                role="button"
                tabIndex={0}
                aria-label="Редактировать счет"
              >
                <img
                  src="/images/edit.svg"
                  alt="Редактировать"
                  className="object-contain w-[18px] h-[18px]"
                />
                <div className="self-stretch my-auto text-gray-600">
                  Редактировать
                </div>
              </div>
              <div
                className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer hover:text-red-600"
                role="button"
                tabIndex={0}
                aria-label="Удалить счет"
              >
                <img
                  src="/images/delete.svg"
                  alt="Удалить"
                  className="object-contain w-[18px] h-[18px]"
                />
                <div className="self-stretch my-auto text-gray-600">
                  Удалить
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 py-3 mt-2.5 w-full rounded-lg bg-slate-50 max-md:max-w-full">
          <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-5 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
              <div className="self-stretch my-auto text-xl font-bold leading-none text-gray-950">
                Основной
              </div>
              <div className="self-stretch my-auto text-gray-600">
                № р/с 456984567652121
              </div>
              <div className="self-stretch my-auto text-gray-600">
                ПАО Альфабанк
              </div>
              <div className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer hover:text-red-600" role="button" tabIndex={0} aria-label="Настройки юридического лица">
                <img
                  src="/images/icon-setting.svg"
                  alt="Настройки"
                  className="object-contain w-[18px] h-[18px]"
                />
                <div className="self-stretch my-auto text-gray-600">
                  Юридическое лицо
                </div>
              </div>
              <div
                  layer-name="link_control_element"
                  className="flex gap-1.5 items-center self-stretch my-auto"
                >
                  <div
                    layer-name="radio"
                    className="relative aspect-[1/1] h-[18px] w-[18px] cursor-pointer"
                    onClick={() => setSelectedIndex(1)}
                  >
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedIndex === 1
                            ? `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8.5" stroke="#EC1C24"/><circle cx="9.0001" cy="8.99961" r="5.4" fill="#FF0000"/></svg>`
                            : `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8.5" stroke="#D0D0D0"/></svg>`
                        }}
                      />
                    </div>
                  </div>
                  <div
                    layer-name="Редактировать"
                    className="text-sm leading-5 text-gray-600"
                  >
                    Основной счет
                  </div>
              </div>
            </div>
            <div className="flex gap-5 items-center self-stretch pr-2.5 my-auto whitespace-nowrap">
              <div
                className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer hover:text-red-600"
                role="button"
                tabIndex={0}
                aria-label="Редактировать счет"
              >
                <img
                  src="/images/edit.svg"
                  alt="Редактировать"
                  className="object-contain w-[18px] h-[18px]"
                />
                <div className="self-stretch my-auto text-gray-600">
                  Редактировать
                </div>
              </div>
              <div
                className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer hover:text-red-600"
                role="button"
                tabIndex={0}
                aria-label="Удалить счет"
              >
                <img
                  src="/images/delete.svg"
                  alt="Удалить"
                  className="object-contain w-[18px] h-[18px]"
                />
                <div className="self-stretch my-auto text-gray-600">
                  Удалить
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!showAddForm && (
        <div className="gap-2.5 self-stretch px-5 py-4 my-4 bg-red-600 rounded-xl min-h-[50px] cursor-pointer text-white text-base font-medium leading-tight text-center w-fit" onClick={() => setShowAddForm(true)}>
          Добавить реквизиты для ООО «Рога и копыта»
        </div>
      )}
      {showAddForm && (
        <>
          <div className="mt-8 text-gray-950">Добавление</div>
          <div className="flex flex-col mt-8 w-full text-sm leading-snug max-md:max-w-full">
            <div className="flex flex-row flex-wrap gap-5 items-start w-full min-h-[78px] max-md:max-w-full">
              <div className="flex flex-col flex-1 shrink basis-0 min-w-[210px]">
                <div className="text-gray-950 whitespace-nowrap">Название счета</div>
                <input
                  type="text"
                  value={accountName}
                  onChange={e => setAccountName(e.target.value)}
                  placeholder="Произвольное название"
                  className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full text-gray-600 bg-white rounded border border-solid border-stone-300 min-h-[52px] max-md:px-5 outline-none focus:border-red-600"
                />
              </div>
              <div className="flex flex-col flex-1 shrink basis-0 min-w-[210px]">
                <div className="text-gray-950 whitespace-nowrap">№ Расчетного счета</div>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  placeholder="№ Расчетного счета"
                  className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[52px] text-neutral-500 max-md:px-5 outline-none focus:border-red-600"
                />
              </div>
              <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[210px]">
                <div className="text-gray-950 whitespace-nowrap">БИК</div>
                <input
                  type="text"
                  value={bik}
                  onChange={e => setBik(e.target.value)}
                  placeholder="БИК"
                  className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[52px] text-neutral-500 max-md:px-5 outline-none focus:border-red-600"
                />
              </div>
              <div className="flex flex-col flex-1 shrink basis-0 min-w-[210px]">
                <div className="text-gray-950 whitespace-nowrap">Наименование банка</div>
                <input
                  type="text"
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  placeholder="Наименование банка"
                  className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[52px] text-neutral-500 max-md:px-5 outline-none focus:border-red-600"
                />
              </div>
              <div className="flex flex-col flex-1 shrink basis-0 min-w-[210px]">
                <div className="text-gray-950 whitespace-nowrap">Корреспондентский счет</div>
                <input
                  type="text"
                  value={corrAccount}
                  onChange={e => setCorrAccount(e.target.value)}
                  placeholder="№ к/с"
                  className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[52px] text-neutral-500 max-md:px-5 outline-none focus:border-red-600"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-start self-start mt-8 text-base font-medium leading-tight text-center whitespace-nowrap">
            <div className="gap-2.5 self-stretch px-5 py-4 my-auto bg-red-600 rounded-xl min-h-[50px] cursor-pointer text-white" onClick={() => setShowAddForm(false)}>
              Сохранить
            </div>
            <div className="gap-2.5 self-stretch px-5 py-4 my-auto rounded-xl border border-red-600 min-h-[50px] cursor-pointer bg-white text-gray-950" onClick={() => setShowAddForm(false)}>
              Отменить
            </div>
          </div>
        </>
      )}
    </div>
    <div className="flex overflow-hidden gap-10 items-center px-5 py-4 mt-5 w-full text-lg font-medium leading-tight text-center text-black bg-white rounded-2xl max-md:max-w-full">
      <div className="gap-2.5 self-stretch px-10 py-6 my-auto text-black rounded-xl border cursor-pointer border-red-600 border-solid min-w-[240px] max-md:px-5">
        Управление юридическими лицами
      </div>
    </div>
  </div>
  );
}

export default ProfileRequisitiesMain;


