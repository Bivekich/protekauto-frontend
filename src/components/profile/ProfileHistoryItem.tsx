import React from "react";

interface ProfileHistoryItemProps {
  date: string;
  manufacturer: string;
  article: string;
  name: string;
}

const ProfileHistoryItem: React.FC<ProfileHistoryItemProps> = ({
  date,
  manufacturer,
  article,
  name,
}) => (
  <>
  <div className="mt-1.5 w-full border border-gray-200 border-solid min-h-[1px] max-md:max-w-full" />
  <div className="flex justify-between items-center px-5 pt-1.5 pb-2 mt-1.5 w-full bg-white rounded-lg min-w-[420px] max-md:max-w-full max-md:flex-col max-md:min-w-0">
    <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch pr-5 my-auto w-full basis-0 min-w-[240px] max-md:max-w-full max-md:flex-col max-md:gap-2 max-md:p-0 max-md:min-w-0">
      <div className="self-stretch my-auto w-40 max-md:w-full">{date}</div>
      <div className="self-stretch my-auto w-40 font-bold leading-snug text-gray-950 max-md:w-full">
        {manufacturer}
      </div>
      <div className="self-stretch my-auto font-bold leading-snug text-gray-950 w-[180px] max-md:w-full">
        {article}
      </div>
      <div className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full max-md:w-full">
        {name}
      </div>
    </div>
  </div>
  </>
);

export default ProfileHistoryItem; 