import React from "react";

type ProfileAddressCardProps = {
  type: string;
  title: string;
  address: string;
  recipient: string;
  phone: string;
  storagePeriod?: string;
  workTime?: string;
  comment?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onSelectMain?: () => void;
  isMain?: boolean;
};

const ProfileAddressCard: React.FC<ProfileAddressCardProps> = ({
  type,
  title,
  address,
  recipient,
  phone,
  storagePeriod,
  workTime,
  comment,
  onEdit,
  onDelete,
  onSelectMain,
  isMain
}) => (
  <div className="flex flex-col justify-between items-start self-stretch p-8 bg-white rounded-lg border border-solid border-stone-300 sm:min-w-[340px] min-w-[200px] max-w-[404px] flex-[1_0_0] max-md:max-w-[350px] max-sm:p-5 max-sm:max-w-full">
    <div className="flex flex-col gap-1.5 items-start self-stretch pb-8">
      <div className="relative text-base leading-6 text-gray-950">{type}</div>
      <div className="relative self-stretch text-xl font-bold leading-7 text-gray-950">{title}</div>
      <div className="relative self-stretch text-base leading-6 text-gray-950">{address}</div>
    </div>
    <div className="flex flex-col gap-5 items-start self-stretch">
      <div className="flex gap-5 items-start self-stretch max-sm:flex-col max-sm:gap-4">
        <div className="flex flex-col gap-2 items-start flex-[1_0_0] min-w-[132px] max-sm:min-w-full">
          <div className="overflow-hidden relative self-stretch text-sm leading-5 text-gray-600 text-ellipsis">Получатель</div>
          <div className="overflow-hidden relative self-stretch text-lg font-medium leading-5 text-ellipsis text-gray-950">{recipient}</div>
        </div>
        <div className="flex flex-col gap-2 items-start flex-[1_0_0] min-w-[132px] max-sm:min-w-full">
          <div className="overflow-hidden relative self-stretch text-sm leading-5 text-gray-600 text-ellipsis">Номер телефона</div>
          <div className="overflow-hidden relative text-lg font-medium leading-5 text-ellipsis text-gray-950">{phone}</div>
        </div>
      </div>
      {storagePeriod && workTime && (
        <div className="flex gap-5 items-start self-stretch max-sm:flex-col max-sm:gap-4">
          <div className="flex flex-col gap-2 items-start flex-[1_0_0] min-w-[132px] max-sm:min-w-full">
            <div className="overflow-hidden relative self-stretch text-sm leading-5 text-gray-600 text-ellipsis">Срок хранения</div>
            <div className="overflow-hidden relative self-stretch text-lg font-medium leading-5 text-ellipsis text-gray-950">{storagePeriod}</div>
          </div>
          <div className="flex flex-col gap-2 items-start flex-[1_0_0] min-w-[132px] max-sm:min-w-full">
            <div className="overflow-hidden relative self-stretch text-sm leading-5 text-gray-600 text-ellipsis">Ежедневно</div>
            <div className="overflow-hidden relative text-lg font-medium leading-5 text-ellipsis text-gray-950">{workTime}</div>
          </div>
        </div>
      )}
      {comment && (
        <div className="flex flex-col gap-2 items-start self-stretch min-w-[160px]">
          <div className="relative self-stretch text-sm leading-5 text-gray-600">Комментарий</div>
          <div className="relative self-stretch text-base leading-5 text-gray-950">{comment}</div>
        </div>
      )}
      <div className="flex justify-between items-start self-stretch">
        <div className="flex gap-1.5 items-center cursor-pointer" onClick={onEdit}>
          <img src="/images/edit.svg" alt="edit" width={18} height={18} className="mr-1.5" />
          <div className="relative text-sm leading-5 text-gray-600">Редактировать</div>
        </div>
        <div className="flex gap-1.5 items-center cursor-pointer" onClick={onDelete}>
          <img src="/images/delete.svg" alt="delete" width={18} height={18} className="mr-1.5" />
          <div className="relative text-sm leading-5 text-gray-600">Удалить</div>
        </div>
      </div>
      {onSelectMain && (
        <div className="flex gap-1.5 items-center cursor-pointer mt-4" onClick={onSelectMain}>
          <div className="relative aspect-[1/1] h-[18px] w-[18px]">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" style={{ width: 18, height: 18, flexShrink: 0, strokeWidth: 1, stroke: '#EC1C24', position: 'absolute', left: 0, top: 1 }}><circle cx="9.3335" cy="9" r="8.5" stroke="#EC1C24"></circle></svg>
            {isMain && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ width: 11, height: 11, flexShrink: 0, fill: '#F00', position: 'absolute', left: 4, top: 5 }}><ellipse cx="6.33359" cy="6.00156" rx="5.4" ry="5.4" fill="#FF0000"></ellipse></svg>}
          </div>
          <div className="relative text-sm leading-5 text-gray-600">Выбрать как основной адрес</div>
        </div>
      )}
    </div>
  </div>
);

export default ProfileAddressCard; 