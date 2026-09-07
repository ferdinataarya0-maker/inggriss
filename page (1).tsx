import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardClient from './components/DashboardClient';

export default function DashboardPage() {
  return (
    <AppLayout activePath="/">
      <DashboardClient />
    </AppLayout>
  );
}