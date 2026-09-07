import React from 'react';
import AppLayout from '@/components/AppLayout';
import QuizClient from './components/QuizClient';

export default function QuizPage() {
  return (
    <AppLayout activePath="/quiz">
      <QuizClient />
    </AppLayout>
  );
}