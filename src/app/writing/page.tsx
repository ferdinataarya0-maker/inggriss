import React from 'react';
import AppLayout from '@/components/AppLayout';
import WritingClient from './components/WritingClient';

export default function WritingPage() {
  return (
    <AppLayout activePath="/writing">
      <WritingClient />
    </AppLayout>
  );
}
