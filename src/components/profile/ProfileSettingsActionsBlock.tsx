import React from "react";

interface ProfileSettingsActionsBlockProps {
  onAddLegalEntity: () => void;
}

const ProfileSettingsActionsBlock: React.FC<ProfileSettingsActionsBlockProps> = ({ onAddLegalEntity }) => (
  <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-5 py-4 mt-5 w-full text-base font-medium leading-tight text-center bg-white rounded-2xl max-md:max-w-full">
    <div className="gap-2.5 self-stretch px-5 py-4 my-auto bg-red-600 rounded-xl min-h-[50px] cursor-pointer text-white">
      Сохранить изменения
    </div>
    <div className="gap-2.5 self-stretch px-5 py-4 my-auto rounded-xl border border-red-600 min-h-[50px] min-w-[240px] cursor-pointer bg-white text-gray-950" onClick={onAddLegalEntity}>
      Добавить юридическое лицо
    </div>
  </div>
);

export default ProfileSettingsActionsBlock; 