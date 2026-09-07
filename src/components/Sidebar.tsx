'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import { LayoutDashboard, BookOpen, Trophy, ChevronLeft, ChevronRight,  } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Vocabulary', href: '/vocabulary', icon: BookOpen },
  { label: 'Quiz', href: '/quiz', icon: Trophy },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activePath: string;
}

export default function Sidebar({ collapsed, onToggleCollapse, activePath }: SidebarProps) {
  return (
    <aside
      className="relative flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? 72 : 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border min-h-[72px]">
        <div className="flex-shrink-0">
          <AppLogo size={32} />
        </div>
        {!collapsed && (
          <span className="font-bold text-base text-foreground tracking-tight truncate">
            EnglishLearning
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activePath === item.href;
          return (
            <Link
              key={`nav-${item.href}`}
              href={item.href}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 relative
                ${isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`
                  ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full
                  ${isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}
                `}>
                  {item.badge}
                </span>
              )}
              {/* Tooltip for collapsed */}
              {collapsed && (
                <span className="
                  absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs
                  rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity
                  pointer-events-none z-50
                ">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-border">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 text-sm"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : (
            <>
              <ChevronLeft size={18} />
              <span className="text-xs font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}