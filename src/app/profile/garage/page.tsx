import { ProfileLayout } from '@/shared';
import { GarageList } from '@/widgets';

export default function ProfileGaragePage() {
  return (
    <ProfileLayout title={'Гараж'}>
      <GarageList />
    </ProfileLayout>
  );
}
