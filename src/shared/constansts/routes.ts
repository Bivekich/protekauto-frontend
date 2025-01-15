export const routes = [
  {
    name: 'Главная',
    path: '/',
    children: [
      { name: 'О компании', path: '/about' },
      { name: 'Оплата и доставка', path: '/shipping' },
      { name: 'Гарантия и возврат', path: '/guarantee' },
      { name: 'Покупателям', path: '/for-buyers' },
      { name: 'Оптовым клиентам', path: '/wholesale-clients' },
      { name: 'Контакты', path: '/contacts' },
    ],
  },
];
