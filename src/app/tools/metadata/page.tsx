'use client';

import React, { useState } from 'react';
import {
  Tags,
  Sparkles,
  Copy,
  Check,
  Bookmark,
  TrendingUp,
  MessageSquare,
  ListFilter,
  Layers,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { CopyButton } from '@/components/ui/copy-button';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { generateMetadata } from '@/lib/ai/metadata';
import { useCreatorStore } from '@/lib/store/creator-store';
import { MetadataData } from '@/types';

export default function MetadataGeneratorPage() {
  const { showToast } = useCreatorStore();

  const [topic, setTopic] = useState('How AI Changes Everything in 2026');
  const [title, setTitle] = useState('I Automated My YouTube Studio with AI');
  const [targetAudience, setTargetAudience] = useState('Creators, video editors, tech enthusiasts');
  const [platform, setPlatform] = useState('YouTube');
  const [keywordsInput, setKeywordsInput] = useState('ai tools, youtube growth, video editing, retention');

  const [isGenerating, setIsGenerating] = useState(false);
  const [metadataData, setMetadataData] = useState<MetadataData | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateMetadata({
        topic,
        title,
        targetAudience,
        platform,
        keywords: keywordsInput.split(',').map((k) => k.trim()),
      });
      setMetadataData(result);
      showToast('High-CTR metadata and title variations generated!', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Tags className="w-5 h-5" />
            </span>
            YouTube SEO &amp; CTR Metadata Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Produce multiple high-converting title variations with CTR predictions, keyword-rich descriptions, and pinned comments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Inputs */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              SEO Parameters
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Video Topic *
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Working Title Idea
              </label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Platform
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram Reels</option>
                  <option value="Podcast">Podcast</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Seed Keywords (Comma Separated)
              </label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                value={keywordsInput}
                onChange={(e) => setKeywordsInput(e.target.value)}
              />
            </div>

            <Button
              variant="glow"
              size="md"
              className="w-full justify-center py-3 font-bold"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Predicting CTR & Tags...' : 'Generate Metadata Package'}</span>
            </Button>
          </div>

          {/* RIGHT: Output */}
          <div className="lg:col-span-7 space-y-4">
            {metadataData ? (
              <div className="space-y-4">
                {/* 1. Title Variations with CTR Predictions */}
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      5 High-CTR Title Variations
                    </span>
                    <Badge variant="emerald">Algorithm Ready</Badge>
                  </div>

                  <div className="space-y-2.5">
                    {metadataData.titleVariations.map((tv, idx) => (
                      <div
                        key={tv.id}
                        className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 hover:border-amber-500/40 transition group"
                      >
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition">
                            {tv.title}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                            <span className="text-emerald-400 font-semibold">{tv.ctrPrediction}</span>
                            <span>•</span>
                            <span>Score: {tv.score}/100</span>
                            <span>•</span>
                            <span>{tv.characterCount} chars</span>
                          </div>
                        </div>
                        <CopyButton textToCopy={tv.title} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Optimized Description */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      SEO Video Description &amp; Timestamps
                    </span>
                    <CopyButton textToCopy={metadataData.description} size="sm" />
                  </div>
                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                    {metadataData.description}
                  </pre>
                </div>

                {/* 3. Tags & Hashtags */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                        YouTube SEO Tags (Comma-Separated)
                      </span>
                      <CopyButton textToCopy={metadataData.tags.join(', ')} size="sm" label="Copy All Tags" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {metadataData.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                        Hashtags
                      </span>
                      <CopyButton textToCopy={metadataData.hashtags.join(' ')} size="sm" label="Copy Hashtags" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {metadataData.hashtags.map((h, i) => (
                        <span key={i} className="text-xs text-blue-400 font-bold">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. High-Converting Pinned Comment */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" /> Pinned Comment Engagement Hook
                    </span>
                    <CopyButton textToCopy={metadataData.pinnedComment} size="sm" />
                  </div>
                  <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
                    {metadataData.pinnedComment}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
                <Tags className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">Your metadata package will appear here</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click &quot;Generate Metadata Package&quot; to predict titles, format descriptions, and extract search tags.
                </p>
                <Button size="sm" variant="primary" onClick={handleGenerate}>
                  Generate Demo Package
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
