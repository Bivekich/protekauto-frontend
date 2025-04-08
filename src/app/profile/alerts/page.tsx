import { ProfileLayout } from '@/shared';
import { AlertsList } from '@/widgets';

export default function ProfileAlertsPage() {
  return (
    <ProfileLayout title={'Оповещения'}>
      <AlertsList />
    </ProfileLayout>
  );
}
