import React, { useState } from "react";
import AddressForm from "./AddressForm";
import AddressDetails from "./AddressDetails";

interface ProfileAddressWayProps {
  onBack: () => void;
}

const ProfileAddressWay = ({ onBack }: ProfileAddressWayProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <div className="flex relative gap-8 items-start bg-white rounded-2xl flex-[1_0_0] min-h-[860px]  max-md:flex-col max-md:gap-5  ">
      {/* Левая часть */}
      {showDetails ? (
        <AddressDetails
          onClose={() => setShowDetails(false)}
          onBack={onBack}
          address={address}
          setAddress={setAddress}
        />
      ) : (
        <AddressForm onDetectLocation={() => setShowDetails(true)} address={address} setAddress={setAddress} onBack={onBack} />
      )}
      {/* Правая часть: карта */}
      <div className="flex-1  rounded-2xl overflow-hidden shadow-lg md:w-full ">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.532502%2C56.339223&mode=whatshere&whatshere%5Bpoint%5D=37.532502%2C56.339223&whatshere%5Bzoom%5D=17&z=16"
          className="w-full h-full min-h-[990px] max-md:min-h-[300px] "
          frameBorder="0"
          allowFullScreen
          title="Карта"
        ></iframe>
      </div>
    </div>
    
  );
};

export default ProfileAddressWay; 