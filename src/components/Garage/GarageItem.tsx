'use client';

import { useState } from 'react';

type Car = {
  id: string;
  name: string;
  vin: string;
  comment?: string;
  releaseDate?: string;
  year?: string;
  productionPeriod?: string;
  market?: string;
  engine?: string;
  engineNumber?: string;
  transmission?: string;
  bodyColor?: string;
  interiorColor?: string;
};

type GarageItemProps = {
  item: Car;
  onRemove: (id: string) => void;
};

const GarageItem = ({ item, onRemove }: GarageItemProps) => {
  const [comment, setComment] = useState(item.comment || '');
  const [expanded, setExpanded] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [tempComment, setTempComment] = useState('');

  const handleRemove = () => {
    onRemove(item.id);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const openCommentModal = () => {
    setTempComment(comment);
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
  };

  const saveComment = () => {
    setComment(tempComment);
    setShowCommentModal(false);
    // В реальном приложении здесь должен быть запрос к API для сохранения комментария
  };

  // Данные для развернутого вида (из 2-го скриншота)
  const details = {
    'Дата выпуска': item.releaseDate || '23.05.2013',
    Выпущено: item.year || '2014',
    'Период производства': item.productionPeriod || '2011-2015',
    Рынок: item.market || 'Европа',
    Двигатель: item.engine || 'CFNA',
    'Номер двигателя': item.engineNumber || '476054',
    'Двигатель (подробно)': '1600CC / 105hp / 77kW SRE',
    КПП: item.transmission || 'NVS (5S)',
    'Цвет кузова': item.bodyColor || 'B4B4',
    'Цвет салона': item.interiorColor || 'BY',
  };

  return (
    <div className="bg-[#F8F9FA] rounded-[12px] p-[15px] mb-[5px]">
      <div className="flex items-center">
        <div className="w-[200px] mr-[15px]">
          <h3 className="text-[20px] font-semibold text-[#000814]">
            {item.name}
          </h3>
        </div>

        <div className="w-[200px] mr-[15px] text-[16px] text-[#8E9AAC]">
          {item.vin}
        </div>

        <div className="flex-grow mr-[15px]">
          <div
            onClick={openCommentModal}
            className="w-full px-[15px] py-[8px] bg-white border border-[#E6EDF6] rounded-[8px] cursor-pointer hover:border-[#EC1C24]"
          >
            {comment ? comment : 'Комментарий'}
          </div>
        </div>

        <button
          onClick={handleRemove}
          className="flex items-center gap-[5px] text-[14px] text-[#424F60] hover:text-[#EC1C24] mr-[15px]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H14"
              stroke="#424F60"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4"
              stroke="#424F60"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33333 4.00001V2.66668C5.33333 2.00001 6 1.33334 6.66667 1.33334H9.33333C10 1.33334 10.6667 2.00001 10.6667 2.66668V4.00001"
              stroke="#424F60"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Удалить</span>
        </button>

        <button
          onClick={handleToggleExpand}
          className="flex items-center gap-[5px] text-[14px] hover:opacity-80"
        >
          <span className={expanded ? 'text-[#EC1C24]' : 'text-[#000000]'}>
            {expanded ? 'Свернуть' : 'Развернуть'}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform ${
              expanded ? 'rotate-180' : ''
            } text-[#EC1C24]`}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="mt-[15px] pt-[15px] border-t border-[#E6EDF6] grid grid-cols-2 md:grid-cols-5 gap-5">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-sm font-semibold text-[#000814]">
                {key}
              </span>
              <span className="text-sm text-[#6B7280] font-normal">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно для редактирования комментария */}
      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-[24px] w-[500px] max-w-[90%] shadow-lg border border-[#E6EDF6]">
            <h3 className="text-[24px] font-bold mb-[20px]">Комментарий</h3>
            <textarea
              value={tempComment}
              onChange={(e) => setTempComment(e.target.value)}
              className="w-full h-[150px] px-[15px] py-[8px] bg-white border border-[#E6EDF6] rounded-[8px] outline-none focus:border-[#EC1C24] mb-[20px] resize-none"
              placeholder="Это личный автомобиль мэра Рыбинска на котором он уезжает в лес и вывозит людей, после чего они пропадают."
            />
            <div className="flex justify-between">
              <button
                onClick={saveComment}
                className="py-[10px] px-[16px] rounded-[12px] bg-[#EC1C24] text-white text-[16px] font-medium"
              >
                Сохранить
              </button>
              <button
                onClick={closeCommentModal}
                className="py-[10px] px-[16px] rounded-[12px] bg-white border border-[#D0D0D0] text-[#000814] text-[16px] font-medium"
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GarageItem;
