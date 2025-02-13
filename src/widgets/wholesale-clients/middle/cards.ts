import { TIconMap } from '@/shared';

interface ICardsInterface {
  icon: TIconMap;
  title: string;
  description: string;
}

export const cards: ICardsInterface[] = [
  {
    icon: 'blocks',
    title: 'Широкий ассортимент',
    description:
      'Все запчасти можно заказать в одном месте, с Российских и зарубежных складов',
  },
  {
    icon: 'clock_big',
    title: 'Бесплатный подбор 24/7',
    description: 'Наши эксперты круглосуточно подберут нужные запчасти по VIN',
  },
  {
    icon: 'wallet',
    title: 'Минимальные цены и сроки',
    description: 'Сравнивайте предложения сотен поставщиков и выбирайте лучшие',
  },
  {
    icon: 'delivery',
    title: 'Удобная доставка',
    description:
      'До двери или в пункты выдачи транспортных компаний по всей России',
  },
  {
    icon: 'payback',
    title: 'Лояльный возврат',
    description: 'Быстрый учет и возврат денег на баланс личного кабинета',
  },
];

export const services = [
  'Онлайн-проценка по API',
  'Прайс листы нашего наличия',
  'Онлайн заказ',
]
  .join('  •  ')
  .split('  ');
