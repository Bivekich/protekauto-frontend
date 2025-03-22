export const routes = [
  {
    name: 'Главная',
    path: '/',
    bgColor: 'white',
    children: [
      { name: 'О компании', path: '/about', bgColor: 'white' },
      { name: 'Оплата и доставка', path: '/shipping', bgColor: 'sky-blue' },
      { name: 'Гарантия и возврат', path: '/guarantee', bgColor: 'white' },
      { name: 'Покупателям', path: '/for-buyers', bgColor: 'white' },
      {
        name: 'Оптовым клиентам',
        path: '/wholesale-clients',
        bgColor: 'white',
      },
      { name: 'Контакты', path: '/contacts', bgColor: 'sky-blue' },
    ],
  },
];
