import { WidgetContainer } from '@/shared';
import { ContactsInfo, ContactsMap } from '@/widgets';

export default function ContactsPage() {
  return (
    <WidgetContainer
      outerContainerProps={{ className: 'bg-sky-blue h-full' }}
      innerContainerProps={{ className: 'flex gap-5' }}
    >
      <ContactsInfo />
      <ContactsMap />
    </WidgetContainer>
  );
}
