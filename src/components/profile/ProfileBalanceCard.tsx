import React, { useState } from "react";

type ProfileBalanceCardProps = {
  contractId: string;
  orgName: string;
  contract: string;
  balance: string;
  limit: string;
  limitLeft: string;
  ordersSum: string;
  days: string;
  daysLeft: string;
  paid: string;
  inputValue: string;
  buttonLabel: string;
  onTopUp: (contractId: string, amount: number) => Promise<void>;
  isOverLimit?: boolean;
  isCreatingInvoice?: boolean;
};

const ProfileBalanceCard: React.FC<ProfileBalanceCardProps> = ({
  contractId,
  orgName,
  contract,
  balance,
  limit,
  limitLeft,
  ordersSum,
  days,
  daysLeft,
  paid,
  inputValue,
  buttonLabel,
  onTopUp,
  isOverLimit = false,
  isCreatingInvoice = false
}) => {
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => setEditing(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setEditing(false);
  };

  const handleTopUp = async () => {
    const amount = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
    
    if (isNaN(amount) || amount <= 0) {
      alert('Введите корректную сумму для пополнения');
      return;
    }

    if (isCreatingInvoice) {
      return; // Не делаем ничего, если уже создается счет
    }

    setLoading(true);
    try {
      await onTopUp(contractId, amount);
      setValue("");
      setEditing(false);
    } catch (error) {
      console.error('Ошибка пополнения:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 shrink justify-between p-8 bg-white rounded-lg border border-solid basis-0 border-stone-300 max-w-[404px] sm:min-w-[340px] min-w-[200px] max-md:px-5">
      <div className="flex flex-col w-full leading-snug text-gray-950">
        <div className="text-xl font-bold text-gray-950">{orgName}</div>
        <div className="mt-1.5 text-base text-gray-950">{contract}</div>
      </div>
      <div className="flex flex-col mt-4 w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <div className="text-sm leading-snug text-gray-600">Баланс</div>
            <div className={`mt-2 text-2xl font-bold leading-none ${balance.startsWith('-') ? 'text-red-600' : 'text-gray-950'}`}>
              {balance}
            </div>
          </div>
          <div className="flex flex-row gap-5 items-end mt-5 w-full max-sm:flex-col">
            <div className="flex flex-col flex-1 shrink basis-0">
              <div className="flex flex-col min-w-[160px]">
                <div className="text-sm leading-snug text-gray-600">Лимит отсрочки</div>
                <div className="flex flex-col self-start mt-2">
                  <div className="text-lg font-medium leading-none text-gray-950">{limit}</div>
                  <div className={`text-sm leading-snug ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
                    {limitLeft.includes('Не установлен') ? limitLeft : `Осталось ${limitLeft}`}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-5 min-w-[160px]">
                <div className="text-sm leading-snug text-gray-600">Сумма заказов</div>
                <div className="mt-2 text-lg font-medium leading-none text-gray-950">{ordersSum}</div>
              </div>
            </div>
            <div className="flex flex-col flex-1 shrink basis-0">
              <div className="flex flex-col min-w-[160px]">
                <div className="text-lg font-medium leading-none text-gray-950">{days}</div>
                <div className={`text-sm leading-snug ${daysLeft.includes("Осталось") && balance.startsWith('-') ? "text-red-600" : "text-gray-600"}`}>
                  {daysLeft}
                </div>
              </div>
              <div className="flex flex-col mt-5 min-w-[160px]">
                <div className="text-sm leading-snug text-gray-600">Оплачено</div>
                <div className="mt-2 text-lg font-medium leading-none text-gray-950">{paid}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-8 w-full">
          {editing ? (
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Введите сумму пополнения"
              className="gap-2.5 self-stretch px-6 py-4 w-full text-sm leading-snug bg-white rounded border border-solid border-stone-300 min-h-[52px] text-gray-950 max-md:px-5 outline-none focus:ring-0 focus:border-stone-400 placeholder-neutral-500"
            />
          ) : (
            <div
              className={`gap-2.5 self-stretch px-6 py-4 w-full text-sm leading-snug bg-white rounded border border-solid border-stone-300 min-h-[52px] max-md:px-5 cursor-text ${!value ? "text-neutral-500" : "text-gray-950"}`}
              onClick={() => setEditing(true)}
            >
              {value || "Введите сумму пополнения"}
            </div>
          )}
          <div
            role="button"
            tabIndex={0}
            aria-disabled={loading || isCreatingInvoice || !value.trim()}
            onClick={() => {
              if (!(loading || isCreatingInvoice || !value.trim())) handleTopUp();
            }}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ') && !(loading || isCreatingInvoice || !value.trim())) {
                handleTopUp();
              }
            }}
            className={`gap-2.5 self-start px-5 py-4 mt-4 text-base font-medium leading-tight text-center text-white whitespace-nowrap rounded-xl min-h-[50px] transition-colors duration-150
              ${loading || isCreatingInvoice || !value.trim()
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 cursor-pointer'}
            `}
          >
            {isCreatingInvoice ? 'Создаем счет...' : loading ? 'Пополняем...' : buttonLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBalanceCard; 