import React from "react";
import { useMutation } from '@apollo/client';
import { CREATE_CLIENT_LEGAL_ENTITY } from '@/lib/graphql';

interface LegalEntityFormBlockProps {
  inn: string;
  setInn: (v: string) => void;
  form: string;
  setForm: (v: string) => void;
  isFormOpen: boolean;
  setIsFormOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  formOptions: string[];
  ogrn: string;
  setOgrn: (v: string) => void;
  kpp: string;
  setKpp: (v: string) => void;
  jurAddress: string;
  setJurAddress: (v: string) => void;
  shortName: string;
  setShortName: (v: string) => void;
  fullName: string;
  setFullName: (v: string) => void;
  factAddress: string;
  setFactAddress: (v: string) => void;
  taxSystem: string;
  setTaxSystem: (v: string) => void;
  isTaxSystemOpen: boolean;
  setIsTaxSystemOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  taxSystemOptions: string[];
  nds: string;
  setNds: (v: string) => void;
  isNdsOpen: boolean;
  setIsNdsOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  ndsOptions: string[];
  ndsPercent: string;
  setNdsPercent: (v: string) => void;
  accountant: string;
  setAccountant: (v: string) => void;
  responsible: string;
  setResponsible: (v: string) => void;
  responsiblePosition: string;
  setResponsiblePosition: (v: string) => void;
  responsiblePhone: string;
  setResponsiblePhone: (v: string) => void;
  signatory: string;
  setSignatory: (v: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const LegalEntityFormBlock: React.FC<LegalEntityFormBlockProps> = ({
  inn,
  setInn,
  form,
  setForm,
  isFormOpen,
  setIsFormOpen,
  formOptions,
  ogrn,
  setOgrn,
  kpp,
  setKpp,
  jurAddress,
  setJurAddress,
  shortName,
  setShortName,
  fullName,
  setFullName,
  factAddress,
  setFactAddress,
  taxSystem,
  setTaxSystem,
  isTaxSystemOpen,
  setIsTaxSystemOpen,
  taxSystemOptions,
  nds,
  setNds,
  isNdsOpen,
  setIsNdsOpen,
  ndsOptions,
  ndsPercent,
  setNdsPercent,
  accountant,
  setAccountant,
  responsible,
  setResponsible,
  responsiblePosition,
  setResponsiblePosition,
  responsiblePhone,
  setResponsiblePhone,
  signatory,
  setSignatory,
  onAdd,
  onCancel,
}) => {
  const [createLegalEntity, { loading }] = useMutation(CREATE_CLIENT_LEGAL_ENTITY, {
    onCompleted: () => {
      console.log('Юридическое лицо создано');
      // Очищаем форму
      setInn('');
      setForm('Выбрать');
      setOgrn('');
      setKpp('');
      setJurAddress('');
      setShortName('');
      setFullName('');
      setFactAddress('');
      setTaxSystem('Выбрать');
      setNds('Выбрать');
      setNdsPercent('');
      setAccountant('');
      setResponsible('');
      setResponsiblePosition('');
      setResponsiblePhone('');
      setSignatory('');
      onAdd();
    },
    onError: (error) => {
      console.error('Ошибка создания юридического лица:', error);
      alert('Ошибка создания юридического лица: ' + error.message);
    }
  });

  const handleSave = async () => {
    // Валидация
    if (!inn || inn.length < 10) {
      alert('Введите корректный ИНН');
      return;
    }

    if (!shortName.trim()) {
      alert('Введите краткое наименование');
      return;
    }

    if (!jurAddress.trim()) {
      alert('Введите юридический адрес');
      return;
    }

    if (form === 'Выбрать') {
      alert('Выберите форму организации');
      return;
    }

    if (taxSystem === 'Выбрать') {
      alert('Выберите систему налогообложения');
      return;
    }

    try {
      // Преобразуем НДС в число
      let vatPercent = 20; // по умолчанию
      if (nds === 'Без НДС') {
        vatPercent = 0;
      } else if (nds === 'НДС 10%') {
        vatPercent = 10;
      } else if (nds === 'НДС 20%') {
        vatPercent = 20;
      } else if (ndsPercent) {
        vatPercent = parseFloat(ndsPercent) || 20;
      }

      await createLegalEntity({
        variables: {
          input: {
            inn: inn.trim(),
            shortName: shortName.trim(),
            fullName: fullName.trim() || shortName.trim(),
            form: form,
            legalAddress: jurAddress.trim(),
            actualAddress: factAddress.trim() || null,
            taxSystem: taxSystem,
            vatPercent: vatPercent,
            accountant: accountant.trim() || null,
            responsibleName: responsible.trim() || null,
            responsiblePosition: responsiblePosition.trim() || null,
            responsiblePhone: responsiblePhone.trim() || null,
            signatory: signatory.trim() || null,
            ogrn: ogrn.trim() || null,
            registrationReasonCode: kpp.trim() || null
          }
        }
      });
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  return (
  <div className="flex overflow-hidden flex-col p-8 mt-5 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
    <div className="text-3xl font-bold leading-none text-gray-950">
      Данные юридического лица
    </div>
    <div className="flex flex-col mt-8 w-full text-sm leading-snug max-md:max-w-full">
      <div className="flex flex-wrap gap-5 items-start w-full whitespace-nowrap max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">ИНН</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] max-md:px-5">
            <input
              type="text"
              placeholder="ИНН"
              className="w-full bg-transparent outline-none text-gray-600"
              value={inn}
              onChange={e => setInn(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Форма</div>
          <div className="relative mt-1.5">
            <div
              className="flex gap-10 justify-between items-center px-6 py-3.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5 cursor-pointer select-none"
              onClick={() => setIsFormOpen((prev: boolean) => !prev)}
              tabIndex={0}
              onBlur={() => setIsFormOpen(false)}
            >
              <span className="self-stretch my-auto text-neutral-500">{form}</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {isFormOpen && (
              <ul className="absolute left-0 right-0 z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg animate-fadeIn">
                {formOptions.map(option => (
                  <li
                    key={option}
                    className={`px-6 py-3.5 cursor-pointer hover:bg-blue-100 ${option === form ? 'bg-blue-50 font-semibold' : ''}`}
                    onMouseDown={() => { setForm(option); setIsFormOpen(false); }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">ОГРН</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="ОГРН"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={ogrn}
              onChange={e => setOgrn(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">КПП</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="КПП"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={kpp}
              onChange={e => setKpp(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 items-start mt-5 w-full max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Юридический адрес</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Юридический адрес"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={jurAddress}
              onChange={e => setJurAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Краткое наименование</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Краткое наименование"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={shortName}
              onChange={e => setShortName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Полное наименование</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Полное наименование"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Фактический адрес</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Фактический адрес"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={factAddress}
              onChange={e => setFactAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 items-start mt-5 w-full max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Система налогоблажения</div>
          <div className="relative mt-1.5">
            <div
              className="flex gap-10 justify-between items-center px-6 py-3.5 w-full whitespace-nowrap bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5 cursor-pointer select-none"
              onClick={() => setIsTaxSystemOpen((prev: boolean) => !prev)}
              tabIndex={0}
              onBlur={() => setIsTaxSystemOpen(false)}
            >
              <span className="self-stretch my-auto text-neutral-500">{taxSystem}</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {isTaxSystemOpen && (
              <ul className="absolute left-0 right-0 z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg animate-fadeIn">
                {taxSystemOptions.map(option => (
                  <li
                    key={option}
                    className={`px-6 py-3.5 cursor-pointer hover:bg-blue-100 ${option === taxSystem ? 'bg-blue-50 font-semibold' : ''}`}
                    onMouseDown={() => { setTaxSystem(option); setIsTaxSystemOpen(false); }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px]">
          <div className="text-gray-950">НДС</div>
          <div className="relative mt-1.5">
            <div
              className="flex gap-10 justify-between items-center px-6 py-3.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5 cursor-pointer select-none"
              onClick={() => setIsNdsOpen((prev: boolean) => !prev)}
              tabIndex={0}
              onBlur={() => setIsNdsOpen(false)}
            >
              <span className="self-stretch my-auto text-neutral-500">{nds}</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {isNdsOpen && (
              <ul className="absolute left-0 right-0 z-10 bg-white border-x border-b border-stone-300 rounded-b-lg shadow-lg animate-fadeIn">
                {ndsOptions.map(option => (
                  <li
                    key={option}
                    className={`px-6 py-3.5 cursor-pointer hover:bg-blue-100 ${option === nds ? 'bg-blue-50 font-semibold' : ''}`}
                    onMouseDown={() => { setNds(option); setIsNdsOpen(false); }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">НДС %</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full whitespace-nowrap bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="НДС %"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={ndsPercent}
              onChange={e => setNdsPercent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px]">
          <div className="text-gray-950">Бухгалтер</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Бухгалтер"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={accountant}
              onChange={e => setAccountant(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 items-start mt-5 w-full max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px]">
          <div className="text-gray-950">Ответственный</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Ответственный"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={responsible}
              onChange={e => setResponsible(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Должность ответственного</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full whitespace-nowrap bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Должность ответственного"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={responsiblePosition}
              onChange={e => setResponsiblePosition(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Телефон ответственного</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full whitespace-nowrap bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Телефон ответственного"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={responsiblePhone}
              onChange={e => setResponsiblePhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px]">
          <div className="text-gray-950">Подписант</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="text"
              placeholder="Подписант"
              className="w-full bg-transparent outline-none text-neutral-500"
              value={signatory}
              onChange={e => setSignatory(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="flex gap-8 items-start self-start mt-8 text-base font-medium leading-tight text-center whitespace-nowrap">
      <div 
        className={`gap-2.5 self-stretch px-5 py-4 rounded-xl min-h-[50px] cursor-pointer text-white ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`} 
        onClick={loading ? undefined : handleSave}
      >
        {loading ? 'Сохранение...' : 'Добавить'}
      </div>
      <div className="gap-2.5 self-stretch px-5 py-4 rounded-xl border border-red-600 min-h-[50px] cursor-pointer bg-white text-gray-950 hover:bg-gray-50" onClick={onCancel}>
        Отменить
      </div>
    </div>
  </div>
  );
};

export default LegalEntityFormBlock; 