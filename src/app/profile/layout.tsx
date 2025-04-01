import { WidgetContainer } from '@/shared';
import { NavigationPanel } from '@/widgets';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'bg-sky-blue min-h-[1024px]'}>
      <WidgetContainer innerContainerProps={{ className: 'flex gap-10 py-10' }}>
        <NavigationPanel />
        {children}
      </WidgetContainer>
    </div>
  );
}
