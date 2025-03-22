import { TIconMap } from '@/shared';

interface IGridItemStruct {
  icon: TIconMap;
  title: string;
  description: string;
}

export const gridItems: IGridItemStruct[] = [
  {
    icon: 'bag',
    title: 'Оптово-розничная компания',
    description:
      'Мы работаем и с розничными клиентами, и с оптовыми покупателями',
  },
  {
    icon: 'like',
    title: 'Надежный партнер',
    description:
      'Мы ценим долгосрочные отношения и стремимся к взаимовыгодному сотрудничеству',
  },
  {
    icon: 'verify',
    title: 'Гарантия качества',
    description:
      'Мы предлагаем только качественные запчасти от проверенных поставщиков',
  },
];
