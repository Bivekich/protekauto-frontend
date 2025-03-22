import Coins from '@public/img/aboutUs/Coins.png';
import Container from '@public/img/aboutUs/Container.png';
import Details from '@public/img/aboutUs/Details.png';
import Engine from '@public/img/aboutUs/Engine.png';

export const gridItems = [
  {
    title: 'Оригинальные и неоригинальные запчасти',
    description: 'От расходников до комплектующих для сложного ремонта',
    photo: {
      src: Engine,
      width: 84,
      height: 83,
      alt: 'Фотография ассортимента',
    },
  },
  {
    title: 'Широкий ассортимент',
    description: 'От запчастей для популярных моделей до редких деталей',
    photo: {
      src: Details,
      width: 84,
      height: 71,
      alt: 'Фотография ассортимента',
    },
  },
  {
    title: 'Собственное наличие',
    description: 'Мы гарантируем быстрое и качественное обслуживание',
    photo: {
      src: Container,
      width: 84,
      height: 74,
      alt: 'Фотография ассортимента',
    },
  },
  {
    title: 'Конкурентные цены',
    description: 'Благодаря прямым поставкам из Китая, Индии, Турции и Европы',
    photo: {
      src: Coins,
      width: 84,
      height: 84,
      alt: 'Фотография ассортимента',
    },
  },
];
