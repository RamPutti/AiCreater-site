'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Wand2,
  FileText,
  FileAudio,
  Sparkles,
  Image as ImageIcon,
  Tags,
  CalendarDays,
  BarChart3,
  Settings,
  PlusCircle,
  ExternalLink,
  Crown,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useCreatorStore } from '@/lib/store/creator-store';

interface SidebarProps {
  onNewProjectModal?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({
  onNewProjectModal,
  isMobileOpen,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const { profile } = useCreatorStore();

  const primaryNav = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Projects', href: '/projects', icon: FolderKanban },
    { label: 'Content Calendar', href: '/calendar', icon: CalendarDays },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const aiToolsNav = [
    { label: 'All AI Tools', href: '/tools', icon: Wand2 },
    { label: 'Thumbnail Studio', href: '/tools/thumbnail', icon: ImageIcon, badge: 'WOW' },
    { label: 'Script Generator', href: '/tools/script', icon: FileText },
    { label: 'Transcript Summarizer', href: '/tools/transcript', icon: FileAudio },
    { label: 'Image Prompts', href: '/tools/prompt', icon: Sparkles },
    { label: 'Metadata & SEO', href: '/tools/metadata', icon: Tags },
  ];

  const bottomNav = [
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white block">
                CreatorAI <span className="text-purple-400 font-extrabold text-xs">Studio</span>
              </span>
            </div>
          </Link>
          <Badge variant="purple" className="text-[10px] font-bold">
            PRO
          </Badge>
        </div>

        {/* Quick Action Button */}
        <div className="p-3">
          <Button
            variant="primary"
            size="md"
            className="w-full justify-center shadow-lg shadow-purple-600/20"
            onClick={() => {
              if (onNewProjectModal) onNewProjectModal();
              if (onCloseMobile) onCloseMobile();
            }}
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Project</span>
          </Button>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Workspace
            </span>
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* AI Tools Suite */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              AI Tools
            </span>
            {aiToolsNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* System */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Settings
            </span>
            {bottomNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Profile Card at Bottom */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center font-bold text-xs text-white">
              {profile.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white block truncate">{profile.name}</span>
              <span className="text-[10px] text-slate-400 block truncate">{profile.channelName}</span>
            </div>
            <Link
              href="/"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Return to Marketing Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
