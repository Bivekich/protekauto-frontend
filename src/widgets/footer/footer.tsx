import { Distribution, FooterContent } from './components';

export const Footer = () => {
  return (
    <footer className={'w-full bg-main-blue'}>
      <Distribution />
      <div className={'w-full h-[1px] bg-gray-500'} />
      <FooterContent />
    </footer>
  );
};
