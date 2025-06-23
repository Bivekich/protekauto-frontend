import * as React from "react";
import { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_CLIENT_ME, CREATE_BALANCE_INVOICE } from '@/lib/graphql';
import toast from 'react-hot-toast';
import ProfileBalanceCard from "./ProfileBalanceCard";

interface LegalEntity {
  id: string;
  shortName: string;
  fullName: string;
  form: string;
  inn: string;
}

interface Contract {
  id: string;
  contractNumber: string;
  contractDate: string;
  name: string;
  ourLegalEntity: string;
  clientLegalEntity: string;
  balance: number;
  currency: string;
  isActive: boolean;
  isDefault: boolean;
  contractType: string;
  relationship: string;
  paymentDelay: boolean;
  creditLimit?: number;
  delayDays?: number;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientData {
  id: string;
  name: string;
  email?: string;
  phone: string;
  legalEntities: LegalEntity[];
  contracts: Contract[];
}

const ProfileBalanceMain = () => {
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  
  const { data, loading, error, refetch } = useQuery(GET_CLIENT_ME, {
    onError: (error) => {
      console.error('Ошибка загрузки данных клиента:', error);
    }
  });

  const [createBalanceInvoice] = useMutation(CREATE_BALANCE_INVOICE, {
    onCompleted: async (data) => {
      console.log('Счет на пополнение создан:', data.createBalanceInvoice);
      
      const invoice = data.createBalanceInvoice;
      
      try {
        // Получаем токен так же, как в Apollo Client
        let token = null;
        const userData = localStorage.getItem('userData');
        
        if (userData) {
          try {
            const user = JSON.parse(userData);
            // Создаем токен в формате, который ожидает CMS
            token = `client_${user.id}`;
            console.log('Создан токен для скачивания PDF:', token);
          } catch (error) {
            console.error('Ошибка парсинга userData:', error);
          }
        }
        
        if (!token) {
          toast.error('Ошибка авторизации. Попробуйте перезайти.');
          setIsCreatingInvoice(false);
          return;
        }
        
        // Скачиваем PDF с токеном авторизации
        const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/invoice/${invoice.id}`;
        
        console.log('Скачиваем PDF с URL:', downloadUrl);
        console.log('Используем токен:', token);
        
        const response = await fetch(downloadUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Неизвестная ошибка' }));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }
        
        // Создаем blob и скачиваем файл
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${invoice.invoiceNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Показываем уведомление об успехе
        toast.success(`Счет ${invoice.invoiceNumber} создан и загружен!`, {
          duration: 5000,
          icon: '📄'
        });
        
      } catch (error) {
        console.error('Ошибка скачивания PDF:', error);
        toast.error('Ошибка скачивания PDF: ' + (error as Error).message);
      }
      
      setIsCreatingInvoice(false);
      refetch();
    },
    onError: (error) => {
      console.error('Ошибка создания счета:', error);
      toast.error('Ошибка создания счета: ' + error.message);
      setIsCreatingInvoice(false);
    }
  });

  const handleCreateInvoice = async (contractId: string, amount: number) => {
    if (isCreatingInvoice) return;
    
    setIsCreatingInvoice(true);
    const loadingToast = toast.loading('Создаем счет на оплату...');

    try {
      const { data } = await createBalanceInvoice({
        variables: {
          contractId: contractId,
          amount: amount
        }
      });

      if (data?.createBalanceInvoice) {
        toast.dismiss(loadingToast);
        // Логика скачивания уже в onCompleted мутации
        // Обновляем данные
        await refetch();
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Ошибка создания счета:', error);
      toast.error('Ошибка создания счета: ' + (error as Error).message);
      setIsCreatingInvoice(false);
    }
  };



  if (loading) {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex overflow-hidden flex-col justify-center p-8 w-full bg-white rounded-2xl min-h-[543px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <div className="mt-4 text-gray-600">Загрузка данных...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex overflow-hidden flex-col justify-center p-8 w-full bg-white rounded-2xl min-h-[543px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col justify-center items-center p-8">
            <div className="text-red-600 text-center">
              <div className="text-lg font-semibold mb-2">Ошибка загрузки данных</div>
              <div className="text-sm">{error.message}</div>
              <button 
                onClick={() => refetch()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Повторить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const clientData: ClientData | null = data?.clientMe || null;

  // Проверяем есть ли у клиента юридические лица
  if (!clientData?.legalEntities?.length) {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex overflow-hidden flex-col justify-center p-8 w-full bg-white rounded-2xl min-h-[543px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col justify-center items-center p-8">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">Нет доступа к балансам</div>
              <div className="text-sm text-gray-600 mb-4">
                Для работы с балансами необходимо добавить юридическое лицо в настройках профиля
              </div>
              <a 
                href="/profile-settings"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Перейти к настройкам
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Проверяем есть ли договоры
  if (!clientData?.contracts?.length) {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex overflow-hidden flex-col justify-center p-8 w-full bg-white rounded-2xl min-h-[543px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col justify-center items-center p-8">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">Нет активных договоров</div>
              <div className="text-sm text-gray-600 mb-4">
                Договоры с балансами будут созданы менеджером после подтверждения ваших юридических лиц
              </div>
              <div className="text-sm text-gray-500">
                Обратитесь к менеджеру для создания договоров с возможностью покупки в долг
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number, currency: string = 'RUB') => {
    return `${amount.toLocaleString('ru-RU')} ${currency === 'RUB' ? '₽' : currency}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const calculateDaysLeft = (delayDays?: number) => {
    if (!delayDays) return 'Без ограничений';
    // Здесь должна быть логика расчета оставшихся дней
    // Пока возвращаем статичное значение
    return `Осталось ${Math.max(0, delayDays)} дней`;
  };

  const getLegalEntityName = (clientLegalEntity: string) => {
    // Если поле пустое или null, показываем первое доступное юридическое лицо
    if (!clientLegalEntity || clientLegalEntity.trim() === '') {
      return clientData?.legalEntities?.[0]?.shortName || 'Не указано';
    }
    
    // Очищаем строку от лишних кавычек
    const cleanedName = clientLegalEntity.replace(/^"(.*)"$/, '$1');
    
    // Ищем по названию или ID
    const entity = clientData?.legalEntities?.find(le => 
      le.shortName === clientLegalEntity || 
      le.shortName === cleanedName ||
      le.id === clientLegalEntity ||
      le.fullName === clientLegalEntity ||
      le.fullName === cleanedName
    );
    
    return entity ? entity.shortName : cleanedName;
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex overflow-hidden flex-col justify-center p-8 w-full bg-white rounded-2xl min-h-[543px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap flex-1 gap-5 size-full max-md:max-w-full">
          {clientData.contracts.filter(contract => contract.isActive).map((contract) => {
            const hasLimit = contract.creditLimit !== null && contract.creditLimit !== undefined;
            const limitLeft = hasLimit ? Math.max(0, (contract.creditLimit || 0) + contract.balance) : 0;
            const isOverLimit = contract.balance < 0 && hasLimit && Math.abs(contract.balance) > (contract.creditLimit || 0);
            
            return (
              <ProfileBalanceCard
                key={contract.id}
                contractId={contract.id}
                orgName={getLegalEntityName(contract.clientLegalEntity)}
                contract={`Договор № ${contract.contractNumber} от ${formatDate(contract.contractDate)}`}
                balance={formatCurrency(contract.balance, contract.currency)}
                limit={hasLimit ? formatCurrency(contract.creditLimit || 0, contract.currency) : 'Не установлен'}
                limitLeft={hasLimit ? formatCurrency(limitLeft, contract.currency) : 'Не установлен'}
                ordersSum="0 ₽" // TODO: Добавить расчет суммы заказов
                days={contract.delayDays ? `${contract.delayDays} дней` : 'Без ограничений'}
                daysLeft={calculateDaysLeft(contract.delayDays)}
                paid="0 ₽" // TODO: Добавить расчет оплаченной суммы
                inputValue="0 ₽"
                buttonLabel="Пополнить"
                onTopUp={handleCreateInvoice}
                isOverLimit={Boolean(isOverLimit)}
                isCreatingInvoice={isCreatingInvoice}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileBalanceMain;


