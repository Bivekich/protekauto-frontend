import styles from './style.module.css';
import Logo from '@public/Logo.png';
import Image from 'next/image';
import { navOptions } from './navOptions';
import Link from 'next/link';
import { Icon } from '@/shared';

export const HeaderTop = () => {
  return (
    <div className={styles.root}>
      <Link href={'/'}>
        <Image src={Logo} alt={'Логотип Protek'} width={220} height={30} />
      </Link>

      <div className={styles.nav}>
        {navOptions.map((option) => (
          <Link
            href={option.path}
            key={option.path}
            className={'variant-caption hover:text-black text-main-blue'}
          >
            {option.label}
          </Link>
        ))}
      </div>

      <div className={'flex gap-8'}>
        <div className={'flex items-center gap-3'}>
          <Icon name={'phone'} />
          <Link href={'tel:+74952602060'}>
            <p className={'text-lg'}>+7 (495) 260-20-60</p>
          </Link>
        </div>

        <div className={'flex gap-3'}>
          <Link href={'https://t.me/dr1m_o_o'} target={'_blank'}>
            <Icon name={'telegram'} />
          </Link>
          <Link href={'https://wa.me/qr/7SFJ74FTVU3FL1'} target={'_blank'}>
            <Icon name={'whatsapp'} />
          </Link>
        </div>
      </div>
    </div>
  );
};
