import { Icon, WidgetContainer } from '@/shared';
import Logo from '@img/footer/Logo.png';
import Image from 'next/image';
import { navOptions } from './navOptions';
import Link from 'next/link';
import Mir from '@img/footer/Mir.png';
import Mastercard from '@img/footer/Mastercard.png';
import Visa from '@img/footer/Visa.png';

export const FooterContent = () => {
  return (
    <WidgetContainer innerContainerProps={{ className: 'py-20 space-y-20' }}>
      <div className={'flex items-center justify-between'}>
        <div className={'space-y-20 max-w-[390px]'}>
          <Image
            src={Logo}
            alt={'Протек автозапчасти'}
            width={320}
            height={44}
          />

          <div className={'space-y-7'}>
            <a
              href={'tel:+74952602060'}
              className={
                'bg-white flex items-center w-fit gap-4 text-paragraph py-4 px-7 rounded-xl'
              }
            >
              <Icon name={'phone'} />
              +7 (495) 260-20-60
            </a>

            <p className={'text-ice-grey font-golos text-[22px]'}>
              пн-пт 9:00 – 18:00, сб 10:00 – 16:00, вс – выходной
            </p>
          </div>
        </div>

        <div className={'grid grid-cols-4 font-golos gap-16'}>
          {navOptions.map((option) => (
            <div key={option.title} className={'flex flex-col gap-9'}>
              <h6 className={'text-paragraph text-white'}>{option.title}</h6>
              {option.options.map((item) => (
                <Link
                  href={item.src}
                  key={item.label}
                  className={'text-[22px] text-ice-grey'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={'w-full flex justify-between items-center'}>
        <span className={'text-base text-[#CBD5E3] font-golos opacity-50'}>
          © 2025 Protek. Все права защищены
        </span>

        <div className={'flex w-fit gap-10 items-center'}>
          <Image src={Mastercard} alt={'Mastercard'} width={46} height={37} />
          <Image src={Visa} alt={'Visa'} width={55} height={19} />
          <Image src={Mir} alt={'Мир'} width={64} height={19} />
        </div>
      </div>
    </WidgetContainer>
  );
};
