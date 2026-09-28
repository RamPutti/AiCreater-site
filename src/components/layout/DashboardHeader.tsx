'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  FolderPlus,
  Wand2,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useCreatorStore } from '@/lib/store/creator-store';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onNewProjectModal: () => void;
}

export const DashboardHeader: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onNewProjectModal,
}) => {
  const router = useRouter();
  const { aiStatus, profile, projects } = useCreatorStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: '1', title: 'Transcript summarized', text: 'AI generated 5 key chapters for "AI Explained 2026"', time: '10m ago' },
    { id: '2', title: 'Thumbnail ready', text: '16:9 Concept "Electric Neon Impact" exported in 1080p', time: '1h ago' },
    { id: '3', title: 'Schedule Reminder', text: 'Next video scheduled for YouTube in 3 days', time: '4h ago' },
  ];

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/projects?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, scripts, keywords... (Press Enter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Autonomous Engine Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>Studio AI: Ready</span>
        </div>

        {/* Quick New Project Button */}
        <Button
          size="sm"
          variant="glow"
          className="hidden sm:inline-flex"
          onClick={onNewProjectModal}
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </Button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 relative transition"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-purple-500 absolute top-1.5 right-1.5 ring-2 ring-slate-950" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Notifications (3)
                </span>
                <span className="text-[10px] text-purple-400 font-semibold cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-slate-800/60 mt-1">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 first:pt-2 last:pb-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Link */}
        <button
          onClick={() => router.push('/faq')}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition"
          aria-label="Help & FAQ"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <button
          onClick={() => router.push('/settings')}
          className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-md hover:ring-2 hover:ring-purple-400 transition"
          aria-label="User settings"
        >
          {profile.name.slice(0, 1)}
        </button>
      </div>
    </header>
  );
};
