import { HeaderBottom, HeaderMiddle, HeaderTop } from './components';

export const Header = () => {
  return (
    <header className={'w-full flex items-center flex-col font-golos'}>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </header>
  );
};
