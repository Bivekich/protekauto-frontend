import { Icon } from '@/shared';

export const OrdersEmptyState = () => {
  return (
    <div className={'card-wrapper'}>
      <div className={'card-wrapper border border-[#FFECEC] h-stack'}>
        <div className={'h-stack items-center gap-5'}>
          <Icon name={'error'} />
          <p className={'text-paragraph font-semibold'}>
            У вас пока нет заказов
          </p>
        </div>
        <div className={'flex items-center gap-5 cursor-pointer'}>
          <p
            className={
              'text-paragraph-sm font-semibold text-primary-red text-nowrap'
            }
          >
            Начать покупки
          </p>
          <Icon name={'arrow_red'} />
        </div>
      </div>
    </div>
  );
};
