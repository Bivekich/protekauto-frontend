import { Icon } from '@/shared';
import { FC } from 'react';

interface IProps {
  name: string;
  created_at: string;
  article: string;
  category: string;
}

export const TableItem: FC<IProps> = ({
  category,
  article,
  created_at,
  name,
}) => {
  return (
    <div
      className={'grid gap-5 items-center'}
      style={{ gridTemplateColumns: '1fr 24px' }}
    >
      <div
        className={'grid border-b border-b-[rgba(0, 0, 0, 0.05)] py-5'}
        style={{ gridTemplateColumns: '2fr 3fr 1fr 4fr' }}
      >
        <p className={'font-golos'}>{created_at}</p>
        <p className={'font-golos'}>{name}</p>
        <p className={'font-golos text-primary-red font-semibold'}>{article}</p>
        <p className={'font-golos'}>{category}</p>
      </div>
      <Icon name={'trash'} className={'cursor-pointer'} />
    </div>
  );
};
