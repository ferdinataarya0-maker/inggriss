import React from 'react';
import AppLayout from '@/components/AppLayout';
import ListeningClient from './components/ListeningClient';

export default function ListeningPage() {
  return (
    <AppLayout activePath="/listening">
      <ListeningClient />
    </AppLayout>
  );
}
