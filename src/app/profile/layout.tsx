import { WidgetContainer } from '@/shared';
import { NavigationPanel } from '@/widgets';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'bg-[#f3f6f9] min-h-[1024px]'}>
      <WidgetContainer
        innerContainerProps={{ className: 'flex gap-10 py-10 h-full' }}
        outerContainerProps={{ className: 'h-full' }}
      >
        <NavigationPanel />
        {children}
      </WidgetContainer>
    </div>
  );
}
