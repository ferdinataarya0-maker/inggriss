'use client';
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, Trophy, GraduationCap, Headphones, FileText, PenLine } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const BOTTOM_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Vocabulary', href: '/vocabulary', icon: BookOpen },
  { label: 'Grammar', href: '/grammar', icon: GraduationCap },
  { label: 'Listening', href: '/listening', icon: Headphones },
  { label: 'Reading', href: '/reading', icon: FileText },
  { label: 'Writing', href: '/writing', icon: PenLine },
  { label: 'Quiz', href: '/quiz', icon: Trophy },
];

export default function BottomNav({ activePath }: { activePath: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 flex overflow-x-auto scrollbar-hide">
      {BOTTOM_ITEMS.map(item => {
        const Icon = item.icon;
        const isActive = activePath === item.href;
        return (
          <Link
            key={`bottom-${item.href}`}
            href={item.href}
            className={`
              relative flex-shrink-0 basis-1/5 min-w-[64px] flex flex-col items-center justify-center py-2.5 gap-1 transition-all duration-150
              ${isActive ? 'text-primary' : 'text-muted-foreground'}
            `}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}