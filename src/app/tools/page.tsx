'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wand2,
  FileText,
  FileAudio,
  Image as ImageIcon,
  Tags,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { DashboardShell } from '@/components/layout/DashboardShell';

export default function ToolsHubPage() {
  const tools = [
    {
      id: 'thumbnail',
      name: '16:9 Thumbnail Studio',
      badge: 'Main WOW Feature',
      desc: 'Formulate 4 high-contrast 16:9 thumbnail concepts with real-time canvas editing, layer overrides, and mobile legibility scores.',
      icon: ImageIcon,
      href: '/tools/thumbnail',
      gradient: 'from-purple-900/40 to-slate-900',
    },
    {
      id: 'script',
      name: 'AI Retention Script Generator',
      badge: '7 Tone Modes',
      desc: 'Generate viral hooks, intro retention anchors, visual B-roll cues, pacing transitions, and soft CTAs.',
      icon: FileText,
      href: '/tools/script',
      gradient: 'from-blue-900/40 to-slate-900',
    },
    {
      id: 'transcript',
      name: 'Transcript Summarizer & Chapters',
      badge: 'Timecode Automation',
      desc: 'Transform raw video transcripts into YouTube chapters with timestamps, takeaways, quotes, and action items.',
      icon: FileAudio,
      href: '/tools/transcript',
      gradient: 'from-emerald-900/40 to-slate-900',
    },
    {
      id: 'prompt',
      name: 'Image Prompt Studio',
      badge: 'Midjourney & Flux',
      desc: 'Architect hyper-detailed visual prompts with camera angles, 85mm prime lens specs, volumetric lighting, and negative prompts.',
      icon: Wand2,
      href: '/tools/prompt',
      gradient: 'from-pink-900/40 to-slate-900',
    },
    {
      id: 'metadata',
      name: 'SEO & Metadata Generator',
      badge: 'CTR Predictor',
      desc: 'Produce 5 high-converting YouTube title variations with expected CTR ratings, search tags, hashtags, and pinned comments.',
      icon: Tags,
      href: '/tools/metadata',
      gradient: 'from-amber-900/40 to-slate-900',
    },
    {
      id: 'calendar',
      name: 'Multi-Platform Content Planner',
      badge: 'Visual Pipeline',
      desc: 'Track and coordinate publishing schedules across YouTube, TikTok, Reels, LinkedIn, and Video Podcasts.',
      icon: Calendar,
      href: '/calendar',
      gradient: 'from-indigo-900/40 to-slate-900',
    },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Wand2 className="w-6 h-6 text-purple-400" />
            AI Creator Engine Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access dedicated standalone generator workspaces calibrated specifically for digital video creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition flex flex-col justify-between space-y-6 group shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="purple">{t.badge}</Badge>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
                      {t.name}
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1.5">{t.desc}</p>
                  </div>
                </div>

                <Link href={t.href}>
                  <Button variant="primary" size="sm" className="w-full justify-between">
                    <span>Open Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
