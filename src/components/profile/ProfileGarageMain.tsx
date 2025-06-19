import * as React from "react";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { 
  GET_USER_VEHICLES, 
  GET_VEHICLE_SEARCH_HISTORY, 
  CREATE_VEHICLE_FROM_VIN, 
  DELETE_USER_VEHICLE, 
  ADD_VEHICLE_FROM_SEARCH, 
  DELETE_SEARCH_HISTORY_ITEM,
  UserVehicle,
  VehicleSearchHistory 
} from '@/lib/graphql/garage';
import { FIND_LAXIMO_VEHICLE_GLOBAL } from '@/lib/graphql';
import { LaximoVehicleSearchResult } from '@/types/laximo';

const ProfileGarageMain = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [vin, setVin] = React.useState("");
  const [carComment, setCarComment] = React.useState("");
  const [showAddCar, setShowAddCar] = React.useState(false);
  const [expandedVehicle, setExpandedVehicle] = React.useState<string | null>(null);
  const [isAddingVehicle, setIsAddingVehicle] = React.useState(false);

  // GraphQL queries and mutations
  const { data: vehiclesData, loading: vehiclesLoading, refetch: refetchVehicles } = useQuery(GET_USER_VEHICLES);
  const { data: historyData, loading: historyLoading, refetch: refetchHistory } = useQuery(GET_VEHICLE_SEARCH_HISTORY);

  const [searchVehicleByVin] = useLazyQuery(FIND_LAXIMO_VEHICLE_GLOBAL);

  const [createVehicleFromVin] = useMutation(CREATE_VEHICLE_FROM_VIN, {
    onCompleted: () => {
      refetchVehicles();
      setVin('');
      setCarComment('');
      setShowAddCar(false);
      setIsAddingVehicle(false);
    },
    onError: (error) => {
      console.error('Ошибка создания автомобиля:', error);
      alert('Ошибка при добавлении автомобиля');
      setIsAddingVehicle(false);
    }
  });

  const [deleteVehicle] = useMutation(DELETE_USER_VEHICLE, {
    onCompleted: () => refetchVehicles(),
    onError: (error) => {
      console.error('Ошибка удаления автомобиля:', error);
      alert('Ошибка при удалении автомобиля');
    }
  });

  const [addFromSearch] = useMutation(ADD_VEHICLE_FROM_SEARCH, {
    onCompleted: () => {
      refetchVehicles();
      refetchHistory();
    },
    onError: (error) => {
      console.error('Ошибка добавления из истории:', error);
      alert('Ошибка при добавлении автомобиля из истории');
    }
  });

  const [deleteHistoryItem] = useMutation(DELETE_SEARCH_HISTORY_ITEM, {
    onCompleted: () => refetchHistory(),
    onError: (error) => {
      console.error('Ошибка удаления истории:', error);
      alert('Ошибка при удалении из истории');
    }
  });

  const vehicles: UserVehicle[] = vehiclesData?.userVehicles || [];
  const searchHistory: VehicleSearchHistory[] = historyData?.vehicleSearchHistory || [];

  // Фильтрация автомобилей по поисковому запросу
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.vin?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveVehicle = async () => {
    if (!vin.trim()) {
      alert('Введите VIN номер');
      return;
    }

    setIsAddingVehicle(true);
    
    try {
      await createVehicleFromVin({
        variables: {
          vin: vin.trim().toUpperCase(),
          comment: carComment.trim() || null
        }
      });
    } catch (error) {
      console.error('Ошибка сохранения автомобиля:', error);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
      try {
        await deleteVehicle({ variables: { id: vehicleId } });
      } catch (error) {
        console.error('Ошибка удаления автомобиля:', error);
      }
    }
  };

  const handleAddFromHistory = async (historyItem: VehicleSearchHistory) => {
    try {
      await addFromSearch({
        variables: {
          vin: historyItem.vin,
          comment: ''
        }
      });
    } catch (error) {
      console.error('Ошибка добавления из истории:', error);
    }
  };

  const handleDeleteFromHistory = async (historyId: string) => {
    try {
      await deleteHistoryItem({ variables: { id: historyId } });
    } catch (error) {
      console.error('Ошибка удаления истории:', error);
    }
  };

  const handleFindParts = (vehicle: UserVehicle) => {
    // Переход к поиску запчастей для автомобиля
    if (vehicle.vin) {
      window.location.href = `/vehicle-search-results?q=${encodeURIComponent(vehicle.vin)}`;
    }
  };

  const toggleVehicleExpanded = (vehicleId: string) => {
    setExpandedVehicle(expandedVehicle === vehicleId ? null : vehicleId);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-wrap gap-5 items-center px-8 py-3 w-full text-base leading-snug text-gray-400 whitespace-nowrap bg-white rounded-lg max-md:px-5 max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto text-gray-400 basis-0 text-ellipsis max-md:max-w-full">
          <input
            type="text"
            placeholder="Поиск по гаражу"
            className="w-full bg-transparent outline-none text-gray-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <img
          loading="lazy"
          src="/images/search_ixon.svg"
          className="object-contain shrink-0 self-stretch my-auto w-5 rounded-sm aspect-square"
        />
      </div>
      <div className="flex overflow-hidden flex-col p-8 mt-5 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="text-3xl font-bold leading-none text-gray-950">
          Мои автомобили
        </div>
        
        {vehiclesLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}

        {!vehiclesLoading && filteredVehicles.length === 0 && !showAddCar && (
          <div className="text-center py-8 text-gray-500">
            {vehicles.length === 0 ? 'У вас пока нет автомобилей в гараже' : 'Автомобили не найдены'}
          </div>
        )}

        {!vehiclesLoading && filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="mt-8">
            <div className="flex flex-col justify-center px-5 py-3 w-full rounded-lg bg-slate-50 max-md:max-w-full">
              <div className="flex flex-wrap gap-8 items-center w-full max-md:max-w-full">
                <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
                  <div className="self-stretch my-auto text-xl font-bold leading-none text-gray-950">
                    {vehicle.name || `${vehicle.brand || ''} ${vehicle.model || ''}`.trim() || 'Неизвестный автомобиль'}
                  </div>
                  <div className="self-stretch my-auto text-sm leading-snug text-gray-600">
                    {vehicle.vin || 'VIN не указан'}
                  </div>
                </div>
                <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-1.5 my-auto text-sm leading-snug whitespace-nowrap bg-white rounded border border-solid basis-3 border-zinc-100 min-h-[32px] min-w-[240px] text-stone-500">
                  {vehicle.comment || 'Комментарий не добавлен'}
                </div>
                <div 
                  className="gap-2.5 self-stretch px-5 py-2 my-auto font-medium leading-tight text-center bg-red-600 rounded-lg min-h-[32px] cursor-pointer text-white hover:bg-red-700 transition-colors" 
                  role="button" 
                  tabIndex={0}
                  onClick={() => handleFindParts(vehicle)}
                >
                  Найти запчасть
                </div>
                <div className="flex gap-5 items-center self-stretch pr-2.5 my-auto text-sm leading-snug text-gray-600 whitespace-nowrap">
                  <button 
                    type="button" 
                    className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer text-sm leading-snug text-gray-600 hover:text-red-600 transition-colors"
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                  >
                    <img
                      loading="lazy"
                      src="/images/delete.svg"
                      className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                    />
                    <span className="self-stretch my-auto text-gray-600">
                      Удалить
                    </span>
                  </button>
                  <button 
                    type="button" 
                    className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer text-sm leading-snug text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => toggleVehicleExpanded(vehicle.id)}
                  >
                    <span className="self-stretch my-auto text-gray-600">
                      {expandedVehicle === vehicle.id ? 'Свернуть' : 'Развернуть'}
                    </span>
                    <img
                      loading="lazy"
                      src="/images/arrow_drop.svg"
                      className={`object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square transition-transform ${
                        expandedVehicle === vehicle.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Расширенная информация об автомобиле */}
            {expandedVehicle === vehicle.id && (
              <div className="mt-4 px-5 py-4 bg-white rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  {vehicle.brand && (
                    <div>
                      <span className="font-medium text-gray-700">Бренд:</span>
                      <span className="ml-2 text-gray-900">{vehicle.brand}</span>
                    </div>
                  )}
                  {vehicle.model && (
                    <div>
                      <span className="font-medium text-gray-700">Модель:</span>
                      <span className="ml-2 text-gray-900">{vehicle.model}</span>
                    </div>
                  )}
                  {vehicle.modification && (
                    <div>
                      <span className="font-medium text-gray-700">Модификация:</span>
                      <span className="ml-2 text-gray-900">{vehicle.modification}</span>
                    </div>
                  )}
                  {vehicle.year && (
                    <div>
                      <span className="font-medium text-gray-700">Год:</span>
                      <span className="ml-2 text-gray-900">{vehicle.year}</span>
                    </div>
                  )}
                  {vehicle.frame && (
                    <div>
                      <span className="font-medium text-gray-700">Номер кузова:</span>
                      <span className="ml-2 text-gray-900">{vehicle.frame}</span>
                    </div>
                  )}
                  {vehicle.licensePlate && (
                    <div>
                      <span className="font-medium text-gray-700">Госномер:</span>
                      <span className="ml-2 text-gray-900">{vehicle.licensePlate}</span>
                    </div>
                  )}
                  {vehicle.mileage && (
                    <div>
                      <span className="font-medium text-gray-700">Пробег:</span>
                      <span className="ml-2 text-gray-900">{vehicle.mileage.toLocaleString()} км</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">Добавлен:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(vehicle.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {!showAddCar && (
          <div className="flex mt-8">
            <div
              className="gap-2.5 self-stretch px-5 py-4 bg-red-600 rounded-xl min-h-[50px] cursor-pointer text-white text-base font-medium leading-tight text-center"
              role="button"
              tabIndex={0}
              onClick={() => setShowAddCar(true)}
            >
              Добавить авто
            </div>
          </div>
        )}
        {showAddCar && (
          <>
            <div className="mt-8 text-3xl font-bold leading-none text-gray-950">
              Добавить авто в гараж
            </div>
            <div className="flex flex-col mt-8 w-full text-sm leading-snug whitespace-nowrap text-gray-950 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 items-start w-full min-h-[78px] max-md:max-w-full">
                <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="text-gray-950 max-md:max-w-full">VIN</div>
                  <div className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[52px] text-gray-950 max-md:px-5 max-md:max-w-full">
                    <input
                      type="text"
                      placeholder="VIN"
                      className="w-full bg-transparent outline-none text-gray-950"
                      value={vin}
                      onChange={e => setVin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="text-gray-950 max-md:max-w-full">Комментарий</div>
                  <div className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[52px] text-gray-950 max-md:px-5 max-md:max-w-full">
                    <input
                      type="text"
                      placeholder="Комментарий"
                      className="w-full bg-transparent outline-none text-gray-950"
                      value={carComment}
                      onChange={e => setCarComment(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-8 items-start self-start mt-8 text-base font-medium leading-tight text-center whitespace-nowrap">
              <div
                className={`gap-2.5 self-stretch px-5 py-4 rounded-xl min-h-[50px] cursor-pointer text-white transition-colors ${
                  isAddingVehicle 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                role="button"
                tabIndex={0}
                onClick={handleSaveVehicle}
              >
                {isAddingVehicle ? 'Сохранение...' : 'Сохранить'}
              </div>
              <div
                className="gap-2.5 self-stretch px-5 py-4 rounded-xl border border-red-600 min-h-[50px] cursor-pointer bg-white text-gray-950 hover:bg-gray-50 transition-colors"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setShowAddCar(false);
                  setVin('');
                  setCarComment('');
                }}
              >
                Отменить
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex overflow-hidden flex-col p-8 mt-5 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="text-3xl font-bold leading-none text-gray-950">
          Ранее вы искали
        </div>
        
        {historyLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}

        {!historyLoading && searchHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            История поиска пуста
          </div>
        )}

        {!historyLoading && searchHistory.length > 0 && (
          <div className="flex flex-col mt-8 w-full max-md:max-w-full">
            {searchHistory.map((historyItem) => (
              <div key={historyItem.id} className="flex flex-col justify-center px-5 py-3 mb-2.5 w-full rounded-lg bg-slate-50 min-h-[44px] max-md:max-w-full">
                <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                  <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
                    <div className="self-stretch my-auto text-lg font-bold leading-none text-gray-950">
                      {historyItem.brand && historyItem.model 
                        ? `${historyItem.brand} ${historyItem.model}` 
                        : 'Автомобиль найден'}
                    </div>
                    <div className="self-stretch my-auto text-sm leading-snug text-gray-600">
                      {historyItem.vin}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="flex gap-1.5 items-center self-stretch my-auto text-sm leading-snug text-gray-600 cursor-pointer bg-transparent hover:text-green-600 transition-colors"
                    onClick={() => handleAddFromHistory(historyItem)}
                  >
                    <img
                      loading="lazy"
                      src="/images/add.svg"
                      className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    />
                    <span className="self-stretch my-auto text-gray-600">
                      Добавить в гараж
                    </span>
                  </button>
                  <div className="flex gap-5 items-center self-stretch pr-2.5 my-auto text-sm leading-snug text-gray-600 whitespace-nowrap">
                    <div className="self-stretch my-auto text-gray-600">
                      {new Date(historyItem.searchDate).toLocaleDateString('ru-RU')}
                    </div>
                    <button 
                      type="button" 
                      className="flex gap-1.5 items-center self-stretch my-auto text-sm leading-snug text-gray-600 cursor-pointer bg-transparent hover:text-red-600 transition-colors"
                      onClick={() => handleDeleteFromHistory(historyItem.id)}
                    >
                      <img
                        loading="lazy"
                        src="/images/delete.svg"
                        className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                      />
                      <span className="self-stretch my-auto text-gray-600">
                        Удалить
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileGarageMain;


