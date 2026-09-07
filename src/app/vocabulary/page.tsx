import React from 'react';
import AppLayout from '@/components/AppLayout';
import VocabularyClient from './components/VocabularyClient';

export default function VocabularyPage() {
  return (
    <AppLayout activePath="/vocabulary">
      <VocabularyClient />
    </AppLayout>
  );
}