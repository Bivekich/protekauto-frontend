import * as React from "react";
import Image from "next/image";
import ProfilePersonalData from "./ProfilePersonalData";
import LegalEntityListBlock from "./LegalEntityListBlock";
import LegalEntityFormBlock from "./LegalEntityFormBlock";
import ProfileSettingsActionsBlock from "./ProfileSettingsActionsBlock";

const ProfileSettingsMain = () => {
    const [form, setForm] = React.useState("Выбрать");
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const formOptions = ["ООО", "ИП", "АО", "ПАО", "Другое"];

    const [taxSystem, setTaxSystem] = React.useState("Выбрать");
    const [isTaxSystemOpen, setIsTaxSystemOpen] = React.useState(false);
    const taxSystemOptions = ["ОСНО", "УСН", "ЕНВД", "ПСН", ];

    const [nds, setNds] = React.useState("Выбрать");
    const [isNdsOpen, setIsNdsOpen] = React.useState(false);
    const ndsOptions = ["Без НДС", "НДС 10%", "НДС 20%", "Другое"];

    const [notifySwitch, setNotifySwitch] = React.useState(false);

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
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
    const [phoneError, setPhoneError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [showLegalEntityForm, setShowLegalEntityForm] = React.useState(false);

    return (
        <div className="flex flex-col justify-center">
              <ProfilePersonalData
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                notifySwitch={notifySwitch}
                setNotifySwitch={setNotifySwitch}
                phoneError={phoneError}
                emailError={emailError}
              />
          <LegalEntityListBlock />
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
              onAdd={() => setShowLegalEntityForm(false)}
              onCancel={() => setShowLegalEntityForm(false)}
            />
          )}
          <ProfileSettingsActionsBlock onAddLegalEntity={() => setShowLegalEntityForm(true)} />
        </div>
      );
    }

export default ProfileSettingsMain;






