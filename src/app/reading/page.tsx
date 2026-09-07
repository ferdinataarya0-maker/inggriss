import React from 'react';
import AppLayout from '@/components/AppLayout';
import ReadingClient from './components/ReadingClient';

export default function ReadingPage() {
  return (
    <AppLayout activePath="/reading">
      <ReadingClient />
    </AppLayout>
  );
}
