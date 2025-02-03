import { MainBanner, MainCatalog } from '@/widgets';

export default function Home() {
  return (
    <div className={'w-full flex flex-col gap-20 bg-sky-blue'}>
      <MainBanner />
      <MainCatalog />
    </div>
  );
}
