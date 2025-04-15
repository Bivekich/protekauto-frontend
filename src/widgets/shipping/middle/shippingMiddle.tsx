import { shippingIcons, shippingOptions } from './shippingOptions';
import Image from 'next/image';

export const ShippingMiddle = () => {
  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'space-y-5'}>
        <h3 className={'text-title-fourth text-3xl'}>Доставка</h3>
        <p className={'text-paragraph-sm'}>
          Мы заботимся о вашем времени и комфорте, поэтому предлагаем удобные
          варианты доставки
        </p>
      </div>

      <div className={'space-y-5'}>
        <h4 className={'text-title-fourth'}>В пределах Москвы и области</h4>
        <div className={'flex gap-2'}>
          {shippingOptions.top.map((option, index) => (
            <p key={index} className={'text-paragraph-sm'}>
              {option}
            </p>
          ))}
        </div>
      </div>

      <div className={'space-y-5'}>
        <h4 className={'text-title-fourth'}>В регионы</h4>
        <div className={'flex gap-4'}>
          {shippingOptions.bottom.map((option, index) => (
            <p key={index} className={'text-paragraph-sm'}>
              {option}
            </p>
          ))}
        </div>
      </div>

      <div className={'flex gap-10'}>
        {shippingIcons.map((icon) => (
          <div
            key={icon.alt}
            className={'p-10 border border-ice-grey rounded-xl'}
          >
            <Image {...icon} alt={icon.alt || 'Логотип службы доставки'} />
          </div>
        ))}
      </div>
    </div>
  );
};
