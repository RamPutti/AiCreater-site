'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  FolderKanban,
  FileText,
  Image as ImageIcon,
  Wand2,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Info,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useCreatorStore } from '@/lib/store/creator-store';

export default function AnalyticsDashboardPage() {
  const { projects, calendarItems } = useCreatorStore();

  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === 'Ready' || p.status === 'Published').length;

  const weeklyVelocity = [
    { day: 'Mon', scripts: 2, thumbnails: 3, completions: 1 },
    { day: 'Tue', scripts: 4, thumbnails: 6, completions: 2 },
    { day: 'Wed', scripts: 3, thumbnails: 4, completions: 1 },
    { day: 'Thu', scripts: 5, thumbnails: 8, completions: 3 },
    { day: 'Fri', scripts: 6, thumbnails: 7, completions: 2 },
    { day: 'Sat', scripts: 2, thumbnails: 2, completions: 1 },
    { day: 'Sun', scripts: 3, thumbnails: 4, completions: 2 },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              Creator Productivity &amp; Studio Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Internal studio productivity metrics, generation velocity, and publishing consistency.
            </p>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>Sample Production Metrics (Clearly labeled demo data)</span>
          </div>
        </div>

        {/* 4 Core Productivity Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Total Projects Created</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{totalProjects}</span>
              <span className="text-xs text-emerald-400 font-bold">+100% velocity</span>
            </div>
            <p className="text-[11px] text-slate-500">Across YouTube, TikTok &amp; Podcasts</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Scripts Generated</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">42</span>
              <span className="text-xs text-blue-400 font-bold">~32,000 words</span>
            </div>
            <p className="text-[11px] text-slate-500">7 different pacing tones utilized</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">16:9 Thumbnails Exported</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">68</span>
              <span className="text-xs text-purple-400 font-bold">94% avg contrast</span>
            </div>
            <p className="text-[11px] text-slate-500">All within exact 16:9 safe zone</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Publishing Consistency</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">14 Days</span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5" /> Streak
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Zero missed upload dates</p>
          </div>
        </div>

        {/* Weekly Studio Velocity Chart (Bar Representation) */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white">Weekly Content Production Velocity</h2>
              <p className="text-xs text-slate-400">Daily breakdown of scripts, thumbnail concepts, and locked packages</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Scripts
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Thumbnails
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-64 pt-6">
            {weeklyVelocity.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-48">
                  {/* Scripts Bar */}
                  <div
                    className="w-1/2 bg-blue-600/80 rounded-t-lg transition-all duration-300 hover:bg-blue-500 relative group"
                    style={{ height: `${(day.scripts / 8) * 100}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] bg-slate-950 px-1.5 py-0.5 rounded text-white font-bold transition">
                      {day.scripts}
                    </span>
                  </div>
                  {/* Thumbnails Bar */}
                  <div
                    className="w-1/2 bg-purple-600/80 rounded-t-lg transition-all duration-300 hover:bg-purple-500 relative group"
                    style={{ height: `${(day.thumbnails / 10) * 100}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] bg-slate-950 px-1.5 py-0.5 rounded text-white font-bold transition">
                      {day.thumbnails}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Status Breakdown & Platform Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white">Content Status Pipeline</h2>
            <div className="space-y-3">
              {[
                { status: 'Idea Stage', count: 3, pct: 25, color: 'bg-slate-500' },
                { status: 'Scripting & Research', count: 2, pct: 16, color: 'bg-purple-500' },
                { status: 'Recording / Editing', count: 3, pct: 25, color: 'bg-amber-500' },
                { status: 'Ready for Release', count: 2, pct: 16, color: 'bg-blue-500' },
                { status: 'Published', count: 2, pct: 18, color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.status} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.status}</span>
                    <span className="text-white font-bold">{item.count} items ({item.pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white">Distribution by Platform</h2>
            <div className="space-y-3">
              {[
                { platform: 'YouTube (Long-form)', count: 6, pct: 50, badge: 'purple' as const },
                { platform: 'TikTok & YouTube Shorts', count: 3, pct: 25, badge: 'blue' as const },
                { platform: 'Instagram Reels', count: 2, pct: 15, badge: 'rose' as const },
                { platform: 'Video Podcast', count: 1, pct: 10, badge: 'emerald' as const },
              ].map((plat) => (
                <div key={plat.platform} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Badge variant={plat.badge}>{plat.pct}%</Badge>
                    <span className="text-xs font-bold text-white">{plat.platform}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{plat.count} uploads</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
