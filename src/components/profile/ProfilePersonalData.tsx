import React from "react";

interface ProfilePersonalDataProps {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  notifySwitch: boolean;
  setNotifySwitch: (v: boolean | ((prev: boolean) => boolean)) => void;
  phoneError: string;
  emailError: string;
  onSave?: () => void;
}

const ProfilePersonalData: React.FC<ProfilePersonalDataProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  email,
  setEmail,
  notifySwitch,
  setNotifySwitch,
  phoneError,
  emailError,
  onSave,
}) => (
  <div className="flex overflow-hidden flex-col p-8 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
    <div className="text-3xl font-bold leading-none text-gray-950">
      Персональные данные
    </div>
    <div className="flex flex-col mt-8 w-full max-md:max-w-full">
      <div className="flex flex-wrap gap-5 items-start w-full text-sm leading-snug max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px]">
          <div className="text-gray-950">Имя</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] max-md:px-5">
            <input
              type="text"
              placeholder="Имя"
              className="w-full bg-transparent outline-none text-gray-600"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px]">
          <div className="text-gray-950">Фамилия</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] max-md:px-5">
            <input
              type="text"
              placeholder="Фамилия"
              className="w-full bg-transparent outline-none text-gray-600"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-gray-950">Номер телефона</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] max-md:px-5">
            <input
              type="text"
              placeholder="Телефон"
              className={`w-full bg-transparent outline-none text-gray-600 ${phoneError ? 'border-red-500' : ''}`}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          {phoneError && <div className="text-red-500 text-xs mt-1 ml-2">{phoneError}</div>}
        </div>
        <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[240px]">
          <div className="text-gray-950">E-mail</div>
          <div className="gap-2.5 self-stretch px-6 py-3.5 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[46px] text-neutral-500 max-md:px-5">
            <input
              type="email"
              placeholder="E-mail"
              className={`w-full bg-transparent outline-none text-neutral-500 ${emailError ? 'border-red-500' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {emailError && <div className="text-red-500 text-xs mt-1 ml-2">{emailError}</div>}
        </div>
      </div>
      <div className="flex flex-wrap gap-5 items-center mt-8 w-full max-md:max-w-full">
        <div className="flex flex-col self-stretch my-auto w-9 cursor-pointer" onClick={() => setNotifySwitch((prev: boolean) => !prev)}>
          <div className={`flex flex-col justify-center items-start p-0.5 rounded-[100px] ${notifySwitch ? 'bg-black' : 'bg-zinc-300'}`} style={{ width: 32, height: 20 }}>
            <div className={`flex shrink-0 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${notifySwitch ? 'translate-x-4' : ''}`} />
          </div>
        </div>
        <div className="self-stretch my-auto text-base leading-snug text-gray-600 max-md:max-w-full">
          Получать уведомления об акциях и новостях компании
        </div>
      </div>
      {onSave && (
        <div className="flex justify-end mt-6">
          <button
            onClick={onSave}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Сохранить изменения
          </button>
        </div>
      )}
    </div>
  </div>
);

export default ProfilePersonalData; 