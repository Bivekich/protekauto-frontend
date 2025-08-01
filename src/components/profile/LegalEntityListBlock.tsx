import React from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT_LEGAL_ENTITY } from '@/lib/graphql';

interface LegalEntity {
  id: string;
  shortName: string;
  fullName?: string;
  form?: string;
  legalAddress?: string;
  actualAddress?: string;
  taxSystem?: string;
  responsiblePhone?: string;
  responsiblePosition?: string;
  responsibleName?: string;
  accountant?: string;
  signatory?: string;
  registrationReasonCode?: string;
  ogrn?: string;
  inn: string;
  vatPercent: number;
  bankDetails: Array<{
    id: string;
    name: string;
    accountNumber: string;
    bankName: string;
    bik: string;
    correspondentAccount: string;
  }>;
}

interface LegalEntityListBlockProps {
  legalEntities: LegalEntity[];
  onRefetch: () => void;
  onEdit?: (entity: LegalEntity) => void;
}

const LegalEntityListBlock: React.FC<LegalEntityListBlockProps> = ({ legalEntities, onRefetch, onEdit }) => {
  const router = useRouter();

  const [deleteLegalEntity] = useMutation(DELETE_CLIENT_LEGAL_ENTITY, {
    onCompleted: () => {
      console.log('Юридическое лицо удалено');
      onRefetch();
    },
    onError: (error) => {
      console.error('Ошибка удаления юридического лица:', error);
      alert('Ошибка удаления юридического лица');
    }
  });

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить юридическое лицо "${name}"?`)) {
      try {
        await deleteLegalEntity({
          variables: { id }
        });
      } catch (error) {
        console.error('Ошибка удаления:', error);
      }
    }
  };

  if (legalEntities.length === 0) {
    return (
      <div className="flex relative flex-col mt-5 gap-8 items-start self-stretch p-8 pl-8 bg-white rounded-2xl max-md:gap-5 max-md:p-5 max-sm:gap-4 max-sm:p-4">
        <div className="text-3xl font-bold leading-8 text-gray-950 max-md:text-2xl max-sm:text-xl">
          Юридические лица
        </div>
        <div className="text-gray-600">
          У вас пока нет добавленных юридических лиц. Нажмите кнопку "Добавить юридическое лицо" для создания первого.
        </div>
      </div>
    );
  }

  return (
    <div
      layer-name="Frame 2087324698"
      className="flex relative flex-col mt-5 gap-8 items-start self-stretch p-8 pl-8 bg-white rounded-2xl max-md:gap-5 max-md:p-5 max-sm:gap-4 max-sm:p-4"
    >
      <div
        layer-name="Юридические лица"
        className="text-3xl font-bold leading-8 text-gray-950 max-md:text-2xl max-sm:text-xl"
      >
        Юридические лица
      </div>
      <div className="flex relative flex-col gap-2.5 items-start self-stretch">
        {legalEntities.map((entity, idx) => (
          <div
            key={entity.id}
            layer-name="legal"
            className="flex relative flex-col gap-8 items-start self-stretch px-5 py-3 rounded-lg bg-slate-50 max-sm:px-4 max-sm:py-2.5"
          >
            <div className="flex relative justify-between items-center self-stretch max-sm:flex-col max-sm:gap-4 max-sm:items-start">
              <div className="flex relative gap-5 items-center max-md:flex-wrap max-md:gap-4 max-sm:flex-col max-sm:gap-2.5 max-sm:items-start">
                <div
                  layer-name={entity.shortName}
                  className="text-xl font-bold leading-5 text-gray-950 max-md:text-lg max-sm:text-base"
                >
                  {entity.shortName}
                </div>
                <div
                  layer-name={`ИНН ${entity.inn}`}
                  className="text-sm leading-5 text-gray-600"
                >
                  ИНН {entity.inn}
                </div>
                <div
                  layer-name="link_control_element"
                  className="flex relative gap-1.5 items-center cursor-pointer hover:text-red-600"
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push('/profile-requisites')}
                >
                  <div
                    layer-name="icon-wallet"
                    className="relative aspect-[1/1] h-[18px] w-[18px]"
                  >
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            "<svg id=\"I48:1881;1705:18944;1705:18492;1149:3355\" width=\"16\" height=\"15\" viewBox=\"0 0 16 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"wallet-icon\" style=\"width: 16px; height: 14px; flex-shrink: 0; fill: #424F60; position: absolute; left: 1px; top: 2px\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1.77778 3.16211C1.77778 3.04608 1.8246 2.9348 1.90795 2.85275C1.9913 2.7707 2.10435 2.72461 2.22222 2.72461H11.5556C11.7913 2.72461 12.0174 2.63242 12.1841 2.46833C12.3508 2.30423 12.4444 2.08167 12.4444 1.84961C12.4444 1.61754 12.3508 1.39499 12.1841 1.23089C12.0174 1.0668 11.7913 0.974609 11.5556 0.974609H2.22222C1.63285 0.974609 1.06762 1.20508 0.650874 1.61531C0.234126 2.02555 0 2.58195 0 3.16211V13.2246C0 13.6887 0.187301 14.1339 0.520699 14.462C0.854097 14.7902 1.30628 14.9746 1.77778 14.9746H14.2222C14.6937 14.9746 15.1459 14.7902 15.4793 14.462C15.8127 14.1339 16 13.6887 16 13.2246V5.34961C16 4.88548 15.8127 4.44036 15.4793 4.11217C15.1459 3.78398 14.6937 3.59961 14.2222 3.59961H2.22222C2.10435 3.59961 1.9913 3.55352 1.90795 3.47147C1.8246 3.38942 1.77778 3.27814 1.77778 3.16211ZM11.1111 10.5996C11.4647 10.5996 11.8039 10.4613 12.0539 10.2152C12.304 9.96905 12.4444 9.63521 12.4444 9.28711C12.4444 8.93901 12.304 8.60517 12.0539 8.35903C11.8039 8.11289 11.4647 7.97461 11.1111 7.97461C10.7575 7.97461 10.4184 8.11289 10.1683 8.35903C9.91825 8.60517 9.77778 8.93901 9.77778 9.28711C9.77778 9.63521 9.91825 9.96905 10.1683 10.2152C10.4184 10.4613 10.7575 10.5996 11.1111 10.5996Z\" fill=\"#424F60\"></path> </svg>",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    layer-name="Редактировать"
                    className="text-sm leading-5 text-gray-600"
                  >
                    Реквизиты компании
                  </div>
                </div>

              </div>
              <div className="flex relative gap-5 items-center pr-2.5 max-md:gap-4 max-sm:flex-wrap max-sm:gap-2.5">
                <div
                  role="button"
                  tabIndex={0}
                  className="flex relative gap-1.5 items-center cursor-pointer hover:text-red-600"
                  onClick={() => onEdit && onEdit(entity)}
                >
                  <div className="relative h-4 w-[18px]">
                    <Image
                      src="/images/edit.svg"
                      alt="Редактировать"
                      width={16}
                      height={16}
                      className="absolute left-0.5 top-0"
                    />
                  </div>
                  <div className="text-sm leading-5 text-gray-600">
                    Редактировать
                  </div>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className="flex relative gap-1.5 items-center cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(entity.id, entity.shortName)}
                >
                  <div className="relative h-4 w-[18px]">
                    <Image
                      src="/images/delete.svg"
                      alt="Удалить"
                      width={16}
                      height={16}
                      className="absolute left-0.5 top-0"
                    />
                  </div>
                  <div className="text-sm leading-5 text-gray-600">
                    Удалить
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalEntityListBlock; 