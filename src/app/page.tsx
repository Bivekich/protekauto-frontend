import { MainBanner, MainCatalog, MainInStock, MainNews } from '@/widgets';
import { Banner } from '@/shared';

export default function Home() {
  return (
    <div className={'w-full flex flex-col gap-20 bg-sky-blue'}>
      <MainBanner />
      <MainCatalog />
      <Banner />
      <MainInStock />
      <MainNews />
    </div>
  );
}
