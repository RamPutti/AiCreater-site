'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Download,
  Copy,
  Layers,
  Eye,
  RefreshCw,
  Plus,
  Palette,
  Type,
  User,
  Zap,
  Split,
  Camera,
  Sun,
  Layout,
  Bookmark,
  Check,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ThumbnailCanvas } from '@/components/thumbnail/ThumbnailCanvas';
import { ThumbnailDesignAnalysis } from '@/components/thumbnail/ThumbnailDesignAnalysis';
import { generateThumbnails, THUMBNAIL_LAYOUT_PRESETS } from '@/lib/ai/thumbnail';
import { useCreatorStore } from '@/lib/store/creator-store';
import { ThumbnailConcept, ThumbnailElement } from '@/types';

export default function ThumbnailStudioPage() {
  const { showToast } = useCreatorStore();

  // Inputs
  const [videoTitle, setVideoTitle] = useState('How AI Changes Everything in 2026');
  const [topic, setTopic] = useState('Artificial Intelligence and Creator Workflow');
  const [niche, setNiche] = useState('Technology');
  const [targetAudience, setTargetAudience] = useState('Creators & Tech Enthusiasts');
  const [visualStyle, setVisualStyle] = useState('Futuristic Neon');
  const [emotion, setEmotion] = useState('Shock & Curiosity');
  const [colorMood, setColorMood] = useState('Electric Purple & Cobalt Blue');
  const [textStyle, setTextStyle] = useState('Heavy Uppercase Sans-Serif');
  const [layoutPreset, setLayoutPreset] = useState('face-bold-text');

  // Generation & State
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);

  // Initial 4 Concepts
  const [concepts, setConcepts] = useState<ThumbnailConcept[]>([
    {
      id: 'c1',
      name: 'Electric Neon Impact',
      layout: 'face-bold-text',
      headline: 'THE 2026 AI SHIFT',
      subtext: 'IT CHANGES EVERYTHING',
      badge: '🔥 2026 BLUEPRINT',
      bgColor: '#080B11',
      bgGradient: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.45) 0%, rgba(59, 130, 246, 0.25) 45%, #080B11 85%)',
      lightingEffect: 'Volumetric violet edge rim light with dual cyan backfill',
      subjectMood: 'Intense Focus / Shock',
      contrastScore: 94,
      readabilityScore: 'Very High',
      previewGradient: 'from-purple-900/60 via-indigo-900/40 to-slate-950',
    },
    {
      id: 'c2',
      name: 'Split Contrast Dilemma',
      layout: 'problem-solution',
      headline: "DON'T DO THIS!",
      subtext: 'DO THIS INSTEAD',
      badge: '⚠️ CRITICAL MISTAKE',
      bgColor: '#0A0E17',
      bgGradient: 'linear-gradient(90deg, rgba(239, 68, 68, 0.35) 0%, rgba(10, 14, 23, 0.85) 50%, rgba(16, 185, 129, 0.35) 100%)',
      lightingEffect: 'Dual-toned dramatic split: crimson shadow vs emerald glow',
      subjectMood: 'Comparative reaction',
      contrastScore: 96,
      readabilityScore: 'Very High',
      previewGradient: 'from-red-950/60 via-slate-900 to-emerald-950/60',
    },
    {
      id: 'c3',
      name: 'Cinematic Hyper-Minimal',
      layout: 'cinematic',
      headline: 'THE END OF EDITING',
      subtext: 'The 1-Click Studio',
      badge: 'UNRELEASED',
      bgColor: '#05070A',
      bgGradient: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.35) 0%, rgba(15, 23, 42, 0.7) 50%, #05070A 90%)',
      lightingEffect: 'Cold anamorphic blue streak with soft ambient key light',
      subjectMood: 'Intense focus / Mystery',
      contrastScore: 89,
      readabilityScore: 'High',
      previewGradient: 'from-blue-950/60 via-slate-900 to-black',
    },
    {
      id: 'c4',
      name: 'High-Stakes Metric Proof',
      layout: 'business',
      headline: '10X YOUR OUTPUT',
      subtext: 'Zero Team Needed',
      badge: 'PROVEN SYSTEM',
      bgColor: '#070A10',
      bgGradient: 'radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.4) 0%, rgba(14, 165, 233, 0.25) 60%, #070A10 100%)',
      lightingEffect: 'Gold accent halo glow with sharp rim separation',
      subjectMood: 'Confident victory / Smirk',
      contrastScore: 92,
      readabilityScore: 'Very High',
      previewGradient: 'from-purple-950/60 via-cyan-950/40 to-slate-950',
    },
  ]);

  const [elements, setElements] = useState<ThumbnailElement[]>([
    {
      id: 'el-badge',
      type: 'badge',
      text: '🔥 2026 BLUEPRINT',
      backgroundColor: '#8B5CF6',
      fontSize: 14,
      xPercent: 8,
      yPercent: 12,
      visible: true,
    },
    {
      id: 'el-headline',
      type: 'headline',
      text: 'THE 2026 AI SHIFT',
      color: '#FFFFFF',
      fontSize: 48,
      xPercent: 8,
      yPercent: 28,
      visible: true,
    },
    {
      id: 'el-subtext',
      type: 'subtext',
      text: "DON'T GET LEFT BEHIND",
      color: '#FACC15',
      backgroundColor: 'rgba(0,0,0,0.7)',
      fontSize: 24,
      xPercent: 8,
      yPercent: 48,
      visible: true,
    },
    {
      id: 'el-avatar',
      type: 'avatar',
      color: '#8B5CF6',
      xPercent: 68,
      yPercent: 25,
      visible: true,
    },
  ]);

  const activeConcept = concepts[activeConceptIndex] || concepts[0];

  const handleGenerateThumbnails = async () => {
    setIsGenerating(true);
    try {
      const result = await generateThumbnails({
        title: videoTitle,
        topic,
        niche,
        targetAudience,
        visualStyle,
        emotion,
        colorMood,
        layoutPreset,
      });
      setConcepts(result.concepts);
      setActiveConceptIndex(0);
      showToast('Generated 4 new 16:9 thumbnail concepts!', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyConcept = (index: number) => {
    setActiveConceptIndex(index);
    const chosen = concepts[index];
    setElements((prev) =>
      prev.map((el) => {
        if (el.type === 'headline') return { ...el, text: chosen.headline };
        if (el.type === 'subtext') return { ...el, text: chosen.subtext || '' };
        if (el.type === 'badge') return { ...el, text: chosen.badge || '' };
        return el;
      })
    );
  };

  const handleUpdateElement = (id: string, updates: Partial<ThumbnailElement>) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)));
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Studio Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Sparkles className="w-5 h-5" />
                </span>
                16:9 AI Thumbnail Studio
              </h1>
              <Badge variant="purple" className="font-extrabold uppercase text-[10px]">
                Main WOW Feature
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-contrast composition, 16:9 safe zone boundaries, bold typography, and mobile visibility heuristics.
            </p>
          </div>
        </div>

        {/* Studio Grid: Left Sidebar Controls + Right 16:9 Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: Inputs & Controls */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  Generation Parameters
                </span>
                <span className="text-[10px] text-purple-400 font-mono">16:9 Strict</span>
              </div>

              {/* Video Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>

              {/* Video Topic & Niche */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Niche
                  </label>
                  <select
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Business">Business &amp; Finance</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Presenter Emotion
                  </label>
                  <select
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    value={emotion}
                    onChange={(e) => setEmotion(e.target.value)}
                  >
                    <option value="Shock & Curiosity">Shock &amp; Curiosity</option>
                    <option value="Intense Focus">Intense Focus</option>
                    <option value="Confident Smirk">Confident Smirk</option>
                    <option value="Skeptical Dilemma">Skeptical Dilemma</option>
                    <option value="High Energy Excitement">Excitement</option>
                  </select>
                </div>
              </div>

              {/* Layout Presets (12 Curated Presets) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Layout Preset (12 Styles)</span>
                  <span className="text-[10px] text-purple-400 font-bold">{layoutPreset}</span>
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {THUMBNAIL_LAYOUT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setLayoutPreset(preset.id)}
                      className={`p-2 rounded-xl text-left border text-[11px] font-medium transition flex flex-col justify-between ${
                        layoutPreset === preset.id
                          ? 'bg-purple-600/25 border-purple-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold line-clamp-1">{preset.name}</span>
                      <span className="text-[9px] text-slate-500 line-clamp-1 mt-0.5">Preset</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                variant="glow"
                size="md"
                className="w-full justify-center py-3 text-sm font-bold shadow-lg"
                onClick={handleGenerateThumbnails}
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Synthesizing 4 Concepts...' : 'Generate Thumbnails'}</span>
              </Button>
            </div>

            {/* In-Studio Editing Controls */}
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 border-b border-slate-800 pb-3">
                <Palette className="w-4 h-4 text-blue-400" />
                Live Canvas Overrides
              </span>

              {/* Quick Headline Edit */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Headline Text
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  value={elements.find((e) => e.type === 'headline')?.text || ''}
                  onChange={(e) => {
                    const el = elements.find((x) => x.type === 'headline');
                    if (el) handleUpdateElement(el.id, { text: e.target.value });
                  }}
                />
              </div>

              {/* Quick Subtext Edit */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Subtext Banner
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  value={elements.find((e) => e.type === 'subtext')?.text || ''}
                  onChange={(e) => {
                    const el = elements.find((x) => x.type === 'subtext');
                    if (el) handleUpdateElement(el.id, { text: e.target.value });
                  }}
                />
              </div>

              {/* Element Visibility Toggles */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Toggle Layer Visibility:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {elements.map((el) => (
                    <button
                      key={el.id}
                      onClick={() => handleUpdateElement(el.id, { visible: !el.visible })}
                      className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between text-[11px] ${
                        el.visible
                          ? 'bg-slate-800 border-purple-500/40 text-purple-300'
                          : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
                      }`}
                    >
                      <span className="capitalize">{el.type}</span>
                      <span className="text-[10px]">{el.visible ? '✓' : '×'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Large 16:9 Thumbnail Canvas & Concepts */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* The Main 16:9 Studio Canvas */}
            <ThumbnailCanvas
              concept={activeConcept}
              elements={elements}
              onUpdateElement={handleUpdateElement}
              onSave={() => showToast('Thumbnail preset saved to your creator studio!', 'success')}
            />

            {/* 4 Generated Concepts Selector Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Concept Variations (Select to Apply)
                </span>
                <span className="text-[11px] text-purple-400">
                  Showing 4 High-Contrast Concepts
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {concepts.map((concept, idx) => (
                  <button
                    key={concept.id}
                    onClick={() => handleApplyConcept(idx)}
                    className={`rounded-2xl p-3 border text-left transition-all relative overflow-hidden flex flex-col justify-between aspect-16-9 ${
                      activeConceptIndex === idx
                        ? 'border-purple-500 ring-2 ring-purple-500/40 shadow-xl'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                    style={{ background: concept.bgGradient }}
                  >
                    <div className="z-10 flex items-center justify-between w-full">
                      <span className="text-[9px] font-black text-purple-300 uppercase px-1.5 py-0.5 rounded bg-black/60">
                        {concept.badge}
                      </span>
                      {activeConceptIndex === idx && (
                        <div className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white/50" />
                      )}
                    </div>

                    <div className="z-10">
                      <p className="text-[11px] font-black text-white uppercase leading-tight line-clamp-2 drop-shadow">
                        {concept.headline}
                      </p>
                      <span className="text-[9px] text-amber-300 font-bold block mt-0.5">
                        {concept.contrastScore}% Contrast
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  </button>
                ))}
              </div>
            </div>

            {/* Real-Time Design Analysis Panel */}
            <ThumbnailDesignAnalysis
              analysis={{
                compositionScore: 95,
                contrastScore: 94,
                readabilityScore: 96,
                subjectFocusScore: 90,
                visualHierarchyScore: 94,
                mobileVisibilityScore: 92,
                spacingScore: 89,
                overallRating: 'Strong',
                recommendations: [
                  'High-contrast typography achieves clear separation over dark ambient background.',
                  'Subject positioned outside the bottom-right corner to prevent YouTube timestamp collision.',
                  'Color temperature gradient creates depth without distracting from main keyword text.',
                ],
              }}
            />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
