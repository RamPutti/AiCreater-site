'use client';

import React from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Wand2,
  CalendarDays,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  FileText,
  FileAudio,
  Sparkles,
  Image as ImageIcon,
  Tags,
  Clock,
  Play,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useCreatorStore } from '@/lib/store/creator-store';

export default function DashboardPage() {
  const { projects, calendarItems, profile, aiStatus } = useCreatorStore();

  const totalProjects = projects.length;
  const scheduledCount = calendarItems.filter((c) => c.status === 'Scheduled').length;
  const publishedCount = calendarItems.filter((c) => c.status === 'Published').length;
  const recentProjects = projects.slice(0, 4);

  return (
    <DashboardShell>
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/40 border border-purple-500/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="purple">Autonomous Studio 2.0</Badge>
              <span className="text-xs text-purple-300 font-semibold">• 14-Day Publishing Streak</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Good evening, {profile.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              You have <strong className="text-white font-bold">{scheduledCount} videos scheduled</strong> for release this week. Ready to plan your next viral release?
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/tools/thumbnail">
              <Button variant="glow" size="md">
                <ImageIcon className="w-4 h-4" />
                <span>Thumbnail Studio</span>
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="secondary" size="md">
                <span>View All Projects</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Projects</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white block">{totalProjects}</span>
          <span className="text-[11px] text-purple-300 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" /> +2 new this week
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">AI Generations</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Wand2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white block">148</span>
          <span className="text-[11px] text-slate-400 font-medium">99.4% retention accuracy</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Scheduled Content</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white block">{scheduledCount}</span>
          <span className="text-[11px] text-amber-300 font-medium">Next: Oct 02 (YouTube)</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Published Content</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white block">{publishedCount}</span>
          <span className="text-[11px] text-emerald-400 font-medium">100% on schedule</span>
        </div>
      </div>

      {/* Quick AI Launchers Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick AI Launchers
          </span>
          <Link href="/tools" className="text-xs text-purple-400 hover:underline">
            View All AI Tools
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Thumbnail Studio', href: '/tools/thumbnail', icon: ImageIcon, color: 'text-purple-400' },
            { label: 'Generate Script', href: '/tools/script', icon: FileText, color: 'text-blue-400' },
            { label: 'Transcript Summary', href: '/tools/transcript', icon: FileAudio, color: 'text-emerald-400' },
            { label: 'Generate Prompt', href: '/tools/prompt', icon: Sparkles, color: 'text-pink-400' },
            { label: 'Generate Metadata', href: '/tools/metadata', icon: Tags, color: 'text-amber-400' },
            { label: 'Content Calendar', href: '/calendar', icon: CalendarDays, color: 'text-indigo-400' },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-850 transition flex flex-col items-center text-center gap-2 group"
              >
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition">
                  <Icon className={`w-4 h-4 ${action.color}`} />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Recent Projects & Upcoming Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Projects */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-purple-400" />
              Recent Creator Workspaces
            </h2>
            <Link href="/projects" className="text-xs text-purple-400 hover:underline">
              View all ({totalProjects})
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-900 to-slate-900 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-xl font-black text-purple-300">
                    ⚡
                  </div>
                  <div className="min-w-0">
                    <Link href={`/projects/${p.id}`} className="hover:text-purple-300 transition">
                      <h3 className="text-sm font-bold text-white truncate">{p.videoTitle || p.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-slate-300">
                        {p.platform}
                      </span>
                      <span>•</span>
                      <span>Target: {p.publishingDate || 'Unscheduled'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <Badge
                    variant={
                      p.status === 'Ready'
                        ? 'emerald'
                        : p.status === 'Scheduled'
                        ? 'blue'
                        : p.status === 'Published'
                        ? 'purple'
                        : 'slate'
                    }
                  >
                    {p.status}
                  </Badge>
                  <Link href={`/projects/${p.id}`}>
                    <Button size="sm" variant="secondary">
                      <span>Open Workspace</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Calendar Schedule */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-blue-400" />
              Content Schedule
            </h2>
            <Link href="/calendar" className="text-xs text-blue-400 hover:underline">
              Full Calendar
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            {calendarItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-purple-400">{item.publishingDate}</span>
                  <Badge
                    variant={
                      item.status === 'Published'
                        ? 'emerald'
                        : item.status === 'Scheduled'
                        ? 'blue'
                        : 'slate'
                    }
                    className="text-[9px]"
                  >
                    {item.status}
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                <span className="text-[10px] text-slate-400 block">{item.platform}</span>
              </div>
            ))}

            <Link href="/calendar">
              <Button size="sm" variant="outline" className="w-full text-xs mt-2">
                Open Schedule Planner
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
