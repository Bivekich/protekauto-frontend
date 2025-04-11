import { ProfileLayout } from '@/shared';
import { OrdersCard, OrdersEmptyState, OrdersHeader } from '@/widgets';

export default function ProfileOrdersPage() {
  return (
    <ProfileLayout title={'Заказы'} className={'space-y-6'}>
      <OrdersHeader />
      <OrdersEmptyState />
      <OrdersCard />
    </ProfileLayout>
  );
}
