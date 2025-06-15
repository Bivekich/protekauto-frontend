import * as React from "react";
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '@/lib/graphql';

interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED' | 'REFUNDED';
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  currency: string;
  items: Array<{
    id: string;
    name: string;
    article?: string;
    brand?: string;
    price: number;
    quantity: number;
    totalPrice: number;
  }>;
  deliveryAddress?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileOrdersMainProps {
  // Добавьте необходимые пропсы, если они нужны
}

const tabs = [
  { label: "Все", status: null },
  { label: "Текущие", status: ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED'] },
  { label: "Выполненные", status: ['DELIVERED'] },
  { label: "Отмененные", status: ['CANCELED', 'REFUNDED'] },
];

const statusLabels = {
  PENDING: 'Ожидает оплаты',
  PAID: 'Оплачен',
  PROCESSING: 'В обработке',
  SHIPPED: 'Отправлен',
  DELIVERED: 'Доставлен',
  CANCELED: 'Отменен',
  REFUNDED: 'Возвращен'
};

const statusColors = {
  PENDING: '#F59E0B',
  PAID: '#10B981',
  PROCESSING: '#3B82F6',
  SHIPPED: '#8B5CF6',
  DELIVERED: '#10B981',
  CANCELED: '#EF4444',
  REFUNDED: '#6B7280'
};

const ProfileOrdersMain: React.FC<ProfileOrdersMainProps> = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [period, setPeriod] = React.useState("Все");
  const periodOptions = ["Все", "Сегодня", "Неделя", "Месяц", "Год"];
  const [deliveryMethod, setDeliveryMethod] = React.useState("Все");
  const deliveryOptions = ["Все", "Самовывоз", "Доставка"];
  const [isPeriodOpen, setIsPeriodOpen] = React.useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = React.useState(false);
  const [clientId, setClientId] = React.useState<string | null>(null);

  // Получаем ID клиента из localStorage
  React.useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setClientId(user.id);
      } catch (error) {
        console.error('Ошибка парсинга userData:', error);
      }
    }
  }, []);

  // Загружаем заказы
  const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      clientId: clientId?.startsWith('client_') ? clientId.substring(7) : clientId,
      limit: 100,
      offset: 0
    },
    skip: !clientId, // Не выполняем запрос пока нет clientId
    fetchPolicy: 'cache-and-network'
  });

  const orders: Order[] = data?.orders?.orders || [];

  // Фильтруем заказы по активной вкладке
  const filteredOrdersByTab = React.useMemo(() => {
    const currentTab = tabs[activeTab];
    if (!currentTab.status) {
      return orders; // Все заказы
    }
    return orders.filter(order => currentTab.status!.includes(order.status));
  }, [orders, activeTab]);

  // Фильтруем по поиску
  const filteredOrders = React.useMemo(() => {
    if (!search) return filteredOrdersByTab;
    const searchLower = search.toLowerCase();
    return filteredOrdersByTab.filter(order => 
      order.orderNumber.toLowerCase().includes(searchLower) ||
      order.items.some(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.article?.toLowerCase().includes(searchLower) ||
        item.brand?.toLowerCase().includes(searchLower)
      )
    );
  }, [filteredOrdersByTab, search]);

  const formatPrice = (price: number, currency = 'RUB') => {
    return `${price.toLocaleString('ru-RU')} ${currency === 'RUB' ? '₽' : currency}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!clientId) {
    return (
      <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
        <div className="text-center py-8">
          <p className="text-gray-500">Необходимо авторизоваться для просмотра заказов</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Загрузка заказов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
        <div className="text-center py-8">
          <p className="text-red-500">Ошибка загрузки заказов: {error.message}</p>
          <button 
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

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
            placeholder="Поиск по заказам"
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
        <div className="text-3xl font-bold leading-none text-gray-950">{tabs[activeTab].label}</div>
        
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              {search ? 'Заказы не найдены' : 'У вас пока нет заказов'}
            </div>
            {!search && (
              <div className="text-gray-500 text-sm">
                Оформите первый заказ в нашем каталоге
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 mt-5">
            {filteredOrders.map((order) => (
              <div key={order.id} className="flex flex-col justify-center px-5 py-8 w-full bg-white rounded-2xl border border-gray-200">
          <div className="flex flex-col pr-7 pl-5 w-full max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div className="flex gap-5 items-center self-stretch my-auto min-w-[240px]">
                      <div 
                        className="gap-5 self-stretch px-6 py-3.5 my-auto text-sm font-medium leading-snug text-center text-white whitespace-nowrap rounded-xl max-md:px-5"
                        style={{ backgroundColor: statusColors[order.status] }}
                      >
                        {statusLabels[order.status]}
                </div>
                <div className="self-stretch my-auto text-xl font-semibold leading-tight text-gray-950">
                        Заказ {order.orderNumber} от {formatDate(order.createdAt)}
                  </div>
                    </div>
                  </div>
                </div>
                
          <div className="flex flex-col mt-5 w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-5 items-center pr-24 pb-2.5 pl-2 w-full text-sm text-gray-400 whitespace-nowrap border-b border-solid border-b-stone-300 max-md:pr-5 max-md:max-w-full">
              <div className="gap-1.5 self-stretch my-auto w-9">№</div>
              <div className="flex gap-1.5 items-center self-stretch my-auto w-[130px]">
                <div className="self-stretch my-auto">Производитель</div>
                    </div>
                    <div className="gap-1.5 self-stretch my-auto w-[120px]">Артикул</div>
              <div className="flex flex-1 shrink gap-1.5 items-center self-stretch my-auto basis-0 min-w-[240px]">
                <div className="self-stretch my-auto">Наименование</div>
                    </div>
                    <div className="self-stretch my-auto w-[60px]">Кол-во</div>
                    <div className="self-stretch my-auto text-right w-[90px]">Стоимость</div>
                  </div>
                  
                  <div className="flex flex-col mt-1.5 w-full max-md:max-w-full">
                    {order.items.map((item, index) => (
                      <div key={item.id} className="flex flex-wrap gap-5 items-center pt-1.5 pr-7 pb-2 pl-2 w-full rounded-lg min-w-[420px] max-md:pr-5 max-md:max-w-full">
                <div className="self-stretch my-auto w-9 text-sm leading-4 text-center text-black">
                          {index + 1}
                </div>
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[130px]">
                            {item.brand || '-'}
                  </div>
                  <div className="self-stretch my-auto text-sm font-bold leading-snug text-gray-950 w-[120px]">
                            {item.article || '-'}
                  </div>
                  <div className="flex-1 shrink self-stretch my-auto text-sm text-gray-400 basis-0">
                            {item.name}
                  </div>
                  <div className="self-stretch text-sm text-gray-400 w-[60px]">
                            {item.quantity} шт.
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto text-right w-[90px]">
                    <div className="text-sm font-bold leading-snug text-gray-950">
                              {formatPrice(item.totalPrice, order.currency)}
              </div>
            </div>
          </div>
        </div>
                    ))}
                  </div>
                </div>
                
                {/* Итоговая сумма */}
                <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-500">
                      Сумма товаров: {formatPrice(order.totalAmount, order.currency)}
                    </div>
                    {order.discountAmount > 0 && (
                      <div className="text-sm text-gray-500">
                        Скидка: -{formatPrice(order.discountAmount, order.currency)}
                  </div>
                    )}
                    <div className="text-lg font-bold text-gray-950">
                      Итого: {formatPrice(order.finalAmount, order.currency)}
                    </div>
                  </div>
                </div>
                
                {/* Адрес доставки */}
                {order.deliveryAddress && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Адрес доставки:</div>
                    <div className="text-sm text-gray-950">{order.deliveryAddress}</div>
                  </div>
                )}
                
                {/* Комментарий */}
                {order.comment && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Комментарий:</div>
                    <div className="text-sm text-gray-950">{order.comment}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOrdersMain;


