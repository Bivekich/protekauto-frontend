import Shipping from '@img/main/Shipping.png';
import Approved from '@img/main/Approved.png';
import Discount from '@img/main/Discount.png';
import Chat from '@img/main/Chat.png';

export const plotData = [
  {
    image: { src: Shipping, alt: 'Коробка', width: 48, height: 40 },
    text: 'Быстрая доставка по всей стране',
  },
  {
    image: { src: Approved, alt: 'Галочка', width: 44, height: 48 },
    text: 'Высокое качество продукции',
  },
  {
    image: { src: Discount, alt: 'Скидка', width: 30, height: 48 },
    text: 'Выгодные цены',
  },
  {
    image: { src: Chat, alt: 'Коробка', width: 49, height: 44 },
    text: 'Профессиональная консультация',
  },
];

export const circles = {
  styles:
    'w-[116px] h-[116px] absolute rounded-full px-2 flex justify-center items-center text-center text-black',
  data: [
    'bg-yellow-400 top-20 right-[44%]',
    'bg-primary-red top-36 right-[34%] rotate-12',
    'bg-fuchsia-400 top-36 right-[54%] -rotate-12',
  ],
};
