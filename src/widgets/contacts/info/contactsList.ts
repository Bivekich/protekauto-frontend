import { TIconMap } from '@/shared';

interface IContactsList {
  icon: TIconMap;
  text: string;
}

export const contactsList: IContactsList[] = [
  { icon: 'phone', text: '+7 (495) 260-20-60' },
  {
    icon: 'map_point',
    text: 'Московская обл., г. Дмитров, ул. Чекистская 6, комната 4',
  },
  {
    icon: 'clock',
    text: 'ПН-ПТ 9:00 – 18:00, Сб 10:00 – 16:00, ВС – Выходной',
  },
];

export const contactsDetailsList = [
  'ИНН: 5007117840',
  'ОГРН: 1225000146282',
  'КПП: 500701001',
];
