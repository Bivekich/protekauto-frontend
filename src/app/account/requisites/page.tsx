'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Requisite {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  isDefault: boolean;
  legalEntity: string;
}

export default function RequisitesPage() {
  const [requisites, setRequisites] = useState<Requisite[]>([
    {
      id: '1',
      name: 'Основной',
      accountNumber: '456984567652121',
      bankName: 'ПАО Альфабанк',
      isDefault: true,
      legalEntity: 'ООО «Рога и копыта»',
    },
    {
      id: '2',
      name: 'Основной',
      accountNumber: '456984567652121',
      bankName: 'ПАО Альфабанк',
      isDefault: false,
      legalEntity: 'ООО «Рога и копыта»',
    },
  ]);

  const handleEditRequisite = (id: string) => {
    console.log('Edit requisite', id);
    // Здесь можно добавить логику открытия модального окна для редактирования
  };

  const handleDeleteRequisite = (id: string) => {
    // Показать модальное окно подтверждения удаления
    if (window.confirm('Вы уверены, что хотите удалить реквизиты?')) {
      setRequisites(requisites.filter((req) => req.id !== id));
    }
  };

  const handleSetDefaultRequisite = (id: string) => {
    setRequisites(
      requisites.map((req) => ({
        ...req,
        isDefault: req.id === id,
      }))
    );
  };

  const handleAddRequisite = () => {
    console.log('Add new requisite');
    // Здесь можно добавить логику открытия модального окна для добавления
  };

  const handleManageLegalEntities = () => {
    console.log('Manage legal entities');
    // Здесь можно добавить логику перехода на страницу управления юр. лицами
  };

  return (
    <div className="flex flex-col w-full gap-[20px]">
      {/* Хлебные крошки */}
      <div className="flex items-center gap-[10px] py-[10px]">
        <Link href="/" className="text-[14px] text-[#000000]">
          Главная
        </Link>
        <span className="text-[14px] text-[#8E9AAC]">→</span>
        <Link href="/account" className="text-[14px] text-[#000000]">
          Личный кабинет
        </Link>
        <span className="text-[14px] text-[#8E9AAC]">→</span>
        <span className="text-[14px] text-[#8E9AAC]">Реквизиты</span>
      </div>

      <h1 className="text-[36px] font-extrabold text-[#000814] mb-[20px]">
        Реквизиты для юридических лиц
      </h1>

      {/* Блок реквизитов */}
      <div className="bg-white rounded-[16px] p-[30px] flex flex-col gap-[30px]">
        <h2 className="text-[30px] font-bold text-[#000814]">
          Реквизиты ООО «Рога и копыта»
        </h2>

        <div className="flex flex-col gap-[10px]">
          {requisites.map((requisite) => (
            <div
              key={requisite.id}
              className="bg-[#F5F8FB] rounded-[8px] p-[12px] px-[20px]"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[20px] font-bold text-[#000814]">
                    {requisite.name}
                  </h3>
                  <p className="text-[14px] text-[#424F60]">
                    № р/с {requisite.accountNumber}
                  </p>
                  <p className="text-[14px] text-[#424F60]">
                    {requisite.bankName}
                  </p>

                  <div className="flex items-center gap-[30px] mt-[10px]">
                    <div
                      className="flex items-center gap-[5px] cursor-pointer"
                      onClick={() => handleSetDefaultRequisite(requisite.id)}
                    >
                      <div className="w-[20px] h-[20px] rounded-full border border-[#EC1C24] flex items-center justify-center">
                        {requisite.isDefault && (
                          <div className="w-[12px] h-[12px] rounded-full bg-[#FF0000]"></div>
                        )}
                      </div>
                      <span className="text-[14px] text-[#424F60]">
                        Основной счет
                      </span>
                    </div>

                    <div className="flex items-center gap-[5px]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                          stroke="#424F60"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.1667 12.5C16.0558 12.7513 16.0227 13.0302 16.0717 13.3005C16.1207 13.5708 16.2496 13.8203 16.4417 14.0167L16.4917 14.0667C16.6467 14.2215 16.7696 14.4053 16.8532 14.6075C16.9368 14.8096 16.9798 15.0259 16.9798 15.2442C16.9798 15.4624 16.9368 15.6787 16.8532 15.8809C16.7696 16.083 16.6467 16.2668 16.4917 16.4217C16.3368 16.5766 16.153 16.6996 15.9509 16.7832C15.7487 16.8668 15.5324 16.9097 15.3142 16.9097C15.0959 16.9097 14.8796 16.8668 14.6775 16.7832C14.4753 16.6996 14.2915 16.5766 14.1367 16.4217L14.0867 16.3717C13.8903 16.1796 13.6408 16.0507 13.3705 16.0017C13.1002 15.9527 12.8213 15.9858 12.57 16.0967C12.3248 16.2022 12.1159 16.3716 11.9692 16.5865C11.8224 16.8013 11.7441 17.053 11.7442 17.3108V17.4167C11.7442 17.8587 11.5685 18.2826 11.2559 18.5951C10.9434 18.9077 10.5195 19.0833 10.0775 19.0833C9.63551 19.0833 9.21158 18.9077 8.89902 18.5951C8.58646 18.2826 8.41084 17.8587 8.41084 17.4167V17.3417C8.40467 17.0783 8.31983 16.8228 8.16541 16.6067C8.01099 16.3906 7.79297 16.2222 7.54084 16.1217C7.28953 16.0108 7.01059 15.9777 6.74032 16.0267C6.47004 16.0757 6.22051 16.2046 6.02417 16.3967L5.97417 16.4467C5.81934 16.6016 5.63555 16.7246 5.43339 16.8082C5.23122 16.8918 5.01493 16.9347 4.79667 16.9347C4.57842 16.9347 4.36213 16.8918 4.15996 16.8082C3.9578 16.7246 3.77401 16.6016 3.61917 16.4467C3.46424 16.2918 3.34132 16.108 3.25772 15.9059C3.17412 15.7037 3.13115 15.4874 3.13115 15.2692C3.13115 15.0509 3.17412 14.8346 3.25772 14.6325C3.34132 14.4303 3.46424 14.2465 3.61917 14.0917L3.66917 14.0417C3.86131 13.8453 3.99021 13.5958 4.03921 13.3255C4.08821 13.0552 4.05515 12.7763 3.94417 12.525C3.83869 12.2798 3.66929 12.0709 3.45442 11.9242C3.23955 11.7774 2.98787 11.6991 2.73 11.6992H2.62417C2.18213 11.6992 1.7582 11.5235 1.44564 11.211C1.13308 10.8984 0.957458 10.4745 0.957458 10.0325C0.957458 9.59045 1.13308 9.16652 1.44564 8.85396C1.7582 8.5414 2.18213 8.36578 2.62417 8.36578H2.69917C2.96264 8.35961 3.21809 8.27476 3.43419 8.12034C3.65029 7.96592 3.81872 7.74791 3.91917 7.49578C4.03015 7.24447 4.06321 6.96553 4.01421 6.69526C3.96521 6.42498 3.83631 6.17545 3.64417 5.97911L3.59417 5.92911C3.43924 5.77428 3.31632 5.59049 3.23272 5.38832C3.14912 5.18616 3.10615 4.96987 3.10615 4.75161C3.10615 4.53335 3.14912 4.31707 3.23272 4.1149C3.31632 3.91274 3.43924 3.72895 3.59417 3.57411C3.74901 3.41918 3.9328 3.29626 4.13496 3.21266C4.33713 3.12906 4.55341 3.08609 4.77167 3.08609C4.98993 3.08609 5.20621 3.12906 5.40838 3.21266C5.61054 3.29626 5.79434 3.41918 5.94917 3.57411L5.99917 3.62411C6.19551 3.81625 6.44504 3.94515 6.71532 3.99415C6.98559 4.04315 7.26453 4.01009 7.51584 3.89911H7.54084C7.78603 3.79363 7.995 3.62422 8.14175 3.40935C8.28851 3.19448 8.36681 2.9428 8.36667 2.68494V2.58328C8.36667 2.14124 8.54229 1.7173 8.85485 1.40474C9.16742 1.09218 9.59135 0.916565 10.0334 0.916565C10.4754 0.916565 10.8993 1.09218 11.2119 1.40474C11.5245 1.7173 11.7001 2.14124 11.7001 2.58328V2.65828C11.7 2.91613 11.7783 3.16782 11.925 3.38269C12.0718 3.59756 12.2808 3.76697 12.5259 3.87244C12.7772 3.98342 13.0562 4.01648 13.3265 3.96748C13.5967 3.91848 13.8463 3.78958 14.0426 3.59744L14.0926 3.54744C14.2474 3.39252 14.4312 3.2696 14.6334 3.186C14.8356 3.1024 15.0518 3.05942 15.2701 3.05942C15.4884 3.05942 15.7047 3.1024 15.9068 3.186C16.109 3.2696 16.2928 3.39252 16.4476 3.54744C16.6025 3.70228 16.7255 3.88607 16.8091 4.08824C16.8927 4.2904 16.9356 4.50669 16.9356 4.72494C16.9356 4.9432 16.8927 5.15949 16.8091 5.36165C16.7255 5.56382 16.6025 5.74761 16.4476 5.90244L16.3976 5.95244C16.2055 6.14878 16.0766 6.39831 16.0276 6.66859C15.9786 6.93887 16.0116 7.2178 16.1226 7.46911V7.49411C16.2281 7.73929 16.3975 7.94826 16.6123 8.09502C16.8272 8.24177 17.0789 8.32007 17.3367 8.31994H17.4384C17.8804 8.31994 18.3044 8.49556 18.6169 8.80812C18.9295 9.12068 19.1051 9.54462 19.1051 9.98665C19.1051 10.4287 18.9295 10.8526 18.6169 11.1652C18.3044 11.4777 17.8804 11.6534 17.4384 11.6534H17.3634C17.1055 11.6532 16.8539 11.7315 16.639 11.8783C16.4241 12.025 16.2547 12.234 16.1492 12.4792L16.1667 12.5Z"
                          stroke="#424F60"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[14px] text-[#424F60]">
                        Юридическое лицо
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[20px]">
                  <div className="flex items-center gap-[5px]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.166 2.5H5.83268C4.91602 2.5 4.16602 3.25 4.16602 4.16667V15.8333C4.16602 16.75 4.91602 17.5 5.83268 17.5H14.166C15.0827 17.5 15.8327 16.75 15.8327 15.8333V4.16667C15.8327 3.25 15.0827 2.5 14.166 2.5Z"
                        stroke="#D0D0D0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.666 6.66675L8.33268 10.0001L11.666 13.3334"
                        stroke="#D0D0D0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <button
                      className="text-[14px] text-[#424F60]"
                      onClick={() => handleEditRequisite(requisite.id)}
                    >
                      Редактировать
                    </button>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 5H4.16667H17.5"
                        stroke="#D0D0D0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66602 4.99996V3.33329C6.66602 2.89127 6.84161 2.46734 7.15417 2.15478C7.46673 1.84222 7.89066 1.66663 8.33268 1.66663H11.666C12.108 1.66663 12.532 1.84222 12.8445 2.15478C13.1571 2.46734 13.3327 2.89127 13.3327 3.33329V4.99996M15.8327 4.99996V16.6666C15.8327 17.1087 15.6571 17.5326 15.3445 17.8451C15.032 18.1577 14.608 18.3333 14.166 18.3333H5.83268C5.39065 18.3333 4.96673 18.1577 4.65417 17.8451C4.34161 17.5326 4.16602 17.1087 4.16602 16.6666V4.99996H15.8327Z"
                        stroke="#D0D0D0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.33398 9.16663V14.1666"
                        stroke="#D0D0D0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.666 9.16663V14.1666"
                        stroke="#D0D0D0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <button
                      className="text-[14px] text-[#424F60]"
                      onClick={() => handleDeleteRequisite(requisite.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="bg-[#EC1C24] text-white py-[14px] px-[20px] rounded-[12px] text-[16px] font-medium self-start"
          onClick={handleAddRequisite}
        >
          Добавить реквизиты для ООО «Рога и копыта»
        </button>
      </div>

      {/* Блок управления юр. лицами */}
      <div className="bg-white rounded-[16px] p-[15px] px-[20px]">
        <button
          className="border border-[#EC1C24] text-[#000000] py-[22px] px-[40px] rounded-[12px] text-[18px] font-medium"
          onClick={handleManageLegalEntities}
        >
          Управление юридическими лицами
        </button>
      </div>
    </div>
  );
}
