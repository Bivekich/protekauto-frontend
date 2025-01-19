import { ShippingBottom, ShippingMiddle, ShippingTop } from '@/widgets';
import { WidgetContainer } from '@/shared';

export default function ShippingPage() {
  return (
    <WidgetContainer outerContainerProps={{ className: 'bg-sky-blue' }}>
      <h1 className={'text-title mb-10'}>Оплата и доставка</h1>
      <div className={'flex flex-col w-full gap-20 h-full pb-[60px]'}>
        <ShippingTop />
        <ShippingMiddle />
        <ShippingBottom />
      </div>
    </WidgetContainer>
  );
}
