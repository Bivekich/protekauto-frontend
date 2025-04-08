import { ProfileLayout } from '@/shared';
import { SettingsForm } from '@/widgets';

export default function ProfileSettingsPage() {
  return (
    <ProfileLayout title={'Настройки аккаунта'}>
      <SettingsForm />
    </ProfileLayout>
  );
}
