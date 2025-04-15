import { Checkbox } from '@/shared';
import { FC } from 'react';

interface IProps {
  setSelectedMessage: (message: string | null) => void;
}

export const MessagesDataTable: FC<IProps> = ({ setSelectedMessage }) => {
  return (
    <div className={'w-full h-full space-y-4'}>
      <div
        className={'table-wrapper bg-white p-8 rounded-2xl cursor-pointer'}
        onClick={() => setSelectedMessage('message')}
      >
        <div
          className={'grid gap-4'}
          style={{ gridTemplateColumns: '2fr 5fr 1fr' }}
        >
          <div className={'flex gap-4 items-center'}>
            <Checkbox />
            <p className={'font-medium'}>ООО PROTEK</p>
          </div>

          <div className={'flex gap-2'}>
            <div className={'rounded-full w-3 h-3 bg-[#FFC400] mt-1'} />
            <div>
              <p>До 50% кешбэка баллами, Сейвы и карта Сплита</p>
              <p className={'variant-caption text-[#8893A1] truncate'}>
                Ссылка на ваш чек:
                https://check.yandex.ru/?n=155846&fn=7380440801156
              </p>
            </div>
          </div>

          <p className={'variant-caption text-[#8893A1] text-right'}>
            24.10.24
          </p>
        </div>
      </div>
    </div>
  );
};
