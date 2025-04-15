'use client';
import { Message, MessagesDataTable, MessagesLayout } from '@/widgets';
import { useState } from 'react';

export default function ProfileMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  return (
    <MessagesLayout
      selectedMessage={selectedMessage}
      setSelectedMessage={setSelectedMessage}
    >
      {selectedMessage ? (
        <Message />
      ) : (
        <MessagesDataTable setSelectedMessage={setSelectedMessage} />
      )}
    </MessagesLayout>
  );
}
