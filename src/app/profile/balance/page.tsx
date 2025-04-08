import { ProfileLayout } from '@/shared';
import { BalanceCard } from '@/widgets';

const mock = [
  {
    balance: '0.00',
    limit: '10 000',
    ordered: '0.00',
    to_payment: '0.00',
    name: 'ООО ПРОТЕК',
  },
  {
    balance: '0.00',
    limit: '10 000',
    ordered: '0.00',
    to_payment: '0.00',
    name: 'ООО ПРОТЕК',
  },
  {
    balance: '0.00',
    limit: '10 000',
    ordered: '0.00',
    to_payment: '0.00',
    name: 'ООО ПРОТЕК',
  },
];

export default function ProfileBalancePage() {
  return (
    <ProfileLayout title={'Финансы'}>
      <div className={'grid grid-cols-3 w-full gap-5'}>
        {mock.map((item, index) => (
          // key={index} нужно будет убрать с реальными данными
          <BalanceCard key={index} {...item} />
        ))}
      </div>
    </ProfileLayout>
  );
}
