'use client';

import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  RefreshCw,
  Maximize2,
  Minimize2,
  Bookmark,
  Check,
  Clock,
  Play,
  Share2,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { CopyButton } from '@/components/ui/copy-button';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { generateScript } from '@/lib/ai/script';
import { useCreatorStore } from '@/lib/store/creator-store';
import { ScriptData, ContentPlatform } from '@/types';

export default function ScriptGeneratorPage() {
  const { showToast } = useCreatorStore();

  // Inputs
  const [topic, setTopic] = useState('How Creators Can Actually Use AI Without Losing Their Voice');
  const [title, setTitle] = useState('How Creators Can Use AI Without Sounding Like a Robot');
  const [targetAudience, setTargetAudience] = useState('Solo YouTubers, vloggers, and digital creators');
  const [duration, setDuration] = useState('8-10 mins');
  const [platform, setPlatform] = useState<ContentPlatform>('YouTube');
  const [tone, setTone] = useState('Storytelling');
  const [language, setLanguage] = useState('English');

  // Generator State
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptData, setScriptData] = useState<ScriptData | null>(null);

  const handleGenerate = async (action: 'generate' | 'rewrite' | 'expand' | 'shorten' = 'generate') => {
    setIsGenerating(true);
    try {
      const result = await generateScript({
        topic,
        title,
        targetAudience,
        duration,
        platform,
        tone,
        language,
        action,
      });
      setScriptData(result);
      showToast(
        action === 'generate'
          ? 'Script generated successfully!'
          : `Script updated (${action})!`,
        'success'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </span>
            AI Script Generator Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Formulate retention-optimized scripts with psychological hooks, visual pacing cues, and soft CTAs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Inputs & Controls */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              Script Parameters
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Video Topic *
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Working Video Title
              </label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Target Platform
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as ContentPlatform)}
                >
                  <option value="YouTube">YouTube (Long-form)</option>
                  <option value="TikTok">TikTok / Shorts</option>
                  <option value="Instagram">Instagram Reels</option>
                  <option value="Podcast">Video Podcast</option>
                  <option value="LinkedIn">LinkedIn Video</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Target Duration
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="60s (Shorts)">60s (Shorts/Reel)</option>
                  <option value="3-5 mins">3-5 mins</option>
                  <option value="8-10 mins">8-10 mins (Optimal)</option>
                  <option value="12-15 mins">12-15 mins</option>
                  <option value="20+ mins">20+ mins (Deep Dive)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Tone of Voice (7 Options)
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="Storytelling">Storytelling</option>
                  <option value="Professional">Professional</option>
                  <option value="Educational">Educational</option>
                  <option value="Energetic">Energetic</option>
                  <option value="Funny">Funny / Witty</option>
                  <option value="Cinematic">Cinematic</option>
                  <option value="Conversational">Conversational</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Language
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (Hinglish)</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Target Audience
              </label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <Button
              variant="glow"
              size="md"
              className="w-full justify-center py-3 font-bold"
              onClick={() => handleGenerate('generate')}
              disabled={isGenerating}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Structuring Retention Beats...' : 'Generate Full Script'}</span>
            </Button>
          </div>

          {/* RIGHT: Professional Editor Interface */}
          <div className="lg:col-span-7 space-y-4">
            {/* Editor Toolbar */}
            {scriptData && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Badge variant="blue">Tone: {scriptData.tone}</Badge>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ~{scriptData.wordCount} words
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleGenerate('rewrite')}
                    disabled={isGenerating}
                    title="Rewrite Hook"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Rewrite</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleGenerate('expand')}
                    disabled={isGenerating}
                    title="Add more examples"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleGenerate('shorten')}
                    disabled={isGenerating}
                    title="Cut fluff"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Shorten</span>
                  </Button>
                  <CopyButton
                    textToCopy={`TITLE: ${title}\n\nHOOK:\n${scriptData.hook}\n\nINTRODUCTION:\n${scriptData.introduction}\n\nSECTIONS:\n${scriptData.sections
                      .map((s) => `${s.name} (${s.durationEst}):\n${s.content}\n${s.visualCue || ''}`)
                      .join('\n\n')}\n\nCTA:\n${scriptData.cta}\n\nOUTRO:\n${scriptData.outro}`}
                    size="sm"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => showToast('Script saved to project vault!', 'success')}
                  >
                    <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                    <span>Save</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Script Display */}
            {scriptData ? (
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 text-sm text-slate-200 font-sans leading-relaxed shadow-2xl">
                {/* Hook */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-1.5">
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">
                    0:00 - 0:05 • Psychological Hook (Crucial)
                  </span>
                  <p className="text-base font-bold text-white italic">&quot;{scriptData.hook}&quot;</p>
                </div>

                {/* Introduction */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">
                    0:05 - 0:30 • Introduction &amp; Curiosity Gap
                  </span>
                  <p className="text-slate-300">{scriptData.introduction}</p>
                </div>

                {/* Sections */}
                <div className="space-y-4 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
                    Main Narrative Sections
                  </span>
                  {scriptData.sections.map((sec) => (
                    <div key={sec.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{sec.name}</span>
                        <span className="text-[10px] text-purple-400 font-mono">{sec.durationEst}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{sec.content}</p>
                      {sec.visualCue && (
                        <div className="p-2 rounded-lg bg-slate-900 text-[11px] text-purple-300 italic border border-purple-500/20">
                          {sec.visualCue}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Transitions */}
                {scriptData.transitions && scriptData.transitions.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
                      Recommended Transitions
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                      {scriptData.transitions.map((t, idx) => (
                        <li key={idx}>&quot;{t}&quot;</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA & Outro */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block mb-1">
                      Soft Call to Action (70% Peak)
                    </span>
                    <p className="text-xs text-slate-300">{scriptData.cta}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">
                      Outro &amp; Resource Delivery
                    </span>
                    <p className="text-xs text-slate-300">{scriptData.outro}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
                <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">Your script will appear here</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click &quot;Generate Full Script&quot; to synthesize hooks, timing estimates, and B-roll cues.
                </p>
                <Button size="sm" variant="primary" onClick={() => handleGenerate('generate')}>
                  Generate Demo Script
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
