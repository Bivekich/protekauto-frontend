import Yandex from '@public/img/shipping/Yandex.png';
import SDEK from '@public/img/shipping/SDEK.png';
import Del from '@public/img/shipping/Del.png';
import Boxberry from '@public/img/shipping/Boxberry.png';
import Pochta from '@public/img/shipping/Pochta.png';

export const shippingOptions = {
  top: [
    'Собственная доставка на следующий день после заказа',
    'Стоимость доставки зависит от суммы заказа',
    'Подробности уточняйте у менеджера',
  ]
    .join(' • ')
    .split(' '),
  bottom: [
    'СДЕК',
    'ПОЧТА',
    'Деловые линии',
    'Доставка транспортными компаниями',
    'Заказы, оформленные до 12:00, доставляем в тот же день',
    'Доставка в ТК – бесплатно',
  ]
    .join(' • ')
    .split(' '),
};

export const shippingIcons = [
  { src: Yandex, alt: 'Яндекс доставка', width: 195, height: 38 },
  { src: SDEK, alt: 'СДЭК', width: 137, height: 38 },
  { src: Del, alt: 'Деловые линии', width: 251, height: 38 },
  { src: Boxberry, alt: 'Boxberry', width: 167, height: 38 },
  { src: Pochta, alt: 'Почта России', width: 273, height: 38 },
];
