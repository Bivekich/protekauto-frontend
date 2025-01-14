import { HeaderMiddle, HeaderTop } from './components';

export const Header = () => {
  return (
    <header className={'w-full flex items-center flex-col'}>
      <HeaderTop />
      <HeaderMiddle />
    </header>
  );
};
