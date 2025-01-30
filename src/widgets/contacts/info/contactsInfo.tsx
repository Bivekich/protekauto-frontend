import {
  contactsDetailsList,
  contactsList,
} from '@/widgets/contacts/info/contactsList';
import { Icon } from '@/shared';

export const ContactsInfo = () => {
  return (
    <div
      className={'w-full flex flex-col h-full max-h-[450px] justify-end gap-14'}
    >
      <div className={'space-y-10'}>
        <h1 className={'text-title'}>Контакты</h1>
        <div className={'font-golos space-y-2'}>
          {contactsList.map((contact) => (
            <div key={contact.text} className={'flex items-center gap-4'}>
              <Icon name={contact.icon} />
              <p className={'text-paragraph font-semibold'}>{contact.text}</p>
            </div>
          ))}
        </div>
      </div>
      <ul className={'font-golos '}>
        {contactsDetailsList.map((detail) => (
          <li key={detail} className={'font-semibold text-caption'}>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};
