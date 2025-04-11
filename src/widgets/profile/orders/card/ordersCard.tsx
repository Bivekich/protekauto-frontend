import { Badge, Icon, Switch } from '@/shared';

const gridTemplate = { gridTemplateColumns: '80px 4fr 2fr 1fr 1fr' };
const columns = [
  '',
  'Наименование и артикул',
  'Статус',
  'Количество, шт.',
  'Стоимость',
];

export const OrdersCard = () => {
  return (
    <div className={'card-wrapper !font-golos space-y-5'}>
      <div className={'h-stack items-center justify-between'}>
        <div className={'flex items-center gap-5'}>
          <h5 className={'text-paragraph font-semibold'}>
            Заказ от 2 августа 2024
          </h5>
          <Badge>Доставлено</Badge>
        </div>

        <div className={'flex gap-4 items-center'}>
          <p className={'text-paragraph-sm text-[#747474]'}>
            Показать документы
          </p>
          <Switch size={'sm'} />
        </div>
      </div>

      <div className={'text-[16px] space-y-2'}>
        <h6 className={'font-bold'}>ООО ПРОТЕК</h6>
        <p className={'max-w-[560px] text-caption'}>
          Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1,
          Подъезд 1, этаж 1
        </p>
      </div>

      <div className={'space-y-4'}>
        <div
          className={'grid gap-3 border-b border-b-ice-grey pb-2'}
          style={gridTemplate}
        >
          {columns.map((column) => (
            <p className={'text-ice-grey'} key={column}>
              {column}
            </p>
          ))}
        </div>
        <div className={'grid gap-3'} style={gridTemplate}>
          <div className={'flex gap-3'}>
            <Icon name={'refund_with_bg'} />
            <Icon name={'verify_with_bg'} />
          </div>

          <div>
            <p className={'text-[22px]'}>Масло моторное 229,41 SA 3 5W30 5Л</p>
            <p className={'text-caption text-[18px] underline font-bold'}>
              INA 530059210
            </p>
          </div>

          <p className={'underline text-[18px]'}>Доставлено в ПВЗ</p>

          <p className={'text-[18px]'}>1000</p>

          <p className={'text-[18px] font-medium'}>18 763,32 ₽</p>
        </div>
      </div>

      <div className={'flex justify-end gap-4 items-center'}>
        <p className={'text-[18px]'}>Оплачено</p>
        <p className={'text-paragraph font-semibold'}>39 389.32 ₽</p>
      </div>
    </div>
  );
};
