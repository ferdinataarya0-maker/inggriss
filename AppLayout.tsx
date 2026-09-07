'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
  activePath: string;
}

export default function AppLayout({ children, activePath }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(c => !c)}
          activePath={activePath}
        />
      </div>

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col min-w-0 overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <BottomNav activePath={activePath} />
      </div>
    </div>
  );
}