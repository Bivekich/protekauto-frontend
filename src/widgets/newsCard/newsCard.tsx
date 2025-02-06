import Image, { StaticImageData } from 'next/image';
import Logo from '@img/main/Protek.png';
import { Icon } from '@/shared';
import { FC } from 'react';

interface IProps {
  imageSrc: string | StaticImageData;
  imageAlt: string;
}

export const NewsCard: FC<IProps> = ({ imageSrc, imageAlt }) => {
  return (
    <div
      className={
        'w-full rounded-xl bg-white h-[472px] flex flex-col p-[14px] gap-7'
      }
    >
      <div className={'flex flex-col justify-between px-4 pt-4 gap-5'}>
        <p className={'text-paragraph font-bold'}>
          Kia Syros будет выделяться необычным стилем
        </p>
        <p className={'font-golos text-[#424F60]'}>
          Компания Kia готова представить новый кроссовер Syros
        </p>

        <div className={'flex items-center justify-between'}>
          <div className={'flex gap-1'}>
            <Image
              src={Logo}
              alt={'Аватарка'}
              width={28}
              height={28}
              className={'rounded-full object-cover overflow-hidden'}
            />
            <p className={'font-golos text-[#424F60]'}>Новости компании</p>
          </div>

          <div className={'flex gap-1 items-center'}>
            <Icon name={'clock_small'} />
            <p className={'font-golos text-[#424F60]'}>17.12.2024</p>
          </div>
        </div>
      </div>

      <Image
        src={imageSrc}
        alt={imageAlt}
        width={372}
        height={220}
        className={'object-cover w-full overflow-hidden rounded-xl'}
      />
    </div>
  );
};
