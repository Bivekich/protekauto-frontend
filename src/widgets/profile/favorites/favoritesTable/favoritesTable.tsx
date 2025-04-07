import { Icon } from '@/shared';
import { favoritesMock } from './mock';
import { TableItem } from './tableItem';

const columns = ['Дата добавления', 'Производитель', 'Артикул', 'Наименование'];

export const FavoritesTable = () => {
  return (
    <div className={'card-wrapper'}>
      <div className={'grid gap-5'} style={{ gridTemplateColumns: '1fr 24px' }}>
        <div
          className={'grid border-b border-b-[rgba(0, 0, 0, 0.05)] pb-2.5'}
          style={{ gridTemplateColumns: '2fr 3fr 1fr 4fr' }}
        >
          {columns.map((column) => (
            <div key={column} className={'flex items-center gap-1.5'}>
              <p className={'text-paragraph-xs font-golos text-[#8893A1]'}>
                {column}
              </p>
              <Icon name={'arrow_down'} />
            </div>
          ))}
        </div>
      </div>

      <div className={'flex flex-col w-full max-h-full overflow-auto'}>
        {favoritesMock.map((tableItem) => (
          <TableItem key={tableItem.name} {...tableItem} />
        ))}
      </div>
    </div>
  );
};
