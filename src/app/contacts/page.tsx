import { WidgetContainer } from '@/shared';
import { ContactsInfo, ContactsMap } from '@/widgets';

export default function ContactsPage() {
  return (
    <WidgetContainer
      outerContainerProps={{ className: 'bg-sky-blue' }}
      innerContainerProps={{ className: 'flex gap-5 pb-20' }}
    >
      <ContactsInfo />
      <ContactsMap />
    </WidgetContainer>
  );
}
