import * as React from "react";

const selectArrow = (
  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" style={{ width: 12, height: 6 }}>
    <path d="M1 1L7 7L13 1" stroke="#747474" strokeWidth="2" />
  </svg>
);

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, placeholder = "Выбрать", className = "" }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <div
        className="flex justify-between items-center px-6 py-4 bg-white rounded border border-solid border-stone-300 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <div className={`text-sm leading-5 ${!value || value === placeholder ? "text-neutral-500" : "text-gray-950"}`}>
          {value || placeholder}
        </div>
        {selectArrow}
      </div>
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-stone-300 rounded shadow z-10">
          {options.map((opt: string) => (
            <div
              key={opt}
              className={`px-6 py-2 text-sm cursor-pointer hover:bg-slate-100 ${opt === value ? "font-medium text-gray-950" : "text-neutral-500"}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const periodOptions = ["Этот год", "Последний квартал", "Предыдущий год", "Другое"];
const buyerOptions = ["Покупатель 1", "Покупатель 2", "Покупатель 3"];
const sellerOptions = ["ООО 'ПротекАвто'", "Продавец 2", "Продавец 3"];

const ProfileActsMain = () => {
  const [period, setPeriod] = React.useState("");
  const [buyer, setBuyer] = React.useState("");
  const [seller, setSeller] = React.useState(sellerOptions[0]);
  const [email, setEmail] = React.useState("");
  const tabOptions = ["Этот год", "Последний квартал", "Предыдущий год"];
  const [activeTab, setActiveTab] = React.useState(tabOptions[0]);

  return (
    <>
      <div className=" flex relative flex-col gap-8 items-start p-8 mx-auto my-0 w-full bg-white rounded-2xl max-w-[1310px] max-md:gap-5 max-md:p-5 max-sm:gap-4 max-sm:p-4">
        <div className="flex relative flex-col gap-8 items-start self-stretch max-md:gap-5 max-sm:gap-4">
          <div className="flex relative flex-wrap gap-5 items-start self-stretch max-md:flex-col max-md:gap-4 max-sm:gap-2.5">
            {tabOptions.map((tab) => (
              <div
                key={tab}
                layer-name="Tabs_button"
                className={`flex relative gap-5 items-center self-stretch rounded-xl flex-[1_0_0] min-w-[200px] max-md:gap-4 max-md:w-full max-md:min-w-[unset] max-sm:gap-2.5 ${activeTab === tab ? "" : "bg-slate-200"}`}
                onClick={() => setActiveTab(tab)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`flex relative gap-5 justify-center items-center px-6 py-3.5 rounded-xl flex-[1_0_0] ${activeTab === tab ? "bg-red-600" : "bg-slate-200"}`}>
                  <div
                    layer-name="Курьером"
                    className={`relative text-lg font-medium leading-5 text-center max-sm:text-base ${activeTab === tab ? "text-white" : "text-gray-950"}`}
                  >
                    {tab}
                  </div>
                </div>
              </div>
            ))}
            <CustomSelect
              value={period}
              onChange={setPeriod}
              options={periodOptions}
              placeholder="Выбрать период"
              className="flex-[1_0_0] min-w-[200px] max-md:w-full max-md:min-w-[unset]"
            />
          </div>
        </div>
        <div className="flex relative flex-wrap gap-5 items-start self-stretch max-md:flex-col max-md:gap-4 max-sm:gap-2.5">
          <div className="flex relative flex-col gap-1.5 items-start flex-[1_0_0] min-w-[250px] max-md:w-full max-md:min-w-[unset]">
            <div
              layer-name="Покупатель"
              className="relative self-stretch text-sm leading-5 text-gray-950"
            >
              Покупатель
            </div>
            <CustomSelect
              value={buyer}
              onChange={setBuyer}
              options={buyerOptions}
              placeholder="Выберите"
            />
          </div>
          <div className="flex relative flex-col gap-1.5 items-start flex-[1_0_0] min-w-[250px] max-md:w-full max-md:min-w-[unset]">
            <div
              layer-name="Продавец"
              className="relative self-stretch text-sm leading-5 text-gray-950"
            >
              Продавец
            </div>
            <CustomSelect
              value={seller}
              onChange={setSeller}
              options={sellerOptions}
              placeholder="Выберите"
            />
          </div>
          <div className="flex relative flex-col gap-1.5 items-start flex-[1_0_0] min-w-[250px] max-md:w-full max-md:min-w-[unset]">
            <div
              layer-name="E-mail для получения акта сверки"
              className="relative self-stretch text-sm leading-5 text-gray-950"
            >
              E-mail для получения акта сверки
            </div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="@"
              className="flex relative gap-2.5 items-center self-stretch px-6 py-4 bg-white rounded border border-solid border-stone-300 h-[52px] max-sm:h-12 text-sm text-gray-950 placeholder-neutral-500 outline-none"
              layer-name="Input"
            />
          </div>
        </div>
        <div
          layer-name="Button Small"
          className="flex relative gap-2.5 justify-center items-center px-5 py-3.5 bg-red-600 rounded-xl cursor-pointer border-[none] h-[50px] max-sm:h-[46px]"
        >
          <div
            layer-name="Button Small"
            className="relative text-base font-medium leading-5 text-center text-white"
          >
            Получить акт сверки
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileActsMain;


