import React from 'react';
import AppLayout from '@/components/AppLayout';
import GrammarClient from './components/GrammarClient';

export default function GrammarPage() {
  return (
    <AppLayout activePath="/grammar">
      <GrammarClient />
    </AppLayout>
  );
}
