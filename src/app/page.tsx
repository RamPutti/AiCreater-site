'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Wand2,
  FileText,
  FileAudio,
  Image as ImageIcon,
  Tags,
  Calendar,
  Layers,
  Zap,
  Play,
  TrendingUp,
  Flame,
  Clock,
  ShieldCheck,
  ChevronRight,
  Check,
  Star,
  Cpu,
  MonitorPlay,
  MousePointerClick,
  Sliders,
  Split,
  Eye,
} from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function LandingPage() {
  const [activeHeroTab, setActiveHeroTab] = useState<'thumbnail' | 'script' | 'metadata' | 'calendar'>('thumbnail');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const trustedCreators = [
    { name: 'Marcus Chen', handle: '@techmarcus', subs: '1.2M Subs', niche: 'Tech & AI' },
    { name: 'Elena Rostova', handle: '@elenacreates', subs: '640K Subs', niche: 'Video Editing' },
    { name: 'David Kim', handle: '@davidkimvisuals', subs: '890K Subs', niche: 'Cinematography' },
    { name: 'Maya Patel', handle: '@mayabuilds', subs: '450K Subs', niche: 'Productivity' },
    { name: 'Liam Walker', handle: '@liamwalkerfilms', subs: '1.8M Subs', niche: 'Documentary' },
  ];

  const workflowSteps = [
    { step: '01', title: 'Idea', desc: 'Capture spontaneous sparks into a structured topic premise.', icon: Sparkles },
    { step: '02', title: 'Script', desc: 'AI writes high-retention 3-part hooks, pacing cues & CTAs.', icon: FileText },
    { step: '03', title: 'Transcript', desc: 'Auto-summarize raw footage into timestamps & key takeaways.', icon: FileAudio },
    { step: '04', title: 'Prompt', desc: 'Generate 8K Midjourney & Flux prompts for cinematic visual assets.', icon: Wand2 },
    { step: '05', title: 'Thumbnail', desc: 'Design high-contrast 16:9 concepts with real-time heuristic scores.', icon: ImageIcon },
    { step: '06', title: 'Metadata', desc: 'Predict high-CTR YouTube titles, SEO tags, and pinned comments.', icon: Tags },
    { step: '07', title: 'Schedule', desc: 'Organize release dates across YouTube, TikTok, Reels & Podcasts.', icon: Calendar },
    { step: '08', title: 'Publish', desc: 'Export complete production packages ready for instant upload.', icon: MonitorPlay },
  ];

  const toolsPreview = [
    {
      id: 'thumbnail',
      name: '16:9 Thumbnail Generator',
      tag: 'Standout Feature',
      desc: 'Generate 4 high-contrast YouTube thumbnail concepts with real-time 16:9 canvas editing, subject lighting separation, and mobile visibility analysis.',
      href: '/tools/thumbnail',
      icon: ImageIcon,
      gradient: 'from-purple-600/30 to-blue-600/10',
    },
    {
      id: 'script',
      name: 'AI Script Generator',
      tag: '7 Pacing Tones',
      desc: 'Formulate psychological hooks, introduction retention anchors, visual b-roll cues, and soft CTAs tailored for 60s Shorts or 15-minute essays.',
      href: '/tools/script',
      icon: FileText,
      gradient: 'from-blue-600/30 to-cyan-600/10',
    },
    {
      id: 'transcript',
      name: 'Transcript Summarizer',
      tag: 'Instant Chapters',
      desc: 'Turn messy spoken transcripts into structured timestamps, video descriptions, highlighted quotes, and prioritized production action items.',
      href: '/tools/transcript',
      icon: FileAudio,
      gradient: 'from-emerald-600/30 to-teal-600/10',
    },
    {
      id: 'prompt',
      name: 'Image Prompt Studio',
      tag: 'Midjourney v6 & Flux',
      desc: 'Architect hyper-detailed visual prompts with camera angles, 85mm prime lens specs, volumetric lighting, and negative prompt filtering.',
      href: '/tools/prompt',
      icon: Wand2,
      gradient: 'from-pink-600/30 to-purple-600/10',
    },
    {
      id: 'metadata',
      name: 'SEO & Metadata Engine',
      tag: 'CTR Predictions',
      desc: 'Produce 5 high-converting YouTube title variations with expected CTR ratings, search tags, hashtags, and engagement pinned comments.',
      href: '/tools/metadata',
      icon: Tags,
      gradient: 'from-amber-600/30 to-orange-600/10',
    },
    {
      id: 'calendar',
      name: 'Multi-Platform Calendar',
      tag: 'Visual Pipeline',
      desc: 'Track every piece of content from Idea, Script, Recording, to Ready and Scheduled in interactive Month, Week, and List views.',
      href: '/calendar',
      icon: Calendar,
      gradient: 'from-indigo-600/30 to-purple-600/10',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      <Navbar />

      {/* ========================================================================= */}
      {/* 5. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold backdrop-blur-md hover:border-purple-400 transition animate-in fade-in slide-in-from-top-3">
            <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Introducing CreatorAI Studio 2.0 — All-in-One Autonomous Creator Suite</span>
          </div>

          {/* Main Headline & Subheadline */}
          <div className="space-y-5 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Create Smarter.{' '}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                Publish Faster.
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Your AI-powered workspace for scripts, transcripts, prompts, thumbnails, metadata, and content planning.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="glow" className="w-full sm:w-auto text-base px-8 py-4 shadow-xl">
                <span>Start Creating Free</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/ai-tools" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base px-7 py-4">
                <Wand2 className="w-4 h-4 mr-1 text-purple-400" />
                <span>Explore AI Tools</span>
              </Button>
            </Link>
          </div>

          {/* Micro Benefits Under CTA */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Instant 16:9 Studio Canvas
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Autonomous AI Demo Ready
            </span>
          </div>

          {/* ========================================================================= */}
          {/* HERO VISUAL: Realistic CreatorAI Studio Dashboard Preview */}
          {/* ========================================================================= */}
          <div className="relative mt-12 pt-6 max-w-5xl mx-auto">
            {/* Floating Status Cards */}
            <div className="hidden lg:flex absolute -top-4 -left-6 z-30 items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 shadow-2xl backdrop-blur-md animate-bounce duration-1000">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-100">Transcript summarized</span>
            </div>

            <div className="hidden lg:flex absolute top-20 -right-6 z-30 items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-blue-500/30 shadow-2xl backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
              <span className="text-xs font-bold text-slate-100">Script generated (840 words)</span>
            </div>

            <div className="hidden lg:flex absolute -bottom-6 -left-4 z-30 items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl backdrop-blur-md">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-100">Thumbnail created (16:9 8K)</span>
            </div>

            <div className="hidden lg:flex absolute -bottom-6 -right-4 z-30 items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-md">
              <Tags className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-100">SEO metadata ready (11.4% CTR)</span>
            </div>

            {/* Dashboard Window Frame */}
            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/90 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl text-left">
              {/* Studio Window Chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    CreatorAI Studio — Project: AI Explained 2026
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="purple" className="text-[10px]">
                    AUTOSAVE ON
                  </Badge>
                  <span className="text-[10px] text-slate-400">Status: Ready</span>
                </div>
              </div>

              {/* Workspace Navigation Subtabs inside Hero preview */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/40 overflow-x-auto">
                <button
                  onClick={() => setActiveHeroTab('thumbnail')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                    activeHeroTab === 'thumbnail'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>16:9 Thumbnail</span>
                </button>
                <button
                  onClick={() => setActiveHeroTab('script')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                    activeHeroTab === 'script'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Script & Hooks</span>
                </button>
                <button
                  onClick={() => setActiveHeroTab('metadata')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                    activeHeroTab === 'metadata'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tags className="w-3.5 h-3.5" />
                  <span>SEO & Metadata</span>
                </button>
                <button
                  onClick={() => setActiveHeroTab('calendar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                    activeHeroTab === 'calendar'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Content Calendar</span>
                </button>
              </div>

              {/* Dynamic Interactive Hero Content */}
              <div className="p-4 sm:p-6 bg-slate-950/60">
                {activeHeroTab === 'thumbnail' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Left Canvas Preview */}
                    <div className="md:col-span-8">
                      <div className="w-full aspect-16-9 rounded-xl overflow-hidden relative border-2 border-purple-500/40 shadow-2xl flex flex-col justify-between p-6 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950">
                        {/* Neon Lighting Glows */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 space-y-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-600 text-white shadow-lg">
                            <Sparkles className="w-3 h-3" /> 2026 BLUEPRINT
                          </span>
                          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
                            THE 2026 AI SHIFT
                          </h2>
                          <span className="inline-block px-3 py-1 rounded text-xs sm:text-sm font-black uppercase text-amber-300 bg-black/80 border border-amber-400/40">
                            DON&apos;T GET LEFT BEHIND
                          </span>
                        </div>

                        {/* Visual Right Avatar */}
                        <div className="absolute right-6 bottom-0 w-36 sm:w-52 h-44 sm:h-60 flex items-end justify-center pointer-events-none">
                          <div className="w-28 sm:w-40 h-28 sm:h-40 rounded-full border-4 border-purple-400/40 bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center shadow-2xl">
                            <span className="text-4xl sm:text-5xl">⚡</span>
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold text-purple-300">16:9 High Contrast Preset</span>
                          <span className="bg-black/90 text-white px-2 py-0.5 rounded font-bold">14:32</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Heuristic Analysis Card */}
                    <div className="md:col-span-4 space-y-3">
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Design Guidance
                          </span>
                          <Badge variant="emerald">Strong (94%)</Badge>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div>
                            <div className="flex justify-between text-slate-400 mb-1">
                              <span>Mobile Visibility</span>
                              <span className="text-white font-bold">96%</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-slate-400 mb-1">
                              <span>Contrast Separation</span>
                              <span className="text-white font-bold">92%</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 rounded-full w-[92%]" />
                            </div>
                          </div>
                        </div>
                        <Link href="/tools/thumbnail">
                          <Button size="sm" variant="glow" className="w-full mt-2 text-xs">
                            Launch Full 16:9 Canvas
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {activeHeroTab === 'script' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="purple">Hook (First 5 Seconds)</Badge>
                        <span className="text-xs text-slate-400 font-mono">APV Score: 94/100</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-100 italic">
                        &quot;If you&apos;re still spending 12 hours editing a single video in 2026, you&apos;re not competing on a level playing field.&quot;
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="font-bold text-purple-400 block mb-1">Introduction (15s)</span>
                        <p className="text-slate-300">Premise validation &amp; stakes.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="font-bold text-blue-400 block mb-1">Main Loop (7m)</span>
                        <p className="text-slate-300">Pacing shifts every 5 seconds.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="font-bold text-emerald-400 block mb-1">Soft CTA (8m)</span>
                        <p className="text-slate-300">Placed at 70% emotional peak.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeHeroTab === 'metadata' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-purple-400 font-bold block">Top Performing Title Variation</span>
                        <span className="text-sm font-bold text-white">AI Explained: Why 2026 Changes Everything</span>
                      </div>
                      <Badge variant="emerald">11.4% Expected CTR</Badge>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap gap-2">
                      {['#AI2026', '#CreatorEconomy', '#YouTubeTips', '#ProductivityAI'].map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeHeroTab === 'calendar' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30">
                      <span className="text-[10px] text-purple-400 font-bold uppercase">Sep 28 • YouTube</span>
                      <p className="text-xs font-bold text-white mt-1">How to Build Better Habits</p>
                      <Badge variant="blue" className="mt-2 text-[10px]">Scheduled</Badge>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">Oct 02 • YouTube</span>
                      <p className="text-xs font-bold text-white mt-1">AI Explained 2026</p>
                      <Badge variant="emerald" className="mt-2 text-[10px]">Ready to Publish</Badge>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Oct 06 • Shorts</span>
                      <p className="text-xs font-bold text-white mt-1">The 3-Second Retention Cliff</p>
                      <Badge variant="purple" className="mt-2 text-[10px]">Scripting</Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. TRUSTED CREATORS / SOCIAL PROOF */}
      {/* ========================================================================= */}
      <section className="py-12 border-y border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Trusted by creators producing over 50,000+ videos every month
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustedCreators.map((c) => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                  {c.name.slice(0, 1)}
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">{c.name}</span>
                  <span className="text-[10px] text-purple-400 block">{c.subs} • {c.niche}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE PROBLEM SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="rose">The Creator Bottleneck</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Creators Waste 15+ Hours a Week Switching Between 6 Disconnected Tools
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Your best ideas die in fragmented workflows. Juggling separate tabs for scripting, transcript notes, Midjourney prompts, Photoshop canvases, and SEO tag spreadsheets drains creative momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Writing Scripts in a Vacuum',
                desc: 'Drafting text without retention cues, pacing estimates, or visual B-roll integration leads to boring videos that lose 60% of viewers in 30 seconds.',
                icon: FileText,
              },
              {
                title: 'Summarizing Transcripts Manually',
                desc: 'Listening to 90 minutes of raw video to find 4 highlight quotes and calculate chapter timestamps is exhausting busywork.',
                icon: FileAudio,
              },
              {
                title: 'Guessing Image & Thumbnail Prompts',
                desc: 'Trial and error in generic AI generators produces plastic faces, distorted text, and unclickable images that miss the 16:9 safe zone.',
                icon: Wand2,
              },
              {
                title: 'Creating Thumbnails as an Afterthought',
                desc: 'Designing thumbnails after filming without contrasting colors or mobile-ready typography cuts potential views by half.',
                icon: ImageIcon,
              },
              {
                title: 'Writing Weak YouTube Metadata',
                desc: 'Uninspired titles, missing description links, and weak SEO tags cause YouTube algorithms to stop recommending your content.',
                icon: Tags,
              },
              {
                title: 'Broken Publishing Calendars',
                desc: 'Deadlines slipping through messy notes apps and scattered project folders causes upload inconsistency and burnout.',
                icon: Calendar,
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-red-500/30 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SOLUTION SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-slate-950/80 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="purple">The Autonomous Solution</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              One Unified Workspace Built for Pure Creative Velocity
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              CreatorAI Studio replaces tool chaos with an intelligent production loop where your idea seamlessly flows into a locked script, high-contrast 16:9 thumbnail, SEO package, and scheduled release date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">10x Production Speed</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cut pre-production and post-production packaging from 18 hours down to under 90 minutes with specialized AI creator modules.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-blue-500/20 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Higher Viewer Retention</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Craft videos built on psychological retention curves: 3-second stakes, visual pattern interrupts, and instant thumbnail continuity.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-emerald-500/20 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Complete Project Cohesion</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Never lose a script revision or thumbnail draft again. Every asset is tied to its master project folder with autosave and cloud sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WORKFLOW SECTION (Idea → Script → Transcript → Prompt → Thumbnail → Metadata → Schedule → Publish) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="blue">The 8-Stage Pipeline</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Seamless Creator Production Loop
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Watch how your content transitions effortlessly from first thought to published video.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 transition group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-purple-400/40 group-hover:text-purple-400 transition">
                      {s.step}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-800 text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THUMBNAIL GENERATOR SHOWCASE (WOW FEATURE) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-950 via-[#0C101A] to-slate-950 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="purple" className="px-3 py-1">
              Main WOW Feature
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The AI Thumbnail Studio Built for 16:9 Dominance
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Generate 4 distinct viral visual concepts, adjust bold text in real-time, test subject rim lighting, and verify mobile legibility before you upload.
            </p>
          </div>

          {/* Interactive Showcase Box */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-[0_20px_70px_rgba(139,92,246,0.15)] space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Features List */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-xl font-bold text-white">Why It Beats Traditional Design Tools:</h3>
                <div className="space-y-3">
                  {[
                    'Exact 16:9 safe zone preview with simulated YouTube timestamp',
                    'Real-time text contrast and mobile legibility scores',
                    '12 curated viral layout presets (Split, Hero, Cinematic, Tech)',
                    'Instant 1080p high-resolution canvas export to PNG',
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Link href="/tools/thumbnail">
                    <Button variant="glow" size="md" className="w-full">
                      <span>Open 16:9 Thumbnail Studio</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Live Visual Simulation */}
              <div className="lg:col-span-8">
                <div className="w-full aspect-16-9 rounded-2xl overflow-hidden relative border-2 border-purple-500 shadow-2xl p-6 md:p-8 flex flex-col justify-between bg-gradient-to-tr from-purple-950 via-slate-900 to-slate-950">
                  <div className="relative z-10 space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-purple-600 text-white tracking-widest uppercase shadow-lg">
                      🔥 NEW METHOD
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white uppercase leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                      DON&apos;T DO THIS!
                    </h2>
                    <span className="inline-block px-3 py-1 rounded text-sm sm:text-lg font-black uppercase text-amber-300 bg-black/80 border border-amber-400/40">
                      DO THIS INSTEAD
                    </span>
                  </div>

                  {/* Presenter Silhouette */}
                  <div className="absolute right-8 bottom-0 w-44 sm:w-64 h-48 sm:h-72 flex items-end justify-center pointer-events-none">
                    <div className="w-32 sm:w-44 h-32 sm:h-44 rounded-full border-4 border-purple-400 bg-slate-800 flex items-center justify-center shadow-2xl">
                      <span className="text-5xl sm:text-6xl">😱</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-purple-300">Preset: Problem vs Solution</span>
                    <span className="bg-black/90 text-white px-2 py-0.5 rounded font-bold">12:45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. AI TOOLS SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative" id="tools">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="purple">The Core Toolkit</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              6 Dedicated AI Engines Built for Video Creators
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Every tool is engineered with creator-specific prompts and frameworks—not generic chatbots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsPreview.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="purple">{tool.tag}</Badge>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link href={tool.href}>
                      <Button variant="secondary" size="sm" className="w-full justify-between">
                        <span>Launch Workspace</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TESTIMONIALS (Sample Demo Content Clearly Treated as Sample) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-slate-950/70 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="emerald">Creator Feedback</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Loved by Fast-Growing Creators
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              [Sample Demo Testimonials from Early Platform Users]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'CreatorAI Studio replaced four different tabs in my daily routine. Being able to go from raw transcript to chapters, thumbnail concepts, and scheduled calendar item in under 20 minutes is unprecedented.',
                name: 'Julian Vance',
                role: 'YouTube Creator • 740K Subscribers',
                rating: 5,
              },
              {
                quote:
                  'The 16:9 Thumbnail Generator with real-time heuristic scoring is hands down the best feature. We saw our baseline click-through rates jump by 3.2% simply by using the mobile visibility checker.',
                name: 'Samantha Brody',
                role: 'Tech & AI Educator • 310K Subscribers',
                rating: 5,
              },
              {
                quote:
                  'The script pacing cues are brilliant. It doesn’t just spit out generic copy; it tells you when to switch B-roll camera angles and where to place soft CTAs so your retention stays high.',
                name: 'Arjun Mehta',
                role: 'Digital Filmmaker • 520K Subscribers',
                rating: 5,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-sm font-bold text-white block">{t.name}</span>
                  <span className="text-xs text-purple-400 block">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. PRICING SECTION (₹0, ₹499, ₹999 with Monthly / Yearly toggle) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="purple">Transparent Pricing</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Invest in Speed. Scale Your Channel.
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Start free today. Upgrade when you need unlimited AI generations and multi-channel workflows.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className={`text-sm font-semibold ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-8 rounded-full bg-slate-800 p-1 relative transition border border-slate-700"
                aria-label="Toggle billing duration"
              >
                <div
                  className={`w-6 h-6 rounded-full bg-purple-500 transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-sm font-semibold ${billingPeriod === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
                  Yearly
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  SAVE 20%
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* FREE PLAN */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Badge variant="slate">FREE</Badge>
                <div>
                  <span className="text-4xl font-black text-white">₹0</span>
                  <span className="text-slate-400 text-sm"> / month</span>
                </div>
                <p className="text-xs text-slate-400">Perfect for exploring the workspace and solo beginners.</p>
                <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Basic AI generations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Basic transcript summaries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Basic image prompts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Limited 16:9 thumbnail concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Basic content planner</span>
                  </div>
                </div>
              </div>
              <Link href="/signup">
                <Button variant="secondary" className="w-full">
                  Start Free
                </Button>
              </Link>
            </div>

            {/* CREATOR PLAN (RECOMMENDED) */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900 border-2 border-purple-500 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-purple-600/20">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[11px] font-black uppercase px-3 py-0.5 rounded-full shadow-lg">
                Most Popular
              </div>
              <div className="space-y-4">
                <Badge variant="purple">CREATOR</Badge>
                <div>
                  <span className="text-4xl font-black text-white">
                    {billingPeriod === 'monthly' ? '₹499' : '₹399'}
                  </span>
                  <span className="text-slate-400 text-sm"> / month</span>
                </div>
                <p className="text-xs text-purple-300">For serious creators uploading weekly content.</p>
                <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>More AI generations (50/mo)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Advanced transcript summaries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Advanced Midjourney prompts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Script generator (All 7 tones)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Metadata generator &amp; CTR score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Unlimited project workspaces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Multi-platform content calendar</span>
                  </div>
                </div>
              </div>
              <Link href="/signup?plan=creator">
                <Button variant="glow" className="w-full">
                  Upgrade to Creator
                </Button>
              </Link>
            </div>

            {/* PRO PLAN */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Badge variant="blue">PRO</Badge>
                <div>
                  <span className="text-4xl font-black text-white">
                    {billingPeriod === 'monthly' ? '₹999' : '₹799'}
                  </span>
                  <span className="text-slate-400 text-sm"> / month</span>
                </div>
                <p className="text-xs text-slate-400">For agencies, high-volume teams &amp; daily uploaders.</p>
                <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Highest usage limits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Advanced AI tools suite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Premium thumbnail workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Advanced prompts &amp; metadata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Team collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Productivity analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Priority processing</span>
                  </div>
                </div>
              </div>
              <Link href="/signup?plan=pro">
                <Button variant="secondary" className="w-full">
                  Go Pro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FAQ ACCORDION SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-slate-950/70 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="purple">Got Questions?</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is CreatorAI Studio and how is it different from ChatGPT?',
                a: 'ChatGPT is a general chat interface. CreatorAI Studio is an integrated creator operating system built specifically for video workflows—featuring an exact 16:9 thumbnail canvas, transcript chapter analyzer, 7 retention-scripting tones, YouTube SEO CTR predictors, and multi-platform publishing calendar.',
              },
              {
                q: 'Do I need my own OpenAI API key to test the platform?',
                a: 'No! CreatorAI Studio features a built-in Autonomous Studio Demo Engine that generates high-fidelity realistic scripts, summaries, thumbnail variations, and SEO packages without any external API keys.',
              },
              {
                q: 'How does the AI Thumbnail Generator maintain a 16:9 ratio?',
                a: 'The thumbnail editor operates on a fixed 16:9 CSS aspect ratio with safe zone demarcation (including YouTube timestamp simulations) and exports directly to 1920x1080 resolution PNG images.',
              },
              {
                q: 'Can I use this for TikTok, YouTube Shorts, and Reels?',
                a: 'Yes. The script generator supports 60-second short-form pacing and the content planner organizes release schedules across YouTube, TikTok, Instagram Reels, LinkedIn, and Podcasts.',
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. We use Supabase PostgreSQL architecture with Row Level Security (RLS) policies, ensuring only you can access your projects, scripts, and media.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 transition-all open:bg-slate-900 open:border-purple-500/30"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base text-white">
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180 text-purple-400">▾</span>
                </summary>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/60">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FINAL HIGH-CONVERTING CTA */}
      {/* ========================================================================= */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Stop switching tools.{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Start building your creator empire.
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join thousands of creators who go from idea to published video in record time with CreatorAI Studio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button size="lg" variant="glow" className="px-9 py-4 font-bold text-base">
                <span>Start Creating Free</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-base">
                <span>Try Studio Demo</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
