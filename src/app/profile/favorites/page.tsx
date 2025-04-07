import {
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ProfileLayout,
} from '@/shared';
import { FavoritesTable } from '@/widgets';

export default function ProfileFavoritesPage() {
  return (
    <ProfileLayout title={'Избранное'}>
      <div className={'flex flex-col w-full gap-7'}>
        <InputGroup className={'w-[420px]'}>
          <Input placeholder={'Поиск'} />
          <InputRightElement>
            <Icon name={'search'} />
          </InputRightElement>
        </InputGroup>

        <FavoritesTable />
      </div>
    </ProfileLayout>
  );
}
