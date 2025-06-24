import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import ProfileAddressCard from "./ProfileAddressCard";
import ProfileAddressWayWithMap from "./ProfileAddressWayWithMap";
import { GET_CLIENT_DELIVERY_ADDRESSES, DELETE_CLIENT_DELIVERY_ADDRESS } from "@/lib/graphql";

interface DeliveryAddress {
  id: string;
  name: string;
  address: string;
  deliveryType: 'COURIER' | 'PICKUP' | 'POST' | 'TRANSPORT';
  comment?: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
  intercom?: string;
  deliveryTime?: string;
  contactPhone?: string;
  createdAt: string;
  updatedAt: string;
}

const getDeliveryTypeLabel = (type: string) => {
  const labels = {
    COURIER: 'Доставка курьером',
    PICKUP: 'Самовывоз',
    POST: 'Почта России',
    TRANSPORT: 'Транспортная компания'
  };
  return labels[type as keyof typeof labels] || type;
};

const ProfileAddressesMain = () => {
  const [mainIndex, setMainIndex] = React.useState(0);
  const [showWay, setShowWay] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<DeliveryAddress | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_CLIENT_DELIVERY_ADDRESSES, {
    errorPolicy: 'all'
  });

  const [deleteAddress] = useMutation(DELETE_CLIENT_DELIVERY_ADDRESS, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Ошибка удаления адреса:', error);
      alert('Ошибка удаления адреса: ' + error.message);
    }
  });

  const handleDeleteAddress = async (addressId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот адрес?')) {
      try {
        await deleteAddress({
          variables: { id: addressId }
        });
      } catch (error) {
        console.error('Ошибка удаления:', error);
      }
    }
  };

  const handleEditAddress = (address: DeliveryAddress) => {
    setEditingAddress(address);
    setShowWay(true);
  };

  const handleWayClose = () => {
    setShowWay(false);
    setEditingAddress(null);
    refetch(); // Обновляем данные после закрытия формы
  };

  if (showWay) return (
    <ProfileAddressWayWithMap 
      onBack={handleWayClose} 
      editingAddress={editingAddress}
    />
  );

  if (loading) {
    return (
      <div className="flex relative flex-col gap-8 items-start p-8 bg-white rounded-2xl flex-[1_0_0] max-md:gap-5 ">
        <div className="text-center text-gray-500">Загрузка адресов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex relative flex-col gap-8 items-start p-8 bg-white rounded-2xl flex-[1_0_0] max-md:gap-5 ">
        <div className="text-center text-red-500">
          <div className="mb-2">Ошибка загрузки адресов</div>
          <div className="text-sm text-gray-500 mb-4">{error.message}</div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  const addresses = data?.clientMe?.deliveryAddresses || [];

  return (
    <div className="flex relative flex-col gap-8 w-full items-start p-8 bg-white rounded-2xl flex-[1_0_0] max-md:gap-5 ">
      {addresses.length > 0 ? (
        <div className="flex flex-wrap gap-5 items-start self-stretch">
          {addresses.map((addr: DeliveryAddress, idx: number) => (
            <ProfileAddressCard
              key={addr.id}
              type={getDeliveryTypeLabel(addr.deliveryType)}
              title={addr.name}
              address={addr.address}
              comment={addr.comment}
              onEdit={() => handleEditAddress(addr)}
              onSelectMain={() => setMainIndex(idx)}
              onDelete={() => handleDeleteAddress(addr.id)}
              isMain={mainIndex === idx}
            />
          ))}
        </div>
      ) : (
        <div
          className="flex items-center justify-center w-full h-[380px] max-w-[400px] bg-[#eaf0f8] rounded-2xl text-xl font-semibold text-gray-900 cursor-pointer select-none"
          onClick={() => setShowWay(true)}
        >
          + Добавить адрес
        </div>
      )}
      {addresses.length > 0 && (
        <div
          layer-name="Button Small"
          className="flex relative gap-2.5 justify-center items-center px-5 py-3.5 bg-red-600 rounded-xl h-[50px] cursor-pointer hover:bg-red-700 transition-colors"
          onClick={() => setShowWay(true)}
        >
          <div
            layer-name="Button Small"
            className="relative text-base font-medium leading-5 text-center text-white "
          >
            Добавить адрес доставки
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAddressesMain;


