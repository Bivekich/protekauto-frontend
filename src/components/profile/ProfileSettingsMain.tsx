import * as React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_CLIENT_ME, UPDATE_CLIENT_PERSONAL_DATA } from '@/lib/graphql';
import ProfilePersonalData from "./ProfilePersonalData";
import LegalEntityListBlock from "./LegalEntityListBlock";
import LegalEntityFormBlock from "./LegalEntityFormBlock";
import ProfileSettingsActionsBlock from "./ProfileSettingsActionsBlock";

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  legalEntities: Array<{
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
  }>;
}

const ProfileSettingsMain = () => {
    const [form, setForm] = React.useState("Выбрать");
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const formOptions = ["ООО", "ИП", "АО", "ПАО", "Другое"];

    const [taxSystem, setTaxSystem] = React.useState("Выбрать");
    const [isTaxSystemOpen, setIsTaxSystemOpen] = React.useState(false);
    const taxSystemOptions = ["ОСНО", "УСН", "ЕНВД", "ПСН"];

    const [nds, setNds] = React.useState("Выбрать");
    const [isNdsOpen, setIsNdsOpen] = React.useState(false);
    const ndsOptions = ["Без НДС", "НДС 10%", "НДС 20%", "Другое"];

    const [showLegalEntityForm, setShowLegalEntityForm] = React.useState(false);
    const [editingEntity, setEditingEntity] = React.useState<ClientData['legalEntities'][0] | null>(null);

    // Состояние для формы юридического лица
    const [inn, setInn] = React.useState("");
    const [ogrn, setOgrn] = React.useState("");
    const [kpp, setKpp] = React.useState("");
    const [jurAddress, setJurAddress] = React.useState("");
    const [shortName, setShortName] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [factAddress, setFactAddress] = React.useState("");
    const [ndsPercent, setNdsPercent] = React.useState("");
    const [accountant, setAccountant] = React.useState("");
    const [responsible, setResponsible] = React.useState("");
    const [responsiblePosition, setResponsiblePosition] = React.useState("");
    const [responsiblePhone, setResponsiblePhone] = React.useState("");
    const [signatory, setSignatory] = React.useState("");

    // Состояние для личных данных
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [phoneError, setPhoneError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");

    // GraphQL запросы
    const { data, loading, error, refetch } = useQuery(GET_CLIENT_ME, {
      onCompleted: (data) => {
        console.log('Данные клиента загружены:', data);
        if (data?.clientMe) {
          const client = data.clientMe;
          // Разделяем имя на имя и фамилию
          const nameParts = client.name?.split(' ') || ['', ''];
          setFirstName(nameParts[0] || '');
          setLastName(nameParts.slice(1).join(' ') || '');
          setPhone(client.phone || '');
          setEmail(client.email || '');

        }
      },
      onError: (error) => {
        console.error('Ошибка загрузки данных клиента:', error);
      }
    });

    const [updatePersonalData] = useMutation(UPDATE_CLIENT_PERSONAL_DATA, {
      onCompleted: () => {
        console.log('Личные данные обновлены');
        refetch();
      },
      onError: (error) => {
        console.error('Ошибка обновления личных данных:', error);
      }
    });

    const handleSavePersonalData = async () => {
      try {
        // Валидация
        setPhoneError('');
        setEmailError('');

        if (!phone || phone.length < 10) {
          setPhoneError('Введите корректный номер телефона');
          return;
        }

        if (!email || !email.includes('@')) {
          setEmailError('Введите корректный email');
          return;
        }

        await updatePersonalData({
          variables: {
            input: {
              type: 'INDIVIDUAL',
              name: `${firstName} ${lastName}`.trim(),
              phone,
              email,
              emailNotifications: false
            }
          }
        });

        alert('Личные данные сохранены!');
      } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert('Ошибка сохранения данных');
      }
    };

    const handleEditEntity = (entity: ClientData['legalEntities'][0]) => {
      setEditingEntity(entity);
      setShowLegalEntityForm(true);
      // Заполняем форму данными редактируемого юридического лица
      setShortName(entity.shortName);
      setFullName(entity.fullName || '');
      setForm(entity.form || 'ООО');
      setJurAddress(entity.legalAddress || '');
      setFactAddress(entity.actualAddress || '');
      setInn(entity.inn);
      setOgrn(entity.ogrn || '');
      setTaxSystem(entity.taxSystem || 'УСН');
      setNdsPercent(entity.vatPercent.toString());
      setAccountant(entity.accountant || '');
      setResponsible(entity.responsibleName || '');
      setResponsiblePosition(entity.responsiblePosition || '');
      setResponsiblePhone(entity.responsiblePhone || '');
      setSignatory(entity.signatory || '');
    };

    const handleAddEntity = () => {
      setEditingEntity(null);
      setShowLegalEntityForm(true);
      // Очищаем форму для нового юридического лица
      setShortName('');
      setFullName('');
      setForm('ООО');
      setJurAddress('');
      setFactAddress('');
      setInn('');
      setOgrn('');
      setTaxSystem('УСН');
      setNdsPercent('20');
      setAccountant('');
      setResponsible('');
      setResponsiblePosition('');
      setResponsiblePhone('');
      setSignatory('');
    };

    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <div className="mt-4 text-gray-600">Загрузка данных...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center p-8">
          <div className="text-red-600 text-center">
            <div className="text-lg font-semibold mb-2">Ошибка загрузки данных</div>
            <div className="text-sm">{error.message}</div>
            <button 
              onClick={() => refetch()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Повторить
            </button>
          </div>
        </div>
      );
    }

    const clientData: ClientData | null = data?.clientMe || null;

    return (
        <div className="flex flex-col flex-1 shrink justify-center basis-0 w-full max-md:max-w-full">
              <ProfilePersonalData
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                phoneError={phoneError}
                emailError={emailError}
                onSave={handleSavePersonalData}
              />
          <LegalEntityListBlock 
            legalEntities={clientData?.legalEntities || []}
            onRefetch={refetch}
            onEdit={handleEditEntity}
          />
          {showLegalEntityForm && (
            <LegalEntityFormBlock
              inn={inn}
              setInn={setInn}
              form={form}
              setForm={setForm}
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              formOptions={formOptions}
              ogrn={ogrn}
              setOgrn={setOgrn}
              kpp={kpp}
              setKpp={setKpp}
              jurAddress={jurAddress}
              setJurAddress={setJurAddress}
              shortName={shortName}
              setShortName={setShortName}
              fullName={fullName}
              setFullName={setFullName}
              factAddress={factAddress}
              setFactAddress={setFactAddress}
              taxSystem={taxSystem}
              setTaxSystem={setTaxSystem}
              isTaxSystemOpen={isTaxSystemOpen}
              setIsTaxSystemOpen={setIsTaxSystemOpen}
              taxSystemOptions={taxSystemOptions}
              nds={nds}
              setNds={setNds}
              isNdsOpen={isNdsOpen}
              setIsNdsOpen={setIsNdsOpen}
              ndsOptions={ndsOptions}
              ndsPercent={ndsPercent}
              setNdsPercent={setNdsPercent}
              accountant={accountant}
              setAccountant={setAccountant}
              responsible={responsible}
              setResponsible={setResponsible}
              responsiblePosition={responsiblePosition}
              setResponsiblePosition={setResponsiblePosition}
              responsiblePhone={responsiblePhone}
              setResponsiblePhone={setResponsiblePhone}
              signatory={signatory}
              setSignatory={setSignatory}
              editingEntity={editingEntity}
              onAdd={() => {
                setShowLegalEntityForm(false);
                setEditingEntity(null);
                refetch(); // Обновляем данные после добавления/редактирования
              }}
              onCancel={() => {
                setShowLegalEntityForm(false);
                setEditingEntity(null);
              }}
            />
          )}
          <ProfileSettingsActionsBlock onAddLegalEntity={handleAddEntity} />
        </div>
      );
    }

export default ProfileSettingsMain;






