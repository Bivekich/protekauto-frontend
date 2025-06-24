import React from "react";

interface VehicleInfo {
  brand?: string;
  model?: string;
  year?: number;
}

interface ProfileHistoryItemProps {
  id: string;
  date: string;
  manufacturer: string;
  article: string;
  name: string;
  vehicleInfo?: VehicleInfo;
  resultCount?: number;
  onDelete?: (id: string) => void;
}

const ProfileHistoryItem: React.FC<ProfileHistoryItemProps> = ({
  id,
  date,
  manufacturer,
  article,
  name,
  vehicleInfo,
  resultCount,
  onDelete,
}) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const getSearchTypeDisplay = (article: string) => {
    if (article.includes('TEXT')) return 'Текстовый поиск';
    if (article.includes('ARTICLE')) return 'По артикулу';
    if (article.includes('OEM')) return 'По OEM';
    if (article.includes('VIN')) return 'Поиск по VIN';
    if (article.includes('PLATE')) return 'Поиск по госномеру';
    if (article.includes('WIZARD')) return 'Поиск по параметрам';
    if (article.includes('PART_VEHICLES')) return 'Поиск авто по детали';
    return article;
  };

  return (
    <>
      <div className="mt-1.5 w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
      <div className="flex justify-between items-center px-5 pt-1.5 pb-2 mt-1.5 w-full bg-white rounded-lg  max-md:max-w-full max-md:flex-col max-md:min-w-0 hover:bg-gray-50 transition-colors">
        <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch pr-5 my-auto w-full basis-0  max-md:max-w-full max-md:flex-col max-md:gap-2 max-md:p-0 max-md:min-w-0">
          <div className="self-stretch my-auto w-40 max-md:w-full text-sm">
            <div className="font-medium text-gray-900">{date}</div>
            {vehicleInfo && (
              <div className="text-xs text-gray-500 mt-1">
                {vehicleInfo.brand} {vehicleInfo.model} {vehicleInfo.year}
              </div>
            )}
          </div>
          
          <div className="self-stretch my-auto w-40 font-bold leading-snug text-gray-950 max-md:w-full">
            {manufacturer}
          </div>
          
          <div className="self-stretch my-auto font-medium leading-snug text-gray-700 w-[180px] max-md:w-full text-sm">
            {getSearchTypeDisplay(article)}
            {resultCount !== undefined && (
              <div className="text-xs text-gray-500 mt-1">
                Найдено: {resultCount} шт.
              </div>
            )}
          </div>
          
          <div className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full max-md:w-full">
            <div className="font-medium text-gray-900">{name}</div>
          </div>
          
          {onDelete && (
            <div className="w-16 text-center max-md:w-full">
              <button
                onClick={handleDeleteClick}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors group"
                title="Удалить из истории"
                aria-label="Удалить из истории"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors"
                >
                  <path d="M3 6h18" className="group-hover:stroke-[#ec1c24]" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" className="group-hover:stroke-[#ec1c24]" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c-1 0 2 1 2 2v2" className="group-hover:stroke-[#ec1c24]" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileHistoryItem; 