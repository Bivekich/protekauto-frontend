import { TIconMap } from '@/shared';
import { ImageProps } from 'next/image';

import Terminal from '@public/img/shipping/Terminal.png';
import Securities from '@public/img/shipping/Securities.png';

interface ICard {
  title: string;
  icon: TIconMap;
  bgColor: string;
  titleColor: string;
  topicsColor: string;
  topics: string[];
  image?: IImage;
}

interface IImage extends Pick<ImageProps, 'src' | 'width' | 'height' | 'alt'> {
  right: number;
}

export const shippingCards: ICard[] = [
  {
    title: 'Для физических лиц',
    icon: 'verify_red',
    bgColor: 'white',
    titleColor: 'black',
    topicsColor: 'black',
    topics: [
      'Наличными',
      'Банковской картой',
      'По QR-Коду через мобильное приложение банка',
      'СБП через мобильное приложение банка',
    ],
    image: {
      src: Terminal,
      width: 157,
      height: 148,
      alt: 'Терминал',
      right: 0,
    },
  },
  {
    title: 'Для юридических лиц',
    icon: 'verify_red',
    bgColor: 'white',
    titleColor: 'black',
    topicsColor: 'black',
    topics: [
      'Безналичный расчет с НДС',
      'НДС 20%',
      'Доплата при оплате с НДС не требуется',
    ],
    image: {
      src: Securities,
      width: 125,
      height: 140,
      alt: 'Ценные бумаги',
      right: 16,
    },
  },
  {
    title: 'Важно',
    icon: 'alert',
    bgColor: 'main-blue',
    titleColor: 'white',
    topicsColor: '#CBD5E3',
    topics: [
      '100% предоплата для всех заказов',
      'Предоплата меньшего размера только для предзаказа',
    ],
  },
];
